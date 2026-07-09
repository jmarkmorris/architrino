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
export const SPEC_PACKET_REF = "reference/priorities/braid-ideal/fold-crossing-chart-spec.md";
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
export function saturationMarginPerP0({ geo = SUPPORT_V1, Rsea = 4.25, Nt = 12, soft = 0.02, mode = "fast" } = {}) {
  const braid = buildBraid({ u: 0, cTrans: 1.0, geo });
  const w = braid.omega, period = 2 * Math.PI / w;
  const kap = residuals({ u: 0, cTrans: 1.0, geo }, { soft }).kappaStar;
  const dirs = shellDirs().map((v) => [v[0]*Rsea, v[1]*Rsea, v[2]*Rsea]);
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
    const pHat = mode === "fast"
      ? dirs.map((X) => { const E = braidFieldAt(X, braid, t - 2 * Rsea / cf); meanFieldMag += Math.hypot(E[0],E[1],E[2]) / (Nt * dirs.length); return unit(E); })
      : slowDirs;
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
        const E = dipoleField(pHat[q2], dxj);
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
