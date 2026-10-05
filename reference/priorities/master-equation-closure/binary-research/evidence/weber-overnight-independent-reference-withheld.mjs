// weber-overnight-independent-reference-withheld.mjs
//
// Blind reference enclosures for the preregistered withheld cases WB-5, WB-6, WB-12
// and the reference statement for WB-7, computed WITHOUT sight of any subject output.
//
// This file imports the fixed reference instrument weber-overnight-independent-reference.mjs
// (SHA-256 feeffd7e8986d6fa695dfc1a35777891ba7ef65728f3aeda5e9a1631440d23c3 at fixing) and
// does not modify it. New routines added here, each with a known-case pass recorded in
// withheld-reference-known-cases.json BEFORE any target evaluation:
//
//   timeFromRestTo(L, r0, r)      opposite-polarity radial release from rest at r0: time to
//                                 reach an interior radius r (0 <= r <= r0), from the same
//                                 angle-variable closed form as the fixed contact-time formula:
//                                 r = mm - ww cos(phi), mm = (r0+b)/2, ww = (r0-b)/2,
//                                 t(r0 -> r) = (ww/sqrt|C|) [ pi - (phi_r - sin phi_r) ],
//                                 cos phi_r = (mm - r)/ww, C = 2G/r0.
//   pairStateInvariants(L, X1, X2, V1, V2)
//                                 interval Cartesian pair state -> (r, rdot, h, h-vector, C, V_c).
//   inclinationToPlane(hhat)      angle between the relative-motion plane normal and the z axis.
//   absoluteSpeedSupremum(inv, bo)
//                                 sup over orbital phase of each member's absolute speed:
//                                 |V_1|^2 = |V_c|^2 + |w|^2/4 + V_c.w, with w in the orbital plane,
//                                 so sup = sqrt(|V_c|^2 + p v_max + v_max^2/4), p = in-plane
//                                 projection of V_c, v_max = h/r_- (relative speed at pericentre).
//   odeMemberSpeedScan(...)       floating (measured) scan of |V_1|, |V_2| along the reduced ODE,
//                                 using the fixed module's RK4 evaluator; second check only.
//
// Units: K = c_f = 1; lengths K/c_f^2, times K/c_f^3, speeds c_f. Node >= 22, ESM, no dependencies.
// Usage:
//   node weber-overnight-independent-reference-withheld.mjs known     -> known-case JSON (must pass)
//   node weber-overnight-independent-reference-withheld.mjs targets   -> runs known cases first, then
//                                                                        writes withheld-reference-v1.json

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  I, rat, add, sub, neg, mul, div, sqr, isqrt, scale, mid, width, PI, iacos, isin,
  lawConstants, invariantC, boundOrbit, radialFate, radialAccel, rdotSq, singularCoefficient,
  reducedOdeEvolve, FROZEN, ZERO, sig,
} from './weber-overnight-independent-reference.mjs';

// ---------------------------------------------------------------- interval vectors
const vadd = (a, b) => a.map((x, i) => add(x, b[i]));
const vsub = (a, b) => a.map((x, i) => sub(x, b[i]));
const vscale = (a, k) => a.map((x) => scale(x, k));
const vdot = (a, b) => a.reduce((s, x, i) => add(s, mul(x, b[i])), I(0));
const vnorm2 = (a) => { const s = a.reduce((acc, x) => add(acc, sqr(x)), I(0)); return I(Math.max(0, s[0]), Math.max(0, s[1])); }; // nonnegative by construction
const vcross = (a, b) => [
  sub(mul(a[1], b[2]), mul(a[2], b[1])),
  sub(mul(a[2], b[0]), mul(a[0], b[2])),
  sub(mul(a[0], b[1]), mul(a[1], b[0])),
];
const clampNonneg = (a) => I(Math.max(0, a[0]), Math.max(0, a[1]));
// arccos on an enclosure that may straddle 0 (the fixed iacos refuses that case): for |x| < 1/2,
// arccos x = pi/2 - arcsin x and |arcsin x| <= |x| (1 + x^2), so pi/2 + [-m(1+m^2), m(1+m^2)] encloses it.
function iacosAny(X) {
  if (!(X[0] <= 0 && X[1] >= 0)) return iacos(X);
  const m = Math.max(-X[0], X[1]); if (m >= 0.5) throw new Error('iacosAny: straddle too wide');
  const e = (m * (1 + m * m)) * (1 + 1e-15) + Number.MIN_VALUE;
  return add(scale(PI, 0.5), I(-e, e));
}

