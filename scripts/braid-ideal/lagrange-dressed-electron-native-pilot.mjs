// Native Lagrange-docked co-rotating dressed-electron seed pilot (jh15 / spec
// Section 89).
//
// GOAL. Build the SPIN-CARRYING dressed electron and test whether it dissolves
// the Section 84-88 bare-core no-gos. The new reduction: dock the six-electrino
// payload (6 epsilon_-, net -1e) at the CO-ROTATING-FRAME LAGRANGE POINTS of the
// three V5 binaries -- two electrinos per binary at that binary's L4/L5-analog
// triangular points -- rather than the jh14 (Section 88) spinless on-axis column.
// Off-axis docking (rho > 0) gives the payload nonzero orbital angular momentum
// J_pay != 0 BY CONSTRUCTION: the property jh14 proved is required to reach the
// gyroscopic sector G that drives the Section 86 axis flutter.
//
// THE LAGRANGE REDUCTION. Each V5 binary is the +/- co-rotating pair of one
// layer (I, M, O). For a like-charge test electrino (pol = -1) co-rotating with
// the assembly at omega, its equilibria in the binary's co-rotating frame are the
// points where the delayed two-body wake plus the centrifugal term net to zero:
//   residual(X) = kappa* * wake_from_binary(X) - kinAccel_centripetal(X) = 0.
// The residual field is invariant under reflection through the plane spanned by
// z-hat and the member azimuth (both binary members lie in that plane), so every
// off-plane equilibrium comes as a mirror PAIR -- the L4/L5-analog docking sites.
//
// DISCIPLINE. SEED GRADE. Coarse pilot only; NO native force-free release is
// authorized here. The central solver (src/solver/app/AbsoluteHistoryRootRuntime.mjs)
// AND the base instruments (spindle-braid-screw-drift-evaluator.mjs,
// spindle-support-ratio-targeted-search.mjs) are UNTOUCHED: this runner only
// IMPORTS their exports (buildBraid / wakeAccel / residuals / supportRatios /
// tangentialLedger / gyroscopicTiltAnalysisFull / SELF_EQUILIBRATED_V5) and adds
// the 12-site, net-charged, co-rotating build and readback. NOT evidence; names
// no retained branch; authorizes no acceptance. Fail-closed.
//
// HONESTY GUARD. The Lagrange placement is an ANSATZ. This pilot reports (i)
// whether stable/usable binary Lagrange points exist, (ii) whether the 12-site
// dressed object closes its radial+tangential ledgers at one coupling, and (iii)
// whether the spin-carrying payload DISSOLVES or merely INHERITS the Section 86
// flutter. If no stable Lagrange point exists, it also reports the declared
// fallback: a generic co-rotating shell at matched J_pay.

import { fileURLToPath } from "node:url";
import {
  buildBraid, wakeAccel, residuals,
} from "./spindle-braid-screw-drift-evaluator.mjs";
import {
  supportRatios, tangentialLedger, gyroscopicTiltAnalysisFull,
  SELF_EQUILIBRATED_V5, SEA_BOOKING_S50,
} from "./spindle-support-ratio-targeted-search.mjs";

export const SCHEMA = "lagrange_dressed_electron_native_pilot.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-angular-momentum-spin/lagrange-dressed-electron-native-pilot-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  claimLevel: "seed_grade_coarse_pilot_no_native_release",
  authority: "priority_only_prescribed_worldline_evaluator_not_native_solver_not_accepted_evidence",
});

const SOFT = 0.02;

// ===========================================================================
// Small pure kinematic mirrors (base evaluator does not export these; identical
// 3-line worldline forms replicated here so the base file stays untouched).
// Evaluated at T = 0 unless a cadence average is taken explicitly.
// ===========================================================================
function posAt(s, w, T = 0) {
  const a = w * T + s.th, ca = Math.cos(s.alpha);
  return [s.sgn * s.R * ca * Math.cos(a), s.sgn * s.R * ca * Math.sin(a), s.sgn * s.R * Math.sin(s.alpha)];
}
function velAt(s, w, T = 0) {
  const a = w * T + s.th, v = s.sgn * s.R * Math.cos(s.alpha) * w;
  return [-v * Math.sin(a), v * Math.cos(a), 0];
}
function kinAccel(s, w, T = 0) {
  const a = w * T + s.th, k = s.sgn * s.R * Math.cos(s.alpha) * w * w;
  return [-k * Math.cos(a), -k * Math.sin(a), 0];
}
// Encode an arbitrary Cartesian point (co-rotating at omega) as a {R,alpha,th,sgn}
// worldline so wakeAccel treats it uniformly.
function siteFromPos(name, x, y, z, pol) {
  const R = Math.hypot(x, y, z) || 1e-12;
  return { name, R, alpha: Math.asin(Math.max(-1, Math.min(1, z / R))), th: Math.atan2(y, x), sgn: +1, pol };
}
function omegaOf(geo) { return buildBraid({ u: 0, geo }).omega; }
function kappaOf(geo) { return residuals({ u: 0, geo }, { soft: SOFT }).kappaStar; }

// ===========================================================================
// STEP 1 -- Binary Lagrange points.
// For a chosen binary (the +/- pair of one layer) at the V5 geometry, find the
// co-rotating-frame equilibria of a like-charge test electrino and their linear
// stability WITH Coriolis (the stabilizing/destabilizing rotating-frame term).
// ===========================================================================

function binaryMembers(layer, geo) {
  return buildBraid({ u: 0, geo }).sites.filter((s) => s.name === layer);
}

// Effective residual field (rotating frame): kappa*wake(from the two members) minus
// the centripetal kinematic need of a test electrino co-rotating at omega.
function lagrangeResidual(members, X, { w, kap, pol = -1 } = {}) {
  const test = siteFromPos("T", X[0], X[1], X[2], pol);
  const mini = { omega: w, u: 0, sea: [], sites: [...members, test] };
  const wk = wakeAccel(mini, members.length, 0, { soft: SOFT }).a;
  const kin = kinAccel(test, w);
  return [kap * wk[0] - kin[0], kap * wk[1] - kin[1], kap * wk[2] - kin[2]];
}

function residualJacobian(members, X, ctx, h = 1e-5) {
  const J = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (let j = 0; j < 3; j++) {
    const Xp = [...X], Xm = [...X]; Xp[j] += h; Xm[j] -= h;
    const rp = lagrangeResidual(members, Xp, ctx), rm = lagrangeResidual(members, Xm, ctx);
    for (let i = 0; i < 3; i++) J[i][j] = (rp[i] - rm[i]) / (2 * h);
  }
  return J;
}

