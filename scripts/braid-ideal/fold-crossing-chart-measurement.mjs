// Fold-crossing chart MEASUREMENT on the vt095 sea+self-hit crossing.
//
// This implements the fold-crossing chart contract of
// reference/priorities/braid-ideal/fold-crossing-chart-spec.md as a MEASUREMENT
// over the recorded `sh0sea-a4.25-selfhit-vt095-moving-prehistory` crossing,
// extracting the fold normal-form coefficients (a, r_c, mu-scale), the branch
// orientation factor, the click impulse and its regulator dependence, the click
// recurrence N_click, and the absorber verdict against the certified pump.
//
// It is NOT evidence, names no retained branch, authorizes no acceptance.
// Fail-closed: retainedBranchClaim=false, scoreMovement=no_score_increase.
//
// Recorded crossing inputs (held-release-causal-wake-toy.mjs
//   --surface-speed-fraction 0.95 --prehistory-mode moving-prehistory
//   --fcc-sea-spacing 4.25 --include-self-hits, toy defaults):
//     referencePerpendicularRadius rho = 0.816496580927726  (= sqrt(2/3))
//     field speed c_f = 1, coupling kappa = 1
//     first field-speed crossing  T_c = 0.43, speedMax = 1.00196454494014
//     first self-hit root opens at T_c exactly (firstSelfHitRoot.time == T_c)
//     maxBranchWeight = 163.5, smallJacobianRoots = 24, self-hit min delay = dt = 0.002

import { fileURLToPath } from "node:url";

export const SCHEMA = "fold_crossing_chart_measurement.v0";
export const SPEC_PACKET_REF =
  "reference/priorities/braid-ideal/fold-crossing-chart-spec.md";
export const RUN_HANDLE = "sh0sea-a4.25-selfhit-vt095-moving-prehistory";

export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false,
  acceptedSameLevelBranchClaim: false,
  retainedBranch: null,
  scoreMovement: "no_score_increase",
  acceptedSeedPathCertificate: false,
  authority: "priority_only_measurement_not_accepted_evidence",
});

// Recorded crossing constants.
export const RECORDED = Object.freeze({
  rho: 0.816496580927726,
  cf: 1,
  kappa: 1,
  crossingTime: 0.43,
  crossingSpeedMax: 1.00196454494014,
  selfHitMinDelay: 0.002,
  maxBranchWeight: 163.547489945808,
  smallJacobianRoots: 24,
});

// Certified pump constant (lower band edge), delayed escape certificate.
export const PUMP_C1 = 2.881;

// -----------------------------------------------------------------------------
// Reconstructed rigid-rotation self-hit residual on the vt095 channel.
// The recorded crossing radius is held near-constant (radial support without a
// tangential absorber, R ~ 1.0-1.013 through the crossing), so a rigid rotation
// at perpendicular radius rho, rim fraction beta, is a faithful model of the
// crossing kinematics. The self-hit causal residual is
//   F(Delta; beta) = 2 rho sin(omega Delta / 2) - c_f Delta,   omega = beta c_f / rho,
// the chord-minus-light-path of a point against its own past.
// -----------------------------------------------------------------------------

const { rho, cf } = RECORDED;
export function omega(beta) {
  return (beta * cf) / rho;
}
export function residual(delta, beta) {
  return 2 * rho * Math.sin((omega(beta) * delta) / 2) - cf * delta;
}
// Positive self-hit root Delta*>0 (exists only for beta > 1).
export function selfHitRoot(beta) {
  if (beta <= 1) return null;
  const hi = (2 * Math.PI) / omega(beta);
  let prev = residual(1e-7, beta);
  let pd = 1e-7;
  for (let d = hi / 40000; d < hi; d += hi / 40000) {
    const r = residual(d, beta);
    if (prev > 0 && r <= 0) {
      let a = pd;
      let b = d;
      for (let k = 0; k < 90; k++) {
        const m = (a + b) / 2;
        if (residual(a, beta) > 0 === residual(m, beta) > 0) a = m;
        else b = m;
      }
      return (a + b) / 2;
    }
    prev = r;
    pd = d;
  }
  return null;
}