// ---------------------------------------------------------------- new routines
// Opposite-polarity (G < 0, b <= 0) radial release from rest at r0: time to reach r in [0, r0].
export function timeFromRestTo(L, r0, r) {
  if (!(L.G[1] < 0)) throw new Error('timeFromRestTo: attraction only');
  const C = invariantC(L, r0, I(0), I(0)); // = 2G/r0 < 0
  const mm = scale(add(r0, L.b), 0.5), ww = scale(sub(r0, L.b), 0.5);
  const fac = div(ww, isqrt(neg(C)));
  let psi; // phi_r - sin(phi_r)
  if (r[0] === r0[0] && r[1] === r0[1]) psi = PI; // phi = pi exactly at the release radius
  else if (r[0] === 0 && r[1] === 0 && L.b[0] === 0 && L.b[1] === 0) psi = I(0); // b = 0: phi(0) = 0 exactly
  else {
    const cphi = div(sub(mm, r), ww);
    const phi = iacosAny(cphi);
    psi = sub(phi, isin(phi));
  }
  const t = mul(fac, sub(PI, psi));
  // rdot^2 >= 0 is known; at the release radius the enclosure of Q(r0) = 0 straddles zero by rounding, so clamp at 0
  const rdot2raw = r[0] > 0 ? rdotSq(L, C, I(0), r) : (L.b[1] < 0 ? div(scale(L.G, 2), L.b) : null);
  const rdot2 = rdot2raw ? clampNonneg(rdot2raw) : null;
  return { C, time: t, rdotSqAtR: rdot2, relSpeedAtR: rdot2 ? isqrt(rdot2) : null };
}

// Interval Cartesian pair state -> relative-motion invariants and centre velocity.
export function pairStateInvariants(L, X1, X2, V1, V2) {
  const Rv = vsub(X1, X2), w = vsub(V1, V2);
  const r = isqrt(vnorm2(Rv));
  const rdot = div(vdot(Rv, w), r);
  const hv = vcross(Rv, w);
  const h = isqrt(vnorm2(hv));
  const C = invariantC(L, r, rdot, h);
  const Vc = vscale(vadd(V1, V2), 0.5);
  const hhat = hv.map((x) => div(x, h));
  const relSpeed = isqrt(vnorm2(w));
  return { r, rdot, h, hSq: vnorm2(hv), hv, hhat, C, D: singularCoefficient(L, r), Vc, VcSpeed: isqrt(vnorm2(Vc)), relSpeed, Rhat: Rv.map((x) => div(x, r)) };
}

// Inclination of the relative-motion plane (normal hhat) to the plane with normal n0 (default z).
export function inclinationToPlane(hhat, n0 = [I(0), I(0), I(1)]) {
  const s = isqrt(vnorm2(vcross(hhat, n0)));   // sin i >= 0
  const c = vdot(hhat, n0);                     // cos i
  if (!(c[0] > 0)) throw new Error('inclinationToPlane: assumes i < pi/2');
  const sClamped = I(Math.max(0, s[0]), Math.min(1, s[1]));
  const i = sub(scale(PI, 0.5), iacos(sClamped)); // i = pi/2 - arccos(sin i), well conditioned for small i
  return { sin: s, cos: c, radians: i, degrees: mul(i, div(I(180), PI)) };
}

// Supremum over orbital phase of each member's absolute speed (derivation in the adjudication document).
export function absoluteSpeedSupremum(inv, bo, VcOverride = null) {
  const Vc = VcOverride ?? inv.Vc;
  const vmax = div(inv.h, bo.rMin);                 // relative speed at pericentre (max of |w| on the level, C < 2)
  const vmin = div(inv.h, bo.rMax);                 // relative speed at apocentre
  const Vc2 = vnorm2(Vc);
  const Vcn = vdot(Vc, inv.hhat);                   // component of V_c along the orbit normal
  const p = isqrt(vnorm2(vcross(Vc, inv.hhat)));  // in-plane projection magnitude |V_c x hhat| (no cancellation)
  const sup2 = add(add(Vc2, mul(p, vmax)), scale(sqr(vmax), 0.25));
  const inf2 = add(sub(Vc2, mul(p, vmin)), scale(sqr(vmin), 0.25));
  return {
    centreVelocity: Vc, centreSpeed: isqrt(Vc2), inPlaneProjection: p, normalComponent: Vcn,
    relSpeedPeri: vmax, relSpeedApo: vmin, memberRelPartMax: scale(vmax, 0.5),
    supremumMemberSpeed: isqrt(sup2), infimumMemberSpeed: isqrt(clampNonneg(inf2)),
    triangleBound: add(isqrt(Vc2), scale(vmax, 0.5)),
    note: 'supremum is the same for both members (w -> -w); attained at a pericentre whose e_perp is parallel to the in-plane projection of V_c; with apsidal advance the pericentre direction approaches that alignment arbitrarily closely over time',
  };
}

