// Inclined-rings ("gyroscopic flywheel") evaluator -- the operator's original
// intuition picture (2026-07-08): three nested neutral binaries, each ORBITING
// ALONG its own ring, with the three ring planes mutually inclined ("Lorentzian"
// angles), rather than co-rotating as tilted dumbbells about one axis.
//
// Ring a: radius R_a, plane inclined by iota_a (rotation about a node line at
// azimuth nu_a); site at ring angle omega t + phi_a, antipode at +pi. Common
// omega (iso-frequency). Uniform motion on a centered circle gives the exact
// kinematic need a_kin = -omega^2 x. Differently-inclined rings make the
// configuration periodic but NOT rigid, so residuals are cycle-sampled and the
// declared caustic regulator applies. iota=(0,0,0) reduces EXACTLY to the planar
// nested braid (regression anchor 0.646); iota->90 deg with staggered nodes is a
// polar-rings sphere-like state. This family interpolates the operator's picture
// between the planar champion and the rejected orthogonal sphere state.
//
// Node-line convention: at iota=0 the effective azimuth is phi_a + nu_a, so
// staggered nodes must compensate phases (phi_a -> phi_a - nu_a) or the iota->0
// limit silently MIRRORS the phase order against the rotation sense -- delayed
// wakes are strongly chiral, and the mirrored braid scores differently. Default
// nodes are [0,0,0] (common node line) so iota=0 reduces exactly to the planar
// nested braid.
//
// Same unified closure metric; signed normals; partner channel. Fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "inclined_rings_flywheel_evaluator.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_prescribed_worldline_evaluator_not_native_solver_not_accepted_evidence",
});

const cf = 1;

function ringFrame(iota, nu) {
  // columns u,w spanning the ring plane: Rz(nu) * Rx(iota) applied to x,y
  const cn = Math.cos(nu), sn = Math.sin(nu), ci = Math.cos(iota), si = Math.sin(iota);
  return {
    u: [cn, sn, 0],
    w: [-sn * ci, cn * ci, si],
  };
}

export function buildBraid({ qI = 0.5, qO = 1.6, betaM = 1.0, iotas = [0, 0, 0], nodes = [0, 0, 0], phases = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3] } = {}) {
  const RM = 1, omega = (betaM * cf) / RM;
  const L = [
    { name: "I", R: qI * RM, iota: iotas[0], nu: nodes[0], phi0: phases[0] },
    { name: "M", R: RM, iota: iotas[1], nu: nodes[1], phi0: phases[1] },
    { name: "O", R: qO * RM, iota: iotas[2], nu: nodes[2], phi0: phases[2] },
  ];
  const sites = [];
  for (const l of L) {
    const F = ringFrame(l.iota, l.nu);
    sites.push({ ...l, F, dphi: 0, pol: +1 });
    sites.push({ ...l, F, dphi: Math.PI, pol: -1 });
  }
  return { omega, period: (2 * Math.PI) / omega, sites };
}

function pos(s, t, w) {
  const a = w * t + s.phi0 + s.dphi, c = s.R * Math.cos(a), sn = s.R * Math.sin(a);
  return [c * s.F.u[0] + sn * s.F.w[0], c * s.F.u[1] + sn * s.F.w[1], c * s.F.u[2] + sn * s.F.w[2]];
}
function vel(s, t, w) {
  const a = w * t + s.phi0 + s.dphi, c = -s.R * w * Math.sin(a), sn = s.R * w * Math.cos(a);
  return [c * s.F.u[0] + sn * s.F.w[0], c * s.F.u[1] + sn * s.F.w[1], c * s.F.u[2] + sn * s.F.w[2]];
}
const kinAccel = (s, t, w) => { const p = pos(s, t, w); return [-w * w * p[0], -w * w * p[1], -w * w * p[2]]; };

function causalRoots(Xi, src, T, w, dmax, N = 4000, minDelay = 1e-9) {
  const g = (te) => { const p = pos(src, te, w); return Math.hypot(Xi[0] - p[0], Xi[1] - p[1], Xi[2] - p[2]) - cf * (T - te); };
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
  let av = [0, 0, 0], minAbsDs = Infinity;
  for (let j = 0; j < braid.sites.length; j++) {
    if (j === recvIdx) continue;
    const src = braid.sites[j];
    const dmax = recv.R + src.R + 0.3;
    for (const te of causalRoots(Xi, src, T, braid.omega, dmax)) {
      const p = pos(src, te, braid.omega);
      const d = [Xi[0] - p[0], Xi[1] - p[1], Xi[2] - p[2]];
      const rr = Math.hypot(d[0], d[1], d[2]);
      if (rr < 1e-9) continue;
      const rh = [d[0] / rr, d[1] / rr, d[2] / rr];
      const vs = vel(src, te, braid.omega);
      const Ds = cf - (vs[0] * rh[0] + vs[1] * rh[1] + vs[2] * rh[2]);
      const Dt = cf - (vi[0] * rh[0] + vi[1] * rh[1] + vi[2] * rh[2]);
      minAbsDs = Math.min(minAbsDs, Math.abs(Ds));
      const m = (Dt * Ds) / (Ds * Ds + soft * soft);
      const w = (recv.pol * src.pol) * m / (rr * rr);
      av[0] += w * rh[0]; av[1] += w * rh[1]; av[2] += w * rh[2];
    }
  }
  return { a: av, minAbsDs };
}

export function cycleResiduals(cfg = {}, { Nt = 12, soft = 0.02 } = {}) {
  const braid = buildBraid(cfg);
  const recvs = [0, 2, 4];
  const samples = []; let minAbsDs = Infinity;
  for (let k = 0; k < Nt; k++) {
    const T = (k / Nt) * braid.period;
    for (const i of recvs) {
      const s = braid.sites[i];
      const kin = kinAccel(s, T, braid.omega);
      const wk = wakeAccel(braid, i, T, { soft });
      minAbsDs = Math.min(minAbsDs, wk.minAbsDs);
      samples.push({ layer: s.name, kin, wake: wk.a });
    }
  }
  let num = 0, den = 0;
  for (const s of samples) for (let c = 0; c < 3; c++) { num += s.kin[c] * s.wake[c]; den += s.wake[c] ** 2; }
  const kappaStar = num / den;
  const per = {};
  for (const L of ["I", "M", "O"]) {
    let res = 0, ref = 0;
    for (const s of samples) {
      if (s.layer !== L) continue;
      for (let c = 0; c < 3; c++) { res += (s.kin[c] - kappaStar * s.wake[c]) ** 2; ref += s.kin[c] ** 2; }
    }
    per[L] = Math.sqrt(res / ref);
  }
  let rA = 0, fA = 0;
  for (const s of samples) for (let c = 0; c < 3; c++) { rA += (s.kin[c] - kappaStar * s.wake[c]) ** 2; fA += s.kin[c] ** 2; }
  return { kappaStar, relResidual: per, globalRelResidual: Math.sqrt(rA / fA), minAbsDs };
}

export function diagnosticReport() {
  return {
    schema: SCHEMA, specPacketRef: SPEC_PACKET_REF,
    planarRegression: cycleResiduals({ iotas: [0, 0, 0] }, { Nt: 2 }),
    ...FAIL_CLOSED,
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) { const pretty = process.argv.includes("--pretty"); process.stdout.write(JSON.stringify(diagnosticReport(), null, pretty ? 2 : 0) + "\n"); }
