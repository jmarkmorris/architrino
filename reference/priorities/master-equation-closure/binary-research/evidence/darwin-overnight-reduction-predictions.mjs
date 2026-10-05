#!/usr/bin/env node
// darwin-overnight reduction worker (lens emmy-noether), 2026-10-05.
// Closed-form predictions for the frozen Darwin-inspired functional (Section 10 box,
// unit weights, inverse-distance pair term, velocity coupling 1/(2 c_f^2), c_f = K = 1,
// no delays, no kinetic correction), isolated mirror pair.
// Run: node darwin-overnight-reduction-predictions.mjs   (prints a JSON table)
// Exports: lagrangian, hessianH, vectorG for general N (used by the spot-check script
// under .tmp/darwin-overnight/reduction/).  All formulas are derived in
// ../analysis/darwin-overnight-investigation.md.  Nothing here integrates an ODE.

// ---------- general-N closed forms (c_f = 1) ----------
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const scl = (s, a) => [s * a[0], s * a[1], s * a[2]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const norm = (a) => Math.sqrt(dot(a, a));

// L_D for positions X[i], velocities V[i] (arrays of 3-vectors), pair sign sigma(i,j), coupling K.
export function lagrangian(X, V, sigma, K = 1) {
  const N = X.length;
  let L = 0;
  for (let i = 0; i < N; i++) L += 0.5 * dot(V[i], V[i]);
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const d = sub(X[i], X[j]); const r = norm(d); const e = scl(1 / r, d); const s = sigma(i, j) * K;
    L += -s / r + (s / (2 * r)) * (dot(V[i], V[j]) + dot(V[i], e) * dot(V[j], e));
  }
  return L;
}

// Velocity Hessian H (3N x 3N): H_ii = I, H_ij = M_ij = (sigma K /(2 r_ij)) (I + e e^T). Velocity independent.
export function hessianH(X, sigma, K = 1) {
  const N = X.length; const H = Array.from({ length: 3 * N }, () => new Array(3 * N).fill(0));
  for (let i = 0; i < N; i++) for (let a = 0; a < 3; a++) H[3 * i + a][3 * i + a] = 1;
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const d = sub(X[i], X[j]); const r = norm(d); const e = scl(1 / r, d); const m = sigma(i, j) * K / (2 * r);
    for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) {
      const v = m * ((a === b ? 1 : 0) + e[a] * e[b]);
      H[3 * i + a][3 * j + b] = v; H[3 * j + b][3 * i + a] = v;
    }
  }
  return H;
}

// G (3N): G_i = dL/dX_i - sum_j (dM_ij/dT) V_j, so that H A = G are the Euler-Lagrange equations.
export function vectorG(X, V, sigma, K = 1) {
  const N = X.length; const G = Array.from({ length: N }, () => [0, 0, 0]);
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const d = sub(X[i], X[j]); const r = norm(d); const e = scl(1 / r, d); const s = sigma(i, j) * K;
    const vi = V[i], vj = V[j]; const vie = dot(vi, e), vje = dot(vj, e); const S = dot(vi, vj) + vie * vje;
    // position gradient of the pair terms with respect to X_i (X_j gets the negative)
    const gradPair = add(scl(s / (r * r) - s * S / (2 * r * r), e),
      scl(s / (2 * r * r), add(add(scl(vje, vi), scl(vie, vj)), scl(-2 * vie * vje, e))));
    // time derivative of M_ij applied to a velocity: dM/dT u = (s/2)[ -rdot/r^2 (u + (e.u) e) + (1/r^2)( w (e.u) + e (w.u) ) ]
    const vrel = sub(vi, vj); const rdot = dot(e, vrel); const w = sub(vrel, scl(rdot, e));
    const dMu = (u) => { const eu = dot(e, u); return scl(s / 2, add(scl(-rdot / (r * r), add(u, scl(eu, e))), scl(1 / (r * r), add(scl(eu, w), scl(dot(w, u), e))))); };
    G[i] = add(G[i], sub(gradPair, dMu(vj)));
    G[j] = add(G[j], sub(scl(-1, gradPair), dMu(vi)));
  }
  return G.flat();
}