function solve3(A, b) {
  const M = [[...A[0], b[0]], [...A[1], b[1]], [...A[2], b[2]]];
  for (let c = 0; c < 3; c++) {
    let p = c; for (let r = c + 1; r < 3; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (Math.abs(M[p][c]) < 1e-14) return null;
    [M[p], M[c]] = [M[c], M[p]];
    for (let r = 0; r < 3; r++) { if (r === c) continue; const f = M[r][c] / M[c][c]; for (let k = c; k < 4; k++) M[r][k] -= f * M[c][k]; }
  }
  return [M[0][3] / M[0][0], M[1][3] / M[1][1], M[2][3] / M[2][2]];
}

function newtonEquilibrium(members, X0, ctx, iters = 60) {
  let X = [...X0];
  for (let it = 0; it < iters; it++) {
    const r = lagrangeResidual(members, X, ctx);
    if (Math.hypot(...r) < 1e-9) return { X, ok: true };
    const J = residualJacobian(members, X, ctx);
    const dX = solve3(J, r.map((v) => -v));
    if (!dX) return { X, ok: false };
    const dn = Math.hypot(...dX);
    const step = dn > 0.25 ? 0.25 / dn : 1;
    X = [X[0] + step * dX[0], X[1] + step * dX[1], X[2] + step * dX[2]];
    if (Math.hypot(...X) > 6) return { X, ok: false };
  }
  return { X, ok: Math.hypot(...lagrangeResidual(members, X, ctx)) < 1e-6 };
}

// ---- complex helpers + Durand-Kerner (real 6x6 -> char poly via
// Faddeev-LeVerrier -> roots). Used for the Coriolis-inclusive stability.
const cAdd = (a, b) => [a[0] + b[0], a[1] + b[1]];
const cSub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const cMul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cDiv = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
const cAbs = (a) => Math.hypot(a[0], a[1]);

function polyRoots(coeffs) {
  const deg = coeffs.length - 1;
  const P = (x) => { let s = [0, 0]; for (let i = 0; i <= deg; i++) s = cAdd(cMul(s, x), [coeffs[i], 0]); return s; };
  let roots = Array.from({ length: deg }, (_, i) => { const ang = 2 * Math.PI * i / deg + 0.4; return [1.2 * Math.cos(ang), 1.2 * Math.sin(ang)]; });
  for (let it = 0; it < 600; it++) {
    let mv = 0;
    for (let i = 0; i < deg; i++) {
      let den = [1, 0];
      for (let j = 0; j < deg; j++) if (j !== i) den = cMul(den, cSub(roots[i], roots[j]));
      const d = cDiv(P(roots[i]), den); roots[i] = cSub(roots[i], d); mv = Math.max(mv, cAbs(d));
    }
    if (mv < 1e-13) break;
  }
  return roots;
}

// Coriolis-inclusive linear stability of a rotating-frame equilibrium: the
// linearized system is y' = A y with y = (dr, dv),
//   A = [[0, I], [J_G, C]],   C = -2 Omega x (.),  Omega = omega z-hat,
// J_G = Jacobian of the residual field (wake stiffness minus centrifugal Hessian).
// Coriolis is what stabilizes classical triangular points; its inclusion is
// mandatory for an honest verdict.
function rotatingFrameStability(J_G, w) {
  const C = [[0, 2 * w, 0], [-2 * w, 0, 0], [0, 0, 0]]; // -2 Omega x v
  const A = Array.from({ length: 6 }, () => Array(6).fill(0));
  for (let i = 0; i < 3; i++) A[i][3 + i] = 1;
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { A[3 + i][j] = J_G[i][j]; A[3 + i][3 + j] = C[i][j]; }
  // Faddeev-LeVerrier char poly (monic, degree 6)
  const n = 6;
  let Mk = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  const c = new Array(n + 1).fill(0); c[0] = 1;
  for (let k = 1; k <= n; k++) {
    const AM = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { let s = 0; for (let l = 0; l < n; l++) s += A[i][l] * Mk[l][j]; AM[i][j] = s; }
    let tr = 0; for (let i = 0; i < n; i++) tr += AM[i][i];
    c[k] = -tr / k;
    Mk = AM.map((row, i) => row.map((v, j) => v + (i === j ? c[k] : 0)));
  }
  const roots = polyRoots(c);
  const maxRe = Math.max(...roots.map((r) => r[0]));
  return { maxRe, stable: maxRe < 1e-4, eigs: roots.map((r) => ({ re: +r[0].toFixed(4), im: +r[1].toFixed(4) })) };
}

// Classify an equilibrium as collinear (in the member azimuthal plane) or
// triangular (off it). The member azimuthal plane is spanned by z-hat and the
// horizontal radial direction of the binary; a point is "in plane" if its
// azimuth matches the member azimuth (mod pi).
function classifyEquilibrium(X, memberTh) {
  const az = Math.atan2(X[1], X[0]);
  let dAz = az - memberTh;
  while (dAz > Math.PI / 2) dAz -= Math.PI;
  while (dAz < -Math.PI / 2) dAz += Math.PI;
  const rho = Math.hypot(X[0], X[1]);
  return { azimuthDeg: +(az * 180 / Math.PI).toFixed(2), offPlaneDeg: +(dAz * 180 / Math.PI).toFixed(2),
    type: (Math.abs(dAz) < 3 * Math.PI / 180 || rho < 0.05) ? "collinear" : "triangular" };
}

export function binaryLagrangePoints({ layer = "M", geo = SELF_EQUILIBRATED_V5.geo } = {}) {
  const w = omegaOf(geo), kap = kappaOf(geo);
  const ctx = { w, kap, pol: -1 };
  const members = binaryMembers(layer, geo);
  const memberTh = members[0].th;
  const seeds = [];
  for (const R of [0.25, 0.5, 0.75, 1.0, 1.3, 1.7])
    for (let ai = 0; ai < 3; ai++) { const al = (-45 + ai * 45) * Math.PI / 180;
      for (let ti = 0; ti < 8; ti++) { const th = ti * Math.PI / 4; seeds.push([R * Math.cos(al) * Math.cos(th), R * Math.cos(al) * Math.sin(th), R * Math.sin(al)]); } }
  const eqs = [];
  for (const s of seeds) {
    const res = newtonEquilibrium(members, s, ctx);
    if (!res.ok) continue;
    if (eqs.some((e) => Math.hypot(e.X[0] - res.X[0], e.X[1] - res.X[1], e.X[2] - res.X[2]) < 0.02)) continue;
    const J = residualJacobian(members, res.X, ctx);
    const st = rotatingFrameStability(J, w);
    const cls = classifyEquilibrium(res.X, memberTh);
    eqs.push({ X: res.X.map((v) => +v.toFixed(4)), rho: +Math.hypot(res.X[0], res.X[1]).toFixed(4), z: +res.X[2].toFixed(4),
      type: cls.type, azimuthDeg: cls.azimuthDeg, offPlaneDeg: cls.offPlaneDeg,
      residual: +Math.hypot(...lagrangeResidual(members, res.X, ctx)).toFixed(8),
      maxReCoriolis: +st.maxRe.toFixed(4), stable: st.stable });
  }
  eqs.sort((a, b) => b.rho - a.rho);
  const triangular = eqs.filter((e) => e.type === "triangular");
  // The rotating causal wake has a HANDEDNESS: the reflection through the member
  // azimuthal plane reverses the sense of rotation, so the delayed field is NOT
  // mirror-symmetric and there is no exact L4/L5 degeneracy. The "two per binary"
  // docking sites are therefore the two genuine (distinct) co-rotating-frame
  // equilibria the search locates -- typically one triangular-analog (larger rho)
  // and one near-axis/collinear-analog. Both carry rho > 0, hence J_pay != 0.
  const dockTwo = eqs.slice(0, 2).map((e) => ({ X: e.X, rho: e.rho, z: e.z, type: e.type, azimuthDeg: e.azimuthDeg, residual: e.residual, maxReCoriolis: e.maxReCoriolis, stable: e.stable }));
  // witness the broken mirror symmetry: reflect the outermost equilibrium and
  // report the (nonzero) residual of its mirror image.
  let mirrorWitness = null;
  if (eqs.length) {
    const t = eqs[0], azMirror = 2 * memberTh - Math.atan2(t.X[1], t.X[0]);
    const partner = [t.rho * Math.cos(azMirror), t.rho * Math.sin(azMirror), t.z];
    mirrorWitness = { mirrorResidual: +Math.hypot(...lagrangeResidual(members, partner, ctx)).toFixed(6), mirrorSymmetric: false };
  }
  return {
    layer, omega: +w.toFixed(6), kappaStar: +kap.toFixed(6), memberAzimuthDeg: +(memberTh * 180 / Math.PI).toFixed(2),
    memberRho: +(members[0].R * Math.cos(members[0].alpha)).toFixed(4),
    equilibria: eqs, triangularCount: triangular.length,
    anyStable: eqs.some((e) => e.stable),
    dockTwo, mirrorWitness,
  };
}

// ===========================================================================
// STEP 2 -- Dock the payload at the L4/L5-analog triangular pairs.
// Two electrinos per binary (6 epsilon_-, net -1e). Declared ansatz. Falls back
// to a per-binary near-axis point only if no triangular pair exists.
// ===========================================================================

// Docking sites at the V5 geometry: the TWO genuine co-rotating-frame equilibria
// located per binary by binaryLagrangePoints (one triangular-analog, one
// near-axis/collinear-analog). Stored as explicit Cartesian points so the build
// is deterministic and cheap; regenerate with --lagrange. Both sites have rho > 0
// so the payload carries J_pay != 0. There is no exact L4/L5 mirror pair (the
// rotating causal wake is not mirror-symmetric).
export const LAGRANGE_DOCK_V5 = Object.freeze({
  I: Object.freeze([Object.freeze([0.6675, -0.6676, -0.2692]), Object.freeze([-0.0516, 0.2172, -0.8636])]),
  M: Object.freeze([Object.freeze([-0.1410, 1.3451, 0.2850]), Object.freeze([-0.1102, -0.0688, 1.1266])]),
  O: Object.freeze([Object.freeze([0.5090, -0.6451, 0.7124]), Object.freeze([-0.1441, 0.3605, 0.8376])]),
});

export const LAGRANGE_DRESSED_ANSATZ = Object.freeze({
  geo: SELF_EQUILIBRATED_V5.geo,
  dock: LAGRANGE_DOCK_V5,
  dockScale: 1.0,   // uniform radial scale on the docking rho (search knob)
  drop: false,      // regression switch: true -> bare scaffold only
});

export function buildLagrangeDressedElectron({ geo = LAGRANGE_DRESSED_ANSATZ.geo, dock = LAGRANGE_DOCK_V5, dockScale = 1.0, drop = false, cTrans = 1.0 } = {}) {
  const base = buildBraid({ u: 0, cTrans, geo });
  const scaffoldIdx = [0, 1, 2, 3, 4, 5];
  const payload = [];
  const payloadLayer = [];
  if (!drop) {
    for (const L of ["I", "M", "O"]) {
      for (const P of dock[L]) {
        // dockScale dilates the horizontal radius (search knob); z fixed.
        const x = dockScale * P[0], y = dockScale * P[1], z = P[2];
        // encode as a co-rotating site with name = parent layer L (shares tilt DOF)
        payload.push(siteFromPos(L, x, y, z, -1));
        payloadLayer.push(L);
      }
    }
  }
  const payloadIdx = payload.map((_, k) => scaffoldIdx.length + k);
  const sites = [...base.sites, ...payload];
  return {
    omega: base.omega, u: 0, sea: [], sites,
    scaffoldIdx, payloadIdx, payloadLayer, scaffoldReps: [0, 2, 4],
    netCharge: sites.reduce((s, x) => s + x.pol, 0),
  };
}

// Payload orbital angular momentum L_z = sum rho^2 * omega (unit weight; the same
// bookkeeping the tilt block uses for J = 2 rho^2 omega). J_pay != 0 iff any
// payload electrino sits off-axis (rho > 0). This is the property jh14 lacked.
export function payloadAngularMomentum({ geo = LAGRANGE_DRESSED_ANSATZ.geo, dock = LAGRANGE_DOCK_V5, dockScale = 1.0 } = {}) {
  const dressed = buildLagrangeDressedElectron({ geo, dock, dockScale });
  const w = dressed.omega;
  let Lz = 0, Lz2 = 0;
  for (const i of dressed.payloadIdx) {
    const s = dressed.sites[i];
    const p = posAt(s, w), v = velAt(s, w);
    Lz += (p[0] * v[1] - p[1] * v[0]);       // r x v, z-component
    Lz2 += 2 * (s.R * Math.cos(s.alpha)) ** 2 * w; // tilt-block J convention (2 rho^2 w)
  }
  return { payloadLz: +Lz.toFixed(6), payloadTiltBlockJ: +Lz2.toFixed(6), coRotating: Math.abs(Lz) > 1e-9 };
}

// ===========================================================================
// STEP 3 + GATE (a) -- self-consistent radial + tangential closure at ONE
// coupling, computed with the payload-inclusive wake, plus payload docking
// residual and the J_pay verification.
// ===========================================================================
function dressedKappa(dressed, soft = SOFT) {
  let num = 0, den = 0;
  for (const i of dressed.scaffoldReps) {
    const s = dressed.sites[i];
    const kin = kinAccel(s, dressed.omega);
    const wk = wakeAccel(dressed, i, 0, { soft }).a;
    for (let c = 0; c < 3; c++) { num += kin[c] * wk[c]; den += wk[c] * wk[c]; }
  }
  return num / den;
}

export function dressedSupportLedger({ geo = LAGRANGE_DRESSED_ANSATZ.geo, dock = LAGRANGE_DOCK_V5, dockScale = 1.0, drop = false, soft = SOFT, Nt = 12 } = {}) {
  const dressed = buildLagrangeDressedElectron({ geo, dock, dockScale, drop });
  const w = dressed.omega;
  const kap = dressedKappa(dressed, soft);
  const layers = [];
  for (const i of dressed.scaffoldReps) {
    const s = dressed.sites[i];
    const rhoCyl = s.R * Math.cos(s.alpha);
    const rx = Math.cos(s.th), ry = Math.sin(s.th);
    const tx = -Math.sin(s.th), ty = Math.cos(s.th);
    const wk = wakeAccel(dressed, i, 0, { soft }).a;
    const inward = -(wk[0] * rx + wk[1] * ry);
    const need = w * w * rhoCyl;
    const tanRow = kap * (wk[0] * tx + wk[1] * ty);
    layers.push({ layer: s.name, support: (kap * inward) / need, tanRow });
  }
  const ratios = Object.fromEntries(layers.map((l) => [l.layer, l.support]));
  const tanRows = Object.fromEntries(layers.map((l) => [l.layer, l.tanRow]));

  // payload docking residual: cycle-averaged effective force on each electrino at
  // kappa* (the docked site is a true equilibrium iff this nulls). Unlike the
  // on-axis column, the payload here is OFF-AXIS, so all three components matter.
  const period = 2 * Math.PI / w;
  const docking = [];
  for (const p of dressed.payloadIdx) {
    const s = dressed.sites[p];
    const rho = s.R * Math.cos(s.alpha);
    let f = [0, 0, 0];
    for (let n = 0; n < Nt; n++) {
      const T = (n / Nt) * period;
      const wk = wakeAccel(dressed, p, T, { soft }).a;
      const kin = kinAccel(s, w, T);
      f[0] += kap * wk[0] - kin[0]; f[1] += kap * wk[1] - kin[1]; f[2] += kap * wk[2] - kin[2];
    }
    const resid = Math.hypot(f[0] / Nt, f[1] / Nt, f[2] / Nt);
    docking.push({ site: s.name, rho: +rho.toFixed(4), residual: +resid.toFixed(5) });
  }
  const led = tangentialLedger({ ratios, tanRows }, { seaO: SEA_BOOKING_S50.seaO, capTan: SEA_BOOKING_S50.capTan });
  const dockImbalance = docking.length ? Math.max(...docking.map((d) => d.residual)) : 0;
  const angmom = payloadAngularMomentum({ geo, dock, dockScale });
  return {
    kappaStar: +kap.toFixed(6), ratios, tanRows,
    minRatio: Math.min(...layers.map((l) => l.support)),
    maxAbsTan: Math.max(...layers.map((l) => Math.abs(l.tanRow))),
    ledgerCloses: led.ledgerCloses, ledgerTotalO: +led.totalO.toFixed(4),
    docking, dockImbalance: +dockImbalance.toFixed(5),
    payloadLz: angmom.payloadLz, coRotating: angmom.coRotating,
    netCharge: dressed.netCharge,
    closes: led.ledgerCloses && dockImbalance < 0.05,
  };
}

// ===========================================================================
// GATE (b, pump) -- net z-torque on the scaffold, bare vs dressed. Unlike the
// on-axis column, the off-axis co-rotating payload carries a DIRECT z-torque.
// ===========================================================================
export function dressedAxialPump({ geo = LAGRANGE_DRESSED_ANSATZ.geo, dock = LAGRANGE_DOCK_V5, dockScale = 1.0, soft = SOFT } = {}) {
  const zTorque = (dressed, idxList, kap) => {
    let tz = 0;
    for (const i of idxList) {
      const s = dressed.sites[i];
      const p = posAt(s, dressed.omega);
      const F = wakeAccel(dressed, i, 0, { soft }).a;
      tz += kap * (p[0] * F[1] - p[1] * F[0]);
    }
    return tz;
  };
  const bare = buildLagrangeDressedElectron({ geo, drop: true });
  const dressed = buildLagrangeDressedElectron({ geo, dock, dockScale });
  const kapBare = dressedKappa(bare, soft);
  const kapDressed = dressedKappa(dressed, soft);
  const bareScaffoldTz = zTorque(bare, bare.scaffoldIdx, kapBare);
  const dressedScaffoldTz = zTorque(dressed, dressed.scaffoldIdx, kapDressed);
  const payloadOwnTz = zTorque(dressed, dressed.payloadIdx, kapDressed);
  const payloadContribution = dressedScaffoldTz - bareScaffoldTz;
  const rel = Math.abs(bareScaffoldTz) > 1e-12 ? payloadContribution / bareScaffoldTz : null;
  let verdict = "negligible";
  if (rel !== null) {
    if (rel < -0.05) verdict = "cancels";
    else if (rel > 0.05) verdict = "adds";
    else if (Math.abs(rel) > 1e-6) verdict = "reroutes_small";
  }
  return {
    bareScaffoldZTorque: +bareScaffoldTz.toFixed(6),
    dressedScaffoldZTorque: +dressedScaffoldTz.toFixed(6),
    payloadOwnZTorque: +payloadOwnTz.toFixed(6),
    payloadContribution: +payloadContribution.toFixed(6),
    relativeToBare: rel === null ? null : +rel.toFixed(4),
    verdict,
    note: "single-time (T=0) z-torque proxy; off-axis payload carries a direct z-torque (unlike the Section 88 on-axis column).",
  };
}

// ===========================================================================
// GATE (b, flutter) -- the Section 86 axis flutter, via a 12-SITE extension of
// the gyroscopic tilt pencil. The payload electrinos are docked to their parent
// binary and tilt WITH it (rigid-dressed-layer reduction), so the pencil keeps
// 6 tilt DOF (3 layers x 2 axes) but every per-layer inertia m_L, spin J_L, pump
// Gamma_L, and stiffness K comes from ALL 12 sites. Because the payload is
// OFF-AXIS and co-rotating, it augments the gyroscopic spin J_L != added-inertia-
// only (the sector jh14's on-axis column could not touch).
//   P(lambda) = lambda^2 M6 + lambda (G6 - D6) + (Gamma6 - K6).
// This reuses the exact torque/stiffness conventions of gyroscopicTiltAnalysisFull
// (untouched) but sums the causal wake over the full 12-site inventory.
// ===========================================================================
export function twelveSiteTiltPencil({ geo = LAGRANGE_DRESSED_ANSATZ.geo, dock = LAGRANGE_DOCK_V5, dockScale = 1.0, Nt = 8, soft = SOFT, dmax = 4, Ngrid = 2400, eta = 0.03, etaDot = 0.02, drop = false, dampScale = 1, circScale = 1, symK = false, flywheelSpin = 0, flywheelInertia = 0, flywheelLayers = null } = {}) {
  // dampScale/circScale: backward-compatible DIAGNOSTIC knobs (default 1 = exact
  // shipped behavior). dampScale multiplies the velocity-derivative torque matrix
  // D6t (the wake's rate-dependent, damping-flavored response); circScale
  // multiplies the steady follower-torque circulatory term Gam6 (tau0). Setting
  // dampScale -> 0 tests the Ziegler destabilization paradox directly (does an
  // infinitesimal amount of non-conservative velocity coupling discontinuously
  // raise maxRe above its undamped value?); circScale -> 0 tests whether the
  // steady follower-force circulatory torque is the flutter driver.
  // flywheelSpin (signed): a docked axial rigid-rotor spin added to each layer's
  // gyroscopic block of G6 (thread 38(b): counter-rotating flywheel = negative
  // flywheelSpin, opposing the layers' co-rotating +J). flywheelInertia adds the
  // rotor's transverse tilt inertia to M6 (default 0 = massless-gyro idealization).
  // flywheelLayers: array subset of ["I","M","O"] to dock to (default all three).
  // Tests Bottema/Bolotin gyroscopic stabilization of the circulatory K6 flutter.
  const dressed = buildLagrangeDressedElectron({ geo, dock, dockScale, drop });
  const seed = buildBraid({ u: 0, geo });
  const w = seed.omega, period = 2 * Math.PI / w;
  const kap = dressedKappa(dressed, soft);
  const cf = 1;
  const layerName = ["I", "M", "O"];
  const Lidx = (nm) => layerName.indexOf(nm);
  // Per-layer augmented inertia m_L and spin J_L over ALL sites of that layer.
  // Normalization matches gyroscopicTiltAnalysisFull (untouched): the base uses
  // one representative per binary for M/G while summing torques (K/Gamma) over
  // all physical sites. Weighting every physical site by 0.5 in M/G reproduces
  // the base scaffold EXACTLY (2 members x 0.5 = 1 representative) and folds the
  // 2-per-binary payload in consistently, while torques below stay full-weight.
  const m = [0, 0, 0], J = [0, 0, 0];
  for (const s of dressed.sites) {
    const L = Lidx(s.name); if (L < 0) continue;
    const rho = s.R * Math.cos(s.alpha), z = s.R * Math.sin(s.alpha);
    m[L] += 0.5 * (rho * rho + 2 * z * z);
    J[L] += 0.5 * (2 * rho * rho * w);
  }
  const rotX = (v, c, s) => [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]];
  const rotY = (v, c, s) => [c * v[0] + s * v[2], v[1], -s * v[0] + c * v[2]];
  const crossX = (v) => [0, -v[2], v[1]];
  const crossY = (v) => [v[2], 0, -v[0]];
  // worldline family: each site's parent layer tilt (ex,ey) about x then y, exact
  // velocity including rotation-rate terms. Payload sites share their parent layer
  // index, so they rigidly track that binary's tilt.
  const mk = (ex, ey, exDot, eyDot, tRef) => dressed.sites.map((s) => {
    const L = Lidx(s.name);
    const p0 = (t) => posAt(s, w, t);
    const v0 = (t) => velAt(s, w, t);
    return {
      pol: s.pol, L,
      pos: (t) => { const ax = ex[L] + exDot[L] * (t - tRef), ay = ey[L] + eyDot[L] * (t - tRef); return rotY(rotX(p0(t), Math.cos(ax), Math.sin(ax)), Math.cos(ay), Math.sin(ay)); },
      vel: (t) => {
        const ax = ex[L] + exDot[L] * (t - tRef), ay = ey[L] + eyDot[L] * (t - tRef);
        const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
        const pX = rotX(p0(t), cx, sx);
        const t1 = crossY(rotY(pX, cy, sy)).map((v) => eyDot[L] * v);
        const t2 = rotY(crossX(pX).map((v) => exDot[L] * v), cy, sy);
        const t3 = rotY(rotX(v0(t), cx, sx), cy, sy);
        return [t1[0] + t2[0] + t3[0], t1[1] + t2[1] + t3[1], t1[2] + t2[2] + t3[2]];
      },
    };
  });
  const torques = (ex, ey, exDot, eyDot, perSampleRef) => {
    const Tx = [0, 0, 0], Ty = [0, 0, 0], Tz = [0, 0, 0];
    for (let k = 0; k < Nt; k++) {
      const t = (k / Nt) * period;
      const sites = mk(ex, ey, exDot, eyDot, perSampleRef ? t : 0);
      for (let i = 0; i < sites.length; i++) {
        const rec = sites[i];
        const Xi = rec.pos(t), vi = rec.vel(t);
        const F = [0, 0, 0];
        for (let j = 0; j < sites.length; j++) {
          if (j === i) continue;
          const src = sites[j];
          const g = (te) => { const p = src.pos(te); return Math.hypot(Xi[0] - p[0], Xi[1] - p[1], Xi[2] - p[2]) - cf * (t - te); };
          let g0 = g(t - dmax);
          for (let kk = 1; kk <= Ngrid; kk++) {
            const te = t - dmax + dmax * (kk / Ngrid);
            if (te >= t - 1e-9) break;
            const g1 = g(te);
            if ((g0 < 0) !== (g1 < 0)) {
              let lo = t - dmax + dmax * ((kk - 1) / Ngrid), hi = te; const gl = g(lo);
              for (let b = 0; b < 50; b++) { const mid = (lo + hi) / 2; if ((gl < 0) === (g(mid) < 0)) lo = mid; else hi = mid; }
              const te0 = (lo + hi) / 2, p = src.pos(te0);
              const dx = [Xi[0] - p[0], Xi[1] - p[1], Xi[2] - p[2]], r = Math.hypot(dx[0], dx[1], dx[2]);
              if (r > 1e-9) {
                const rh = [dx[0] / r, dx[1] / r, dx[2] / r], vs = src.vel(te0);
                const Ds = cf - (vs[0] * rh[0] + vs[1] * rh[1] + vs[2] * rh[2]);
                const Dt = cf - (vi[0] * rh[0] + vi[1] * rh[1] + vi[2] * rh[2]);
                const mfac = (Dt * Ds) / (Ds * Ds + soft * soft), wgt = (rec.pol * src.pol) * mfac / (r * r);
                F[0] += wgt * rh[0]; F[1] += wgt * rh[1]; F[2] += wgt * rh[2];
              }
            }
            g0 = g1;
          }
        }
        Tx[rec.L] += kap * (Xi[1] * F[2] - Xi[2] * F[1]) / Nt;
        Ty[rec.L] += kap * (Xi[2] * F[0] - Xi[0] * F[2]) / Nt;
        Tz[rec.L] += kap * (Xi[0] * F[1] - Xi[1] * F[0]) / Nt;
      }
    }
    return { Tx, Ty, Tz };
  };
  const Z = [0, 0, 0];
  const base = torques(Z, Z, Z, Z, false);
  const tau0 = base.Tz.slice();
  const A = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], B = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  const Dx = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], E = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (let j = 0; j < 3; j++) {
    const ep = [0, 0, 0], em = [0, 0, 0]; ep[j] = eta; em[j] = -eta;
    const px = torques(ep, Z, Z, Z, false), mx = torques(em, Z, Z, Z, false);
    const py = torques(Z, ep, Z, Z, false), my = torques(Z, em, Z, Z, false);
    for (let i = 0; i < 3; i++) {
      A[i][j] = (px.Tx[i] - mx.Tx[i]) / (2 * eta);
      Dx[i][j] = (px.Ty[i] - mx.Ty[i]) / (2 * eta);
      B[i][j] = (py.Tx[i] - my.Tx[i]) / (2 * eta);
      E[i][j] = (py.Ty[i] - my.Ty[i]) / (2 * eta);
    }
  }
  const P = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], Q = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  const Rl = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], S = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (let j = 0; j < 3; j++) {
    const rp = [0, 0, 0], rm = [0, 0, 0]; rp[j] = etaDot; rm[j] = -etaDot;
    const px = torques(Z, Z, rp, Z, true), mx = torques(Z, Z, rm, Z, true);
    const py = torques(Z, Z, Z, rp, true), my = torques(Z, Z, Z, rm, true);
    for (let i = 0; i < 3; i++) {
      P[i][j] = (px.Tx[i] - mx.Tx[i]) / (2 * etaDot);
      Rl[i][j] = (px.Ty[i] - mx.Ty[i]) / (2 * etaDot);
      Q[i][j] = (py.Tx[i] - my.Tx[i]) / (2 * etaDot);
      S[i][j] = (py.Ty[i] - my.Ty[i]) / (2 * etaDot);
    }
  }
  // assemble the 6x6 pencil (same layout as gyroscopicTiltAnalysisFull)
  let K6 = [...[0, 1, 2].map((i) => [...A[i], ...B[i]]), ...[0, 1, 2].map((i) => [...Dx[i], ...E[i]])];
  // symK: backward-compatible DIAGNOSTIC knob (default false = exact shipped
  // behavior). When true, replace K6 by its symmetric part (K+K^T)/2, removing
  // the circulatory (non-conservative) content carried by the ASYMMETRY of the
  // positional tilt-stiffness Jacobian. If the flutter vanishes under symK, the
  // instability is driven by the stiffness asymmetry (a follower/circulatory
  // effect baked into the delayed-wake tilt coupling), not by a statically
  // unstable conservative stiffness.
  if (symK) K6 = K6.map((row, i) => row.map((v, j) => 0.5 * (v + K6[j][i])));
  const D6t = [...[0, 1, 2].map((i) => [...P[i], ...Q[i]]), ...[0, 1, 2].map((i) => [...Rl[i], ...S[i]])];
  // flywheel dock mask: which layers carry the added rotor spin/inertia
  const flyMask = [0, 1, 2].map((l) => (flywheelLayers ? (flywheelLayers.includes(["I", "M", "O"][l]) ? 1 : 0) : 1));
  const M6 = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) => (i === j ? m[i % 3] + flywheelInertia * flyMask[i % 3] : 0)));
  const G6 = Array.from({ length: 6 }, () => Array(6).fill(0));
  for (let l = 0; l < 3; l++) { const Jl = J[l] + flywheelSpin * flyMask[l]; G6[l][3 + l] = +Jl; G6[3 + l][l] = -Jl; }
  const Gam6 = Array.from({ length: 6 }, () => Array(6).fill(0));
  for (let l = 0; l < 3; l++) { Gam6[l][3 + l] = +tau0[l]; Gam6[3 + l][l] = -tau0[l]; }
  const Cvel = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) => G6[i][j] - dampScale * D6t[i][j]));
  // Durand-Kerner on det P(lambda), degree 12
  const detC = (Min) => {
    const n = Min.length, Mx = Min.map((r) => r.map((v) => [v[0], v[1]]));
    let det = [1, 0];
    for (let c = 0; c < n; c++) {
      let p = c; for (let r = c + 1; r < n; r++) if (cAbs(Mx[r][c]) > cAbs(Mx[p][c])) p = r;
      if (cAbs(Mx[p][c]) < 1e-300) return [0, 0];
      if (p !== c) { const t = Mx[p]; Mx[p] = Mx[c]; Mx[c] = t; det = cMul(det, [-1, 0]); }
      det = cMul(det, Mx[c][c]);
      for (let r = c + 1; r < n; r++) { const f = cDiv(Mx[r][c], Mx[c][c]); for (let cc = c; cc < n; cc++) Mx[r][cc] = cSub(Mx[r][cc], cMul(f, Mx[c][cc])); }
    }
    return det;
  };
  const pencil = (lam) => {
    const l2 = cMul(lam, lam), Pm = [];
    for (let i = 0; i < 6; i++) { Pm.push([]); for (let j = 0; j < 6; j++) Pm[i].push(cAdd(cAdd(cMul(l2, [M6[i][j], 0]), cMul(lam, [Cvel[i][j], 0])), [circScale * Gam6[i][j] - K6[i][j], 0])); }
    return detC(Pm);
  };
  const leading = M6[0][0] * M6[1][1] * M6[2][2] * M6[3][3] * M6[4][4] * M6[5][5];
  const deg2 = 12;
  const scale = Math.max(...A.flat().map(Math.abs), ...B.flat().map(Math.abs));
  const Jaug = [0, 1, 2].map((l) => Math.abs(J[l] + flywheelSpin * flyMask[l]));
  const mDiag = [0, 1, 2].map((l) => m[l] + flywheelInertia * flyMask[l]);
  let roots = Array.from({ length: deg2 }, (_, i) => { const ang = 2 * Math.PI * i / deg2 + 0.4; const rad = 1.5 * Math.max(Math.sqrt(scale / Math.min(...mDiag)), Math.max(...Jaug) / Math.min(...mDiag)); return [rad * Math.cos(ang), rad * Math.sin(ang)]; });
  let dkResidual = Infinity;
  for (let it = 0; it < 400; it++) {
    let moved = 0;
    for (let i = 0; i < deg2; i++) {
      let denom = [leading, 0];
      for (let j = 0; j < deg2; j++) if (j !== i) denom = cMul(denom, cSub(roots[i], roots[j]));
      const delta = cDiv(pencil(roots[i]), denom); roots[i] = cSub(roots[i], delta); moved = Math.max(moved, cAbs(delta));
    }
    dkResidual = moved; if (moved < 1e-13) break;
  }
  // K6 asymmetry diagnostic: Frobenius norms of the symmetric and antisymmetric
  // parts of the (possibly symK-processed) tilt-stiffness. k6AsymNorm > 0 measures
  // the circulatory (non-conservative) content carried by K6's asymmetry.
  let k6SymSq = 0, k6AsymSq = 0;
  for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) {
    const sPart = 0.5 * (K6[i][j] + K6[j][i]), aPart = 0.5 * (K6[i][j] - K6[j][i]);
    k6SymSq += sPart * sPart; k6AsymSq += aPart * aPart;
  }
  const rootRows = roots.map((r) => ({ re: r[0], im: r[1] })).sort((x, y) => y.re - x.re);
  const byMag = [...rootRows].sort((x, y) => Math.hypot(x.re, x.im) - Math.hypot(y.re, y.im));
  const globalPair = byMag.slice(0, 2);
  const deflated = rootRows.filter((r) => !globalPair.includes(r));
  const growing = deflated.filter((r) => r.re > 1e-6);
  const maxGrowth = deflated.length ? deflated[0] : null;
  return {
    perLayerInertia: m.map((v) => +v.toFixed(4)), perLayerSpinJ: J.map((v) => +v.toFixed(4)),
    tau0: tau0.map((v) => +v.toFixed(4)), kappaStar: +kap.toFixed(6), dkResidual: +dkResidual.toExponential(2),
    k6SymNorm: +Math.sqrt(k6SymSq).toFixed(4), k6AsymNorm: +Math.sqrt(k6AsymSq).toFixed(4),
    k6AsymFraction: k6SymSq + k6AsymSq > 0 ? +Math.sqrt(k6AsymSq / (k6SymSq + k6AsymSq)).toFixed(4) : 0,
    eigenvalues: rootRows.map((r) => ({ re: +r.re.toFixed(4), im: +r.im.toFixed(4) })),
    flutter: growing.length > 0,
    maxGrowthRate: maxGrowth ? +maxGrowth.re.toFixed(5) : null,
    maxGrowthWhirlFrequency: maxGrowth ? +Math.abs(maxGrowth.im).toFixed(5) : null,
  };
}