// Floating (measured) scan of member speeds along the reduced ODE, using the fixed module's RK4 evaluator.
export function odeMemberSpeedScan(inv, Vc, tEnd, dt, tFirstPeriod = Infinity) {
  const h = mid(inv.h), r0 = mid(inv.r), rdot0 = mid(inv.rdot);
  const a = inv.Rhat.map(mid), n = inv.hhat.map(mid);
  const b = [n[1] * a[2] - n[2] * a[1], n[2] * a[0] - n[0] * a[2], n[0] * a[1] - n[1] * a[0]]; // b = hhat x Rhat
  const vc = Vc.map(mid);
  let k = 0; const best = { v1: 0, t1: 0, r1: 0, v2: 0, t2: 0, r2: 0 }; const first = { v1: 0, t1: 0, v2: 0, t2: 0 };
  let v1Start = 0;
  const sample = (y) => {
    const t = k * dt; k++;
    const [r, rd, th] = y; const ct = Math.cos(th), st = Math.sin(th);
    const e = a.map((x, i) => ct * x + st * b[i]), ep = a.map((x, i) => -st * x + ct * b[i]);
    const w = e.map((x, i) => rd * x + (h / r) * ep[i]);
    const V1 = vc.map((x, i) => x + 0.5 * w[i]), V2 = vc.map((x, i) => x - 0.5 * w[i]);
    const s1 = Math.hypot(...V1), s2 = Math.hypot(...V2);
    if (k === 1) v1Start = s1;
    if (s1 > best.v1) { best.v1 = s1; best.t1 = t; best.r1 = r; }
    if (s2 > best.v2) { best.v2 = s2; best.t2 = t; best.r2 = r; }
    if (t <= tFirstPeriod) { if (s1 > first.v1) { first.v1 = s1; first.t1 = t; } if (s2 > first.v2) { first.v2 = s2; first.t2 = t; } }
    return 1; // constant sign: never an event
  };
  const run = reducedOdeEvolve({ sigma: -1, lambda: -0.5, mu: 1 }, { r: r0, rdot: rdot0, h }, { dt, maxSteps: Math.ceil(tEnd / dt), event: sample });
  return { dt, tEnd: run.t, samples: k, memberSpeedAtStart: v1Start, maxOverRun: best, maxOverFirstRadialPeriod: first, finalState: run.y };
}

// ---------------------------------------------------------------- reporting
function deep(o) {
  if (Array.isArray(o) && o.length === 2 && typeof o[0] === 'number') return sig(o);
  if (Array.isArray(o)) return o.map(deep);
  if (o && typeof o === 'object') { const r = {}; for (const [k, v] of Object.entries(o)) if (typeof v !== 'function') r[k] = deep(v); return r; }
  return o;
}
const inside = (val, enc) => enc[0] <= val && val <= enc[1];
const overlap = (a, b) => a[0] <= b[1] && b[0] <= a[1];

// Shared Cartesian builders (interval). Convention assumed for WB-1/WB-4/WB-7: R(0) = X1 - X2 along +x,
// relative velocity along +y, members at +-R/2, centre of velocity at rest before any stated drift.
function planarState(x, relSpeed) {
  const half = scale(x, 0.5), vh = scale(relSpeed, 0.5);
  return { X1: [half, I(0), I(0)], X2: [neg(half), I(0), I(0)], V1: [I(0), vh, I(0)], V2: [I(0), neg(vh), I(0)] };
}

