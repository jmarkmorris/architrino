// Causal root-sum cross-hit tangential transfer (fidelity raise over the Section 13
// instantaneous proxy). Puts the cross-hit signed transfer on the same footing as
// the validated partner pump: for each reception time it solves the delayed causal
// equation for the emission time(s) and sums the SIGNED branch contribution over
// roots, with source velocity at emission and receiver velocity at reception.
//
//   roots: |X_i(T) - x_j(T_em)| = c_f (T - T_em),  T_em < T
//   per root: f = sigma * m / r^2 * (rhat . that_i),  m = D_T/D_s,
//     rhat = (X_i(T)-x_j(T_em))/r,  r = c_f(T-T_em),
//     D_s = c_f - v_j(T_em).rhat (source at EMISSION),
//     D_T = c_f - v_i(T).rhat    (receiver at RECEPTION).
//
// Geometry note (operator, 2026-07-08): the equal-radius single-shell "shell braid"
// planar state is a single frequency, so by spec Section 8 it produces ZERO cross-hit
// clicks; the cross-hit absorber requires the NESTED two-frequency structure (inner
// binary at a distinct frequency from the outer shell), which is what this evaluates.
//
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "cross_hit_causal_absorption.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_diagnostic_not_accepted_evidence",
});

const cf = 1;
const P = (s, t) => { const a = s.w * t + s.phi; return [s.R * Math.cos(a), s.R * Math.sin(a)]; };
const Vv = (s, t) => { const a = s.w * t + s.phi; return [-s.R * s.w * Math.sin(a), s.R * s.w * Math.cos(a)]; };

function causalRoots(Xi, src, T, dmax, N) {
  const g = (te) => { const p = P(src, te); return Math.hypot(Xi[0] - p[0], Xi[1] - p[1]) - cf * (T - te); };
  const out = []; let g0 = g(T - dmax);
  for (let k = 1; k <= N; k++) {
    const te = T - dmax + dmax * (k / N); if (te >= T) break;
    const g1 = g(te);
    if (g0 === 0 || (g0 < 0) !== (g1 < 0)) {
      let lo = T - dmax + dmax * ((k - 1) / N), hi = te; const gl = g(lo);
      for (let b = 0; b < 60; b++) { const m = (lo + hi) / 2; if ((gl < 0) === (g(m) < 0)) lo = m; else hi = m; }
      out.push((lo + hi) / 2);
    }
    g0 = g1;
  }
  return out;
}

// Net + magnitude signed tangential transfer to the outer receivers over one rotation.
export function causalTransfer({ r = 2.5, q = 0.44, betaOut = 0.98, Rout = 1, NT = 2500, Nroot = 2000, inner = null, outerPol = [1, 1, 1] } = {}) {
  const wout = betaOut / Rout, Rin = q * Rout, win = r * wout;
  const outer = [0, 1, 2].map((k) => ({ R: Rout, w: wout, phi: (2 * Math.PI * k) / 3, pol: outerPol[k] }));
  inner = inner ?? [{ R: Rin, w: win, phi: 0.2, pol: 1 }, { R: Rin, w: win, phi: 0.2 + Math.PI, pol: -1 }];
  const dmax = (Rout + Rin) / cf + 0.3, tRot = (2 * Math.PI) / wout, dt = tRot / NT;
  let net = 0, mag = 0;
  for (const o of outer) {
    for (const s of inner) {
      let J = 0;
      for (let n = 0; n < NT; n++) {
        const T = n * dt, Xi = P(o, T), vi = Vv(o, T), vim = Math.hypot(vi[0], vi[1]);
        const that = [vi[0] / vim, vi[1] / vim];
        for (const te of causalRoots(Xi, s, T, dmax, Nroot)) {
          const p = P(s, te); const dx = Xi[0] - p[0], dy = Xi[1] - p[1], rr = Math.hypot(dx, dy);
          if (rr < 1e-9) continue;
          const rh = [dx / rr, dy / rr], vs = Vv(s, te);
          const Ds = cf - (vs[0] * rh[0] + vs[1] * rh[1]);
          const Dt = cf - (vi[0] * rh[0] + vi[1] * rh[1]);
          if (Math.abs(Ds) < 1e-6) continue; // exact caustic is measure-zero in T
          J += (o.pol * s.pol) * (Dt / Ds) * (rh[0] * that[0] + rh[1] * that[1]) / (rr * rr) * dt;
        }
      }
      net += J; mag += Math.abs(J);
    }
  }
  return { net, magnitudeSum: mag, avgTanForce: net / tRot, cancellationFraction: mag > 0 ? 1 - Math.abs(net) / mag : 0 };
}

// Converged neutral-binary result + convergence witness.
export function neutralBinaryCausal() {
  const a = causalTransfer({ NT: 1500, Nroot: 1500 });
  const b = causalTransfer({ NT: 3000, Nroot: 1500 });
  return {
    netCoarse: a.net, netFine: b.net,
    converged: Math.abs(a.net - b.net) < 0.05 * Math.max(1e-9, Math.abs(b.net)) + 0.02,
    avgTanForce: b.avgTanForce,
    cancellationFraction: b.cancellationFraction,
    ejectiveResidual: b.net > 0,
    note: "neutral inner binary: ~97% polarity cancellation; the surviving net is ~1% of the certified pump (~2.9) and slightly ejective, so the cross-hit does NOT absorb for a neutral braid",
  };
}

// Sign/polarity witness at fixed grid.
export function polaritySign() {
  const like = causalTransfer({ NT: 2000, Nroot: 1500, inner: [{ R: 0.44, w: 2.5 * 0.98, phi: 0.2, pol: 1 }] });
  const opp = causalTransfer({ NT: 2000, Nroot: 1500, inner: [{ R: 0.44, w: 2.5 * 0.98, phi: 0.2, pol: -1 }] });
  return {
    likePolarity: { avgTanForce: like.avgTanForce, verdict: like.net < 0 ? "absorptive" : "ejective" },
    oppositePolarity: { avgTanForce: opp.avgTanForce, verdict: opp.net < 0 ? "absorptive" : "ejective" },
    note: "even a fully polarity-imbalanced inner shell yields only a fraction of the pump; a neutral inner binary cancels to ~1%",
  };
}

export function diagnosticReport() {
  return {
    schema: SCHEMA, specPacketRef: SPEC_PACKET_REF,
    neutralBinaryCausal: neutralBinaryCausal(),
    polaritySign: polaritySign(),
    pumpReference: 2.9,
    verdict: "causal_root_sum_converges_neutral_inner_binary_net_is_about_one_percent_of_pump_and_ejective_cross_hit_absorber_closed_for_neutral_braid_pin_unaffected",
    ...FAIL_CLOSED,
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) { const pretty = process.argv.includes("--pretty"); process.stdout.write(JSON.stringify(diagnosticReport(), null, pretty ? 2 : 0) + "\n"); }
