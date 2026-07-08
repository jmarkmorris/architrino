// Planar tri-binary iso-frequency evaluator (restart on the true 3e:3p geometry).
//
// Configuration (operator, 2026-07-08): six architrinos as THREE NEUTRAL ANTIPODAL
// AXES (binaries) -- axis a has a positive-polarity site at angle phi_a and a
// negative-polarity site at phi_a + pi -- at radii R_I <= R_M <= R_O, all rotating
// at ONE common frequency omega (iso-frequency planar state). Speeds are then
// s_a = omega * R_a (different per layer). Rail condition: beta_M = omega*R_M = 1
// (middle binary rides the c_f rail -- the hinge/clicker).
//
// Because the configuration shares one frequency it is a global rigid rotation:
// every pairwise alignment scalar A_ij = v_j.rhat_ij is exactly time-constant
// (spec Section 8), so (i) there is no recurring cross-hit click train, and
// (ii) any hinge alignment built into the geometry is SUSTAINED by the rotation
// itself -- the sustained-alignment burden becomes an algebraic tuning condition.
//
// The evaluator computes, per layer, the signed tangential residual on one
// representative receiver (the + site of that axis) from its five partners'
// causal roots, using the audited signed convention:
//   rhat = (X_recv(T) - x_src(T_em))/r,  r = c_f (T - T_em),
//   D_s = c_f - v_src(T_em).rhat,  D_T = c_f - v_recv(T).rhat,  m = D_T/D_s,
//   dPhi = sigma_ij * m * (rhat . that_recv) / r^2   (kappa = |q q'| = 1).
// Equal-radii anchor: at R_I=R_M=R_O and Z3 phases this is the certified
// alternating hexagon, and the evaluator must reproduce the certified band
// 2.881*beta <= Phi_tan <= 2.925*beta (planar-tangential-screen certificate).
//
// Self-hit channel: same-source roots exist only for layers with beta_a > 1
// (root birth exactly at the rail); root COUNTS are reported per layer. The
// signed self-hit magnitude is coincidence-stratum (d0) dependent and is NOT
// recomputed here (see self-hit-brake-central-measurement.mjs).
//
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "planar_tri_binary_iso_frequency_evaluator.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-ideal/fold-crossing-chart-spec.md";
export const REDUCED_CHART_REF =
  "reference/priorities/braid-angular-momentum-spin/planar-tri-binary-noether-braid-reduced-chart.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_prescribed_worldline_evaluator_not_native_solver_not_accepted_evidence",
});

const cf = 1;

// Build the six-site braid. layers: [{R, phi}] for I, M, O. omega common.
export function buildBraid({ RI = 0.5, RM = 1.0, RO = 1.5, betaM = 1.0, phases = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3] } = {}) {
  const omega = (betaM * cf) / RM;
  const layers = [
    { name: "I", R: RI, phi: phases[0] },
    { name: "M", R: RM, phi: phases[1] },
    { name: "O", R: RO, phi: phases[2] },
  ];
  const sites = [];
  for (const L of layers) {
    sites.push({ layer: L.name, R: L.R, w: omega, th: L.phi, pol: +1 });
    sites.push({ layer: L.name, R: L.R, w: omega, th: L.phi + Math.PI, pol: -1 });
  }
  return { omega, sites, betas: { I: omega * RI, M: omega * RM, O: omega * RO } };
}

const P = (s, t) => { const a = s.w * t + s.th; return [s.R * Math.cos(a), s.R * Math.sin(a)]; };
const Vv = (s, t) => { const a = s.w * t + s.th; return [-s.R * s.w * Math.sin(a), s.R * s.w * Math.cos(a)]; };

function causalRoots(Xi, src, T, dmax, N = 6000, minDelay = 1e-9) {
  const g = (te) => { const p = P(src, te); return Math.hypot(Xi[0] - p[0], Xi[1] - p[1]) - cf * (T - te); };
  const out = []; let g0 = g(T - dmax);
  for (let k = 1; k <= N; k++) {
    const te = T - dmax + dmax * (k / N); if (te >= T - minDelay) break;
    const g1 = g(te);
    if (g0 === 0 || (g0 < 0) !== (g1 < 0)) {
      let lo = T - dmax + dmax * ((k - 1) / N), hi = te; const gl = g(lo);
      for (let b = 0; b < 70; b++) { const m = (lo + hi) / 2; if ((gl < 0) === (g(m) < 0)) lo = m; else hi = m; }
      out.push((lo + hi) / 2);
    }
    g0 = g1;
  }
  return out;
}

