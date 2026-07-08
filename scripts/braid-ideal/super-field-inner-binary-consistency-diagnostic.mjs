// Super-field inner-binary self-consistency diagnostic.
//
// Closure goal (2026-07-08): can a nested-shell braid hold an inner binary at
// beta_in >~ 1 with the coplanar hinge alignment as a self-consistent retained-
// history configuration (its own root-budget, causal-margin, pump balance), or is
// the super-field inner binary itself unsustainable?
//
// The cross-hit click absorber (spec Sections 7-9) removes the outer channel's
// tangential pump by clicking the outer receivers with a super-field inner binary.
// This diagnostic asks what closes the INNER binary's own retention problem.
//
// Result A (no cross-hit absorber is available for the inner binary). A cross-hit
// click requires a source with A_ij = v_j.rhat_ij reaching c_f, hence a SUPER-field
// source (|A_ij| <= |v_j| = beta_j c_f, so beta_j >= 1 is necessary). The outer
// shell is sub-field (beta_out < 1) and can never straddle any receiver, inner or
// outer; a same-shell partner shares the inner frequency and gives a time-constant
// A_ij (spec Section 8 Result 1). So the inner binary's ONLY possible cross-hit
// absorber is a strictly faster, distinct third shell.
//
// Result B (the nested regress is strictly increasing and cannot terminate on a
// cross-hit). Shell k is absorbed only by a faster super-field shell k+1
// (beta_{k+1} > beta_k >= 1). The sequence is strictly increasing and bounded below
// by 1, so a cross-hit-only tower never terminates: it either diverges
// (beta_k -> infinity, inadmissible) or must stop at a shell that closes by a
// NON-cross-hit absorber.
//
// Result C (the terminal shell's only sufficient absorber is its own super-field
// self-hit). For the innermost shell (no faster shell), cross-hit is unavailable.
// The remaining absorbers are breathing (<=27% of the pump), the static/induced sea
// (<=10%), and the single-site self-hit. Only the self-hit can reach ~100%, but its
// magnitude is set by the coincidence-stratum length scale d0 (operator-declared
// 2026-07-08; ~50x the pump at d0, coincidence-dominated, not chart-clean). So the
// terminal closure of the cross-hit tower reduces to the d0 self-hit balance - the
// same crux the symmetric self-hit channel carries.
//
// Result D (self-hit roots onset exactly at beta = 1: root budget). The rigid-circle
// self-hit residual F(Delta) = 2 rho sin(beta Delta / (2 rho)) - c_f Delta has
// F'(0) = beta - 1: no nontrivial self-hit root for beta < 1, a self-hit root born
// at beta = 1 (root count is finite in the causal memory window - order 1 through
// beta ~ 3, growing only at larger beta). The
// self-hit absorber is intrinsically a super-field phenomenon, co-located with the
// inner binary that the cross-hit route requires.
//
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "super_field_inner_binary_consistency_diagnostic.v0";
export const SPEC_PACKET_REF =
  "reference/priorities/braid-ideal/fold-crossing-chart-spec.md";

export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false,
  acceptedSameLevelBranchClaim: false,
  retainedBranch: null,
  scoreMovement: "no_score_increase",
  acceptedSeedPathCertificate: false,
  authority: "priority_only_diagnostic_not_accepted_evidence",
});

const cf = 1;

function pos(s, t) { const a = s.w * t + s.phi; return [s.R * Math.cos(a), s.R * Math.sin(a)]; }
function vel(s, t) { const a = s.w * t + s.phi; return [-s.R * s.w * Math.sin(a), s.R * s.w * Math.cos(a)]; }
function align(recv, src, t) {
  const pi = pos(recv, t), pj = pos(src, t);
  const dx = pi[0] - pj[0], dy = pi[1] - pj[1];
  const L = Math.hypot(dx, dy);
  if (L < 1e-9) return null;
  const vj = vel(src, t);
  return (vj[0] * dx + vj[1] * dy) / L;
}

// Result A: an inner receiver gets no straddling click from a sub-field outer source
// nor from a same-frequency inner partner. Measured over one outer rotation.
export function innerAbsorberAvailability({ betaOut = 0.98, betaInSame = 1.2, Rout = 1, q = 0.44, samples = 40000 } = {}) {
  const wout = betaOut / Rout;
  const Rin = q * Rout;
  const winSame = betaInSame / Rin; // the inner shell's own frequency
  const innerRecv = { R: Rin, w: winSame, phi: 0.0 };
  const outerSrc = { R: Rout, w: wout, phi: 1.1 };            // sub-field source
  const innerPartner = { R: Rin, w: winSame, phi: 2.0 };      // same-frequency source
  const tRot = (2 * Math.PI) / wout;
  let maxA_outerToInner = -Infinity;
  let minA_same = Infinity, maxA_same = -Infinity;
  for (let s = 0; s <= samples; s++) {
    const t = (s * tRot) / samples;
    const a1 = align(innerRecv, outerSrc, t);
    if (a1 !== null) maxA_outerToInner = Math.max(maxA_outerToInner, a1);
    const a2 = align(innerRecv, innerPartner, t);
    if (a2 !== null) { minA_same = Math.min(minA_same, a2); maxA_same = Math.max(maxA_same, a2); }
  }
  return {
    betaOut, betaInSame, q,
    maxA_outerSourceToInnerReceiver: maxA_outerToInner,
    subFieldOuterCanStraddle: maxA_outerToInner >= cf, // must be false
    sameFrequencyInnerVariation: maxA_same - minA_same, // ~ 0 (constant)
    sameFrequencyInnerCanClick: (maxA_same - minA_same) > 1e-9 && maxA_same >= cf,
    verdict: "inner_binary_has_no_available_cross_hit_absorber_needs_strictly_faster_distinct_shell",
  };
}