// ===========================================================================
// PER-SITE tilt pencil (thread 38(b) escalation to per-site internal-deformation
// freedom, 2026-07-12). Generalizes twelveSiteTiltPencil's 6 per-LAYER tilt DOF
// to per-SITE tilt DOF: each of the bare braid's 6 architrinos tilts its OWN
// orbital plane independently (2 axes each -> 12 DOF). The rigid-layer pencil is
// the Galerkin restriction onto the subspace where each +/- pair tilts together
// (T-projection below); comparing the FULL per-site maxRe to that RESTRICTED
// maxRe tests whether freeing the internal (layer-deformation) DOF relaxes the
// follower-force K asymmetry that the rigid family leaves standing.
//
// Convention: HALF-WEIGHT per-site inertia/spin (m_i=0.5(rho^2+2z^2),
// J_i=0.5*2 rho^2 w) with FULL-WEIGHT per-site torques, so the pair-sum
// (rigid restriction) reproduces twelveSiteTiltPencil's representative-weighted
// m[L]/J[L] and full torques EXACTLY -- the restricted maxRe is a bit-exact
// validation against 0.19886 (champion). The full-vs-restricted comparison is
// convention-independent.
export function perSiteTiltPencil({ geo = SELF_EQUILIBRATED_V5.geo, Nt = 8, soft = SOFT, dmax = 4, Ngrid = 2400, eta = 0.03, etaDot = 0.02, dampScale = 1, circScale = 1 } = {}) {
  const braid = buildLagrangeDressedElectron({ geo, drop: true }); // 6 bare sites
  const sites0 = braid.sites;
  const seed = buildBraid({ u: 0, geo });
  const w = seed.omega, period = 2 * Math.PI / w, cf = 1;
  const kap = dressedKappa(braid, soft);
  const n = sites0.length; // 6
  const m = sites0.map((s) => 0.5 * ((s.R * Math.cos(s.alpha)) ** 2 + 2 * (s.R * Math.sin(s.alpha)) ** 2));
  const J = sites0.map((s) => 0.5 * (2 * (s.R * Math.cos(s.alpha)) ** 2 * w));
  const rotX = (v, c, s) => [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]];
  const rotY = (v, c, s) => [c * v[0] + s * v[2], v[1], -s * v[0] + c * v[2]];
  const crossX = (v) => [0, -v[2], v[1]];
  const crossY = (v) => [v[2], 0, -v[0]];
  // per-site tilt worldlines: site i tilted by (ex_i, ey_i) about x then y.
  const mk = (ex, ey, exDot, eyDot, tRef) => sites0.map((s, i) => {
    const p0 = (t) => posAt(s, w, t), v0 = (t) => velAt(s, w, t);
    return {
      pol: s.pol, i,
      pos: (t) => { const ax = ex[i] + exDot[i] * (t - tRef), ay = ey[i] + eyDot[i] * (t - tRef); return rotY(rotX(p0(t), Math.cos(ax), Math.sin(ax)), Math.cos(ay), Math.sin(ay)); },
      vel: (t) => {
        const ax = ex[i] + exDot[i] * (t - tRef), ay = ey[i] + eyDot[i] * (t - tRef);
        const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
        const pX = rotX(p0(t), cx, sx);
        const t1 = crossY(rotY(pX, cy, sy)).map((v) => eyDot[i] * v);
        const t2 = rotY(crossX(pX).map((v) => exDot[i] * v), cy, sy);
        const t3 = rotY(rotX(v0(t), cx, sx), cy, sy);
        return [t1[0] + t2[0] + t3[0], t1[1] + t2[1] + t3[1], t1[2] + t2[2] + t3[2]];
      },
    };
  });
  const torques = (ex, ey, exDot, eyDot, perSampleRef) => {
    const Tx = new Array(n).fill(0), Ty = new Array(n).fill(0), Tz = new Array(n).fill(0);
    for (let k = 0; k < Nt; k++) {
      const t = (k / Nt) * period;
      const S = mk(ex, ey, exDot, eyDot, perSampleRef ? t : 0);
      for (let i = 0; i < S.length; i++) {
        const rec = S[i], Xi = rec.pos(t), vi = rec.vel(t), F = [0, 0, 0];
        for (let j = 0; j < S.length; j++) {
          if (j === i) continue;
          const src = S[j];
          const g = (te) => { const p = src.pos(te); return Math.hypot(Xi[0] - p[0], Xi[1] - p[1], Xi[2] - p[2]) - cf * (t - te); };
          let g0 = g(t - dmax);
          for (let kk = 1; kk <= Ngrid; kk++) {
            const te = t - dmax + dmax * (kk / Ngrid);
            if (te >= t - 1e-9) break;
            const g1 = g(te);
            if ((g0 < 0) !== (g1 < 0)) {
              let lo = t - dmax + dmax * ((kk - 1) / Ngrid), hi = te; const gl = g(lo);
              for (let b = 0; b < 50; b++) { const mid = (lo + hi) / 2; if ((gl < 0) === (g(mid) < 0)) lo = mid; else hi = mid; }
              const te0 = (lo + hi) / 2, p = src.pos(te0);
              const dx = [Xi[0] - p[0], Xi[1] - p[1], Xi[2] - p[2]], r = Math.hypot(dx[0], dx[1], dx[2]);
              if (r > 1e-9) {
                const rh = [dx[0] / r, dx[1] / r, dx[2] / r], vs = src.vel(te0);
                const Ds = cf - (vs[0] * rh[0] + vs[1] * rh[1] + vs[2] * rh[2]);
                const Dt = cf - (vi[0] * rh[0] + vi[1] * rh[1] + vi[2] * rh[2]);
                const mfac = (Dt * Ds) / (Ds * Ds + soft * soft), wgt = (rec.pol * src.pol) * mfac / (r * r);
                F[0] += wgt * rh[0]; F[1] += wgt * rh[1]; F[2] += wgt * rh[2];
              }
            }
            g0 = g1;
          }
        }
        Tx[i] += kap * (Xi[1] * F[2] - Xi[2] * F[1]) / Nt;
        Ty[i] += kap * (Xi[2] * F[0] - Xi[0] * F[2]) / Nt;
        Tz[i] += kap * (Xi[0] * F[1] - Xi[1] * F[0]) / Nt;
      }
    }
    return { Tx, Ty, Tz };
  };
  const Z = new Array(n).fill(0);
  const base = torques(Z, Z, Z, Z, false);
  const tau0 = base.Tz.slice();
  const A = [], B = [], Dx = [], E = [], Pp = [], Qp = [], Rp = [], Sp = [];
  for (let i = 0; i < n; i++) { A.push(new Array(n).fill(0)); B.push(new Array(n).fill(0)); Dx.push(new Array(n).fill(0)); E.push(new Array(n).fill(0)); Pp.push(new Array(n).fill(0)); Qp.push(new Array(n).fill(0)); Rp.push(new Array(n).fill(0)); Sp.push(new Array(n).fill(0)); }
  for (let j = 0; j < n; j++) {
    const ep = Z.slice(), em = Z.slice(); ep[j] = eta; em[j] = -eta;
    const px = torques(ep, Z, Z, Z, false), mx = torques(em, Z, Z, Z, false);
    const py = torques(Z, ep, Z, Z, false), my = torques(Z, em, Z, Z, false);
    for (let i = 0; i < n; i++) { A[i][j] = (px.Tx[i] - mx.Tx[i]) / (2 * eta); Dx[i][j] = (px.Ty[i] - mx.Ty[i]) / (2 * eta); B[i][j] = (py.Tx[i] - my.Tx[i]) / (2 * eta); E[i][j] = (py.Ty[i] - my.Ty[i]) / (2 * eta); }
    const rp = Z.slice(), rm = Z.slice(); rp[j] = etaDot; rm[j] = -etaDot;
    const rpx = torques(Z, Z, rp, Z, true), rmx = torques(Z, Z, rm, Z, true);
    const rpy = torques(Z, Z, Z, rp, true), rmy = torques(Z, Z, Z, rm, true);
    for (let i = 0; i < n; i++) { Pp[i][j] = (rpx.Tx[i] - rmx.Tx[i]) / (2 * etaDot); Rp[i][j] = (rpx.Ty[i] - rmx.Ty[i]) / (2 * etaDot); Qp[i][j] = (rpy.Tx[i] - rmy.Tx[i]) / (2 * etaDot); Sp[i][j] = (rpy.Ty[i] - rmy.Ty[i]) / (2 * etaDot); }
  }
  // assemble 12x12 (2n) matrices: DOF order [ex_0..ex_5, ey_0..ey_5]
  const N2 = 2 * n;
  const M2 = Array.from({ length: N2 }, (_, i) => Array.from({ length: N2 }, (_, j) => (i === j ? m[i % n] : 0)));
  const G2 = Array.from({ length: N2 }, () => new Array(N2).fill(0));
  for (let i = 0; i < n; i++) { G2[i][n + i] = +J[i]; G2[n + i][i] = -J[i]; }
  const Gam2 = Array.from({ length: N2 }, () => new Array(N2).fill(0));
  for (let i = 0; i < n; i++) { Gam2[i][n + i] = +tau0[i]; Gam2[n + i][i] = -tau0[i]; }
  const K2 = Array.from({ length: N2 }, () => new Array(N2).fill(0));
  const D2 = Array.from({ length: N2 }, () => new Array(N2).fill(0));
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    K2[i][j] = A[i][j]; K2[i][n + j] = B[i][j]; K2[n + i][j] = Dx[i][j]; K2[n + i][n + j] = E[i][j];
    D2[i][j] = Pp[i][j]; D2[i][n + j] = Qp[i][j]; D2[n + i][j] = Rp[i][j]; D2[n + i][n + j] = Sp[i][j];
  }
  const Cvel = Array.from({ length: N2 }, (_, i) => Array.from({ length: N2 }, (_, j) => G2[i][j] - dampScale * D2[i][j]));
  const Kdyn = Array.from({ length: N2 }, (_, i) => Array.from({ length: N2 }, (_, j) => circScale * Gam2[i][j] - K2[i][j]));
  // rigid-pair restriction matrix T (12x6): pairs (0,1),(2,3),(4,5) for ex and ey.
  const nDofR = n; // 6
  const T = Array.from({ length: N2 }, () => new Array(nDofR).fill(0));
  for (let L = 0; L < 3; L++) { T[2 * L][L] = 1; T[2 * L + 1][L] = 1; T[n + 2 * L][3 + L] = 1; T[n + 2 * L + 1][3 + L] = 1; }
  const TtAT = (Mm) => { const AT = Array.from({ length: N2 }, () => new Array(nDofR).fill(0)); for (let i = 0; i < N2; i++) for (let c = 0; c < nDofR; c++) { let s = 0; for (let k = 0; k < N2; k++) s += Mm[i][k] * T[k][c]; AT[i][c] = s; } const R = Array.from({ length: nDofR }, () => new Array(nDofR).fill(0)); for (let r = 0; r < nDofR; r++) for (let c = 0; c < nDofR; c++) { let s = 0; for (let k = 0; k < N2; k++) s += T[k][r] * AT[k][c]; R[r][c] = s; } return R; };
  const asymFrac = (Mm) => { let sS = 0, aS = 0; const dd = Mm.length; for (let i = 0; i < dd; i++) for (let j = 0; j < dd; j++) { const sp = 0.5 * (Mm[i][j] + Mm[j][i]), ap = 0.5 * (Mm[i][j] - Mm[j][i]); sS += sp * sp; aS += ap * ap; } return sS + aS > 0 ? Math.sqrt(aS / (sS + aS)) : 0; };
  const full = solvePencilMaxRe(M2, Cvel, Kdyn, N2);
  const rigid = solvePencilMaxRe(TtAT(M2), TtAT(Cvel), TtAT(Kdyn), nDofR);
  return {
    omega: +w.toFixed(5), kappaStar: +kap.toFixed(6),
    rigidRestrictedMaxRe: rigid.maxRe, rigidWhirl: rigid.whirl, rigidDk: rigid.dk,
    fullPerSiteMaxRe: full.maxRe, fullWhirl: full.whirl, fullDk: full.dk,
    k6AsymFraction_rigid: +asymFrac(TtAT(K2)).toFixed(4),
    k12AsymFraction_full: +asymFrac(K2).toFixed(4),
    internalDofRelaxesFlutter: full.maxRe !== null && rigid.maxRe !== null && full.maxRe < rigid.maxRe - 1e-4,
    fullStabilized: full.maxRe !== null && full.maxRe <= 1e-4,
    note: "per-site tilt pencil (12 DOF); rigid restriction (T-projection onto +/- pair subspace) validates against twelveSiteTiltPencil; full = each pair's internal tilt freed.",
  };
}

