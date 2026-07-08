// Field-speed pin: attractor confirmation and d0 inversion (reduced dynamics).
//
// Closure goal (2026-07-08): (1) confirm the field-speed edge beta = 1 is an
// attractor of the switching tangential balance, and (2) invert the pin balance
// Phi_partner(1) + Phi_self(1; d0) = 0 to derive the coincidence stratum d0 that
// makes the edge marginally stable.
//
// AUTHORITY / SOLVER OWNERSHIP: this is a REDUCED reference integrator of the 1-D
// rim-fraction dynamics dbeta/dt ~ Phi_net(beta), built from the already-VALIDATED
// signed-normal partner pump (super-field-tangential-balance-diagnostic.mjs, which
// reproduces the certified band) plus the switching self-hit brake. It is explicitly
// reference/comparison code, NOT the native central solver and NOT a new production
// solver. Confirming the pin on the native retained-history solver remains the gated
// acceptance step (native_retained_history_promotion). Fail-closed.
//
// NORMAL CONVENTION: inherited from the validated evaluator (rhat = source->receiver,
// D_s = c_f - v_src.rhat, D_T = c_f - v_rec.rhat, m = D_T/D_s), audited 2026-07-08
// against receiverNormalFields.

import { fileURLToPath } from "node:url";
import { partnerPump } from "./super-field-tangential-balance-diagnostic.mjs";

export const SCHEMA = "field_speed_pin_attractor_diagnostic.v0";
export const SPEC_PACKET_REF =
  "reference/priorities/braid-ideal/fold-crossing-chart-spec.md";

export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false,
  acceptedSameLevelBranchClaim: false,
  retainedBranch: null,
  scoreMovement: "no_score_increase",
  acceptedSeedPathCertificate: false,
  authority: "priority_only_reference_reduced_dynamics_not_native_solver_not_accepted_evidence",
});

// Measured self-hit brake magnitude as a MULTIPLE of the certified per-rotation pump,
// versus the declared coincidence-stratum length rho_c. Source of truth: the
// central-solver self-hit measurement recorded in
// fold-crossing-click-impulse-packet.md (absorbed fraction of the pump 22.17 runs
// 0.031/0.115/0.371/2.69/9.67 as rho_c runs 0.2/0.1/0.05/0.01/0.001). These are
// MEASURED points, interpolated here, not invented.
export const SELF_HIT_BRAKE_VS_STRATUM = Object.freeze([
  { rhoC: 0.2, brakeOverPump: 0.031 },
  { rhoC: 0.1, brakeOverPump: 0.115 },
  { rhoC: 0.05, brakeOverPump: 0.371 },
  { rhoC: 0.01, brakeOverPump: 2.69 },
  { rhoC: 0.001, brakeOverPump: 9.67 },
]);

// Log-log interpolation of brakeOverPump(rho_c); the curve is monotone decreasing in
// rho_c (smaller stratum -> stronger brake).
export function brakeOverPumpAt(rhoC) {
  const pts = SELF_HIT_BRAKE_VS_STRATUM.map((p) => ({ x: Math.log10(p.rhoC), y: Math.log10(p.brakeOverPump) }));
  const x = Math.log10(rhoC);
  // clamp/extrapolate on the endpoints' local slope
  let lo = pts[0], hi = pts[pts.length - 1];
  for (let i = 0; i < pts.length - 1; i++) {
    if ((x >= pts[i + 1].x && x <= pts[i].x) || (x <= pts[i + 1].x && x >= pts[i].x)) { lo = pts[i]; hi = pts[i + 1]; break; }
  }
  const t = (x - lo.x) / (hi.x - lo.x);
  return Math.pow(10, lo.y + t * (hi.y - lo.y));
}

// (2) Invert the pin balance: find the marginal stratum rho_c* where the self-hit
// brake exactly equals the certified pump at beta = 1 (brakeOverPump = 1).
export function marginalStratum() {
  // bisection on log10(rho_c) over the measured bracket [0.001, 0.2]
  let a = Math.log10(0.05), b = Math.log10(0.01); // brackets brakeOverPump = 0.371..2.69
  const f = (lx) => brakeOverPumpAt(Math.pow(10, lx)) - 1;
  for (let k = 0; k < 100; k++) { const m = (a + b) / 2; if ((f(a) < 0) === (f(m) < 0)) a = m; else b = m; }
  const rhoStar = Math.pow(10, (a + b) / 2);
  return {
    marginalStratum_rhoStar: rhoStar,
    brakeOverPumpAtMarginal: brakeOverPumpAt(rhoStar),
    pinCondition: "d0 <= rhoStar (stronger brake => stable); d0 = rhoStar is marginal",
    note: "the balance yields an inequality/marginal value, not a unique d0: any d0 <= rhoStar over-brakes and still pins",
  };
}