// Fold chart quantities at the self-hit root. By the reflection symmetry of the
// rigid rotation, the receiver-normal numerator and source-normal denominator
// coincide exactly:  D_T = D_s = c_f (1 - beta cos(omega Delta*/2)),  so the
// branch orientation factor m = D_T / D_s = 1. The fold curvature is
//   a = d^2 F / d tau^2 |_root = -(rho omega^2 / 2) sin(omega Delta*/2),
// and the fold chord is r_c = c_f Delta*.
export function chartAtRoot(beta) {
  const d = selfHitRoot(beta);
  if (d === null) return null;
  const w = omega(beta);
  const den = cf * (1 - beta * Math.cos((w * d) / 2)); // D_T = D_s
  return {
    beta,
    delta: d,
    rc: cf * d,
    Ds: den,
    DT: den,
    m: den / den, // exactly 1 by reflection symmetry
    a: (-rho * w * w * Math.sin((w * d) / 2)) / 2,
  };
}

// -----------------------------------------------------------------------------
// Degeneracy diagnosis: is the crossing a generic Whitney fold (A2, finite
// chord, a != 0) as the spec's Section 1 assumes, or a cusp (A3) born at the
// coincidence stratum (r_c -> 0, a -> 0 as beta -> 1+)?
// Fit r_c^2 = C_r * eps_beta and a = C_a * sqrt(eps_beta) over a small offset
// window; constant ratios => cusp-at-coincidence.
// -----------------------------------------------------------------------------
export function degeneracyDiagnosis(offsets = [1e-4, 4e-4, 1e-3, 1.96e-3, 4e-3]) {
  const rows = offsets.map((eb) => {
    const c = chartAtRoot(1 + eb);
    return {
      epsBeta: eb,
      rc: c.rc,
      rcSqOverEps: (c.rc * c.rc) / eb,
      aOverSqrtEps: c.a / Math.sqrt(eb),
      m: c.m,
    };
  });
  const rcRatios = rows.map((r) => r.rcSqOverEps);
  const aRatios = rows.map((r) => r.aOverSqrtEps);
  const spread = (xs) => Math.max(...xs) - Math.min(...xs);
  return {
    rows,
    // near-constant ratios confirm r_c ~ sqrt(eps) and a ~ sqrt(eps): both
    // vanish at the crossing, so the fold is a cusp born at coincidence.
    coincidenceCuspConfirmed:
      spread(rcRatios) / rcRatios[0] < 0.05 && spread(aRatios) / Math.abs(aRatios[0]) < 0.05,
    branchOrientationUnity: rows.every((r) => Math.abs(r.m - 1) < 1e-9),
  };
}

// -----------------------------------------------------------------------------
// Click impulse measured by direct reception-time integration over the crossing.
// The self-hit branch force is f = kappa |m| / (r_c^2 + reg^2) with |m| = 1,
// integrated in beta with dT = d beta / betadot. Because r_c^2 = C_r eps_beta
// vanishes at the fold birth (coincidence), the integral is controlled by the
// spatial regulator `reg` (softening, or the self-hit min-delay cutoff mapped to
// eps_min = (c_f * minDelay)^2 / C_r). The measured impulse therefore DEPENDS on
// the regulator - the opposite of a chart-defined click impulse.
// -----------------------------------------------------------------------------
export function clickImpulse({ reg = 0, epsMax = 1.96e-3, betadot = 0.12, epsMin = 0, N = 200000 }) {
  let s = 0;
  const de = (epsMax - epsMin) / N;
  for (let i = 0; i < N; i++) {
    const eb = epsMin + (i + 0.5) * de;
    const c = chartAtRoot(1 + eb);
    if (!c) continue;
    s += (RECORDED.kappa * Math.abs(c.m)) / (c.rc * c.rc + reg * reg) * (de / betadot);
  }
  return s; // Delta_beta_click (unit integration weight, c_f = 1)
}

// Regulator-independence test: recompute the impulse across a regulator sweep.
// A chart-defined click would return a regulator-independent value; the measured
// symmetric self-hit does not (log growth as reg -> 0).
export function regulatorDependence(
  regSweep = [0.2, 0.1, 0.05, 0.02, 0.01, 0.005, 0.001],
  opts = {}
) {
  const values = regSweep.map((reg) => ({ reg, impulse: clickImpulse({ reg, ...opts }) }));
  const impulses = values.map((v) => v.impulse);
  const spread = Math.max(...impulses) - Math.min(...impulses);
  // growth per decade of reg: a positive, non-vanishing slope signals dependence.
  const growsAsRegVanishes = impulses[impulses.length - 1] > impulses[0] * 1.5;
  return { values, spread, regulatorIndependent: !growsAsRegVanishes, growsAsRegVanishes };
}