// ---------------------------------------------------------------- known cases (recorded before targets)
export function runKnownCases() {
  const checks = [];
  const rec = (name, expected, got, pass) => checks.push({ name, expected, got, pass });
  const Lw = lawConstants(FROZEN(-1)), Lz = lawConstants(ZERO(-1));

  // N1. timeFromRestTo at r = 0 reproduces the fixed reference's printed contact time from rest at x0 = 4,
  //     3 pi - 3 acos(1/3) + 2 sqrt 2 = 8.560326833..., and overlaps radialFate's enclosure.
  {
    const t = timeFromRestTo(Lw, I(4), I(0));
    const closed = add(sub(scale(PI, 3), scale(iacos(rat(1, 3)), 3)), scale(isqrt(I(2)), 2));
    const rf = radialFate(Lw, I(4), I(0));
    rec('N1 timeFromRestTo(x0=4, r=0) overlaps closed form 3pi-3acos(1/3)+2sqrt2 and radialFate contact time (printed 8.560326833)', sig(closed), sig(t.time), overlap(t.time, closed) && overlap(t.time, rf.contactTime) && Math.abs(mid(t.time) - 8.560326833) < 5e-10);
    rec('N1b contact relative speed sqrt2 from the same routine', Math.SQRT2, sig(t.relSpeedAtR), inside(Math.SQRT2, t.relSpeedAtR));
  }
  // N2. time to the release radius itself is exactly zero
  {
    const t = timeFromRestTo(Lw, I(4), I(4));
    rec('N2 timeFromRestTo(x0=4, r=4) encloses 0 with width < 1e-14', 0, sig(t.time), inside(0, t.time) && width(t.time) < 1e-14);
  }
  // N3. Kepler (zero-coefficient) control: from rest at r0 = 4 to r = 2, t = pi + 2 (cycloid parametrisation, eta = pi/2)
  {
    const t = timeFromRestTo(Lz, I(4), I(2));
    rec('N3 Kepler control timeFromRestTo(x0=4, r=2) encloses pi + 2', Math.PI + 2, sig(t.time), inside(Math.PI + 2, t.time) && width(t.time) < 1e-12);
    rec('N3b Kepler control rdot^2 at r=2 encloses 1 (= 4(r0-r)/(r r0))', 1, sig(t.rdotSqAtR), inside(1, t.rdotSqAtR));
  }
  // N4. Cartesian invariants of the unperturbed circle at x = 4: h^2 = 8, C = -1/2, rdot = 0, inclination 0, V_c = 0
  {
    const s = planarState(I(4), isqrt(rat(1, 2)));
    const inv = pairStateInvariants(Lw, s.X1, s.X2, s.V1, s.V2);
    const inc = inclinationToPlane(inv.hhat);
    rec('N4 circle x=4: h^2 encloses 8, C encloses -1/2, rdot encloses 0, D encloses 3/2', [8, -0.5, 0, 1.5], [sig(inv.hSq), sig(inv.C), sig(inv.rdot), sig(inv.D)], inside(8, inv.hSq) && inside(-0.5, inv.C) && inside(0, inv.rdot) && inside(1.5, inv.D) && width(inv.C) < 1e-14);
    rec('N4b circle x=4: inclination encloses 0 (width < 1e-12), centre speed encloses 0', [0, 0], [sig(inc.radians), sig(inv.VcSpeed)], inside(0, inc.radians) && width(inc.radians) < 1e-12 && inside(0, inv.VcSpeed));
  }
  // N5. WB-4 built as a Cartesian state reproduces the fixed reference's printed values
  {
    const s = planarState(I(4), mul(rat(4, 5), isqrt(rat(1, 2))));
    const inv = pairStateInvariants(Lw, s.X1, s.X2, s.V1, s.V2);
    const bo = boundOrbit(Lw, inv.C, inv.h, 128);
    rec('N5 WB-4 via Cartesian state: C encloses -17/25, r_- encloses 32/17, r_+ encloses 4', [-0.68, 32 / 17, 4], [sig(inv.C), sig(bo.rMin), sig(bo.rMax)], inside(-0.68, inv.C) && inside(32 / 17, bo.rMin) && inside(4, bo.rMax));
    rec('N5b WB-4 via Cartesian state: period 29.00582560, apsidal 4.186307003, max member speed 0.6010407640 (printed)', [29.0058256, 4.186307003, 0.601040764], [sig(bo.period), sig(bo.apsidal), sig(bo.individualSpeedMaxCentreAtRest)], Math.abs(mid(bo.period) - 29.0058256) < 5e-9 && Math.abs(mid(bo.apsidal) - 4.186307003) < 5e-10 && Math.abs(mid(bo.individualSpeedMaxCentreAtRest) - 0.601040764) < 5e-11);
    // N6. supremum formula on WB-4 with a centre drift: in-plane (0.1,0,0) -> 0.1 + 17 sqrt128/320 = 0.7010407640...;
    //     out-of-plane (0,0,0.1) -> sqrt(0.01 + 36992/102400) = sqrt(0.37125)
    const inPlane = absoluteSpeedSupremum(inv, bo, [rat(1, 10), I(0), I(0)]);
    const outPlane = absoluteSpeedSupremum(inv, bo, [I(0), I(0), rat(1, 10)]);
    const expIn = 0.1 + 17 * Math.sqrt(128) / 320, expOut = Math.sqrt(0.37125);
    rec('N6 supremum with in-plane drift (0.1,0,0) encloses 0.1 + 17 sqrt(128)/320 and equals the triangle bound', expIn, [sig(inPlane.supremumMemberSpeed), sig(inPlane.triangleBound)], Math.abs(mid(inPlane.supremumMemberSpeed) - expIn) < 1e-13 && overlap(inPlane.supremumMemberSpeed, inPlane.triangleBound));
    rec('N6b supremum with out-of-plane drift (0,0,0.1) encloses sqrt(0.37125) (width < 1e-12) and lies below the triangle bound', expOut, [sig(outPlane.supremumMemberSpeed), sig(outPlane.triangleBound)], inside(expOut, outPlane.supremumMemberSpeed) && width(outPlane.supremumMemberSpeed) < 1e-12 && outPlane.supremumMemberSpeed[1] < outPlane.triangleBound[0]);
    // N7. ODE member-speed scan on WB-4 (centre at rest) over one radial period: max member speed -> h/(2 r_-).
    //     The sampled maximum lies BELOW the exact value by O(v omega^2 dt^2) (one-sided sampling bias); tolerance 1e-7 at dt = 2e-3.
    const scan = odeMemberSpeedScan(inv, [I(0), I(0), I(0)], mid(bo.period) * 1.02, 2e-3, mid(bo.period));
    rec('N7 ODE member-speed scan on WB-4 (V_c = 0): max over one radial period within 1e-7 below 0.6010407640, attained near r_- = 32/17 (measured; sampled max is biased low)', [0.601040764, 32 / 17], scan.maxOverRun, scan.maxOverRun.v1 <= 0.601040764 + 1e-12 && scan.maxOverRun.v1 > 0.601040764 - 1e-7 && Math.abs(scan.maxOverRun.r1 - 32 / 17) < 1e-4 && Math.abs(scan.maxOverRun.v2 - scan.maxOverRun.v1) < 1e-15);
  }
  return checks;
}

