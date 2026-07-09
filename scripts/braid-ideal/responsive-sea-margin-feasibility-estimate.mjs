// Responsive-sea margin feasibility estimate (spec Section 38).
//
// Section 37's sum rule: the rigid spindle family self-supports ~94% of its radial
// budget; the missing ~6% is hypothesized environmental. This instrument asks, at
// linear-response estimate grade, whether DYNAMIC sea polarization can supply an
// isotropic inward margin at the working radius — and with what sign structure.
//
// Model: polarizable point-dipoles on a shell at R_sea (6- or 12-direction), each
// responding LINEARLY (declared polarizability alpha, instantaneous internal
// response) to the braid's field EMITTED at the retarded time, and acting back on
// each braid site with its dipole field again at the retarded time. The full loop
// therefore carries the causal double delay ~ 2 R_sea / c_f. For a rotating braid
// multipole this delay sets the ANGLE between the braid's present orientation and
// the reaction field: the confinement sign is expected to oscillate with
// cos(2 omega R_sea)-flavored phases — sea confinement would be SPACING-SELECTIVE,
// a causal-delay effect with no instantaneous analogue.
//
// Readouts: per-layer added support fraction per unit alpha (margin is linear in
// alpha), the alpha required for the 6% global margin, and the R_sea sweep of the
// sign. The mapping from alpha to an actual Noether-sea assembly's polarizability
// is OPEN (sh-0-sea program); this instrument produces the requirement, not the
// availability. NOT evidence; fail-closed.

import { fileURLToPath } from "node:url";
import { buildBraid, residuals } from "./spindle-braid-screw-drift-evaluator.mjs";

export const SCHEMA = "responsive_sea_margin_feasibility_estimate.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_linear_response_estimate_not_native_solver_not_accepted_evidence",
});

const cf = 1;
const d = Math.PI / 180;
export const SUPPORT_V1 = Object.freeze({ qI: 0.462, qO: 1.236, alphaI: -10.44 * d, alphaM: -2.67 * d, alphaO: 84 * d, thetaO: 337.04 * d, thetaI: -23.7 * d });

function shellDirs(n) {
  if (n === 6) return [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
  // 12-direction FCC-like: normalized (±1,±1,0) permutations
  const out = [];
  const s = Math.SQRT1_2;
  for (const [a,b] of [[1,1],[1,-1],[-1,1],[-1,-1]]) { out.push([a*s,b*s,0],[a*s,0,b*s],[0,a*s,b*s]); }
  return out;
}

function sitePos(s, t, w) {
  const a = w * t + s.th, ca = Math.cos(s.alpha);
  return [s.sgn * s.R * ca * Math.cos(a), s.sgn * s.R * ca * Math.sin(a), s.sgn * s.R * Math.sin(s.alpha)];
}

// Braid Coulomb-flavored field at point X, braid evaluated at (individually) retarded times.
function braidFieldAt(X, braid, t) {
  let E = [0, 0, 0];
  for (const s of braid.sites) {
    // solve retarded time by fixed-point (positions bounded, converges fast)
    let te = t - 4.25; // seed guess
    for (let it = 0; it < 30; it++) {
      const p = sitePos(s, te, braid.omega);
      const r = Math.hypot(X[0]-p[0], X[1]-p[1], X[2]-p[2]);
      te = t - r / cf;
    }
    const p = sitePos(s, te, braid.omega);
    const dx = [X[0]-p[0], X[1]-p[1], X[2]-p[2]];
    const r = Math.hypot(dx[0], dx[1], dx[2]);
    for (let c = 0; c < 3; c++) E[c] += (s.pol * dx[c]) / (r * r * r);
  }
  return E;
}

// Dipole field of p at displacement rvec (from dipole to field point).
function dipoleField(p, rvec) {
  const r = Math.hypot(rvec[0], rvec[1], rvec[2]);
  const rh = [rvec[0]/r, rvec[1]/r, rvec[2]/r];
  const pr = p[0]*rh[0] + p[1]*rh[1] + p[2]*rh[2];
  return [ (3*pr*rh[0] - p[0]) / (r**3), (3*pr*rh[1] - p[1]) / (r**3), (3*pr*rh[2] - p[2]) / (r**3) ];
}

// Per-layer added inward support fraction PER UNIT ALPHA (margin linear in alpha).
export function seaMarginPerAlpha({ geo = SUPPORT_V1, Rsea = 4.25, nDirs = 6, Nt = 12, soft = 0.02 } = {}) {
  const braid = buildBraid({ u: 0, cTrans: 1.0, geo });
  const w = braid.omega, period = 2 * Math.PI / w;
  const kap = residuals({ u: 0, cTrans: 1.0, geo }, { soft }).kappaStar;
  const dirs = shellDirs(nDirs).map((v) => [v[0]*Rsea, v[1]*Rsea, v[2]*Rsea]);
  const acc = { I: 0, M: 0, O: 0 };
  for (let k = 0; k < Nt; k++) {
    const t = (k / Nt) * period;
    // each sea dipole: responds to the braid field that ARRIVES at it at time t - Rj/cf... 
    // we need its state at the emission time relevant for arrival at the braid at time t:
    // back-field arriving at braid at t was emitted by the dipole at t - r_bs/cf, whose state
    // read the braid field of t - r_bs/cf - R/cf. Approximate r_bs by Rsea (braid radius << Rsea).
    const pDip = dirs.map((X) => braidFieldAt(X, braid, t - Rsea / cf - Rsea / cf)); // per unit alpha... field evaluation already retards internally by one leg from the braid; pass emission epoch t - Rsea/cf
    for (const i of [0, 2, 4]) {
      const s = braid.sites[i];
      const xj = sitePos(s, t, w);
      const rhoCyl = s.R * Math.cos(s.alpha);
      const rx = Math.cos(w * t + s.th), ry = Math.sin(w * t + s.th);
      let inward = 0;
      for (let q2 = 0; q2 < dirs.length; q2++) {
        const E = dipoleField(pDip[q2], [xj[0]-dirs[q2][0], xj[1]-dirs[q2][1], xj[2]-dirs[q2][2]]);
        inward += -(s.pol) * (E[0]*rx + E[1]*ry); // force on site = pol * E; inward-positive
      }
      const need = w * w * rhoCyl;
      acc[s.name] += (kap * inward) / need / Nt;
    }
  }
  return { Rsea, nDirs, kappaStar: kap, marginPerAlpha: acc,
    meanPerAlpha: (acc.I + acc.M + acc.O) / 3 };
}

export function spacingSweep({ Rseas = [2.5, 3.0, 3.5, 4.0, 4.25, 4.5, 5.0, 5.5, 6.0], nDirs = 6, Nt = 8 } = {}) {
  return Rseas.map((Rsea) => { const r = seaMarginPerAlpha({ Rsea, nDirs, Nt }); return { Rsea, mean: r.meanPerAlpha, I: r.marginPerAlpha.I, M: r.marginPerAlpha.M, O: r.marginPerAlpha.O }; });
}

export function diagnosticReport() {
  const named = seaMarginPerAlpha({});
  return { schema: SCHEMA, specPacketRef: SPEC_PACKET_REF, named,
    alphaRequiredForSixPercent: named.meanPerAlpha !== 0 ? 0.06 / named.meanPerAlpha : null,
    ...FAIL_CLOSED };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  process.stdout.write(JSON.stringify(diagnosticReport(), null, process.argv.includes("--pretty") ? 2 : 0) + "\n");
}
