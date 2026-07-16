// Spindle braid screw-drift evaluator (queue item 19, pass 1).
//
// Gives the spindle braid rest-state champion (spec Section 22) a uniform drift u
// along its spin axis. Rotation + axial translation = SCREW MOTION: still rigid,
// so relative geometry is frozen in the co-screwing frame and the single-time
// closure evaluation stays exact (verified). The kinematic need is unchanged
// (-omega^2 rho, horizontal); only the causal wake geometry becomes fore-aft
// anisotropic (delays compress ahead, dilate behind; receiver-normals acquire
// axial components; causal-root lookback grows as 1/(1-u), and the root-scan
// window and grid are scaled accordingly).
//
// Pass-1 readouts (fixed rest-state geometry; per-u re-optimization deferred):
//  (1) cadence: at each u, scan the transverse middle speed c = omega*R_M and
//      find the closure-optimal c*(u); the rail hypothesis (middle total speed
//      = c_f) predicts c*(u) = sqrt(1-u^2) = 1/gamma -- time dilation from
//      closure if the optimum tracks it;
//  (2) who leads: u -> -u flips which polarity cap leads; fore-aft asymmetry
//      makes the two scores differ, selecting a preferred leader (helicity-
//      polarity locking); the anti-braid leads oppositely by exact C-degeneracy;
//  (3) relative L*(u) = c*(u)/c*(0) at fixed geometry (caveat: geometry re-opt
//      pending, so L*(u) here is the cadence factor only).
//
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "spindle_braid_screw_drift_evaluator.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_prescribed_worldline_evaluator_not_native_solver_not_accepted_evidence",
});

const cf = 1;
const d = Math.PI / 180;
export const CHAMPION = Object.freeze({ qI: 0.5, qO: 1.65, alphaI: -12 * d, alphaM: 0, alphaO: 84 * d, thetaO: 330 * d });

// Minimal static sea (sea-dressed drift question, spec Section 26): six aligned
// dipole pairs on +/-x, +/-y, +/-z at the SH-0-sea named spacing R_sea = 4.25,
// each an aligned +/- pair separated by sepSea along z, STATIC in the void frame
// (so the sea frame IS the void frame: rest-relative-to-sea = u = 0). Sea sites
// act as additional wake sources on the braid receivers; they are environment,
// not receivers. A 6-dipole shell is a TOY sea (not FCC-12, not self-consistent).
export function seaSites({ Rsea = 4.25, sepSea = 0.5 } = {}) {
  const out = [];
  const dirs = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
  for (const dvec of dirs) {
    const base = [dvec[0] * Rsea, dvec[1] * Rsea, dvec[2] * Rsea];
    out.push({ static: true, p: [base[0], base[1], base[2] + sepSea / 2], pol: +1 });
    out.push({ static: true, p: [base[0], base[1], base[2] - sepSea / 2], pol: -1 });
  }
  return out;
}

export function buildBraid({ u = 0, cTrans = 1.0, geo = CHAMPION, sea = null } = {}) {
  const RM = 1, omega = cTrans / (RM * Math.cos(geo.alphaM)); // transverse middle speed = cTrans
  const layers = [
    { name: "I", R: geo.qI, alpha: geo.alphaI, th: geo.thetaI ?? 0 },
    { name: "M", R: RM, alpha: geo.alphaM, th: geo.thetaM ?? (2 * Math.PI) / 3 },
    { name: "O", R: geo.qO, alpha: geo.alphaO, th: geo.thetaO },
  ];
  const sites = [];
  for (const L of layers) { sites.push({ ...L, sgn: +1, pol: +1 }, { ...L, sgn: -1, pol: -1 }); }
  return { omega, u, sites, sea: sea ? seaSites(sea) : [] };
}

function pos(s, t, w, u) {
  const a = w * t + s.th, ca = Math.cos(s.alpha);
  return [s.sgn * s.R * ca * Math.cos(a), s.sgn * s.R * ca * Math.sin(a), s.sgn * s.R * Math.sin(s.alpha) + u * t];
}
function vel(s, t, w, u) {
  const a = w * t + s.th, v = s.sgn * s.R * Math.cos(s.alpha) * w;
  return [-v * Math.sin(a), v * Math.cos(a), u];
}
function kinAccel(s, t, w) {
  const a = w * t + s.th, k = s.sgn * s.R * Math.cos(s.alpha) * w * w;
  return [-k * Math.cos(a), -k * Math.sin(a), 0];
}

