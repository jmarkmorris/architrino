// Support-ratio-targeted configuration search (queue item 25; spec Section 36).
//
// Sections 30-35 establish that per-layer RADIAL SUPPORT RATIOS at the unified
// fitted kappa*, not closure residuals, are the survivability statistic: the
// native release converts any support deficit into secular dispersal, and the
// clicker can trim only the last ~3% (s_min ~ 0.97). This search re-runs the
// spindle-family configuration hunt with the objective J = sum_a (s_a - 1)^2
// (closure residual reported as the secondary criterion), over the family knobs
// at pinned cadence, with the toy static sea available as a dressing option.
//
// s_a = kappa* x (inward radial wake force on layer a) / (centripetal need of
// layer a), computed on the same single-time rigid evaluation as the closure
// metric, kappa* fitted globally by the unified least-squares bridge.
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";
import { buildBraid, wakeAccel, residuals, CHAMPION } from "./spindle-braid-screw-drift-evaluator.mjs";

export const SCHEMA = "spindle_support_ratio_targeted_search.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_prescribed_worldline_evaluator_not_native_solver_not_accepted_evidence",
});

const d = Math.PI / 180;

export function supportRatios({ geo = CHAMPION, cTrans = 1.0, sea = null, soft = 0.02, lambdaTan = 0 } = {}) {
  const braid = buildBraid({ u: 0, cTrans, geo, sea });
  const w = braid.omega;
  const res = residuals({ u: 0, cTrans, geo, sea }, { soft });
  const kap = res.kappaStar;
  const layers = [];
  for (const i of [0, 2, 4]) {
    const s = braid.sites[i];
    const rhoCyl = s.R * Math.cos(s.alpha);
    // site at t=0: azimuth th; cylindrical radial and tangential unit vectors
    const rx = Math.cos(s.th), ry = Math.sin(s.th);
    const tx = -Math.sin(s.th), ty = Math.cos(s.th);
    const wk = wakeAccel(braid, i, 0, { soft }).a;
    const inward = -(wk[0] * rx + wk[1] * ry); // wake radial force, inward-positive (unit kappa)
    const need = w * w * rhoCyl;               // centripetal need (unit mass)
    const tanRow = kap * (wk[0] * tx + wk[1] * ty); // per-layer tangential DC row at kappa* (want 0)
    layers.push({ layer: s.name, support: (kap * inward) / need, tanRow, rhoCyl, speed: w * rhoCyl });
  }
  return { kappaStar: kap, closure: res.globalRelResidual,
    ratios: Object.fromEntries(layers.map((l) => [l.layer, l.support])),
    tanRows: Object.fromEntries(layers.map((l) => [l.layer, l.tanRow])),
    speeds: Object.fromEntries(layers.map((l) => [l.layer, l.speed])),
    minRatio: Math.min(...layers.map((l) => l.support)),
    maxAbsTan: Math.max(...layers.map((l) => Math.abs(l.tanRow))),
    objective: layers.reduce((s2, l) => s2 + (l.support - 1) ** 2 + lambdaTan * l.tanRow * l.tanRow, 0) };
}

// Coordinate-descent search on J = sum (s_a - 1)^2 over the spindle knobs.
export function searchSupport({ start = CHAMPION, sea = null, rounds = 3, soft = 0.02, stepScale = 1, lambdaTan = 0 } = {}) {
  const steps = { qI: 0.05 * stepScale, qO: 0.08 * stepScale, alphaI: 4 * d * stepScale, alphaM: 3 * d * stepScale, alphaO: 3 * d * stepScale, thetaO: 8 * d * stepScale, thetaI: 8 * d * stepScale };
  let g = { thetaI: 0, ...start };
  let best = supportRatios({ geo: g, sea, soft, lambdaTan });
  const trace = [{ geo: { ...g }, ...best }];
  for (let r = 0; r < rounds; r++) {
    for (const k of Object.keys(steps)) {
      for (const sgn of [+1, -1]) {
        let improved = true;
        while (improved) {
          const trial = { ...g, [k]: g[k] + sgn * steps[k] };
          if (trial.qI < 0.1 || trial.qO < 0.15) break; // geometric floors
          const t = supportRatios({ geo: trial, sea, soft, lambdaTan });
          if (t.objective < best.objective - 1e-6) { g = trial; best = t; } else improved = false;
        }
      }
    }
    trace.push({ geo: { ...g }, ...best });
  }
  return { start, best: { geo: g, deg: { alphaI: g.alphaI / d, alphaM: g.alphaM / d, alphaO: g.alphaO / d, thetaO: g.thetaO / d }, ...best }, trace: trace.map(({ geo, objective, minRatio, closure, ratios }) => ({ geo, objective, minRatio, closure, ratios })) };
}

export function diagnosticReport() {
  return { schema: SCHEMA, specPacketRef: SPEC_PACKET_REF,
    championBaseline: supportRatios({}), ...FAIL_CLOSED };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  process.stdout.write(JSON.stringify(diagnosticReport(), null, process.argv.includes("--pretty") ? 2 : 0) + "\n");
}