// ---------------------------------------------------------------- targets (withheld cases)
export function runTargets() {
  const Lw = lawConstants(FROZEN(-1)), Lz = lawConstants(ZERO(-1));
  const out = {};

  // WB-5: sigma=-1, apocentre release at x=3, tangential relative speed 0.9 of circular (v_c^2 = 2K/r = 2/3), rdot = 0
  {
    const r0 = I(3);
    const vt = mul(rat(9, 10), isqrt(rat(2, 3)));
    const h = mul(r0, vt);                         // h = 2.7 sqrt(2/3); h^2 = 243/50 exactly
    const hExact = isqrt(rat(243, 50));
    const hh = [Math.max(h[0], hExact[0]), Math.min(h[1], hExact[1])];
    const C = invariantC(Lw, r0, I(0), hh);        // = -119/150 exactly
    const bo = boundOrbit(Lw, C, hh, 128), bo2 = boundOrbit(Lw, C, hh, 256);
    const ode = reducedOdeEvolve({ sigma: -1, lambda: -0.5, mu: 1 }, { r: 3, rdot: 0, h: mid(hh) }, { dt: 1e-3, maxSteps: 2e6, event: (y) => y[1], maxEvents: 2 });
    const ode2 = reducedOdeEvolve({ sigma: -1, lambda: -0.5, mu: 1 }, { r: 3, rdot: 0, h: mid(hh) }, { dt: 5e-4, maxSteps: 4e6, event: (y) => y[1], maxEvents: 2 });
    out['WB-5'] = {
      preparation: 'sigma=-1, r0=3, rdot0=0, tangential relative speed 0.9*sqrt(2/3); h^2 = 243/50, C = -119/150; centre of velocity at rest',
      h: hh, hSq: sqr(hh), C, twoMemberEnergyFunction_CoverFour: scale(C, 0.25), D_at_r0: singularCoefficient(Lw, r0),
      exactTurningPoints: '243/119 and 3',
      turningPoints: { rMin: bo.rMin, rMax: bo.rMax }, radialPeriod: bo.period, apsidalAnglePeriToApo: bo.apsidal, apsidalAngleFullPerRadialPeriod: bo.apsidalFull,
      precessionPerRadialPeriod: bo.precessionPerRadialPeriod, relSpeedPeri: bo.relSpeedPeri, maxIndividualSpeed: bo.individualSpeedMaxCentreAtRest,
      fiveRadialPeriods: scale(bo.period, 5), certificate: bo.certificate,
      N256: { radialPeriod: bo2.period, apsidalAnglePeriToApo: bo2.apsidal },
      odeCheckMeasured: { dt1e3: { halfPeriod: ode.events[0].t, apsidalAtPeri: ode.events[0].y[2], period: ode.events[1].t, rAtPeri: ode.events[0].y[0] }, dt5e4: { halfPeriod: ode2.events[0].t, apsidalAtPeri: ode2.events[0].y[2], period: ode2.events[1].t, rAtPeri: ode2.events[0].y[0] } },
      speedDomains: 'all three (max individual speed below c_f)',
    };
    // WB-12: zero-coefficient control of WB-5
    const Cz = invariantC(Lz, r0, I(0), hh);
    const bz = boundOrbit(Lz, Cz, hh, 128);
    const a = scale(add(bz.rMin, bz.rMax), 0.5);
    const keplerPeriod = mul(scale(PI, 2), div(mul(a, isqrt(a)), isqrt(I(2)))); // 2 pi a^{3/2}/sqrt|G|, |G| = 2
    out['WB-12'] = {
      preparation: 'zero-coefficient control of WB-5 (lambda_W = mu_W = 0), same h and release',
      h: hh, C: Cz, turningPoints: { rMin: bz.rMin, rMax: bz.rMax }, radialPeriod: bz.period, keplerClosedFormPeriod: keplerPeriod,
      apsidalAnglePeriToApo: bz.apsidal, apsidalAngleFullPerRadialPeriod: bz.apsidalFull, precessionPerRadialPeriod: bz.precessionPerRadialPeriod,
      maxIndividualSpeed: bz.individualSpeedMaxCentreAtRest, fiveRadialPeriods: scale(bz.period, 5), certificate: bz.certificate,
      exactStatements: 'turning points identical to WB-5 (shared quadratic); apsidal angle pi exactly; period 2 pi a^{3/2}/sqrt(2) with a = 300/119',
    };
  }

  // WB-6: sigma=-1, radial release from rest at x = 2.5
  {
    const r0 = rat(5, 2);
    const rf = radialFate(Lw, r0, I(0));
    const toHalf = timeFromRestTo(Lw, r0, rat(5, 4));
    const toContact = timeFromRestTo(Lw, r0, I(0));
    const rdd0 = radialAccel(Lw, r0, I(0), I(0));
    // contact acceleration limit on this level: G (2 - C) / (2 (r - b)^2) at r = 0 -> -(2 - C)/4 in units K = c_f = 1
    const rddContact = div(mul(Lw.G, sub(I(2), rf.C)), scale(sqr(Lw.b), 2));
    // measured ODE second checks: event r = 1.25, then r = 1e-3 with quadratic tail
    const odeHalf = reducedOdeEvolve({ sigma: -1, lambda: -0.5, mu: 1 }, { r: 2.5, rdot: 0, h: 0 }, { dt: 1e-4, maxSteps: 2e6, event: (y) => y[0] - 1.25, maxEvents: 1 });
    const odeC = reducedOdeEvolve({ sigma: -1, lambda: -0.5, mu: 1 }, { r: 2.5, rdot: 0, h: 0 }, { dt: 1e-4, maxSteps: 2e6, event: (y) => y[0] - 1e-3, maxEvents: 1 });
    const e1 = odeC.events[0]; const rr = e1.y[0], vv = e1.y[1], aa = mid(radialAccel(Lw, I(rr), I(vv), I(0)));
    const tau = (-vv - Math.sqrt(vv * vv - 2 * aa * rr)) / aa;
    out['WB-6'] = {
      preparation: 'sigma=-1, r0 = 5/2, rdot0 = 0, h = 0; C = 2G/r0 = -8/5; centre of velocity at rest',
      C: rf.C, apocentre: rf.apocentre, D_at_r0: singularCoefficient(Lw, r0), fate: rf.fate,
      contactTime: rf.contactTime, contactTime_viaTimeFromRestTo: toContact.time,
      contactRelSpeed: rf.contactRelSpeed, contactIndividualSpeed: rf.contactIndividualSpeed,
      timeTo_x1p25: toHalf.time, rdotSq_at_x1p25: toHalf.rdotSqAtR, relSpeed_at_x1p25: toHalf.relSpeedAtR, individualSpeed_at_x1p25: scale(toHalf.relSpeedAtR, 0.5),
      launchRadialAcceleration: rdd0, contactRadialAccelerationLimit: rddContact,
      closedForm: 't_contact = sqrt(r0/4) (r0+2)/2 (pi - phi0 + sin phi0), cos phi0 = (r0-2)/(r0+2) = 1/9; t(x=1.25): cos phi1 = (mm - 1.25)/ww = -4/9, mm = 1/4, ww = 9/4',
      odeCheckMeasured: { timeTo_x1p25: odeHalf.events[0].t, rdotAt_x1p25: odeHalf.events[0].y[1], contactTime: e1.t + (Number.isFinite(tau) ? tau : rr / -vv), rdotAt_r1e3: vv },
      speedDomains: 'strict ceiling throughout (individual speed increases monotonically to 1/sqrt2 at contact)',
    };
  }

  // WB-7: WB-1 circle at x=4 plus member-1 velocity kick (0.005, 0, 0.01) and centre velocity (0.05, 0, 0)
  {
    const v = isqrt(rat(1, 8));                    // individual circular speed at x = 4
    const base = planarState(I(4), scale(v, 2));
    const kick = [rat(1, 200), I(0), rat(1, 100)], drift = [rat(1, 20), I(0), I(0)];
    // Reading A (primary): drift added to both members after the kick -> V_c = (0.0525, 0, 0.005)
    const V1A = vadd(vadd(base.V1, kick), drift), V2A = vadd(base.V2, drift);
    const inv = pairStateInvariants(Lw, base.X1, base.X2, V1A, V2A);
    const bo = boundOrbit(Lw, inv.C, inv.h, 128), bo2 = boundOrbit(Lw, inv.C, inv.h, 256);
    const inc = inclinationToPlane(inv.hhat);
    const supA = absoluteSpeedSupremum(inv, bo);
    // Reading B (alternative): centre velocity set to exactly (0.05, 0, 0) after the kick
    const supB = absoluteSpeedSupremum(inv, bo, [rat(1, 20), I(0), I(0)]);
    const orbitalPeriodWB1 = mul(scale(PI, 2), isqrt(I(32)));   // 2 pi / thetaDot, thetaDot = sqrt(2/64)
    const tRun = 20 * mid(orbitalPeriodWB1);
    const odeW7 = reducedOdeEvolve({ sigma: -1, lambda: -0.5, mu: 1 }, { r: mid(inv.r), rdot: mid(inv.rdot), h: mid(inv.h) }, { dt: 1e-3, maxSteps: 2e6, event: (y) => y[1], maxEvents: 3 });
    const scanA = odeMemberSpeedScan(inv, inv.Vc, tRun, 2e-3, mid(bo.period));
    const scanB = odeMemberSpeedScan(inv, [rat(1, 20), I(0), I(0)], tRun, 2e-3, mid(bo.period));
    out['WB-7'] = {
      preparation: 'WB-1 circle at x=4 assumed as X1 = (2,0,0), X2 = (-2,0,0), V1 = (0, sqrt(1/8), 0), V2 = -V1; then V1 += (0.005, 0, 0.01); then (reading A) both members += (0.05, 0, 0)',
      convention_note: 'relative-motion quantities depend only on R(0) along x and w(0) along y; if the subject used a different orientation of WB-1, re-evaluate pairStateInvariants on its actual state (mechanical, no new formula)',
      relative: {
        r0: inv.r, rdot0: inv.rdot, h: inv.h, hSq: inv.hSq, hVector: inv.hv, hHat: inv.hhat, C: inv.C, twoMemberEnergyFunction_CoverFour: scale(inv.C, 0.25), D_at_r0: inv.D,
        exact: 'h^2 = 8 + 0.0016 = 5001/625; rdot0 = +1/200; C = 3/80000 + 5001/10000 - 1 = -39989/80000',
        turningPoints: { rMin: bo.rMin, rMax: bo.rMax }, radialPeriod: bo.period, apsidalAnglePeriToApo: bo.apsidal, apsidalAngleFullPerRadialPeriod: bo.apsidalFull, precessionPerRadialPeriod: bo.precessionPerRadialPeriod,
        relSpeedPeri: bo.relSpeedPeri, relSpeedApo: div(inv.h, bo.rMax), certificate: bo.certificate, N256: { radialPeriod: bo2.period, apsidalAnglePeriToApo: bo2.apsidal },
        inclinationToOriginalPlane: inc,
        // start is just past pericentre (rdot0 > 0): events are apo, peri, apo; period = t(apo2) - t(apo1); apsidal = theta(peri) - theta(apo1)
        odeCheckMeasured: { dt: 1e-3, events: odeW7.events.map((e) => ({ kind: e.kind, t: e.t, r: e.y[0], theta: e.y[2] })), radialPeriod: odeW7.events[2].t - odeW7.events[0].t, apsidalApoToPeri: odeW7.events[1].y[2] - odeW7.events[0].y[2] },
      },
      readingA_driftAddedToBoth: { centreVelocity: inv.Vc, centreSpeed: inv.VcSpeed, ...supA, odeScanMeasured: scanA },
      readingB_centreSetTo0p05: { centreVelocity: [rat(1, 20), I(0), I(0)], ...supB, odeScanMeasured: scanB },
      wb1OrbitalPeriod: orbitalPeriodWB1, twentyOrbitalPeriods: scale(orbitalPeriodWB1, 20), radialPeriodsInRun: div(scale(orbitalPeriodWB1, 20), bo.period),
      speedDomains: 'all three under either reading (supremum of member speed below c_f)',
    };
  }
  return out;
}