// det(lam^2 M + lam C + K) = 0 via Durand-Kerner on the determinant; returns the
// deflated (2 global-rotation zero modes removed) max real part.
function solvePencilMaxRe(Mm, Cm, Km, dof) {
  const detC = (Min) => {
    const nn = Min.length, Mx = Min.map((r) => r.map((v) => [v[0], v[1]]));
    let det = [1, 0];
    for (let c = 0; c < nn; c++) {
      let p = c; for (let r = c + 1; r < nn; r++) if (cAbs(Mx[r][c]) > cAbs(Mx[p][c])) p = r;
      if (cAbs(Mx[p][c]) < 1e-300) return [0, 0];
      if (p !== c) { const t = Mx[p]; Mx[p] = Mx[c]; Mx[c] = t; det = cMul(det, [-1, 0]); }
      det = cMul(det, Mx[c][c]);
      for (let r = c + 1; r < nn; r++) { const f = cDiv(Mx[r][c], Mx[c][c]); for (let cc = c; cc < nn; cc++) Mx[r][cc] = cSub(Mx[r][cc], cMul(f, Mx[c][cc])); }
    }
    return det;
  };
  const pen = (lam) => { const l2 = cMul(lam, lam), Pm = []; for (let i = 0; i < dof; i++) { Pm.push([]); for (let j = 0; j < dof; j++) Pm[i].push(cAdd(cAdd(cMul(l2, [Mm[i][j], 0]), cMul(lam, [Cm[i][j], 0])), [Km[i][j], 0])); } return detC(Pm); };
  let leading = 1; for (let i = 0; i < dof; i++) leading *= Mm[i][i];
  const deg = 2 * dof;
  const scale = Math.max(1e-6, ...Km.flat().map(Math.abs));
  const mMin = Math.min(...Mm.map((r, i) => r[i]));
  let roots = Array.from({ length: deg }, (_, i) => { const ang = 2 * Math.PI * i / deg + 0.4; const rad = 1.5 * Math.max(Math.sqrt(scale / mMin), 1); return [rad * Math.cos(ang), rad * Math.sin(ang)]; });
  let dk = Infinity;
  for (let it = 0; it < 600; it++) { let mv = 0; for (let i = 0; i < deg; i++) { let den = [leading, 0]; for (let j = 0; j < deg; j++) if (j !== i) den = cMul(den, cSub(roots[i], roots[j])); const dl = cDiv(pen(roots[i]), den); roots[i] = cSub(roots[i], dl); mv = Math.max(mv, cAbs(dl)); } dk = mv; if (mv < 1e-13) break; }
  const rr = roots.map((r) => ({ re: r[0], im: r[1] })).sort((x, y) => y.re - x.re);
  const byMag = [...rr].sort((x, y) => Math.hypot(x.re, x.im) - Math.hypot(y.re, y.im));
  const gp = byMag.slice(0, 2);
  const defl = rr.filter((r) => !gp.includes(r));
  const mg = defl.length ? defl[0] : null;
  return { maxRe: mg ? +mg.re.toFixed(5) : null, whirl: mg ? +Math.abs(mg.im).toFixed(5) : null, dk: +dk.toExponential(2) };
}

