// Spindle drift MM-analog anisotropy: small-u scaling-law resolver (spec Section 29).
//
// Section 28 found the closure anisotropy gap f_perp - f_par scaling ~ u^1.5 on a
// coarse grid (u = 0.05/0.1/0.2, soft = 0.02, Nt = 8). A residual first-order
// component would be preferred-frame leakage risk (Hughes-Drever rows), so the
// exponent must be pinned down before the MM-analog claim is usable. This scan:
//  (1) finer u grid, with the REST baseline at matched cadence subtracted, so the
//      gap decomposes into parallel-gain (f_par - f_rest, expected < 0: preferred
//      direction) and perpendicular-loss (f_perp - f_rest, expected > 0);
//  (2) regulator sweep (soft) and cycle-sampling sweep (Nt) to separate physical
//      exponent from regulator/sampling artifact;
//  (3) per-component log-log slope fits.
// Protocol held fixed from Section 28: all three readouts at the parallel-pinned
// cadence cTrans = sqrt(1 - u^2); parallel drift measured both signs (preferred =
// min); perpendicular along +x cycle-sampled over one rotation period.
//
// CLI: node ...-scan.mjs --row --u=0.05 [--soft=0.02] [--nt=8]   -> one JSON row
//      node ...-scan.mjs            -> cheap smoke row (u=0.1) + fail-closed header
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";
import { residuals, residualsPerp, CHAMPION } from "./spindle-braid-screw-drift-evaluator.mjs";

export const SCHEMA = "spindle_drift_anisotropy_scaling_scan.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_prescribed_worldline_evaluator_not_native_solver_not_accepted_evidence",
});

export function scanRow({ u = 0.1, soft = 0.02, Nt = 8 } = {}) {
  const c = Math.sqrt(1 - u * u); // parallel-pinned cadence, held for all three readouts
  const fRest = residuals({ u: 0, cTrans: c, geo: CHAMPION }, { soft }).globalRelResidual;
  const fParPlus = residuals({ u: +u, cTrans: c, geo: CHAMPION }, { soft }).globalRelResidual;
  const fParMinus = residuals({ u: -u, cTrans: c, geo: CHAMPION }, { soft }).globalRelResidual;
  const fPar = Math.min(fParPlus, fParMinus); // preferred leader (helicity-polarity lock)
  const perp = residualsPerp({ u, cTrans: c, geo: CHAMPION }, { Nt, soft });
  const fPerp = perp.globalRelResidual;
  return {
    u, soft, Nt, cPinned: c,
    fRest, fParPlus, fParMinus, fPar, fPerp,
    parallelGain: fPar - fRest,          // expected negative (motion preferred)
    perpendicularLoss: fPerp - fRest,    // expected positive
    gap: fPerp - fPar,
    leaderSign: fParMinus <= fParPlus ? -1 : +1,
    minAbsDsPerp: perp.minAbsDs,
  };
}

// Ordinary least squares slope of log|y| vs log u (log-log exponent fit).
export function logLogSlope(rows, key) {
  const pts = rows.filter((r) => Math.abs(r[key]) > 1e-12).map((r) => [Math.log(r.u), Math.log(Math.abs(r[key]))]);
  if (pts.length < 2) return { n: pts.length, slope: null };
  const n = pts.length;
  const mx = pts.reduce((s, p) => s + p[0], 0) / n, my = pts.reduce((s, p) => s + p[1], 0) / n;
  let sxx = 0, sxy = 0;
  for (const [x, y] of pts) { sxx += (x - mx) ** 2; sxy += (x - mx) * (y - my); }
  return { n, slope: sxy / sxx };
}

export function diagnosticReport() {
  return { schema: SCHEMA, specPacketRef: SPEC_PACKET_REF, smoke: scanRow({ u: 0.1, Nt: 4 }), ...FAIL_CLOSED };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  const arg = (k, dflt) => { const m = process.argv.find((a) => a.startsWith(`--${k}=`)); return m ? Number(m.split("=")[1]) : dflt; };
  if (process.argv.includes("--row")) {
    const row = scanRow({ u: arg("u", 0.1), soft: arg("soft", 0.02), Nt: arg("nt", 8) });
    process.stdout.write(JSON.stringify({ schema: SCHEMA, ...row, ...FAIL_CLOSED }) + "\n");
  } else {
    process.stdout.write(JSON.stringify(diagnosticReport(), null, process.argv.includes("--pretty") ? 2 : 0) + "\n");
  }
}