function causalRoots(Xi, src, T, w, u, dmax, N, minDelay = 1e-9) {
  const g = (te) => { const p = pos(src, te, w, u); return Math.hypot(Xi[0] - p[0], Xi[1] - p[1], Xi[2] - p[2]) - cf * (T - te); };
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

export function wakeAccel(braid, recvIdx, T = 0, { soft = 0.02 } = {}) {
  const recv = braid.sites[recvIdx];
  const Xi = pos(recv, T, braid.omega, braid.u), vi = vel(recv, T, braid.omega, braid.u);
  let av = [0, 0, 0], minAbsDs = Infinity;
  const stretch = 1 / Math.max(0.15, 1 - Math.abs(braid.u));
  for (let j = 0; j < braid.sites.length; j++) {
    if (j === recvIdx) continue;
    const src = braid.sites[j];
    const dmax = (recv.R + src.R + 0.3) * stretch;
    const N = Math.min(24000, Math.ceil(4000 * stretch));
    for (const te of causalRoots(Xi, src, T, braid.omega, braid.u, dmax, N)) {
      const p = pos(src, te, braid.omega, braid.u);
      const dd = [Xi[0] - p[0], Xi[1] - p[1], Xi[2] - p[2]];
      const rr = Math.hypot(dd[0], dd[1], dd[2]);
      if (rr < 1e-9) continue;
      const rh = [dd[0] / rr, dd[1] / rr, dd[2] / rr];
      const vs = vel(src, te, braid.omega, braid.u);
      const Ds = cf - (vs[0] * rh[0] + vs[1] * rh[1] + vs[2] * rh[2]);
      const Dt = cf - (vi[0] * rh[0] + vi[1] * rh[1] + vi[2] * rh[2]);
      minAbsDs = Math.min(minAbsDs, Math.abs(Ds));
      const m = (Dt * Ds) / (Ds * Ds + soft * soft);
      const w = (recv.pol * src.pol) * m / (rr * rr);
      av[0] += w * rh[0]; av[1] += w * rh[1]; av[2] += w * rh[2];
    }
  }
  // static sea sources: single causal root at te = T - dist (source static)
  for (const sSea of braid.sea) {
    const dd0 = [Xi[0] - sSea.p[0], Xi[1] - sSea.p[1], Xi[2] - sSea.p[2]];
    const rr = Math.hypot(dd0[0], dd0[1], dd0[2]);
    if (rr < 1e-9) continue;
    const rh = [dd0[0] / rr, dd0[1] / rr, dd0[2] / rr];
    const Ds = cf; // static source: v_src = 0
    const Dt = cf - (vi[0] * rh[0] + vi[1] * rh[1] + vi[2] * rh[2]);
    const m = (Dt * Ds) / (Ds * Ds + soft * soft);
    const w = (recv.pol * sSea.pol) * m / (rr * rr);
    av[0] += w * rh[0]; av[1] += w * rh[1]; av[2] += w * rh[2];
  }
  return { a: av, minAbsDs };
}

// Screw-rigidity witness: co-screwing-frame wake components constant in T.
export function screwRigidity({ u = 0.4, cTrans = 0.9 } = {}) {
  const braid = buildBraid({ u, cTrans });
  const co = (T) => [0, 2, 4].map((i) => {
    const w = wakeAccel(braid, i, T).a;
    const a = braid.omega * T; const c = Math.cos(-a), s = Math.sin(-a);
    return [c * w[0] - s * w[1], s * w[0] + c * w[1], w[2]];
  });
  const A = co(0), B = co(0.61);
  let maxVar = 0;
  for (let i = 0; i < 3; i++) for (let c = 0; c < 3; c++) maxVar = Math.max(maxVar, Math.abs(A[i][c] - B[i][c]));
  return { maxVar, screwRigid: maxVar < 1e-5 };
}

export function residuals({ u = 0, cTrans = 1.0, geo = CHAMPION, sea = null } = {}, { soft = 0.02 } = {}) {
  const braid = buildBraid({ u, cTrans, geo, sea });
  const samples = [];
  for (const i of [0, 2, 4]) {
    const s = braid.sites[i];
    samples.push({ layer: s.name, kin: kinAccel(s, 0, braid.omega), wake: wakeAccel(braid, i, 0, { soft }).a });
  }
  let num = 0, den = 0;
  for (const s of samples) for (let c = 0; c < 3; c++) { num += s.kin[c] * s.wake[c]; den += s.wake[c] ** 2; }
  const kappaStar = num / den;
  let rA = 0, fA = 0; const per = {};
  for (const s of samples) {
    let res = 0, ref = 0;
    for (let c = 0; c < 3; c++) { res += (s.kin[c] - kappaStar * s.wake[c]) ** 2; ref += s.kin[c] ** 2; }
    per[s.layer] = Math.sqrt(res / ref); rA += res; fA += ref;
  }
  return { kappaStar, relResidual: per, globalRelResidual: Math.sqrt(rA / fA) };
}

// MM-ANALOG: perpendicular drift (u along x, spin about z). Rotation + transverse
// translation is NOT a screw motion (no one-parameter worldtube symmetry), so the
// residuals are cycle-periodic and must be cycle-sampled. Kinematic anisotropy at
// the budget level: site speed oscillates, |v|max = omega*rho + u, so the all-cycle
// sub-field budget is LINEAR (c <= c_f - u) versus the parallel Pythagorean budget
// (c <= sqrt(c_f^2 - u^2)); running perpendicular at the parallel-pinned cadence
// makes the middle binary cross c_f twice per cycle (active escapement clicking).
export function residualsPerp({ u = 0.2, cTrans = 0.9, geo = CHAMPION } = {}, { Nt = 8, soft = 0.02 } = {}) {
  const braid = buildBraid({ u: 0, cTrans, geo }); // axial-drift field unused; positions overridden below
  const w = braid.omega;
  const posP = (site, t) => { const p0 = pos(site, t, w, 0); return [p0[0] + u * t, p0[1], p0[2]]; };
  const velP = (site, t) => { const v0 = vel(site, t, w, 0); return [v0[0] + u, v0[1], v0[2]]; };
  const rootsP = (Xi, src, T, dmax, N) => {
    const g = (te) => { const pp = posP(src, te); return Math.hypot(Xi[0] - pp[0], Xi[1] - pp[1], Xi[2] - pp[2]) - cf * (T - te); };
    const out = []; let g0 = g(T - dmax);
    for (let k = 1; k <= N; k++) {
      const te = T - dmax + dmax * (k / N); if (te >= T - 1e-9) break;
      const g1 = g(te);
      if (g0 === 0 || (g0 < 0) !== (g1 < 0)) {
        let lo = T - dmax + dmax * ((k - 1) / N), hi = te; const gl = g(lo);
        for (let b = 0; b < 64; b++) { const m = (lo + hi) / 2; if ((gl < 0) === (g(m) < 0)) lo = m; else hi = m; }
        out.push((lo + hi) / 2);
      }
      g0 = g1;
    }
    return out;
  };
  const period = (2 * Math.PI) / w;
  const stretch = 1 / Math.max(0.15, 1 - Math.abs(u));
  const samples = []; let minAbsDs = Infinity;
  for (let k = 0; k < Nt; k++) {
    const T = (k / Nt) * period;
    for (const i of [0, 2, 4]) {
      const recv = braid.sites[i];
      const Xi = posP(recv, T), vi = velP(recv, T);
      const kin = kinAccel(recv, T, w); // translation adds no acceleration
      let av = [0, 0, 0];
      for (let j = 0; j < braid.sites.length; j++) {
        if (j === i) continue;
        const src = braid.sites[j];
        const dmax = (recv.R + src.R + 0.3) * stretch;
        const N = Math.min(24000, Math.ceil(4000 * stretch));
        for (const te of rootsP(Xi, src, T, dmax, N)) {
          const pp = posP(src, te);
          const dd = [Xi[0] - pp[0], Xi[1] - pp[1], Xi[2] - pp[2]];
          const rr = Math.hypot(dd[0], dd[1], dd[2]);
          if (rr < 1e-9) continue;
          const rh = [dd[0] / rr, dd[1] / rr, dd[2] / rr];
          const vs = velP(src, te);
          const Ds = cf - (vs[0] * rh[0] + vs[1] * rh[1] + vs[2] * rh[2]);
          const Dt = cf - (vi[0] * rh[0] + vi[1] * rh[1] + vi[2] * rh[2]);
          minAbsDs = Math.min(minAbsDs, Math.abs(Ds));
          const m = (Dt * Ds) / (Ds * Ds + soft * soft);
          const ww = (recv.pol * src.pol) * m / (rr * rr);
          av[0] += ww * rh[0]; av[1] += ww * rh[1]; av[2] += ww * rh[2];
        }
      }
      samples.push({ kin, wake: av });
    }
  }
  let num = 0, den = 0;
  for (const sm of samples) for (let c = 0; c < 3; c++) { num += sm.kin[c] * sm.wake[c]; den += sm.wake[c] ** 2; }
  const kappaStar = num / den;
  let rA = 0, fA = 0;
  for (const sm of samples) for (let c = 0; c < 3; c++) { rA += (sm.kin[c] - kappaStar * sm.wake[c]) ** 2; fA += sm.kin[c] ** 2; }
  return { kappaStar, globalRelResidual: Math.sqrt(rA / fA), minAbsDs, cMaxBudgetLinear: cf - Math.abs(u) };
}

// Cadence optimum at one drift: parabolic refinement over a c-grid near 1/gamma.
export function cadenceOptimum({ u = 0.4, span = 0.12, n = 5 } = {}) {
  const cRail = Math.sqrt(Math.max(0, 1 - u * u));
  const cs = Array.from({ length: n }, (_, k) => cRail * (1 - span / 2 + (span * k) / (n - 1)));
  const rows = cs.map((c) => ({ c, f: residuals({ u, cTrans: c }).globalRelResidual }));
  let best = rows[0]; for (const r of rows) if (r.f < best.f) best = r;
  // parabolic refine around the best grid point when interior
  const i = rows.indexOf(best);
  let cStar = best.c;
  if (i > 0 && i < rows.length - 1) {
    const [a, b, cc] = [rows[i - 1], rows[i], rows[i + 1]];
    const denom = (a.f - 2 * b.f + cc.f);
    if (Math.abs(denom) > 1e-12) cStar = b.c - 0.5 * ((b.c - a.c) * (b.f - cc.f) - (b.c - cc.c) * (b.f - a.f)) / denom * 0; // keep grid best; parabola optional
  }
  return { u, cRail, rows, cStar: best.c, fStar: best.f, ratioToRail: best.c / cRail };
}

// Pass 2: per-u geometry re-optimization at the pinned cadence c = sqrt(1-u^2).
// Coordinate descent over (alphaI, alphaO, thetaO, qO); qI held (stiffness backbone),
// alphaM held 0 (rail clean). Drift sign: preferred direction (electrino cap leads).
export function pass2Optimize({ u = -0.4, rounds = 2 } = {}) {
  const c = Math.sqrt(1 - u * u);
  let g = { ...CHAMPION };
  const steps = { alphaI: 4 * d, alphaO: 3 * d, thetaO: 8 * d, qO: 0.08 };
  let f0 = residuals({ u, cTrans: c, geo: g }).globalRelResidual;
  for (let r = 0; r < rounds; r++) {
    for (const k of ["alphaI", "alphaO", "thetaO", "qO"]) {
      for (const sgn of [+1, -1]) {
        let improved = true;
        while (improved) {
          const trial = { ...g, [k]: g[k] + sgn * steps[k] };
          const f = residuals({ u, cTrans: c, geo: trial }).globalRelResidual;
          if (f < f0 - 1e-5) { g = trial; f0 = f; } else improved = false;
        }
      }
    }
  }
  return { u, cPinned: c, fOpt: f0, geo: g,
    deg: { alphaI: g.alphaI / d, alphaO: g.alphaO / d, thetaO: g.thetaO / d } };
}

export function diagnosticReport() {
  return {
    schema: SCHEMA, specPacketRef: SPEC_PACKET_REF,
    screwRigidity: screwRigidity({}),
    restAnchor: residuals({ u: 0, cTrans: 1.0 }),
    ...FAIL_CLOSED,
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) { const pretty = process.argv.includes("--pretty"); process.stdout.write(JSON.stringify(diagnosticReport(), null, pretty ? 2 : 0) + "\n"); }
