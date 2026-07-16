// SH-0-sea orientation-saturation margin estimate (spec Section 40).
//
// Section 39's quantified target: linear point-dipole response needs alpha_eff ~ 27
// at natural density to supply the 6% margin — 25-40x beyond O(1). This instrument
// tests the LIVE channel (SH-0-sea orientation-order diagnostics): sea assemblies
// carry a PERMANENT dipole p0 (the spindle's own axial polarity dipole is ~2.2 in
// these units) and, in a cold sea, ALIGN with the local retarded field rather than
// polarizing linearly: p = p0 * Ehat(retarded). Saturated orientation response is
// independent of the field MAGNITUDE, so its effective polarizability is
// alpha_eff = p0 / |E|, and |E| at the sea site is the small multipole residue of a
// neutral braid — the enhancement is p0/(alpha*|E|), potentially orders of magnitude.
// Two alignment limits are reported: FAST (direction follows the instantaneous
// retarded field — requires reorientation within a braid period) and SLOW (aligns
// to the cycle-averaged retarded field). Same causal double delay as Sections 38-39;
// same receiver-normal kernel grade as Section 39.
// NOT evidence; estimate grade; fail-closed.

import { fileURLToPath } from "node:url";
import { buildBraid, residuals } from "./spindle-braid-screw-drift-evaluator.mjs";

export const SCHEMA = "sh0_sea_orientation_saturation_margin_estimate.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_saturated_orientation_estimate_not_native_solver_not_accepted_evidence",
});

const cf = 1;
const d = Math.PI / 180;
export const SUPPORT_V1 = Object.freeze({ qI: 0.462, qO: 1.236, alphaI: -10.44 * d, alphaM: -2.67 * d, alphaO: 84 * d, thetaO: 337.04 * d, thetaI: -23.7 * d });

function sitePos(s, t, w) {
  const a = w * t + s.th, ca = Math.cos(s.alpha);
  return [s.sgn * s.R * ca * Math.cos(a), s.sgn * s.R * ca * Math.sin(a), s.sgn * s.R * Math.sin(s.alpha)];
}
function siteVel(s, t, w) {
  const a = w * t + s.th, v = s.sgn * s.R * Math.cos(s.alpha) * w;
  return [-v * Math.sin(a), v * Math.cos(a), 0];
}

// The braid's own permanent axial polarity dipole (available p0 reference).
export function braidAxialDipole(geo = SUPPORT_V1) {
  const braid = buildBraid({ u: 0, cTrans: 1.0, geo });
  let pz = 0;
  for (const s of braid.sites) pz += s.pol * (s.sgn * s.R * Math.sin(s.alpha));
  return Math.abs(pz);
}

// Retarded braid field at X (static receiver; m = c_f / D_s branch weight).
function braidFieldAt(X, braid, t) {
  let E = [0, 0, 0];
  for (const s of braid.sites) {
    let te = t - 4.25;
    for (let it = 0; it < 30; it++) {
      const p = sitePos(s, te, braid.omega);
      const r = Math.hypot(X[0]-p[0], X[1]-p[1], X[2]-p[2]);
      te = t - r / cf;
    }
    const p = sitePos(s, te, braid.omega);
    const dx = [X[0]-p[0], X[1]-p[1], X[2]-p[2]];
    const r = Math.hypot(dx[0], dx[1], dx[2]);
    const rh = [dx[0]/r, dx[1]/r, dx[2]/r];
    const v = siteVel(s, te, braid.omega);
    const Ds = cf - (v[0]*rh[0] + v[1]*rh[1] + v[2]*rh[2]);
    const m = cf / Ds;
    for (let c = 0; c < 3; c++) E[c] += (s.pol * m * dx[c]) / (r * r * r);
  }
  return E;
}
function dipoleField(p, rvec) {
  const r = Math.hypot(rvec[0], rvec[1], rvec[2]);
  const rh = [rvec[0]/r, rvec[1]/r, rvec[2]/r];
  const pr = p[0]*rh[0] + p[1]*rh[1] + p[2]*rh[2];
  return [ (3*pr*rh[0] - p[0]) / (r**3), (3*pr*rh[1] - p[1]) / (r**3), (3*pr*rh[2] - p[2]) / (r**3) ];
}
function shellDirs() { return [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]; }
const unit = (v) => { const n = Math.hypot(v[0],v[1],v[2]) || 1e-300; return [v[0]/n, v[1]/n, v[2]/n]; };