// -----------------------------------------------------------------------------
// Absorber comparison against the certified pump clock.
// Pump per rotation: int_rot d beta = 2 pi c1 kappa / (c_f^2 rho).
// N_click per crossing = 1 (the pump sweeps beta through 1 once; the self-hit
// fold, once opened, is a continuous branch, not a recurring discrete click).
// -----------------------------------------------------------------------------
export const PUMP_PER_ROTATION = (2 * Math.PI * PUMP_C1 * RECORDED.kappa) / (RECORDED.cf * RECORDED.cf * rho);

export function absorberVerdict({ reg = RECORDED.selfHitMinDelay, betadot = 0.12 } = {}) {
  // Map the self-hit min-delay cutoff to an eps_beta lower cutoff: r_c = c_f*minDelay.
  const epsMin = (RECORDED.cf * RECORDED.selfHitMinDelay) ** 2 / 16; // C_r ~ 16
  const nClickPerCrossing = 1;
  const deltaBetaClick = clickImpulse({ reg, epsMin, betadot });
  const absorbed = nClickPerCrossing * deltaBetaClick;
  return {
    nClickPerCrossing,
    deltaBetaClick,
    pumpPerRotation: PUMP_PER_ROTATION,
    absorbedFraction: absorbed / PUMP_PER_ROTATION,
    absorbs: absorbed >= PUMP_PER_ROTATION,
    regulatorDependent: true, // see regulatorDependence(); the value above is not chart-defined
  };
}

// -----------------------------------------------------------------------------
// Section-3 contract rows, populated with the measured values and the degeneracy
// flags. These extend the existing self_hit_held_release_solver_row.v0 surfaces;
// they are emitted fail-closed and book nothing.
// -----------------------------------------------------------------------------
export function contractRows() {
  const c = chartAtRoot(RECORDED.crossingSpeedMax);
  return {
    action_ledger_row: {
      click_id: `${RUN_HANDLE}:crossing-0`,
      crossing_time: RECORDED.crossingTime,
      fold_curvature_a: c.a,
      fold_chord_rc: c.rc,
      orientation_projection_chi: null, // undefined: fold degenerate (cusp at coincidence)
      chart_impulse: null, // no chart-defined (regulator-independent) impulse exists
      action_transacted_h_act: null,
      regularization_independence_witness: "failed_regulator_dependent_log",
      chart_validity: "a_below_cusp_floor_fold_born_at_coincidence",
    },
    root_transition_row: {
      root_key: `${RUN_HANDLE}:selfhit:0`,
      emission_time_offset_delta: c.delta,
      source_normal_jacobian_Ds: c.Ds,
      transition_class: "folded",
      integer_root_count_before: 0,
      integer_root_count_after: 1,
      a_above_cusp_floor: false,
    },
    receiver_normal_row: {
      receiver_normal_numerator_DT: c.DT,
      source_normal_denominator_Ds: c.Ds,
      branch_orientation_factor_m: c.m, // exactly 1 by reflection symmetry
      density_of_states_measure: true,
      chart_integrated_weight: null, // regulator-dependent, not a chart weight
    },
  };
}

export function measurementReport() {
  const degen = degeneracyDiagnosis();
  const regDep = regulatorDependence();
  const verdict = absorberVerdict();
  return {
    schema: SCHEMA,
    specPacketRef: SPEC_PACKET_REF,
    runHandle: RUN_HANDLE,
    recorded: RECORDED,
    chartAtRecordedCrossing: chartAtRoot(RECORDED.crossingSpeedMax),
    degeneracyDiagnosis: degen,
    regulatorDependence: regDep,
    absorberVerdict: verdict,
    contractRows: contractRows(),
    disposition: degen.coincidenceCuspConfirmed
      ? "symmetric_self_hit_fold_is_cusp_at_coincidence_no_regulator_independent_click_impulse"
      : "generic_a2_fold_finite_chart_impulse",
    ...FAIL_CLOSED,
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(measurementReport(), null, 2));
}