// Signed tangential AND radial residuals on one receiver site from all five
// partners at time T. Radial unit is outward at the receiver; the circular-orbit
// support condition is aRad = -omega^2 R_recv (kinematic centripetal requirement,
// kappa absorbed), reported as supportRatio = -aRad/(omega^2 R_recv): a candidate
// row needs supportRatio equal and positive across layers (one common constant,
// which then sets the braid scale through kappa).
export function receiverResiduals(braid, recvIdx, T = 0) {
  const recv = braid.sites[recvIdx];
  const Xi = P(recv, T), vi = Vv(recv, T), vim = Math.hypot(vi[0], vi[1]);
  const that = [vi[0] / vim, vi[1] / vim];
  const Xim = Math.hypot(Xi[0], Xi[1]);
  const rhatRecv = [Xi[0] / Xim, Xi[1] / Xim];
  let phi = 0, aRad = 0, minAbsDs = Infinity, rootsUsed = 0, caustSkips = 0;
  for (let j = 0; j < braid.sites.length; j++) {
    if (j === recvIdx) continue;
    const src = braid.sites[j];
    const dmax = recv.R + src.R + 0.2;
    for (const te of causalRoots(Xi, src, T, dmax)) {
      const p = P(src, te); const dx = Xi[0] - p[0], dy = Xi[1] - p[1], rr = Math.hypot(dx, dy);
      if (rr < 1e-9) continue;
      const rh = [dx / rr, dy / rr], vs = Vv(src, te);
      const Ds = cf - (vs[0] * rh[0] + vs[1] * rh[1]);
      const Dt = cf - (vi[0] * rh[0] + vi[1] * rh[1]);
      minAbsDs = Math.min(minAbsDs, Math.abs(Ds));
      if (Math.abs(Ds) < 1e-9) { caustSkips++; continue; }
      const w = (recv.pol * src.pol) * (Dt / Ds) / (rr * rr);
      phi += w * (rh[0] * that[0] + rh[1] * that[1]);
      aRad += w * (rh[0] * rhatRecv[0] + rh[1] * rhatRecv[1]);
      rootsUsed++;
    }
  }
  const supportRatio = -aRad / (braid.omega * braid.omega * recv.R);
  return { phiTan: phi, aRad, supportRatio, minAbsDs, rootsUsed, caustSkips };
}

// Back-compat wrapper (tangential-only view).
export function receiverTangential(braid, recvIdx, T = 0) {
  return receiverResiduals(braid, recvIdx, T);
}

// Self-hit root count for one site (same-source roots; birth at beta = 1).
export function selfRootCount(braid, idx, T = 0, minDelay = 1e-3) {
  const s = braid.sites[idx];
  return causalRoots(P(s, T), s, T, 2 * s.R + 0.2, 8000, minDelay).length;
}

// Rigidity witness: per-layer tangential residual is time-independent.
export function rigidityCheck(cfg = {}) {
  const braid = buildBraid(cfg);
  const recvs = [0, 2, 4]; // + sites of I, M, O
  const at = (T) => recvs.map((i) => receiverTangential(braid, i, T).phiTan);
  const a = at(0), b = at(0.37), c = at(1.19);
  const maxVar = Math.max(...a.map((x, k) => Math.max(Math.abs(x - b[k]), Math.abs(x - c[k]))));
  return { maxVar, timeIndependent: maxVar < 1e-6 };
}

// Constant-alignment table (30 directed pairs) + per-layer speeds.
export function alignmentTable(cfg = {}) {
  const braid = buildBraid(cfg);
  const rows = [];
  for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) {
    if (i === j) continue;
    const Xi = P(braid.sites[i], 0), Xj = P(braid.sites[j], 0);
    const d = [Xi[0] - Xj[0], Xi[1] - Xj[1]]; const L = Math.hypot(d[0], d[1]);
    const vj = Vv(braid.sites[j], 0);
    rows.push({ recv: i, src: j, A: (vj[0] * d[0] + vj[1] * d[1]) / L, sep: L });
  }
  return { betas: braid.betas, pairs: rows, sustainedHingePairs: rows.filter((r) => Math.abs(r.A - cf) < 1e-3).length };
}

