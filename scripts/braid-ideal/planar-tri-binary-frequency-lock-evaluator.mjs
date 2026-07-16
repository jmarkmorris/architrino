// Frequency-locked nested tri-binary evaluator (4:2:1 and 3:2:1 candidates).
//
// Closure goal (2026-07-08, spec Section 17): run the frequency-locked nested
// states -- per-layer frequencies n_a * omega_base with integer locks, restoring
// the inner-super-field ordering of the original intuition -- through the same
// unified global-closure metric as the iso-frequency family, and compare floors.
//
// Geometry: three neutral antipodal axes at radii R_I < R_M < R_O (R_M = 1),
// layer a rotating at n_a * omega. Rail: the middle binary rides c_f, so
// omega = 1/(n_M * R_M). Speeds: beta_a = n_a * omega * R_a. For 4:2:1 the inner
// is super-field iff q_I > 1/2; for 3:2:1 iff q_I > 2/3; the outer is sub-field
// iff q_O < 2 (both locks). Distinct layer frequencies make the configuration
// periodic at the common period P = 2*pi/omega_base and NOT rigid: relative
// angles beat, alignment scalars sweep, and source-normal caustics (D_s = 0)
// can occur during the cycle. The signed branch weight is therefore regulated
// as m = D_T * D_s / (D_s^2 + soft^2) with a DECLARED regulator (default 0.02),
// and min|D_s| is reported so caustic-contaminated configurations are visible.
//
// Unified closure metric (same as the breathing extension): one global kappa*
// least-squares fit over all layers, both force components, full common period;
// per-layer relative residuals rho_a; candidate rows drive all rho_a -> 0.
//
// Partner channel only; self-hit root counts reported per layer (the inner layer
// holds the open self-hit ledger in these states). Circulation is same-sense for
// all layers in v0 (counter-rotation untried). Phases Z3 in v0.
//
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "planar_tri_binary_frequency_lock_evaluator.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_prescribed_worldline_evaluator_not_native_solver_not_accepted_evidence",
});

const cf = 1;

export function buildBraid({ lock = [4, 2, 1], qI = 0.7, qO = 1.5, phases = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3] } = {}) {
  const [nI, nM, nO] = lock;
  const RM = 1, omega = cf / (nM * RM); // middle on the rail: beta_M = nM*omega*RM = 1
  const layers = [
    { name: "I", R: qI * RM, n: nI, phi0: phases[0] },
    { name: "M", R: RM, n: nM, phi0: phases[1] },
    { name: "O", R: qO * RM, n: nO, phi0: phases[2] },
  ];
  const sites = [];
  for (const L of layers) {
    sites.push({ ...L, th: L.phi0, pol: +1 });
    sites.push({ ...L, th: L.phi0 + Math.PI, pol: -1 });
  }
  return {
    omega, period: (2 * Math.PI) / omega, sites,
    betas: { I: nI * omega * qI * RM, M: 1, O: nO * omega * qO * RM },
  };
}

const pos = (s, t, w) => { const a = s.n * w * t + s.th; return [s.R * Math.cos(a), s.R * Math.sin(a)]; };
const vel = (s, t, w) => { const a = s.n * w * t + s.th; const v = s.R * s.n * w; return [-v * Math.sin(a), v * Math.cos(a)]; };
const kinAccel = (s, t, w) => { const a = s.n * w * t + s.th; const k = s.R * (s.n * w) ** 2; return [-k * Math.cos(a), -k * Math.sin(a)]; };

function causalRoots(Xi, src, T, w, dmax, N = 4000, minDelay = 1e-9) {
  const g = (te) => { const p = pos(src, te, w); return Math.hypot(Xi[0] - p[0], Xi[1] - p[1]) - cf * (T - te); };
  const out = []; let g0 = g(T - dmax);
  for (let k = 1; k <= N; k++) {
    const te = T - dmax + dmax * (k / N); if (te >= T - minDelay) break;
    const g1 = g(te);
    if (g0 === 0 || (g0 < 0) !== (g1 < 0)) {
      let lo = T - dmax + dmax * ((k - 1) / N), hi = te; const gl = g(lo);
      for (let b = 0; b < 64; b++) { const m = (lo + hi) / 2; if ((gl < 0) === (g(m) < 0)) lo = m; else hi = m; }
      out.push((lo + hi) / 2);
    }
    g0 = g1;
  }
  return out;
}

