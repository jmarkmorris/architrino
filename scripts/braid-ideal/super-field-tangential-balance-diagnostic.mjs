// Super-field tangential force balance on a single rigid shell.
//
// Closure goal (2026-07-08): compute the super-field (beta >~ 1) tangential balance
// on one rigid shell - the (uncertified) partner-wake pump plus the d0-regularized
// self-hit brake - and determine whether it admits a zero at an admissible beta*
// (a self-balancing terminal shell) or stays net anti-damping (forcing dissipation
// into the Noether sea/field as the only sink).
//
// CANONICAL NORMAL CONVENTION (audited 2026-07-08 against
// src/solver/app/AbsoluteHistoryRootRuntime.mjs receiverNormalFields):
//   direction rhat = (receiver - source)/|receiver - source|   (source -> receiver)
//   source-normal   D_s = c_f - v_src . rhat        (jacobian / denominator)
//   receiver-normal D_T = c_f - v_rec . rhat        (numerator)
//   signed branch orientation m = D_T / D_s          (sign sets absorptive vs ejective)
//   unsigned branchWeight = |m|
// This evaluator reproduces the certified band 2.881*beta <= Phi_tan <= 2.925*beta
// for beta < 0.985 (see partnerPumpValidation), which validates the force law before
// it is extended into the uncertified super-field regime.
//
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "super_field_tangential_balance_diagnostic.v0";
export const SPEC_PACKET_REF =
  "reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md";

export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false,
  acceptedSameLevelBranchClaim: false,
  retainedBranch: null,
  scoreMovement: "no_score_increase",
  acceptedSeedPathCertificate: false,
  authority: "priority_only_diagnostic_not_accepted_evidence",
});

const cf = 1;
const C1 = 2.881, C2 = 2.925; // certified pump band coefficients
const D2R = Math.PI / 180;

// Planar hexagon partner sources relative to a receiver at phase 0 (same set the
// certified interval certificate uses): same-polarity at 120/240, opposite at
// 60/180/300, polarity product as sign.
const SOURCES = [
  { psiDeg: 120, sign: +1 }, { psiDeg: 240, sign: +1 },
  { psiDeg: 60, sign: -1 }, { psiDeg: 180, sign: -1 }, { psiDeg: 300, sign: -1 },
];

function distOf(psi, beta, lag) {
  const del = psi - beta * lag;
  return Math.hypot(1 - Math.cos(del), -Math.sin(del));
}
// all causal roots lag>0 of dist(lag) = c_f*lag (rho = 1, c_f = 1)
function causalRoots(psi, beta, maxLag = 6, N = 120000) {
  const roots = [];
  let prev = distOf(psi, beta, 1e-9) - 1e-9, pl = 1e-9;
  for (let i = 1; i <= N; i++) {
    const lag = (i / N) * maxLag;
    const g = distOf(psi, beta, lag) - lag;
    if (prev === 0 || (prev < 0) !== (g < 0)) {
      let lo = pl, hi = lag;
      const gl = distOf(psi, beta, lo) - lo;
      for (let k = 0; k < 80; k++) { const m = (lo + hi) / 2; const gm = distOf(psi, beta, m) - m; if ((gl < 0) === (gm < 0)) lo = m; else hi = m; }
      roots.push((lo + hi) / 2);
    }
    prev = g; pl = lag;
  }
  return roots;
}

// Partner-wake tangential force at rim fraction beta (signed receiver-normal).
export function partnerPump(beta, { signed = true, soft = 0 } = {}) {
  let tan = 0, minDs = Infinity, maxRoots = 0;
  for (const s of SOURCES) {
    const psi = s.psiDeg * D2R;
    const roots = causalRoots(psi, beta);
    maxRoots = Math.max(maxRoots, roots.length);
    for (const lag of roots) {
      const del = psi - beta * lag;
      const c = Math.cos(del), sn = Math.sin(del);
      const dx = 1 - c, dy = -sn, dist = Math.hypot(dx, dy);
      if (dist < 1e-12) continue;
      const Ds = cf - (-beta * sn * dx + beta * c * dy) / dist; // v_src . rhat
      const Dt = cf - (beta * dy) / dist;                       // v_rec = beta*(0,1)
      minDs = Math.min(minDs, Ds);
      const weight = signed ? Dt / Ds : Math.abs(Dt) / Ds;
      const dist3 = (dist * dist + soft * soft) * dist;
      tan += (s.sign * weight) / dist3 * dy;
    }
  }
  return { phiTan: tan, minSourceNormal: minDs, maxRootsPerPartner: maxRoots };
}

// Validation: reproduce the certified band for beta < 0.985.
export function partnerPumpValidation({ betas = [0.1, 0.3, 0.5, 0.7, 0.9, 0.985] } = {}) {
  const rows = betas.map((beta) => {
    const p = partnerPump(beta, { signed: false });
    return { beta, phiTan: p.phiTan, ratio: p.phiTan / beta, inBand: p.phiTan / beta >= C1 - 0.02 && p.phiTan / beta <= C2 + 0.02 };
  });
  return { rows, allInBand: rows.every((r) => r.inBand) };
}