// dense linear solve (Gaussian elimination with partial pivoting)
export function solve(Ain, bin) {
  const n = bin.length; const A = Ain.map((row) => row.slice()); const b = bin.slice();
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]]; [b[c], b[p]] = [b[p], b[c]];
    for (let r = c + 1; r < n; r++) { const f = A[r][c] / A[c][c]; for (let k = c; k < n; k++) A[r][k] -= f * A[c][k]; b[r] -= f * b[c]; }
  }
  const x = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) { let s = b[r]; for (let k = r + 1; k < n; k++) s -= A[r][k] * x[k]; x[r] = s / A[r][r]; }
  return x;
}

// ---------- reduced mirror problem (separation r, sigma = -1 target, +1 control) ----------
// L_red = (1/4) a(r) rdot^2 + (1/4) b(r) r^2 thdot^2 - sigma/r,  a = 1 - sigma/r,  b = 1 - sigma/(2r)
// ell = (1/2) b r^2 thdot,  E = (1/4) a rdot^2 + U_eff,  U_eff = ell^2/(b r^2) + sigma/r
const a_of = (r, s) => 1 - s / r;
const b_of = (r, s) => 1 - s / (2 * r);
const Ueff = (r, s, ell) => ell * ell / (b_of(r, s) * r * r) + s / r;

// tanh-sinh (double-exponential) quadrature on [lo, hi]; endpoint singularities of square-root type
// are integrated to round-off.  Endpoints themselves are never evaluated.  Non-finite samples are dropped.
function integrate(f, lo, hi, step = 1 / 64) {
  const c = (lo + hi) / 2, half = (hi - lo) / 2; let s = 0;
  for (let k = -2000; k <= 2000; k++) {
    const t = k * step; const u = (Math.PI / 2) * Math.sinh(t); const x = Math.tanh(u); const ch = Math.cosh(u);
    const w = (Math.PI / 2) * Math.cosh(t) / (ch * ch); if (w < 1e-300) continue;
    const xx = c + half * x; if (xx <= lo || xx >= hi) continue;
    const v = f(xx); if (Number.isFinite(v)) s += w * v;
  }
  return s * step * half;
}

// circle (sigma = -1): thdot^2 = 2/(r^2 (r + 1/4)); zero-coupling control thdot^2 = 2/r^3
export function circle(r0, coupled = true) {
  const s = -1;
  const thdot2 = coupled ? 2 / (r0 * r0 * (r0 + 0.25)) : 2 / (r0 ** 3);
  const thdot = Math.sqrt(thdot2); const u = 0.5 * r0 * thdot; const P = 2 * Math.PI / thdot;
  const b = coupled ? b_of(r0, s) : 1, a = coupled ? a_of(r0, s) : 1;
  const ell = 0.5 * b * r0 * r0 * thdot; const E = 0.25 * b * r0 * r0 * thdot2 + s / r0;
  const wr2 = coupled ? 16 / ((4 * r0 + 1) * (2 * r0 + 1) * (r0 + 1)) : 2 / r0 ** 3;
  const wr = Math.sqrt(wr2); const precession = 2 * Math.PI * (thdot / wr - 1);
  return { r0, angularRate: thdot, individualSpeed: u, period: P, energyLike: E, angularMomentum: ell, radialFrequency: wr, precessionPerRadialPeriod: precession, Kover_r: 1 / r0, a, b };
}