// Result B: the cross-hit-only regress is strictly increasing and never terminates.
export function nestedRegress({ beta0 = 1.05, steps = 6, stepGain = 1.4 } = {}) {
  // Each shell must be absorbed by a faster super-field shell. A conservative model:
  // to clear its neighbour's relocated pump, shell k+1 runs a factor stepGain faster.
  const betas = [beta0];
  for (let k = 1; k < steps; k++) betas.push(betas[k - 1] * stepGain);
  return {
    beta0, stepGain,
    betaTower: betas,
    strictlyIncreasing: betas.every((b, i) => i === 0 || b > betas[i - 1]),
    boundedBelowByOne: betas.every((b) => b >= 1),
    terminatesOnCrossHit: false,
    note: "cross-hit-only tower diverges (beta_k -> infinity); termination requires a non-cross-hit absorber on the innermost shell",
  };
}

// Result C: terminal-shell absorber ledger. Only the self-hit can reach ~1, and its
// magnitude at d0 is coincidence-dominated.
export function terminalShellAbsorberLedger() {
  const candidates = [
    { name: "radial_breathing", maxFractionOfPump: 0.27, sufficient: false, source: "2026-07-07 breathing hunt" },
    { name: "static_aligned_sea", maxFractionOfPump: 0.10, sufficient: false, source: "2026-07-07 Corollary S" },
    { name: "induced_sea_polarization", maxFractionOfPump: 0.10, sufficient: false, source: "2026-07-07 dynamic induced polarization at cluster stiffness" },
    { name: "cross_hit_click", maxFractionOfPump: null, sufficient: false, source: "unavailable on the innermost shell (Result A/B)" },
    { name: "super_field_self_hit", maxFractionOfPump: 50, sufficient: "coincidence_stratum_dependent", source: "self-hit magnitude at operator-declared d0 (~50x pump, not chart-clean)" },
  ];
  return {
    candidates,
    onlySufficientCandidate: "super_field_self_hit",
    terminalClosureReducesTo: "d0_coincidence_stratum_self_hit_balance",
    superFieldPumpCaveat: "above beta = 1 the anti-damping partner pump is itself uncertified (the interval certificate bails for beta >= 1); the terminal balance couples the uncertified super-field partner pump and the d0-dependent self-hit",
    note: "cross-hit terminal closure and the symmetric self-hit channel close (or fail) together on the d0 self-hit magnitude",
  };
}

// Result D: self-hit root onset and multiplicity vs beta (rigid circle, rho, cf=1).
export function selfHitRootBudget({ rho = 0.8165, betas = [0.6, 0.9, 0.99, 1.0, 1.02, 1.1, 1.4, 2.0, 3.0], maxDelta = 30 } = {}) {
  const F = (beta, D) => 2 * rho * Math.sin((beta * D) / (2 * rho)) - cf * D;
  const rows = betas.map((beta) => {
    let roots = 0;
    const N = 400000;
    const dD = maxDelta / N;
    let prev = F(beta, 1e-6);
    for (let i = 1; i <= N; i++) {
      const D = i * dD;
      const f = F(beta, D);
      if (prev === 0 || (prev < 0) !== (f < 0)) roots += 1; // sign change = a self-hit root
      prev = f;
    }
    return { beta, nontrivialSelfHitRoots: roots, superField: beta > 1 };
  });
  return {
    rho,
    rows,
    onsetAtUnity: rows.find((r) => Math.abs(r.beta - 1.0) < 1e-9)?.nontrivialSelfHitRoots ?? null,
    note: "F'(0) = beta - 1: no self-hit root below field speed; born at beta = 1; count finite in the memory window (order 1 through beta ~ 3)",
  };
}

export function diagnosticReport() {
  return {
    schema: SCHEMA,
    specPacketRef: SPEC_PACKET_REF,
    resultA_noInnerAbsorber: innerAbsorberAvailability({}),
    resultB_regressDiverges: nestedRegress({}),
    resultC_terminalShellLedger: terminalShellAbsorberLedger(),
    resultD_selfHitRootBudget: selfHitRootBudget({}),
    verdict:
      "super_field_inner_binary_self_consistency_reduces_to_d0_self_hit_balance_cross_hit_and_self_hit_routes_are_one_crux",
    ...FAIL_CLOSED,
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  const pretty = process.argv.includes("--pretty");
  process.stdout.write(JSON.stringify(diagnosticReport(), null, pretty ? 2 : 0) + "\n");
}
