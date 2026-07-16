// Signed re-derivation of the Section 9 cross-hit coexistence absorption.
//
// Closure goal (2026-07-08): Section 9 summed cross-hit click MAGNITUDES to report a
// "~3x surplus" absorption. It never evaluated the per-click receiver-normal SIGN
// m = D_T/D_s. This owner script redoes the tangential transfer to the sub-field
// outer receiver with the canonical SIGNED convention (audited against
// receiverNormalFields; the same signed m validated in the super-field balance,
// spec Section 11).
//
// Convention: rhat = (x_recv - x_src)/|..| (source->receiver); D_s = c_f - v_src.rhat;
// D_T = c_f - v_recv.rhat; signed m = D_T/D_s. Tangential force on the receiver from
// one source is f = sigma * m * (rhat . that_recv) / L^2 (kappa=|qq|=1), with
// that_recv the receiver tangential unit (= v_recv direction). f<0 brakes the receiver
// (absorptive); f>0 accelerates it (ejective). The fold pole D_s->0 is regulated as
// m = D_T*D_s/(D_s^2 + soft^2).
//
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "cross_hit_signed_absorption_recheck.v0";
export const SPEC_PACKET_REF =
  "reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_diagnostic_not_accepted_evidence",
});

const cf = 1;
const pos = (s, t) => { const a = s.w * t + s.phi; return [s.R * Math.cos(a), s.R * Math.sin(a)]; };
const vel = (s, t) => { const a = s.w * t + s.phi; return [-s.R * s.w * Math.sin(a), s.R * s.w * Math.cos(a)]; };

// Net + magnitude signed tangential transfer from a set of inner sources to a set of
// outer receivers over one outer rotation.
export function signedTransfer({ r = 2.5, q = 0.44, betaOut = 0.98, Rout = 1, soft = 0.02, samples = 300000, outer, inner } = {}) {
  const wout = betaOut / Rout, Rin = q * Rout, win = r * wout;
  outer = outer ?? [0, 1, 2].map((k) => ({ R: Rout, w: wout, phi: (2 * Math.PI * k) / 3, pol: 1 }));
  inner = inner ?? [0, 1, 2].map((k) => ({ R: Rin, w: win, phi: (2 * Math.PI * k) / 3 + 0.2, pol: 1 }));
  const tRot = (2 * Math.PI) / wout, dt = tRot / samples;
  let net = 0, mag = 0;
  for (const o of outer) {
    for (const s of inner) {
      let J = 0;
      for (let n = 0; n < samples; n++) {
        const t = n * dt;
        const po = pos(o, t), ps = pos(s, t);
        const dx = po[0] - ps[0], dy = po[1] - ps[1], L = Math.hypot(dx, dy);
        if (L < 1e-9) continue;
        const rh = [dx / L, dy / L];
        const vo = vel(o, t), vs = vel(s, t), vom = Math.hypot(vo[0], vo[1]);
        const that = [vo[0] / vom, vo[1] / vom];
        const Ds = cf - (vs[0] * rh[0] + vs[1] * rh[1]);
        const Dt = cf - (vo[0] * rh[0] + vo[1] * rh[1]);
        const m = (Dt * Ds) / (Ds * Ds + soft * soft);
        J += (o.pol * s.pol) * m * (rh[0] * that[0] + rh[1] * that[1]) / (L * L) * dt;
      }
      net += J; mag += Math.abs(J);
    }
  }
  return { net, magnitudeSum: mag, cancellationFraction: mag > 0 ? 1 - Math.abs(net) / mag : 0 };
}

// (1) Sign is set by polarity; no per-pair cancellation (net = +/- |sum|).
export function signStructure({ soft = 0.02 } = {}) {
  const like = signedTransfer({ soft }); // all pol = +1 -> like-polarity pairs
  const opp = signedTransfer({ soft, inner: [0, 1, 2].map((k) => ({ R: 0.44, w: 2.5 * 0.98, phi: (2 * Math.PI * k) / 3 + 0.2, pol: -1 })) });
  return {
    likePolarity: { net: like.net, verdict: like.net < 0 ? "absorptive" : "ejective", noPerPairCancellation: Math.abs(Math.abs(like.net) - like.magnitudeSum) < 1e-6 },
    oppositePolarity: { net: opp.net, verdict: opp.net < 0 ? "absorptive" : "ejective" },
    note: "sign of the per-pair tangential transfer is the polarity product: like -> absorptive, opposite -> ejective; no cancellation within a fixed-polarity pair",
  };
}

// (2) Neutral inner binary (one +, one - member): the members' opposite-sign
// transfers largely cancel; the magnitude sum (Section 9) does not.
export function neutralBinaryCancellation({ softSweep = [0.1, 0.05, 0.02, 0.01] } = {}) {
  const Rin = 0.44, win = 2.5 * 0.98;
  const innerNeutral = [
    { R: Rin, w: win, phi: 0.2, pol: +1 },
    { R: Rin, w: win, phi: 0.2 + Math.PI, pol: -1 },
  ];
  const rows = softSweep.map((soft) => {
    const t = signedTransfer({ soft, inner: innerNeutral });
    return { soft, net: t.net, magnitudeSum: t.magnitudeSum, cancellationPct: 100 * t.cancellationFraction };
  });
  return {
    rows,
    magnitudeSumDivergesWithResolution: rows[rows.length - 1].magnitudeSum > 2 * rows[0].magnitudeSum,
    cancellationGrowsWithResolution: rows[rows.length - 1].cancellationPct > rows[0].cancellationPct,
    note: "a neutral inner binary's two opposite-polarity members deliver opposite-sign transfers that substantially cancel (cancellation grows with fold-pole resolution); the surviving net is a regulator/resolution-sensitive polarity residual, far below the magnitude sum. Neither the net nor the magnitude sum is converged in this instantaneous proxy: a converged number requires the causal root-sum with the density-of-states measure (spec Section 11 style).",
  };
}

export function diagnosticReport() {
  return {
    schema: SCHEMA, specPacketRef: SPEC_PACKET_REF,
    signStructure: signStructure({}),
    neutralBinaryCancellation: neutralBinaryCancellation({}),
    verdict: "section9_absorption_was_magnitude_sum_signed_recheck_shows_polarity_sets_absorb_vs_eject_neutral_binary_largely_cancels_net_absorption_not_robustly_established_pin_result_unaffected",
    ...FAIL_CLOSED,
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) { const pretty = process.argv.includes("--pretty"); process.stdout.write(JSON.stringify(diagnosticReport(), null, pretty ? 2 : 0) + "\n"); }