// eccentric bound orbit from (E, ell): apsides are roots of E r^2 + (1 + E/2) r + (1/2 - ell^2) = 0 (coupled),
// E r^2 + r - ell^2 = 0 (control).  Radial period and apsidal advance by the phi-substitution quadrature.
export function eccentric(E, ell, coupled = true) {
  const s = -1;
  const A = E, B = coupled ? 1 + E / 2 : 1, C = coupled ? 0.5 - ell * ell : -ell * ell;
  const disc = Math.sqrt(B * B - 4 * A * C);
  const roots = [(-B + disc) / (2 * A), (-B - disc) / (2 * A)].sort((p, q) => p - q);
  const [rp, ra] = roots;
  const aa = (r) => coupled ? a_of(r, s) : 1, bb = (r) => coupled ? b_of(r, s) : 1;
  const Tr = 2 * integrate((phi) => { const r = rp + (ra - rp) * Math.sin(phi) ** 2; return r * Math.sqrt(aa(r) * bb(r)) / Math.sqrt(-E); }, 0, Math.PI / 2);
  const dth = (4 * ell / Math.sqrt(-E)) * integrate((phi) => { const r = rp + (ra - rp) * Math.sin(phi) ** 2; return Math.sqrt(aa(r) / bb(r)) / r; }, 0, Math.PI / 2);
  return { pericentre: rp, apocentre: ra, radialPeriod: Tr, apsidalAdvancePerRadialPeriod: dth - 2 * Math.PI, energyLike: E, angularMomentum: ell };
}

// radial (ell = 0) histories: (1/4) a rdot^2 = E - sigma/r  =>  |rdot| = 2 sqrt((E - sigma/r)/a)
function radialTime(E, s, rFrom, rTo, coupled = true, turning = null) {
  const aa = (r) => coupled ? a_of(r, s) : 1;
  const speed = (r) => 2 * Math.sqrt(Math.max((E - s / r) / aa(r), 0));
  if (turning === null) return Math.abs(integrate((r) => 1 / speed(r), Math.min(rFrom, rTo), Math.max(rFrom, rTo)));
  // one endpoint is a turning point r_t (rdot = 0, E = sigma/r_t): substitute r = r_t + sgn t^2.  Then
  // E - sigma/r = sigma (r - r_t)/(r r_t) = t^2/(r r_t) exactly in every case used here, and the integrand
  // 2 t dt / |rdot| becomes sqrt(r r_t a(r)) dt, which is regular (no cancellation near the turning point).
  const other = rFrom === turning ? rTo : rFrom; const sgn = other > turning ? 1 : -1; const tmax = Math.sqrt(Math.abs(other - turning));
  return integrate((t) => { const r = turning + sgn * t * t; return Math.sqrt(r * turning * aa(r)); }, 0, tmax);
}
// closed form, opposite polarity rest release from r0 to r (derived in the investigation file)
export function restReleaseTimeClosed(r0, r) {
  const F = (phi) => (r0 + 1) * (phi - Math.sin(2 * phi) / 2);
  const phi = Math.asin(Math.sqrt((1 + r) / (r0 + 1)));
  return 0.5 * Math.sqrt(r0) * (F(Math.PI / 2) - F(phi));
}

