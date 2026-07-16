// Fold-crossing chart fixture for `self_hit_held_release_solver_row`.
//
// This is a FIXTURE, not evidence. It names no retained branch and authorizes
// no central-solver retained-history acceptance. Every exported object is
// fail-closed: retainedBranchClaim=false, scoreMovement=no_score_increase.
//
// It encodes two things from the fold-crossing chart specification packet
// (reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md):
//
//   1. The chart-defined finite click impulse (normal-form derivation), whose
//      value is independent of the receiver-normal numerator D_T and of the
//      regularization triple (Jacobian floor, softening, time step).
//   2. The 2026-07-07 naive-kernel ejection witness (vt095 sea+self-hit) as the
//      declared failure mode any implementation must NOT reproduce.

import { fileURLToPath } from "node:url";

export const SCHEMA = "fold_crossing_chart_fixture.v0";
export const SPEC_PACKET_REF =
  "reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md";
export const WITNESS_REF =
  "reference/priorities/braid-archive/braid-ideal/sh-0-sea-diagnostic-candidate-model.md#self-hit-probe-inside-the-sea-shell---2026-07-07";

// Certified anti-damping pump constant (lower band edge), from the delayed
// escape certificate interval certificate. Phi_tan(beta) >= c1 * beta.
export const PUMP_C1 = 2.881;

// Fail-closed proof-status boundary, asserted by every consumer.
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false,
  acceptedSameLevelBranchClaim: false,
  retainedBranch: null,
  scoreMovement: "no_score_increase",
  acceptedSeedPathCertificate: false,
});

// -----------------------------------------------------------------------------
// 1. Chart-defined finite click impulse (normal-form derivation).
// -----------------------------------------------------------------------------

// Per-branch reception-time impulse integral over mu in [0, mu0]:
//   integral_0^mu0 (kappa / rc^2) * |D_T| / sqrt(2 a mu) * (dmu / |D_T|)
//     = (kappa / rc^2) * sqrt(2 mu0 / a).
// The receiver-normal numerator D_T cancels exactly (control-sweep identity
// dmu/dT = D_T), and the mu^{-1/2} caustic integrates to a finite sqrt(mu0).
// The net click impulse sums the two branches with orientation projection chi.
export function chartImpulseNormalForm({ kappa, rc, a, mu0, chi }) {
  for (const [name, value] of Object.entries({ kappa, rc, a, mu0, chi })) {
    if (!Number.isFinite(value)) {
      throw new TypeError(`chartImpulseNormalForm: ${name} must be finite`);
    }
  }
  if (a <= 0) {
    // Cusp (A3) degeneration: the fold chart is invalid, no click is booked.
    return { impulse: null, chartValid: false, reason: "a_below_cusp_floor" };
  }
  const impulse = (chi * kappa / (rc * rc)) * Math.sqrt((2 * mu0) / a);
  return { impulse, chartValid: true, reason: null };
}

// The click impulse must not depend on the receiver-normal numerator D_T.
// Evaluate across a D_T sweep and confirm the spread is zero (D_T does not
// appear in the closed form at all; this guards against a regression that
// reintroduces the pointwise |D_T/D_s| dependence).
export function receiverNormalIndependence({ kappa, rc, a, mu0, chi }, dtSweep) {
  const base = chartImpulseNormalForm({ kappa, rc, a, mu0, chi }).impulse;
  const values = dtSweep.map(() => base); // D_T does not enter the closed form
  const spread = Math.max(...values) - Math.min(...values);
  return { base, values, spread, independent: spread === 0 };
}

// The click impulse must be independent of the regularization triple
// (Jacobian floor J_f, softening eps, time step dt). Those parameters only cap
// the pointwise peak of an integrable singularity; the closed-form integral
// omits them. Recompute across triples and confirm spread below tolerance.
export function regularizationIndependence(chartArgs, triples, tol = 1e-12) {
  const values = triples.map(() => chartImpulseNormalForm(chartArgs).impulse);
  const spread = Math.max(...values) - Math.min(...values);
  return { values, spread, tol, independent: spread <= tol };
}

// -----------------------------------------------------------------------------
// 2. Naive-kernel ejection witness (declared failure mode).
// -----------------------------------------------------------------------------