export function lagrangeTiltFlutter({ geo = LAGRANGE_DRESSED_ANSATZ.geo, dock = LAGRANGE_DOCK_V5, dockScale = 1.0, Nt = 8, Ngrid = 2400, soft = SOFT, validate = true } = {}) {
  const bare = gyroscopicTiltAnalysisFull({ geo, soft });
  // validation row: my 12-site pencil with the payload DROPPED must reproduce the
  // base gyroscopicTiltAnalysisFull growth rate (at the coarse cadence), certifying
  // the evaluator so the dressed number is trustworthy.
  const barePencil = validate ? twelveSiteTiltPencil({ geo, dockScale, Nt, Ngrid, soft, drop: true }) : null;
  const dressed = twelveSiteTiltPencil({ geo, dock, dockScale, Nt, Ngrid, soft, drop: false });
  const bareRe = bare.maxGrowthRate;
  const dressedRe = dressed.maxGrowthRate;
  let verdict;
  if (bareRe === null || bareRe <= 1e-4) verdict = "no_bare_flutter";
  else if (dressedRe === null || dressedRe <= 1e-4) verdict = "dissolved";
  else if (dressedRe < 0.5 * bareRe) verdict = "strongly_damped_not_dissolved";
  else if (dressedRe < bareRe) verdict = "damped_not_dissolved";
  else verdict = "not_helped";
  const pencilBareValidation = barePencil ? {
    barePencilMaxGrowthRate: barePencil.maxGrowthRate,
    baseInstrumentMaxGrowthRate: bareRe === null ? null : +bareRe.toFixed(5),
    agreesWithBaseInstrument: barePencil.maxGrowthRate !== null && bareRe !== null && Math.abs(barePencil.maxGrowthRate - bareRe) < 0.03,
  } : null;
  return {
    bareMaxGrowthRate: bareRe === null ? null : +bareRe.toFixed(5),
    bareWhirlFrequency: bare.maxGrowthWhirlFrequency === null ? null : +bare.maxGrowthWhirlFrequency.toFixed(5),
    pencilBareValidation,
    dressedMaxGrowthRate: dressedRe,
    dressedWhirlFrequency: dressed.maxGrowthWhirlFrequency,
    perLayerSpinJ_bare: barePencil ? barePencil.perLayerSpinJ : null, perLayerSpinJ_dressed: dressed.perLayerSpinJ,
    perLayerInertia_dressed: dressed.perLayerInertia,
    payloadEntersGyroscopicSector: dressed.perLayerSpinJ.some((jj, i) => Math.abs(jj) > 1e-9),
    dressedTau0: dressed.tau0,
    verdict,
    enteredG_but_verdict: verdict,
    note: "12-site rigid-dressed-layer pencil (payload tilts with its parent binary): 6 tilt DOF, all inertia/spin/pump/stiffness summed over the full 12-site inventory at coarse cadence (Nt/Ngrid). Independent payload-tilt DOF deferred (native run).",
  };
}