// ---------------------------------------------------------------- CLI
const here = dirname(fileURLToPath(import.meta.url));
const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const mode = process.argv[2] ?? 'known';
  const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
  const fixedPath = resolve(here, 'weber-overnight-independent-reference.mjs');
  const selfPath = fileURLToPath(import.meta.url);
  const outDir = resolve(here, '../../../../../.local-data/master-equation-closure/weber-overnight/review');
  mkdirSync(outDir, { recursive: true });
  const meta = () => ({
    instrument: 'weber-overnight-independent-reference-withheld.mjs', importsFixedReference: 'weber-overnight-independent-reference.mjs',
    sha256: { 'weber-overnight-independent-reference.mjs': sha(fixedPath), 'weber-overnight-independent-reference-withheld.mjs': sha(selfPath) },
    node: process.version, generatedUtc: new Date().toISOString(),
    law: 'Section 9 instantaneous Weber-inspired pair, lambda=-1/2, mu=1, c_f=1, K=1; zero-coefficient control lambda=mu=0',
    units: 'lengths K/c_f^2, times K/c_f^3, speeds c_f; centre of velocity at rest unless a centre velocity is stated',
    certification: 'interval enclosures are certified for the stated formulas conditional on the fixed reference Section 3.2 (a),(b); fields named *Measured are floating second checks, not certified',
  });
  const checks = runKnownCases();
  const allPass = checks.every((c) => c.pass);
  const knownPath = resolve(outDir, 'withheld-reference-known-cases.json');
  writeFileSync(knownPath, JSON.stringify({ ...meta(), allPass, checks }, null, 2) + '\n');
  console.log(`known cases: ${checks.filter((c) => c.pass).length}/${checks.length} pass -> ${knownPath}`);
  for (const c of checks) if (!c.pass) console.log('FAIL', c.name, JSON.stringify(c.got));
  if (!allPass) { process.exitCode = 1; }
  else if (mode === 'targets') {
    const res = deep(runTargets());
    const path = resolve(outDir, 'withheld-reference-v1.json');
    writeFileSync(path, JSON.stringify({ ...meta(), knownCasesPassedFirst: { file: 'withheld-reference-known-cases.json', count: checks.length }, results: res }, null, 2) + '\n');
    console.log(`targets -> ${path}`);
  }
}