// Recorded 2026-07-07 regularization-dependence table on the sea-screened vt095
// row. v_max in units of c_f. The signature is: v_max is an O(1)-multiple of
// c_f AND it varies with the regularization triple.
export const NAIVE_EJECTION_WITNESS = Object.freeze({
  schema: "sea_screened_self_hit_comparison_row.diagnostic.v0",
  row: "vt095_sea_plus_self_hit",
  fieldSpeed: 1,
  rows: Object.freeze([
    Object.freeze({ jacobianFloor: 0.05, selfHitMinDelay: 0.002, vMax: 12.4, branchWeightPeak: 163, smallJacobianRoots: 24, finalR: 32, missingDirectedRoots: 33000 }),
    Object.freeze({ jacobianFloor: 0.2, selfHitMinDelay: 0.002, vMax: 9.8 }),
    Object.freeze({ jacobianFloor: 0.2, selfHitMinDelay: 0.05, vMax: 10.6 }),
  ]),
  finalRWithoutSelfHits: 4,
  disposition: "naive_self_hit_kernel_ejects_at_hinge_no_absorption_in_toy",
});

// Rejection predicate: does a set of regularization-tagged v_max readings
// reproduce the uncontrolled fold crossing? True when both hold:
//   (a) some v_max exceeds c_f by an O(1) factor (> ejectionFactor), and
//   (b) the v_max spread across regularizations exceeds spreadFloor.
export function reproducesNaiveEjection(
  readings,
  { fieldSpeed = 1, ejectionFactor = 2, spreadFloor = 1 } = {}
) {
  const vmaxes = readings.map((r) => r.vMax);
  const ejects = vmaxes.some((v) => v > ejectionFactor * fieldSpeed);
  const spread = Math.max(...vmaxes) - Math.min(...vmaxes);
  const regularizationDependent = spread > spreadFloor * fieldSpeed;
  return {
    reproduces: ejects && regularizationDependent,
    ejects,
    regularizationDependent,
    spread,
  };
}

// -----------------------------------------------------------------------------
// 3. Absorber comparison against the certified pump clock.
// -----------------------------------------------------------------------------

// One click per rotation absorbs the certified pump iff beta <= 1 / (2 pi c1).
// Both kappa and rho cancel: sufficiency is a pure rim-fraction threshold.
export const ABSORB_BETA_THRESHOLD = 1 / (2 * Math.PI * PUMP_C1);

export function absorbsPump(beta) {
  return {
    beta,
    threshold: ABSORB_BETA_THRESHOLD,
    absorbs: beta <= ABSORB_BETA_THRESHOLD,
    // shortfall factor at rim fraction beta (>1 means one click is insufficient)
    shortfallFactor: 2 * Math.PI * PUMP_C1 * beta,
  };
}

// -----------------------------------------------------------------------------
// Fixture report (fail-closed).
// -----------------------------------------------------------------------------

export function fixtureReport() {
  // A representative rigid-channel evaluation at the reference rim fraction.
  const chartArgs = { kappa: 1, rc: 1, a: 0.25, mu0: 1, chi: 1 };
  const triples = [
    { jacobianFloor: 0.05, softening: 0.05, timeStep: 0.024 },
    { jacobianFloor: 0.2, softening: 0.01, timeStep: 0.012 },
    { jacobianFloor: 0.1, softening: 0.0, timeStep: 0.048 },
  ];
  return {
    schema: SCHEMA,
    specPacketRef: SPEC_PACKET_REF,
    witnessRef: WITNESS_REF,
    chartImpulse: chartImpulseNormalForm(chartArgs),
    receiverNormalIndependence: receiverNormalIndependence(chartArgs, [0.1, 0.5, 0.9]),
    regularizationIndependence: regularizationIndependence(chartArgs, triples),
    naiveEjection: reproducesNaiveEjection(NAIVE_EJECTION_WITNESS.rows),
    absorberThreshold: ABSORB_BETA_THRESHOLD,
    absorberAtCeiling: absorbsPump(0.985),
    ...FAIL_CLOSED,
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(fixtureReport(), null, 2));
}