// ===========================================================================
// GATE (c) -- magnetic moment from the circulating charge. mu = 1/2 sum q (r x v)
// over the payload (the neutral scaffold's +/- pairs cancel). A nonzero mu_z is
// the observable jh14's spinless column lacked. Reported with the orbital
// gyromagnetic ratio; g approx 2 is a separate spin-structure claim (qualitative).
// ===========================================================================
export function magneticMoment({ geo = LAGRANGE_DRESSED_ANSATZ.geo, dock = LAGRANGE_DOCK_V5, dockScale = 1.0 } = {}) {
  const dressed = buildLagrangeDressedElectron({ geo, dock, dockScale });
  const w = dressed.omega;
  const muOf = (idxList) => {
    let mu = [0, 0, 0];
    for (const i of idxList) {
      const s = dressed.sites[i], p = posAt(s, w), v = velAt(s, w);
      const rxv = [p[1] * v[2] - p[2] * v[1], p[2] * v[0] - p[0] * v[2], p[0] * v[1] - p[1] * v[0]];
      mu[0] += 0.5 * s.pol * rxv[0]; mu[1] += 0.5 * s.pol * rxv[1]; mu[2] += 0.5 * s.pol * rxv[2];
    }
    return mu;
  };
  const muPay = muOf(dressed.payloadIdx);
  const muScaffold = muOf(dressed.scaffoldIdx);
  // mechanical orbital angular momentum of the payload (unit weight), z-component
  let Lz = 0; for (const i of dressed.payloadIdx) { const s = dressed.sites[i], p = posAt(s, w), v = velAt(s, w); Lz += p[0] * v[1] - p[1] * v[0]; }
  const qPay = dressed.payloadIdx.reduce((s2, i) => s2 + dressed.sites[i].pol, 0);
  // orbital g-analog: mu_z = g_orb * (q/2) * L_z  => g_orb = mu_z / ((q/2) L_z)
  const gOrbital = Math.abs(Lz) > 1e-9 ? muPay[2] / ((qPay / dressed.payloadIdx.length / 2) * Lz) : null;
  return {
    payloadMagneticMomentZ: +muPay[2].toFixed(6), payloadMagneticMoment: muPay.map((v) => +v.toFixed(6)),
    scaffoldMagneticMomentZ: +muScaffold[2].toFixed(6),
    payloadMechanicalLz: +Lz.toFixed(6),
    orbitalGFactorAnalog: gOrbital === null ? null : +gOrbital.toFixed(4),
    momentNonzero: Math.abs(muPay[2]) > 1e-9,
    note: "circulating co-rotating charge sources a magnetic moment (mu_z != 0); scaffold +/- pairs cancel. Orbital circulation gives g_orb ~ 1; g approx 2 requires the spin structure, not orbital payload alone -- a qualitative gap, reported honestly.",
  };
}