// Per-layer inward support margin PER UNIT p0 (margin linear in p0 at saturation).
// exactDelays: per-(receiver, sea-site) causal delays on the return leg — the sea
// dipole's orientation is read at its true emission time t - r_j/c_f for EACH braid
// receiver j (and braidFieldAt retards each braid source exactly inside). The
// uniform 2R/c_f idealization (exactDelays=false) is retained for regression: the
// Row 3 native run showed the idealization FLIPS both ledgers at a=4.25 — the
// braid radius (~1.2) is not small against the shell radius, so per-pair phase
// spread is order one. Exact delays are the default and the claim-bearing mode.
export function saturationMarginPerP0({ geo = SUPPORT_V1, Rsea = 4.25, Nt = 12, soft = 0.02, mode = "fast", exactDelays = true } = {}) {
  const braid = buildBraid({ u: 0, cTrans: 1.0, geo });
  const w = braid.omega, period = 2 * Math.PI / w;
  const kap = residuals({ u: 0, cTrans: 1.0, geo }, { soft }).kappaStar;
  const dirs = shellDirs().map((v) => [v[0]*Rsea, v[1]*Rsea, v[2]*Rsea]);
  // RELAX mode: first-order direction relaxation dp/dt = gamma * (Ehat - p)_perp,
  // settled over 2 cycles before measurement (the finite-alignment-rate model;
  // gammaOverOmega ~ 1 is the resonant-lag regime). Torque transfer comes from LAG,
  // so finite gamma can enhance tangential rows at the cost of radial ones.
  let relaxTraj = null;
  if (mode === "relax") {
    const gamma = (arguments[0] && arguments[0].gammaOverOmega != null ? arguments[0].gammaOverOmega : 1) * w;
    const settleSteps = 3 * Nt, dtR = period / Nt;
    relaxTraj = dirs.map((X) => {
      let ph = [0, 0, 1];
      const seq = [];
      for (let k = -settleSteps; k < Nt; k++) {
        // sea-site timeline (source legs exactly retarded inside braidFieldAt); the uniform
        // mode keeps its historical -2R/c epoch so the pinned regression rows are unchanged
        const E = braidFieldAt(X, braid, (k / Nt) * period - (exactDelays ? 0 : 2 * Rsea / cf));

        const eh = unit(E);
        ph = unit([ph[0] + gamma * dtR * (eh[0] - ph[0]), ph[1] + gamma * dtR * (eh[1] - ph[1]), ph[2] + gamma * dtR * (eh[2] - ph[2])]);
        if (k >= 0) seq.push(ph);
      }
      return seq;
    });
  }
  // SLOW limit: alignment direction = cycle-averaged retarded field direction
  let slowDirs = null;
  if (mode === "slow") {
    slowDirs = dirs.map((X) => {
      const acc = [0,0,0];
      for (let k = 0; k < Nt; k++) {
        const E = braidFieldAt(X, braid, (k / Nt) * period - 2 * Rsea / cf);
        acc[0]+=E[0]; acc[1]+=E[1]; acc[2]+=E[2];
      }
      return unit(acc);
    });
  }
  const acc = { I: 0, M: 0, O: 0 }, accTan = { I: 0, M: 0, O: 0 };
  let meanFieldMag = 0;
  for (let k = 0; k < Nt; k++) {
    const t = (k / Nt) * period;
    const pHat = mode === "fast" && !exactDelays
      ? dirs.map((X) => { const E = braidFieldAt(X, braid, t - 2 * Rsea / cf); meanFieldMag += Math.hypot(E[0],E[1],E[2]) / (Nt * dirs.length); return unit(E); })
      : mode === "relax" ? relaxTraj.map((seq) => seq[k])
      : mode === "slow" ? slowDirs : null; // fast+exactDelays: computed per receiver below
    for (const i of [0, 2, 4]) {
      const s = braid.sites[i];
      const xj = sitePos(s, t, w), vj = siteVel(s, t, w);
      const rhoCyl = s.R * Math.cos(s.alpha);
      const rx = Math.cos(w * t + s.th), ry = Math.sin(w * t + s.th);
      const tx = -Math.sin(w * t + s.th), ty = Math.cos(w * t + s.th);
      let inward = 0, tangential = 0;
      for (let q2 = 0; q2 < dirs.length; q2++) {
        const dxj = [xj[0]-dirs[q2][0], xj[1]-dirs[q2][1], xj[2]-dirs[q2][2]];
        const rj = Math.hypot(dxj[0], dxj[1], dxj[2]);
        const rhj = [dxj[0]/rj, dxj[1]/rj, dxj[2]/rj];
        const Dt = cf - (vj[0]*rhj[0] + vj[1]*rhj[1] + vj[2]*rhj[2]);
        const ph = (mode === "fast" && exactDelays)
          ? (() => { const E2 = braidFieldAt(dirs[q2], braid, t - rj / cf); meanFieldMag += Math.hypot(E2[0],E2[1],E2[2]) / (Nt * dirs.length * 3); return unit(E2); })()
          : (mode === "relax" && exactDelays)
          ? relaxTraj[q2][((Math.round(((t - rj / cf) / period) * Nt) % Nt) + Nt) % Nt]
          : pHat[q2];
        const E = dipoleField(ph, dxj);
        inward += -(s.pol) * (Dt / cf) * (E[0]*rx + E[1]*ry);
        tangential += (s.pol) * (Dt / cf) * (E[0]*tx + E[1]*ty);
      }
      acc[s.name] += (kap * inward) / (w * w * rhoCyl) / Nt;
      accTan[s.name] += (kap * tangential) / Nt;
    }
  }
  return { Rsea, mode, kappaStar: kap, marginPerP0: acc, tanRowPerP0: accTan,
    meanPerP0: (acc.I + acc.M + acc.O) / 3, meanFieldMagAtShell: mode === "fast" ? meanFieldMag : null };
}

