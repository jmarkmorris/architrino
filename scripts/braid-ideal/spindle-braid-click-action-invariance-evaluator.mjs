// h_act(u) invariance evaluator (brainstorm entry 16, dynamical half; spec Section 31).
//
// Question: is the action transacted per hinge click u-invariant (Planck constant as
// topological bookkeeping) or does it run with drift? First-pass operational setup:
// the drifting spindle at pinned cadence c = sqrt(1-u^2) (screw motion, rigid, so all
// per-site wake accelerations are constant in the co-screwing frame and cycle
// integrals are exact single-time products). "Click" here = one hinge (rotation)
// period T = 2*pi/omega, the prescribed-family stand-in for the native self-hit
// click ledger (which the native confirmation thread owns). Three action-dimension
// candidates per click, per unit mass, absolute-time units, with the fitted closure
// coupling kappa*(u) as the wake->kinematic bridge:
//   S_kin(u)  = 2*pi*omega * sum_a (R_a cos alpha_a)^2   -- stored internal action
//                (kinematic angular momentum * 2*pi/omega); frozen geometry predicts
//                S_kin ~ 1/gamma if omega is pinned;
//   J_z(u)    = T * kappa* * sum_a [r_a x a_a]_z          -- wake angular impulse
//                transacted per click about the drift axis (the pump's torque ledger);
//   S_E(u)    = (kappa* * sum_a a_a . v_a) * T^2          -- pump-work action per click
//                (power * T = energy per click; * T again = action).
// Readout: each candidate's ratio to its rest value vs u, against the three clean
// hypotheses const / 1/gamma / gamma. Preferred drift sign (electrino cap leads).
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";
import { buildBraid, wakeAccel, residuals, CHAMPION } from "./spindle-braid-screw-drift-evaluator.mjs";

export const SCHEMA = "spindle_braid_click_action_invariance_evaluator.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_prescribed_worldline_evaluator_not_native_solver_not_accepted_evidence",
});

// Local copies of the evaluator's worldline formulas (kept in sync with
// spindle-braid-screw-drift-evaluator.mjs pos/vel; screw motion, t = 0 sample).
function pos0(s, u) {
  const a = s.th, ca = Math.cos(s.alpha);
  return [s.sgn * s.R * ca * Math.cos(a), s.sgn * s.R * ca * Math.sin(a), s.sgn * s.R * Math.sin(s.alpha)];
}
function vel0(s, w, u) {
  const a = s.th, v = s.sgn * s.R * Math.cos(s.alpha) * w;
  return [-v * Math.sin(a), v * Math.cos(a), u];
}

// u is SIGNED here (negative = preferred leader, electrino cap forward); the
// cadence pin uses |u|. invarianceScan maps its u-grid onto the preferred sign.
export function clickActionRow({ u = 0, geo = CHAMPION, soft = 0.02 } = {}) {
  const uSigned = u;
  const c = Math.sqrt(1 - u * u); // pinned cadence (even in u)
  const braid = buildBraid({ u: uSigned, cTrans: c, geo });
  const w = braid.omega, T = (2 * Math.PI) / w;
  const kappaStar = residuals({ u: uSigned, cTrans: c, geo }, { soft }).kappaStar;
  let sumRc2 = 0, tauZ = 0, power = 0;
  for (let i = 0; i < braid.sites.length; i++) {
    const s = braid.sites[i];
    sumRc2 += (s.R * Math.cos(s.alpha)) ** 2;
    const r = pos0(s, uSigned), v = vel0(s, w, uSigned);
    const a = wakeAccel(braid, i, 0, { soft }).a;
    tauZ += r[0] * a[1] - r[1] * a[0];   // [r x a]_z
    power += a[0] * v[0] + a[1] * v[1] + a[2] * v[2];
  }
  const Skin = 2 * Math.PI * w * sumRc2;
  const Jz = T * kappaStar * tauZ;
  const SE = kappaStar * power * T * T;
  return { u, cPinned: c, omega: w, T, kappaStar, Skin, Jz, SE, gamma: 1 / Math.sqrt(1 - u * u) };
}

// Helicity decomposition of the transacted angular impulse per click: odd part
// (leader-selected, linear in u at small u) and even part (helicity-averaged).
export function JzHelicityDecomposition({ u = 0.1, geo = CHAMPION, soft = 0.02 } = {}) {
  const rest = clickActionRow({ u: 0, geo, soft });
  const minus = clickActionRow({ u: -Math.abs(u), geo, soft });
  const plus = clickActionRow({ u: +Math.abs(u), geo, soft });
  return {
    u: Math.abs(u),
    oddPart: (minus.Jz - plus.Jz) / (2 * rest.Jz),
    evenDeficit: 1 - (minus.Jz + plus.Jz) / (2 * rest.Jz),
  };
}

export function invarianceScan({ us = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6], geo = CHAMPION, soft = 0.02 } = {}) {
  const rows = us.map((u) => clickActionRow({ u: -Math.abs(u), geo, soft })); // preferred sign
  const rest = rows[0];
  const table = rows.map((r) => ({
    u: Math.abs(r.u), gamma: r.gamma, invGamma: 1 / r.gamma, kappaRatio: r.kappaStar / rest.kappaStar,
    SkinRatio: r.Skin / rest.Skin, JzRatio: r.Jz / rest.Jz, SERatio: r.SE / rest.SE,
  }));
  return { schema: SCHEMA, specPacketRef: SPEC_PACKET_REF, rest, table, ...FAIL_CLOSED };
}

export function diagnosticReport() { return invarianceScan({ us: [0, 0.3] }); }

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  const full = process.argv.includes("--full");
  const out = full ? invarianceScan({}) : diagnosticReport();
  process.stdout.write(JSON.stringify(out, null, process.argv.includes("--pretty") ? 2 : 0) + "\n");
}