// ===========================================================================
// GATE (d) -- the EM/photon channel and leading multipole. Net charge (monopole),
// payload axial dipole, and payload quadrupole (over the co-rotating snapshot).
// ===========================================================================
export function dressedEMChannel({ geo = LAGRANGE_DRESSED_ANSATZ.geo, dock = LAGRANGE_DOCK_V5, dockScale = 1.0 } = {}) {
  const dressed = buildLagrangeDressedElectron({ geo, dock, dockScale });
  const w = dressed.omega;
  let q = 0; for (const s of dressed.sites) q += s.pol;
  let dvec = [0, 0, 0], qzz = 0;
  for (const i of dressed.payloadIdx) {
    const s = dressed.sites[i], p = posAt(s, w);
    dvec[0] += s.pol * p[0]; dvec[1] += s.pol * p[1]; dvec[2] += s.pol * p[2];
    qzz += s.pol * (3 * p[2] * p[2] - (p[0] * p[0] + p[1] * p[1] + p[2] * p[2]));
  }
  const dipoleMag = Math.hypot(...dvec);
  const bare = buildLagrangeDressedElectron({ geo, drop: true });
  let qBare = 0; for (const i of bare.scaffoldIdx) qBare += bare.sites[i].pol;
  const leading = Math.abs(q) > 1e-9 ? "monopole" : (dipoleMag > 1e-6 ? "dipole" : "quadrupole");
  return {
    netChargeUnitsEpsilon: q, netChargeInE: q / 6, bareCoreNetCharge: qBare,
    payloadDipole: dvec.map((v) => +v.toFixed(6)), payloadDipoleMag: +dipoleMag.toFixed(6),
    payloadAxialQuadrupoleZZ: +qzz.toFixed(6),
    monopoleChannelOpen: q !== 0, leadingMultipole: leading,
    note: "the -1e payload opens a monopole (Coulomb/photon) channel absent on the neutral core; the L4/L5 dock is not +/- symmetric, so the payload also carries a small static dipole/quadrupole. Dynamic photon-emission ledger is a separate native burden.",
  };
}