export function wakeAccel(braid, recvIdx, T, { soft = 0.02 } = {}) {
  const recv = braid.sites[recvIdx];
  const Xi = pos(recv, T, braid.omega), vi = vel(recv, T, braid.omega);
  let ax = 0, ay = 0, minAbsDs = Infinity;
  for (let j = 0; j < braid.sites.length; j++) {
    if (j === recvIdx) continue;
    const src = braid.sites[j];
    const dmax = recv.R + src.R + 0.2;
    for (const te of causalRoots(Xi, src, T, braid.omega, dmax)) {
      const p = pos(src, te, braid.omega);
      const dx = Xi[0] - p[0], dy = Xi[1] - p[1], rr = Math.hypot(dx, dy);
      if (rr < 1e-9) continue;
      const rh = [dx / rr, dy / rr], vs = vel(src, te, braid.omega);
      const Ds = cf - (vs[0] * rh[0] + vs[1] * rh[1]);
      const Dt = cf - (vi[0] * rh[0] + vi[1] * rh[1]);
      minAbsDs = Math.min(minAbsDs, Math.abs(Ds));
      const m = (Dt * Ds) / (Ds * Ds + soft * soft); // regulated signed branch weight
      const w = (recv.pol * src.pol) * m / (rr * rr);
      ax += w * rh[0]; ay += w * rh[1];
    }
  }
  return { ax, ay, minAbsDs };
}

export function selfRootCount(braid, idx, T = 0, minDelay = 1e-3) {
  const s = braid.sites[idx];
  return causalRoots(pos(s, T, braid.omega), s, T, braid.omega, 2 * s.R + 0.2, 8000, minDelay).length;
}

export function cycleResiduals(cfg = {}, { Nt = 12, soft = 0.02 } = {}) {
  const braid = buildBraid(cfg);
  const recvs = [0, 2, 4];
  const samples = [];
  let minAbsDs = Infinity;
  for (let k = 0; k < Nt; k++) {
    const T = (k / Nt) * braid.period;
    for (const i of recvs) {
      const s = braid.sites[i];
      const kin = kinAccel(s, T, braid.omega);
      const wk = wakeAccel(braid, i, T, { soft });
      minAbsDs = Math.min(minAbsDs, wk.minAbsDs);
      samples.push({ layer: s.name, kin, wake: [wk.ax, wk.ay] });
    }
  }
  let num = 0, den = 0;
  for (const s of samples) { num += s.kin[0] * s.wake[0] + s.kin[1] * s.wake[1]; den += s.wake[0] ** 2 + s.wake[1] ** 2; }
  const kappaStar = num / den;
  const per = {};
  for (const L of ["I", "M", "O"]) {
    let res = 0, ref = 0;
    for (const s of samples) {
      if (s.layer !== L) continue;
      res += (s.kin[0] - kappaStar * s.wake[0]) ** 2 + (s.kin[1] - kappaStar * s.wake[1]) ** 2;
      ref += s.kin[0] ** 2 + s.kin[1] ** 2;
    }
    per[L] = Math.sqrt(res / ref);
  }
  let rA = 0, fA = 0;
  for (const s of samples) { rA += (s.kin[0] - kappaStar * s.wake[0]) ** 2 + (s.kin[1] - kappaStar * s.wake[1]) ** 2; fA += s.kin[0] ** 2 + s.kin[1] ** 2; }
  return { kappaStar, relResidual: per, globalRelResidual: Math.sqrt(rA / fA), minAbsDs, betas: braid.betas };
}

export function diagnosticReport() {
  return {
    schema: SCHEMA, specPacketRef: SPEC_PACKET_REF,
    lock421_sample: cycleResiduals({ lock: [4, 2, 1], qI: 0.7, qO: 1.5 }),
    lock321_sample: cycleResiduals({ lock: [3, 2, 1], qI: 0.8, qO: 1.5 }),
    ...FAIL_CLOSED,
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) { const pretty = process.argv.includes("--pretty"); process.stdout.write(JSON.stringify(diagnosticReport(), null, pretty ? 2 : 0) + "\n"); }