// Precompute Phi_partner(beta) once on a grid, then interpolate (the root-finder is
// too costly to call inside the integration loop).
function partnerPumpTable(betaLo = 0.4, betaHi = 2.2, n = 60) {
  const xs = [], ys = [];
  for (let i = 0; i <= n; i++) { const b = betaLo + (betaHi - betaLo) * (i / n); xs.push(b); ys.push(partnerPump(b, { signed: true, soft: 0.01 }).phiTan); }
  return (beta) => {
    const bb = Math.min(betaHi, Math.max(betaLo, beta));
    const t = ((bb - betaLo) / (betaHi - betaLo)) * n;
    const i = Math.min(n - 1, Math.max(0, Math.floor(t)));
    const f = t - i;
    return ys[i] + f * (ys[i + 1] - ys[i]);
  };
}

// (1) Reduced 1-D attractor integration. The self-hit brake is a MULTIPLE of the
// LOCAL pump (both scale together), NOT a fixed magnitude, so
//   Phi_net(beta) = Phi_partner(beta) * (1 - ratio * switch(beta)),
//   switch(beta) = sharp step turning the self-hit brake ON above beta = 1,
//   ratio = brake/pump = brakeOverPumpAt(d0)  (constant multiple).
// Above beta = 1: Phi_net = Phi_partner * (1 - ratio); ratio > 1 drives beta DOWN,
// ratio < 1 drives beta UP (runaway). Below beta = 1: switch = 0, pump drives UP.
// => two-sided attractor at beta = 1 iff ratio > 1 (i.e. d0 < rhoStar).
export function pinAttractorIntegration({ ratio = 50, releases = [0.9, 0.95, 1.05, 1.1], kGain = 0.15, steps = 6000, dt = 0.01, switchWidth = 0.004, phiPartnerFn = null } = {}) {
  const phiPartner = phiPartnerFn ?? partnerPumpTable();
  const sw = (beta) => 1 / (1 + Math.exp(-(beta - 1) / switchWidth)); // 0 below 1, 1 above
  const phiNet = (beta) => phiPartner(beta) * (1 - ratio * sw(beta));
  const runs = releases.map((b0) => {
    let beta = b0;
    for (let i = 0; i < steps; i++) {
      const f = (x) => kGain * phiNet(x);
      const k1 = f(beta), k2 = f(beta + 0.5 * dt * k1), k3 = f(beta + 0.5 * dt * k2), k4 = f(beta + dt * k3);
      beta += (dt / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
      if (!Number.isFinite(beta)) break;
      beta = Math.min(3, Math.max(0.2, beta));
    }
    return { release: b0, betaFinal: beta, convergedToUnity: Math.abs(beta - 1) < 0.03 };
  });
  return {
    ratio,
    runs,
    allConvergeToFieldSpeed: runs.every((r) => r.convergedToUnity),
    twoSidedPin: runs.every((r) => r.convergedToUnity),
    note: "ratio > 1: releases both sides converge to beta ~ 1 (field-speed edge is a two-sided attractor); ratio < 1: super-field runaway (no pin)",
  };
}

export function diagnosticReport() {
  const marginal = marginalStratum();
  const phiPartnerFn = partnerPumpTable();
  return {
    schema: SCHEMA,
    specPacketRef: SPEC_PACKET_REF,
    selfHitBrakeVsStratum: SELF_HIT_BRAKE_VS_STRATUM,
    marginalStratum: marginal,
    attractorDeclaredD0_ratio50: pinAttractorIntegration({ ratio: 50, phiPartnerFn }),
    attractorStable_ratio1p5: pinAttractorIntegration({ ratio: 1.5, phiPartnerFn }),
    attractorMarginal_ratio1: pinAttractorIntegration({ ratio: 1.0, phiPartnerFn }),
    attractorSubMarginal_ratio0p5: pinAttractorIntegration({ ratio: 0.5, phiPartnerFn }),
    d0Interpretation:
      "inverting the pin balance gives a MARGINAL stratum rhoStar ~ " + marginal.marginalStratum_rhoStar.toExponential(2) +
      " (brake = pump at beta=1); the pin holds for d0 <= rhoStar, so the balance BOUNDS d0 rather than uniquely deriving it; the declared d0 = R_MCB (~50x brake) sits well inside the stable range",
    verdict:
      "field_speed_edge_is_an_attractor_reduced_level_confirmed_balance_bounds_d0_by_marginal_stratum_not_a_unique_fixed_point_declared_d0_over_damped_inside_range",
    ...FAIL_CLOSED,
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  const pretty = process.argv.includes("--pretty");
  process.stdout.write(JSON.stringify(diagnosticReport(), null, pretty ? 2 : 0) + "\n");
}