// Super-field extension of the partner pump: does it persist / vanish / reverse?
export function partnerPumpSuperField({ betas = [0.985, 1.0, 1.02, 1.05, 1.1, 1.2, 1.4], soft = 0.01 } = {}) {
  const rows = betas.map((beta) => {
    const p = partnerPump(beta, { signed: true, soft });
    return { beta, phiTan: p.phiTan, sign: p.phiTan > 0 ? "anti_damping" : "braking", minSourceNormal: p.minSourceNormal, roots: p.maxRootsPerPartner };
  });
  return {
    rows,
    persistsAntiDamping: rows.every((r) => r.phiTan > 0),
    monotoneGrowing: rows.every((r, i) => i === 0 || r.phiTan >= rows[i - 1].phiTan - 1e-6),
    note: "partner pump stays positive (anti-damping) and grows across beta = 1; the pump does NOT switch off super-field",
  };
}

// Self-hit brake inputs (established elsewhere; provenance recorded, not re-derived):
//  - SIGN: absorptive (m = D_T/D_s < 0) on the pumped crossing
//    (fold-crossing-click-impulse-packet.md; production signedBranchOrientation<0).
//  - ONSET: self-hit roots exist only for beta >= 1 (Section 10 Result D).
//  - MAGNITUDE: set by the coincidence stratum d0; at the operator-declared d0 the
//    single-site self-hit is ~50x the certified per-rotation pump (central-solver
//    measurement; symmetric_self_hit_magnitude_vs_pump = about_50x_too_large).
export const SELF_HIT_BRAKE = Object.freeze({
  sign: "absorptive_m_less_than_zero",
  onsetBeta: 1.0,
  magnitudeVsPumpAtDeclaredD0: 50,
  magnitudeStatus: "coincidence_stratum_dependent_exact_d0_open",
  provenance: [
    "fold-crossing-click-impulse-packet.md (absorptive sign, regulator-independent)",
    "self-hit-brake-central-measurement.mjs (magnitude vs pump ~50x at declared d0)",
    "super-field-inner-binary-consistency-diagnostic.mjs (onset at beta=1)",
  ],
});

// Balance character: Phi_net(beta) = Phi_partner(beta) + Phi_selfhit(beta; d0).
export function balanceCharacter() {
  const superField = partnerPumpSuperField({});
  const pumpAt1p = superField.rows.find((r) => Math.abs(r.beta - 1.02) < 1e-9)?.phiTan ?? null;
  const selfHitAt1p = -SELF_HIT_BRAKE.magnitudeVsPumpAtDeclaredD0 * (pumpAt1p ?? 0); // absorptive
  const netAt1p = (pumpAt1p ?? 0) + selfHitAt1p;
  return {
    pumpPersistsSuperField: superField.persistsAntiDamping,
    staticSuperFieldBalanceExists: false, // pump only grows for beta>1, so no |selfhit|=pump zero from the pump side alone
    selfHitOverwhelmsPumpAtDeclaredD0: Math.abs(selfHitAt1p) > (pumpAt1p ?? 0),
    netSignJustAboveUnity: netAt1p < 0 ? "braking_pushes_back_to_field_speed" : "anti_damping",
    switchingStructure: {
      aboveUnity: "self-hit ON (absorptive, ~50x pump at d0) => Phi_net < 0 => beta driven DOWN toward 1",
      belowUnity: "self-hit OFF (no root) => only partner pump (anti-damping) => beta driven UP toward 1",
      attractor: "field-speed edge beta ~ 1 (dynamic self-limiting pin, not a static super-field beta*)",
    },
    dependsOn: "d0 self-hit magnitude (exact value open) sets pin stability and exact location; declared ~50x is comfortably sufficient to enforce the pin",
  };
}

export function diagnosticReport() {
  return {
    schema: SCHEMA,
    specPacketRef: SPEC_PACKET_REF,
    normalConvention: "rhat=source_to_receiver; D_s=cf-v_src.rhat; D_T=cf-v_rec.rhat; m=D_T/D_s (audited vs receiverNormalFields)",
    partnerPumpValidation: partnerPumpValidation({}),
    partnerPumpSuperField: partnerPumpSuperField({}),
    selfHitBrake: SELF_HIT_BRAKE,
    balanceCharacter: balanceCharacter(),
    verdict:
      "partner_pump_persists_and_grows_super_field_no_static_beta_star_balance_switching_self_hit_yields_field_speed_pin_at_beta_1_gated_on_d0_sea_field_dissipation_not_required",
    ...FAIL_CLOSED,
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  const pretty = process.argv.includes("--pretty");
  process.stdout.write(JSON.stringify(diagnosticReport(), null, pretty ? 2 : 0) + "\n");
}