export function predictions() {
  const out = { meta: { worker: 'darwin-overnight reduction', law: 'Section 10 box, unit weights, 1/(2c_f^2) coupling, c_f=K=1, instantaneous', polarityTarget: 'opposite (sigma=-1)', digits: 12 } };
  // --- known-case pass for the quadrature (zero-coupling control, closed forms) ---
  const r0 = 100;
  const ffClosed = Math.PI * r0 ** 1.5 / 4; // Kepler free-fall time, mirror pair, unit weights
  const ffQuad = radialTime(-1 / r0, -1, r0, 0, false, r0);
  const c0 = circle(r0, false);
  const u = 0.9 * c0.individualSpeed; const ell0 = r0 * u; const E0 = u * u - 1 / r0;
  const ecc0 = eccentric(E0, ell0, false);
  const A = 1 / (2 * -E0); const TrKepler = Math.PI * Math.SQRT2 * A ** 1.5;
  out.quadratureControl = { freeFall: { closed: ffClosed, quadrature: ffQuad, relErr: Math.abs(ffQuad - ffClosed) / ffClosed },
    eccentricKepler: { pericentreClosed: 2 * A - r0, pericentreQuad: ecc0.pericentre, apocentreQuad: ecc0.apocentre, radialPeriodClosed: TrKepler, radialPeriodQuad: ecc0.radialPeriod, relErr: Math.abs(ecc0.radialPeriod - TrKepler) / TrKepler, apsidalAdvanceQuad: ecc0.apsidalAdvancePerRadialPeriod } };
  // (a) circles
  out.a_circles = [25, 50, 100, 200, 400].map((r) => circle(r, true));
  // (b) eccentric mirror release at r0 = 100, tangential speed 0.9 of circular individual speed
  { const c = circle(100, true); const ue = 0.9 * c.individualSpeed; const b = b_of(100, -1);
    const ell = (100 + 0.5) * ue; const E = b * ue * ue - 1 / 100;
    const ecc = eccentric(E, ell, true); const up = ell / (b_of(ecc.pericentre, -1) * ecc.pericentre); // individual speed at pericentre (rdot = 0): u = r thdot/2 = ell/(b r)
    out.b_eccentric = { launchSeparation: 100, individualSpeed: ue, ...ecc, individualSpeedAtPericentre: up, Kover_r_atPericentre: 1 / ecc.pericentre }; }
  // (c) rest release from 100, opposite polarity
  { const E = -1 / 100; const s = -1;
    const t20 = radialTime(E, s, 100, 20, true, 100), t1 = radialTime(E, s, 100, 1, true, 100), t05 = radialTime(E, s, 100, 0.5, true, 100), t0 = radialTime(E, s, 100, 0, true, 100);
    const speedAt = (r) => Math.sqrt((E - s / r) / a_of(r, s));
    out.c_restReleaseOpposite = { timeTo_r20: t20, timeTo_r20_closed: restReleaseTimeClosed(100, 20), speedExitDomain_r: 49.5, timeTo_r49_5: radialTime(E, s, 100, 49.5, true, 100),
      firstSingularH_r: 1, timeTo_r1: t1, timeTo_r1_closed: restReleaseTimeClosed(100, 1), individualSpeedAt_r1: speedAt(1), secondSingularH_r: 0.5, timeTo_r05: t05, individualSpeedAt_r05: speedAt(0.5), timeToContact_reducedEquations: t0, timeToContact_closed: restReleaseTimeClosed(100, 0), individualSpeedLimitAtContact: 1 }; }
  // (d) rest release from 100, same polarity
  { const E = 1 / 100; const s = 1;
    out.d_restReleaseSame = { asymptoticIndividualSpeed: Math.sqrt(E), timeTo_r200: radialTime(E, s, 100, 200, true, 100), control_timeTo_r200: radialTime(E, s, 100, 200, false, 100) }; }
  // (e) same polarity head-on from 100 with individual speeds 0.05
  { const s = 1, rdot = -0.1; const E = 0.25 * a_of(100, s) * rdot * rdot + 1 / 100; const rmin = 1 / E;
    out.e_headOnSame = { energyLike: E, minimumSeparation: rmin, timeToTurningPoint: radialTime(E, s, 100, rmin, true, rmin), control_minimumSeparation: 1 / (0.25 * rdot * rdot + 0.01) }; }
  // (f) opposite polarity head-on from 100 with individual speeds 0.02
  { const s = -1, rdot = -0.04; const E = 0.25 * a_of(100, s) * rdot * rdot - 1 / 100;
    out.f_headOnOpposite = { energyLike: E, timeTo_r20: radialTime(E, s, 100, 20, true), timeTo_r1: radialTime(E, s, 100, 1, true), individualSpeedAt_r1: Math.sqrt((E + 1) / a_of(1, s)) }; }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify(predictions(), (k, v) => (typeof v === 'number' ? Number(v.toPrecision(14)) : v), 2));
}