// Equal-radii anchor: must reproduce the certified hexagon band.
export function equalRadiiValidation({ beta = 0.9 } = {}) {
  const braid = buildBraid({ RI: 1, RM: 1, RO: 1, betaM: beta });
  const per = [0, 2, 4].map((i) => receiverTangential(braid, i, 0).phiTan);
  const sym = Math.max(...per) - Math.min(...per);
  const ratio = per[0] / beta;
  return { beta, perLayer: per, layerSymmetric: sym < 1e-9, ratio, inCertifiedBand: ratio >= 2.881 - 0.02 && ratio <= 2.925 + 0.02 };
}

// Rail scan: beta_M = 1; sweep radius ratios qI = RI/RM < 1 < qO = RO/RM.
export function railScan({ qIs = [0.3, 0.5, 0.7, 0.85], qOs = [1.15, 1.3, 1.5, 2.0], phases } = {}) {
  const rows = [];
  for (const qI of qIs) for (const qO of qOs) {
    const cfg = { RI: qI, RM: 1, RO: qO, betaM: 1.0, ...(phases ? { phases } : {}) };
    const braid = buildBraid(cfg);
    const [pI, pM, pO] = [0, 2, 4].map((i) => receiverResiduals(braid, i, 0));
    // Whole-braid partner-wake ledgers (per antipodal symmetry, both sites of a
    // layer carry the same tangential residual): net torque N = 2*sum R_a*Phi_a,
    // net power P = omega*N. Self-hit contributions are NOT included (outer's
    // 1-root brake is d0-dependent and reported separately as a count).
    const netTorque = 2 * (qI * pI.phiTan + 1 * pM.phiTan + qO * pO.phiTan);
    rows.push({
      qI, qO, betas: braid.betas,
      phiTan: { I: pI.phiTan, M: pM.phiTan, O: pO.phiTan },
      aRad: { I: pI.aRad, M: pM.aRad, O: pO.aRad },
      supportRatio: { I: pI.supportRatio, M: pM.supportRatio, O: pO.supportRatio },
      netTorque, netPower: braid.omega * netTorque,
      selfRoots: { I: selfRootCount(braid, 0), M: selfRootCount(braid, 2), O: selfRootCount(braid, 4) },
      minAbsDs: Math.min(pI.minAbsDs, pM.minAbsDs, pO.minAbsDs),
      caustSkips: pI.caustSkips + pM.caustSkips + pO.caustSkips,
    });
  }
  return rows;
}

// Bisect the net-torque zero in qO at fixed qI (rail, Z3 phases unless given).
export function netZeroInQO({ qI = 0.3, lo = 1.8, hi = 2.4, phases } = {}) {
  const N = (qO) => railScan({ qIs: [qI], qOs: [qO], ...(phases ? { phases } : {}) })[0];
  let a = lo, b = hi, ra = N(a), rb = N(b);
  if ((ra.netTorque < 0) === (rb.netTorque < 0)) return { bracketed: false, ra, rb };
  for (let k = 0; k < 24; k++) { const m = (a + b) / 2; const rm = N(m); if ((ra.netTorque < 0) === (rm.netTorque < 0)) { a = m; ra = rm; } else { b = m; rb = rm; } }
  return { bracketed: true, qI, qOstar: (a + b) / 2, row: N((a + b) / 2) };
}

// Scan the two relative axis phases (middle fixed) at one radius point on the rail.
export function phaseScan({ qI = 0.3, qO = 2.1, dIs = [-40, -20, 0, 20, 40], dOs = [-40, -20, 0, 20, 40] } = {}) {
  const d2r = Math.PI / 180;
  const rows = [];
  for (const dI of dIs) for (const dO of dOs) {
    const phases = [0 + dI * d2r, (2 * Math.PI) / 3, (4 * Math.PI) / 3 + dO * d2r];
    const r = railScan({ qIs: [qI], qOs: [qO], phases })[0];
    rows.push({ dI, dO, phiTan: r.phiTan, netTorque: r.netTorque, supportRatio: r.supportRatio });
  }
  return rows;
}

export function diagnosticReport() {
  return {
    schema: SCHEMA, specPacketRef: SPEC_PACKET_REF, reducedChartRef: REDUCED_CHART_REF,
    rigidity: rigidityCheck({ RI: 0.5, RM: 1, RO: 1.5, betaM: 0.9 }),
    equalRadiiValidation: equalRadiiValidation({ beta: 0.9 }),
    alignmentAtRail: alignmentTable({ RI: 0.5, RM: 1, RO: 1.5, betaM: 1.0 }),
    railScan: railScan({}),
    ...FAIL_CLOSED,
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) { const pretty = process.argv.includes("--pretty"); process.stdout.write(JSON.stringify(diagnosticReport(), null, pretty ? 2 : 0) + "\n"); }