// Multi-shell saturation sum (radial + tangential rows) at natural number density:
// each shell's 6 sites scaled to count(R) = rhoNum * 4*pi*R^2 * dR. Sea dipoles
// respond to the braid only (no sea-sea coupling at this grade), so shells add.
export function multiShellSaturation({ Rmin = 3.5, Rmax = 8, dR = 0.5, rhoNum = 1 / (4.25 ** 3), Nt = 8, mode = "fast", exactDelays = true } = {}) {
  const shells = [];
  const tot = { radI: 0, radM: 0, radO: 0, tanI: 0, tanM: 0, tanO: 0 };
  for (let R = Rmin; R <= Rmax + 1e-9; R += dR) {
    const m = saturationMarginPerP0({ Rsea: R, Nt, mode, exactDelays });
    const count = rhoNum * 4 * Math.PI * R * R * dR; // fractional counts kept (density-weighted)
    const scale = count / 6;
    tot.radI += m.marginPerP0.I * scale; tot.radM += m.marginPerP0.M * scale; tot.radO += m.marginPerP0.O * scale;
    tot.tanI += m.tanRowPerP0.I * scale; tot.tanM += m.tanRowPerP0.M * scale; tot.tanO += m.tanRowPerP0.O * scale;
    shells.push({ R: +R.toFixed(2), count: +count.toFixed(2), tanIperP0: m.tanRowPerP0.I, radMeanPerP0: (m.marginPerP0.I + m.marginPerP0.M + m.marginPerP0.O) / 3 });
  }
  return { rhoNum, mode, shells, totalsPerP0: tot,
    meanRadialPerP0: (tot.radI + tot.radM + tot.radO) / 3 };
}

export function diagnosticReport() {
  const p0 = braidAxialDipole();
  const fast = saturationMarginPerP0({ mode: "fast" });
  const slow = saturationMarginPerP0({ mode: "slow" });
  return { schema: SCHEMA, specPacketRef: SPEC_PACKET_REF,
    p0Available: p0,
    named: { fast, slow },
    marginAtP0: { fast: fast.meanPerP0 * p0, slow: slow.meanPerP0 * p0 },
    ...FAIL_CLOSED };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  process.stdout.write(JSON.stringify(diagnosticReport(), null, process.argv.includes("--pretty") ? 2 : 0) + "\n");
}
