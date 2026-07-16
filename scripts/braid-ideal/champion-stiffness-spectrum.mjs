// Champion stiffness spectrum (queue item 20).
//
// Computes the gradient and full Hessian of the unified closure residual around
// the Section 22 rest-state champion in seven geometry knobs:
//   x = [qI, qO, alphaI, alphaM, alphaO, thetaO, betaM]
// (angles in radians; radii and betaM dimensionless; the eigenbasis depends on
// this declared scaling -- stated, not hidden). Soft eigenmodes are the strain
// sinks under external hits and accelerative forcing (candidate h-click storage
// per the 2026-07-08 brainstorm); stiff modes are the braid's rigidity backbone.
// The betaM row measures how hard closure resists sliding the middle binary off
// the c_f rail; the alphaM row measures rail-tilt rigidity.
//
// Physics bridge (captured, not computed here): relativistic clock-hypothesis
// tests (decay follows 1/gamma at ~1e18 g) bound how much braid-geometry strain
// per unit acceleration is allowed, i.e. they put a floor under this spectrum
// once the kappa force normalization is fixed.
//
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";
import { residuals } from "./rigid-tilted-nested-braid-evaluator.mjs";

export const SCHEMA = "champion_stiffness_spectrum.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_prescribed_worldline_evaluator_not_native_solver_not_accepted_evidence",
});

const d = Math.PI / 180;
export const CHAMPION = Object.freeze({ qI: 0.5, qO: 1.65, alphaI: -12 * d, alphaM: 0, alphaO: 84 * d, thetaO: 330 * d, betaM: 1.0 });
export const KNOBS = ["qI", "qO", "alphaI", "alphaM", "alphaO", "thetaO", "betaM"];
const STEP = { qI: 0.03, qO: 0.03, alphaI: 2 * d, alphaM: 2 * d, alphaO: 2 * d, thetaO: 3 * d, betaM: 0.01 };

function f(x) {
  const cfg = {
    qI: x.qI, qO: x.qO, alphaI: x.alphaI, alphaM: x.alphaM, alphaO: x.alphaO, betaM: x.betaM,
    phases: [0, (2 * Math.PI) / 3, x.thetaO],
  };
  return residuals(cfg).globalRelResidual;
}
const shift = (x, k, s) => ({ ...x, [k]: x[k] + s });

export function gradientAndHessian(center = CHAMPION) {
  const n = KNOBS.length;
  const f0 = f(center);
  const grad = {}, H = Array.from({ length: n }, () => new Array(n).fill(0));
  const fp = {}, fm = {};
  for (const k of KNOBS) { fp[k] = f(shift(center, k, STEP[k])); fm[k] = f(shift(center, k, -STEP[k])); }
  for (let i = 0; i < n; i++) {
    const k = KNOBS[i];
    grad[k] = (fp[k] - fm[k]) / (2 * STEP[k]);
    H[i][i] = (fp[k] - 2 * f0 + fm[k]) / (STEP[k] * STEP[k]);
  }
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    const a = KNOBS[i], b = KNOBS[j];
    const fpp = f(shift(shift(center, a, STEP[a]), b, STEP[b]));
    const fpm = f(shift(shift(center, a, STEP[a]), b, -STEP[b]));
    const fmp = f(shift(shift(center, a, -STEP[a]), b, STEP[b]));
    const fmm = f(shift(shift(center, a, -STEP[a]), b, -STEP[b]));
    H[i][j] = H[j][i] = (fpp - fpm - fmp + fmm) / (4 * STEP[a] * STEP[b]);
  }
  return { f0, grad, H };
}

// Jacobi eigen-decomposition for the symmetric 7x7.
export function eigenSym(H) {
  const n = H.length;
  const A = H.map((r) => r.slice());
  let V = Array.from({ length: n }, (_, i) => KNOBS.map((_, j) => (i === j ? 1 : 0)));
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] ** 2;
    if (off < 1e-18) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      if (Math.abs(A[p][q]) < 1e-14) continue;
      const th = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
      const c = Math.cos(th), s = Math.sin(th);
      for (let k = 0; k < n; k++) {
        const apk = A[p][k], aqk = A[q][k];
        A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk;
      }
      for (let k = 0; k < n; k++) {
        const akp = A[k][p], akq = A[k][q];
        A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq;
      }
      for (let k = 0; k < n; k++) {
        const vpk = V[p][k], vqk = V[q][k];
        V[p][k] = c * vpk - s * vqk; V[q][k] = s * vpk + c * vqk;
      }
    }
  }
  const pairs = A.map((r, i) => ({ value: r[i], vector: V[i] }));
  pairs.sort((a, b) => a.value - b.value);
  return pairs;
}

export function diagnosticReport() {
  const { f0, grad, H } = gradientAndHessian();
  const modes = eigenSym(H).map((m) => ({
    stiffness: m.value,
    dominant: KNOBS.map((k, j) => [k, m.vector[j]]).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])).slice(0, 3)
      .map(([k, v]) => `${k}:${v.toFixed(2)}`).join(" "),
  }));
  return {
    schema: SCHEMA, specPacketRef: SPEC_PACKET_REF,
    scalingNote: "angles in radians, radii and betaM dimensionless; eigenbasis depends on this declared scaling",
    center: CHAMPION, f0, grad, hessianDiagonal: Object.fromEntries(KNOBS.map((k, i) => [k, H[i][i]])),
    modes,
    ...FAIL_CLOSED,
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) { const pretty = process.argv.includes("--pretty"); process.stdout.write(JSON.stringify(diagnosticReport(), null, pretty ? 2 : 0) + "\n"); }