// ===========================================================================
// FALLBACK -- if no STABLE binary Lagrange point exists, a generic co-rotating
// shell of six electrinos at MATCHED J_pay (same total payload L_z as the docked
// ansatz), placed on a symmetric off-axis ring. Reports that it is the fallback.
// ===========================================================================
export function fallbackCoRotatingShell({ geo = LAGRANGE_DRESSED_ANSATZ.geo, dock = LAGRANGE_DOCK_V5, dockScale = 1.0, ringZ = 0.0 } = {}) {
  const w = omegaOf(geo);
  const targetLz = payloadAngularMomentum({ geo, dock, dockScale }).payloadLz; // 6 * rho^2 * w summed
  // symmetric ring of 6 electrinos at one radius rhoRing on z = ringZ: Lz = 6 rho^2 w
  const rhoRing = Math.sqrt(Math.max(0, targetLz / (6 * w)));
  const shell = [];
  for (let k = 0; k < 6; k++) { const az = (k / 6) * 2 * Math.PI; shell.push(siteFromPos("S", rhoRing * Math.cos(az), rhoRing * Math.sin(az), ringZ, -1)); }
  let Lz = 0; for (const s of shell) { const p = posAt(s, w), v = velAt(s, w); Lz += p[0] * v[1] - p[1] * v[0]; }
  return {
    isFallback: true, reason: "no stable binary Lagrange point (all triangular/collinear equilibria are linearly unstable with Coriolis).",
    ringRadius: +rhoRing.toFixed(4), ringZ, shellCount: 6, matchedPayloadLz: +Lz.toFixed(6), targetPayloadLz: +targetLz.toFixed(6),
    matches: Math.abs(Lz - targetLz) < 1e-6,
    note: "declared fallback: a symmetric co-rotating electrino ring at matched total payload angular momentum. Its symmetric +/- azimuths give zero net electric dipole; it carries J_pay by construction and can be fed to the same 12-site pencil.",
  };
}

// ===========================================================================
// Regression witness -- dropping the payload recovers the bare scaffold EXACTLY.
// ===========================================================================
export function bareRegressionWitness({ geo = LAGRANGE_DRESSED_ANSATZ.geo, soft = SOFT } = {}) {
  const dropped = dressedSupportLedger({ geo, drop: true, soft });
  const bare = supportRatios({ geo, soft });
  const ratioDelta = ["I", "M", "O"].reduce((mx, L) => Math.max(mx, Math.abs(dropped.ratios[L] - bare.ratios[L])), 0);
  const kappaDelta = Math.abs(dropped.kappaStar - +bare.kappaStar.toFixed(6));
  const pumpEmpty = dressedAxialPump({ geo, dock: { I: [], M: [], O: [] } });
  return {
    supportRatioMaxDelta: ratioDelta, kappaStarDelta: +kappaDelta.toFixed(9),
    payloadPumpContributionWhenEmpty: pumpEmpty.payloadContribution,
    recoversBare: ratioDelta < 1e-9 && pumpEmpty.payloadContribution === 0,
  };
}

// ===========================================================================
// Full pilot.
// ===========================================================================
export function lagrangeDressedElectronPilot({ geo = LAGRANGE_DRESSED_ANSATZ.geo, dock = LAGRANGE_DOCK_V5, dockScale = 1.0, Nt = 8, Ngrid = 2400, soft = SOFT } = {}) {
  const lpoints = { I: binaryLagrangePoints({ layer: "I", geo }), M: binaryLagrangePoints({ layer: "M", geo }), O: binaryLagrangePoints({ layer: "O", geo }) };
  const anyStable = ["I", "M", "O"].some((L) => lpoints[L].anyStable);
  const support = dressedSupportLedger({ geo, dock, dockScale, soft });
  const pump = dressedAxialPump({ geo, dock, dockScale, soft });
  const flutter = lagrangeTiltFlutter({ geo, dock, dockScale, Nt, Ngrid, soft });
  const mu = magneticMoment({ geo, dock, dockScale });
  const em = dressedEMChannel({ geo, dock, dockScale });
  const fallback = anyStable ? null : fallbackCoRotatingShell({ geo, dock, dockScale });
  const dissolves = flutter.verdict === "dissolved";
  const inherits = ["damped_not_dissolved", "strongly_damped_not_dissolved", "not_helped"].includes(flutter.verdict);
  return {
    schema: SCHEMA, ...FAIL_CLOSED,
    ansatz: { placement: "two electrinos per binary at the co-rotating-frame L4/L5-analog triangular points (declared ansatz)", geo, dock, dockScale },
    step1_binaryLagrangePoints: {
      I: { triangularCount: lpoints.I.triangularCount, anyStable: lpoints.I.anyStable, dockTwo: lpoints.I.dockTwo, mirrorWitness: lpoints.I.mirrorWitness },
      M: { triangularCount: lpoints.M.triangularCount, anyStable: lpoints.M.anyStable, dockTwo: lpoints.M.dockTwo, mirrorWitness: lpoints.M.mirrorWitness },
      O: { triangularCount: lpoints.O.triangularCount, anyStable: lpoints.O.anyStable, dockTwo: lpoints.O.dockTwo, mirrorWitness: lpoints.O.mirrorWitness },
      anyStableLagrangePoint: anyStable,
      mirrorSymmetryBroken: true,
    },
    gateA_supportClosureAndSpin: support,
    gateB_axialPump: pump,
    gateB_axisFlutter: flutter,
    gateC_magneticMoment: mu,
    gateD_emChannel: em,
    fallback,
    honestSummary: {
      coRotatingPayloadCarriesSpin: support.coRotating,
      payloadEntersGyroscopicSector: flutter.payloadEntersGyroscopicSector,
      anyStableLagrangeDock: anyStable,
      dressedClosesLedgers: support.closes,
      flutterOutcome: flutter.verdict,
      dissolvesBareFlutterNoGo: dissolves,
      inheritsBareFlutterNoGo: inherits,
      statement: buildStatement({ anyStable, support, flutter, mu, em }),
    },
  };
}

function buildStatement({ anyStable, support, flutter, mu, em }) {
  const spin = support.coRotating ? `carries nonzero payload angular momentum (L_z = ${support.payloadLz})` : "carries no payload angular momentum";
  const dock = anyStable ? "at least one binary offers a stable Lagrange dock" : "every binary Lagrange point (triangular and collinear) is linearly unstable once Coriolis is included, so there is no stable dock and the declared co-rotating-shell fallback is reported";
  const flut = flutter.verdict === "dissolved"
    ? `and DISSOLVES the Section 86 flutter (Re lambda ${flutter.bareMaxGrowthRate} -> ${flutter.dressedMaxGrowthRate})`
    : `but INHERITS the Section 86 flutter (Re lambda ${flutter.bareMaxGrowthRate} -> ${flutter.dressedMaxGrowthRate}, verdict ${flutter.verdict})`;
  return `The L4/L5-docked payload ${spin} and DOES enter the gyroscopic sector G (per-layer spin J augmented off-axis), unlike the Section 88 on-axis column ${flut}. It sources a magnetic moment (mu_z = ${mu.payloadMagneticMomentZ}) and the ${em.netChargeInE}e monopole/EM channel. Ledger closure: ${support.closes ? "closes" : "does NOT close"} at one coupling (dock imbalance ${support.dockImbalance}); ${dock}. The Lagrange placement is an ansatz; this is a seed-grade coarse pilot with no native release.`;
}

// ===========================================================================
// CLI
// ===========================================================================
function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  const argv = process.argv.slice(2);
  const flag = (n) => argv.includes(n);
  const val = (n, d) => { const i = argv.indexOf(n); return i >= 0 && i + 1 < argv.length ? argv[i + 1] : d; };
  const pretty = flag("--pretty") ? 2 : 0;
  const dockScale = parseFloat(val("--dock-scale", "1.0"));
  let out;
  if (flag("--regression")) out = bareRegressionWitness({});
  else if (flag("--lagrange")) out = { I: binaryLagrangePoints({ layer: "I" }), M: binaryLagrangePoints({ layer: "M" }), O: binaryLagrangePoints({ layer: "O" }) };
  else if (flag("--support")) out = dressedSupportLedger({ dockScale });
  else if (flag("--pump")) out = dressedAxialPump({ dockScale });
  else if (flag("--flutter")) out = lagrangeTiltFlutter({ dockScale });
  else if (flag("--moment")) out = magneticMoment({ dockScale });
  else if (flag("--em")) out = dressedEMChannel({ dockScale });
  else if (flag("--fallback")) out = fallbackCoRotatingShell({ dockScale });
  else out = lagrangeDressedElectronPilot({ dockScale });
  console.log(JSON.stringify(out, null, pretty));
}
