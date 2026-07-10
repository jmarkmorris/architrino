import { fileURLToPath } from "node:url";
import { solveMovingCircularSameSourceCausalRoots } from "../../src/solver/app/AbsoluteHistoryRootRuntime.mjs";

// Self-Hit Brake Central Measurement (SH-0-sea, self-hit fold-chart sub-target).
//
// Purpose: drive the production central-solver same-source causal-root runtime
// (AbsoluteHistoryRootRuntime.solveMovingCircularSameSourceCausalRoots) on the
// recorded vt095 field-speed crossing, and report what the production path can
// and cannot decide about the self-hit hinge brake against the certified
// tangential pump.
//
// Claim discipline (fail-closed): this is a measurement over the production
// runtime, not accepted evidence. It names no retained branch, flips no
// acceptance flag, and blocks at `central_solver_retained_history_row`.
// Propagation is at field speed c_f; only causal-delay terminology is used.
// Signed polarity-unit notation epsilon_{+,.}/epsilon_{-,.}; a same-source pair
// is a site and its own path history, polarity product sigma_self = +1.
//
// Findings the production runtime forces (see report.named_producer_gaps):
//  1. The production runtime EMITS the signed branch orientation
//     receiverNormalFactor = D_T / D_s, but the same-source root's exposed
//     `branchWeight` uses `unsignedReceiverNormalFactor` = |m|, discarding the
//     sign. This is exactly the naive-kernel sign error.
//  2. The production same-source history model is a fixed-omega rigid circle, so
//     by reflection symmetry D_T = D_s and m = +1 identically; it cannot carry
//     the pump-driven tangential acceleration that sets the absorptive sign.
//  3. The coincidence-stratum regularization is a numerical floor
//     (safeDistance = max(EPSILON, distance), EPSILON = 1e-9), not a physical
//     length. The signed click impulse diverges logarithmically as the stratum
//     shrinks, so the magnitude is undefined without a declared coincidence
//     stratum. The T3 engine already models this as a declared, currently
//     missing same-record input (`jacobianFloorOrDeclaredStratum`).

const CANONICAL = {
  fieldSpeed: 1, // c_f
  coupling: 1, // kappa
  referencePerpendicularRadius: Math.sqrt(2 / 3), // rho = 0.816497 (recorded vt095)
  crossingSpeed: 1.00196, // beta_c at the first recorded field-speed crossing
  certifiedPumpConstantLower: 2.881, // c_1
  certifiedPumpConstantUpper: 2.925, // c_2
};

// Certified pump delivered per rotation: 2*pi*c_1*kappa / (c_f^2 * rho).
export function pumpPerRotation({
  coupling = CANONICAL.coupling,
  fieldSpeed = CANONICAL.fieldSpeed,
  rho = CANONICAL.referencePerpendicularRadius,
  c1 = CANONICAL.certifiedPumpConstantLower,
} = {}) {
  return (2 * Math.PI * c1 * coupling) / (fieldSpeed * fieldSpeed * rho);
}

function dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

// ---------------------------------------------------------------------------
// (A) Production-runtime rigid reconstruction of the recorded vt095 crossing.
// Confirms the runtime emits the signed receiverNormalFactor, reproduces the
// packet Section 6 rigid numbers, and reflection-locks m = +1.
// ---------------------------------------------------------------------------
export function measureRigidCrossingOnProductionSolver({
  rho = CANONICAL.referencePerpendicularRadius,
  fieldSpeed = CANONICAL.fieldSpeed,
  crossingSpeed = CANONICAL.crossingSpeed,
  hitTime = 0.4304,
  minimumDelay = 0.002,
  scanSubdivisions = 1024,
} = {}) {
  const angularVelocity = crossingSpeed / rho; // omega with tangential speed beta_c
  const source = {
    centerAtEpoch: { x: 0, y: 0, z: 0 },
    centerVelocity: { x: 0, y: 0, z: 0 },
    radiusU: { x: rho, y: 0, z: 0 },
    radiusV: { x: 0, y: rho, z: 0 },
    angularVelocity,
    phaseAtEpoch: 0,
    epochTime: 0,
  };
  const result = solveMovingCircularSameSourceCausalRoots({
    source,
    hitTime,
    signalSpeed: fieldSpeed,
    sourceStartTime: hitTime - 2,
    sourceEndTime: hitTime,
    minimumDelay,
    scanSubdivisions,
  });
  const root = result.roots.length ? result.roots[result.roots.length - 1] : null;
  if (!root) {
    return { rootFound: false, status: result.status?.code ?? "no_root" };
  }
  return {
    rootFound: true,
    rootKind: root.rootKind,
    chordRadius: root.distance, // r_c
    sourceNormalDenominator: root.sourceNormalDenominator, // D_s
    receiverNormalNumerator: root.receiverNormalNumerator, // D_T
    signedBranchOrientation: root.receiverNormalFactor, // signed m = D_T / D_s (EMITTED)
    exposedBranchWeight: root.branchWeight, // = |m| (unsignedReceiverNormalFactor)
    unsignedReceiverNormalFactor: root.unsignedReceiverNormalFactor,
    signDiscardedByBranchWeight:
      Math.abs(root.branchWeight - Math.abs(root.receiverNormalFactor)) < 1e-12,
    reflectionLockedToUnity: Math.abs(root.receiverNormalFactor - 1) < 1e-6,
  };
}

// ---------------------------------------------------------------------------
// (B) Accelerating-crossing measurement on the production runtime. The runtime
// now carries an optional angular acceleration on the moving-circular source
// (see AbsoluteHistoryRootRuntime.evaluateMovingCircularSourceHistory), so the
// pump-driven crossing is represented directly and the same-source root returns
// the signed branch orientation m = D_T/D_s < 0 (absorptive) with no local
// reconstruction. Geometry needed for the tangential projection is read back
// from the production root fields.
// ---------------------------------------------------------------------------
function magnitudeOf(v) {
  return Math.sqrt(dot(v, v));
}

export function solveAcceleratingSameSourceRoot(hitTime, {
  rho,
  fieldSpeed,
  angularAccel,
  tStar,
  minimumDelay,
} = {}) {
  const omega0 = fieldSpeed / rho; // tangential speed exactly c_f at the hinge
  const source = {
    centerAtEpoch: { x: 0, y: 0, z: 0 },
    centerVelocity: { x: 0, y: 0, z: 0 },
    radiusU: { x: rho, y: 0, z: 0 },
    radiusV: { x: 0, y: rho, z: 0 },
    angularVelocity: omega0,
    angularAcceleration: angularAccel,
    phaseAtEpoch: 0,
    epochTime: tStar,
  };
  const result = solveMovingCircularSameSourceCausalRoots({
    source,
    hitTime,
    signalSpeed: fieldSpeed,
    sourceStartTime: hitTime - 2,
    sourceEndTime: hitTime,
    minimumDelay,
    scanSubdivisions: 2048,
  });
  const root = result.roots.length ? result.roots[result.roots.length - 1] : null;
  if (!root) return null;
  const delta = {
    x: root.receiverPoint.x - root.sourcePoint.x,
    y: root.receiverPoint.y - root.sourcePoint.y,
    z: root.receiverPoint.z - root.sourcePoint.z,
  };
  const dist = magnitudeOf(delta);
  const dHat = { x: delta.x / dist, y: delta.y / dist, z: delta.z / dist };
  const recvSpeed = magnitudeOf(root.receiverVelocity);
  const tHat = {
    x: root.receiverVelocity.x / recvSpeed,
    y: root.receiverVelocity.y / recvSpeed,
    z: root.receiverVelocity.z / recvSpeed,
  };
  return {
    hitTime,
    emissionTime: root.emissionTime,
    chordRadius: root.distance,
    receiverSpeed: recvSpeed,
    sourceSpeed: magnitudeOf(root.sourceVelocity),
    sourceNormalDenominator: root.sourceNormalDenominator,
    receiverNormalNumerator: root.receiverNormalNumerator,
    signedBranchOrientation: root.signedBranchOrientation, // signed m, from production
    forwardRayProjection: dot(tHat, dHat),
  };
}

export function measureAcceleratingCrossingSign({
  rho = CANONICAL.referencePerpendicularRadius,
  fieldSpeed = CANONICAL.fieldSpeed,
  angularAccel = 0.9, // positive tangential acceleration (pump-driven)
  minimumDelay = 0.002,
  receptionOffsets = [0.0004, 0.002, 0.006, 0.010],
} = {}) {
  const tStar = 0.42893; // recorded vt095 field-speed hinge
  const rows = [];
  for (const offset of receptionOffsets) {
    const row = solveAcceleratingSameSourceRoot(tStar + offset, {
      rho,
      fieldSpeed,
      angularAccel,
      tStar,
      minimumDelay,
    });
    if (row) rows.push({ receptionOffset: offset, ...row });
  }
  const allAbsorptive = rows.length > 0 && rows.every((row) => row.signedBranchOrientation < 0);
  return { rows, allAbsorptive };
}

// ---------------------------------------------------------------------------
// (C) Magnitude vs declared coincidence stratum. The signed tangential click
// impulse integrates the same-source contribution kappa*m/(r^2 + rho_c^2) over
// the crossing window. It is log-divergent as rho_c -> 0, so the absorbed
// fraction of the certified pump has no single value without a declared stratum.
// ---------------------------------------------------------------------------
export function measureBrakeMagnitudeVsStratum({
  rho = CANONICAL.referencePerpendicularRadius,
  fieldSpeed = CANONICAL.fieldSpeed,
  coupling = CANONICAL.coupling,
  angularAccel = 0.9,
  minimumDelay = 0.002,
  strata = [0.2, 0.1, 0.05, 0.01, 0.001],
} = {}) {
  const tStar = 0.42893;
  const pump = pumpPerRotation({ coupling, fieldSpeed, rho });
  // Reception window across the crossing where the self-hit root exists.
  const windowStart = 0.0002;
  const windowEnd = 0.03;
  const samples = 600;
  const rows = strata.map((rhoC) => {
    let signedImpulse = 0;
    let prevT = null;
    let prevIntegrand = null;
    for (let i = 0; i <= samples; i += 1) {
      const offset = windowStart + ((windowEnd - windowStart) * i) / samples;
      const t = tStar + offset;
      const root = solveAcceleratingSameSourceRoot(t, {
        rho,
        fieldSpeed,
        angularAccel,
        tStar,
        minimumDelay,
      });
      if (!root) {
        prevT = null;
        prevIntegrand = null;
        continue;
      }
      const m = root.signedBranchOrientation;
      const r2 = root.chordRadius * root.chordRadius;
      // Tangential projection of the same-source contribution; sigma_self = +1.
      const integrand = (coupling * m * root.forwardRayProjection) / (r2 + rhoC * rhoC);
      if (prevT !== null && prevIntegrand !== null) {
        signedImpulse += 0.5 * (integrand + prevIntegrand) * (t - prevT);
      }
      prevT = t;
      prevIntegrand = integrand;
    }
    const absorbedFraction = -signedImpulse / pump; // positive => absorptive
    return {
      declaredCoincidenceStratum: rhoC,
      signedTangentialClickImpulse: signedImpulse,
      absorbedFractionOfCertifiedPump: absorbedFraction,
      beatsClock: absorbedFraction >= 1,
    };
  });
  return { pumpPerRotation: pump, rows };
}

// ---------------------------------------------------------------------------
// (D) DT-CONVERGED IMPULSE-RESOLVED CLICK BOOKING (fold-crossing-chart-spec
// Sections 62-63 shared prerequisite). The Row 8 stratum map found the chart
// booking regulator-fragile: the crossing window is laid by the OUTER
// integrator step, so the booked per-click impulse moves 22-114% under
// dt-halving. This instrument books the same signed same-source impulse
// (production runtime, read-only, same integrand form as (C)) but anchors the
// window on the CROSSING TIME itself (known exactly on the prescribed
// accelerating crossing) and integrates adaptively on a log-spaced grid --
// doubling the sample density until the booked impulse moves less than the
// declared tolerance. The booked object is dt-free by construction: no outer
// step exists. stepWindowBookingError then EMULATES the step-laid window
// (integrate only inside the step that flags the crossing, fixed substep
// count) and reports its error against the converged reference at dt and
// dt/2 -- reproducing the Row 8 fragility class on the controlled crossing.
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.
export function impulseResolvedClickImpulse({
  rho = CANONICAL.referencePerpendicularRadius,
  fieldSpeed = CANONICAL.fieldSpeed,
  coupling = CANONICAL.coupling,
  angularAccel = 0.9,
  rhoC = 0.05,
  minimumDelay = 0.002,
  windowEnd = 0.05,
  tol = 1e-3,
  maxDoublings = 7,
} = {}) {
  const tStar = 0.42893;
  const integrandAt = (offset) => {
    const root = solveAcceleratingSameSourceRoot(tStar + offset, {
      rho, fieldSpeed, angularAccel, tStar, minimumDelay,
    });
    if (!root) return 0;
    const r2 = root.chordRadius * root.chordRadius;
    return (coupling * root.signedBranchOrientation * root.forwardRayProjection) / (r2 + rhoC * rhoC);
  };
  const grid = (n) => {
    const lo = 1e-5;
    const pts = [];
    for (let i = 0; i <= n; i++) pts.push(lo * Math.pow(windowEnd / lo, i / n));
    return pts;
  };
  let n = 64;
  let prev = null;
  let impulse = null;
  let witness = null;
  const trace = [];
  for (let d = 0; d <= maxDoublings; d++) {
    const pts = grid(n);
    const vals = pts.map(integrandAt);
    let s = 0;
    for (let i = 1; i < pts.length; i++) s += 0.5 * (vals[i] + vals[i - 1]) * (pts[i] - pts[i - 1]);
    trace.push({ samples: n, signedImpulse: s });
    if (prev !== null) {
      witness = Math.abs(s - prev) / Math.max(Math.abs(s), 1e-12);
      if (witness < tol) { impulse = s; break; }
    }
    prev = s;
    impulse = s;
    n *= 2;
  }
  const pump = pumpPerRotation({ coupling, fieldSpeed, rho });
  return {
    declaredCoincidenceStratum: rhoC,
    angularAccel,
    signedTangentialClickImpulse: impulse,
    absorbedFractionOfCertifiedPump: -impulse / pump,
    convergenceWitness: witness,
    converged: witness !== null && witness < tol,
    samplesUsed: n,
    trace,
  };
}

export function stepWindowBookingError({
  rho = CANONICAL.referencePerpendicularRadius,
  fieldSpeed = CANONICAL.fieldSpeed,
  coupling = CANONICAL.coupling,
  angularAccel = 0.9,
  rhoC = 0.05,
  minimumDelay = 0.002,
  outerSteps = [0.0025, 0.00125],
  substeps = 32,
  phaseSamples = 5,
} = {}) {
  const tStar = 0.42893;
  const reference = impulseResolvedClickImpulse({
    rho, fieldSpeed, coupling, angularAccel, rhoC, minimumDelay,
  });
  const integrandAt = (offset) => {
    const root = solveAcceleratingSameSourceRoot(tStar + offset, {
      rho, fieldSpeed, angularAccel, tStar, minimumDelay,
    });
    if (!root) return 0;
    const r2 = root.chordRadius * root.chordRadius;
    return (coupling * root.signedBranchOrientation * root.forwardRayProjection) / (r2 + rhoC * rhoC);
  };
  const rows = outerSteps.map((dt) => {
    // the crossing lands at a step phase the trajectory does not control;
    // sample phases uniformly and book only inside the flagged step
    const bookings = [];
    for (let p = 0; p < phaseSamples; p++) {
      const stepStart = -((p + 0.5) / phaseSamples) * dt;
      let s = 0;
      let prevOff = null, prevVal = null;
      for (let k = 0; k <= substeps; k++) {
        const off = stepStart + (dt * k) / substeps;
        if (off < 0) continue; // pre-crossing part of the step: no root
        const val = integrandAt(off);
        if (prevOff !== null) s += 0.5 * (val + prevVal) * (off - prevOff);
        prevOff = off; prevVal = val;
      }
      bookings.push(s);
    }
    const mean = bookings.reduce((a, b) => a + b, 0) / bookings.length;
    return {
      outerStep: dt,
      bookedImpulseMean: mean,
      bookedImpulseSpread: Math.max(...bookings) - Math.min(...bookings),
      relativeErrorVsConverged: Math.abs(mean - reference.signedTangentialClickImpulse) /
        Math.abs(reference.signedTangentialClickImpulse),
    };
  });
  const dtSwing = Math.abs(rows[0].bookedImpulseMean - rows[1].bookedImpulseMean) /
    Math.abs(reference.signedTangentialClickImpulse);
  return { reference, rows, dtHalvingSwing: dtSwing };
}

// ---------------------------------------------------------------------------
// (E) ESCAPEMENT-UNDER-TILT PROJECTION (fold-crossing-chart-spec Section 63
// sizing question). A middle-layer tilt rate etaDot about x modulates each
// site's total speed by dv = -etaDot * z_M * cos(phi) (same sign on both
// antipodal members), shifting the click depth; the click's tangential
// impulse responds with sensitivity S = dI/dv_exc (measured here from the
// converged booking across crossing accelerations), and a click's torque
// about x is -z_M * I * cos(phi). Phase-averaging uniform clicking gives the
// click channel's tilt damping
//   d_click = nu * |S| * z_M^2 / 2
// (nu = total click rate per unit absolute time). Compared against the
// Section 63 absorber requirement. Estimate grade: phase-uniform clicking,
// small tilt, sensitivity from the prescribed controlled crossing.
export function escapementTiltProjection({
  rhoC = 0.05,
  accelCells = [0.45, 0.9, 1.8],
  clicksPerRotationCases = [18, 200],
  omega = 1.04156,                        // V5 cadence
  zM = Math.sin((16.24 * Math.PI) / 180), // V5 middle height (R_M = 1)
  couplingScale = 0.23494,                // V5 frozen kappa* (impulses linear in kappa; measured here at kappa = 1)
  windowEnd = 0.05,
} = {}) {
  const rho = CANONICAL.referencePerpendicularRadius;
  const cells = accelCells.map((a) => {
    const r = impulseResolvedClickImpulse({ angularAccel: a, rhoC, windowEnd });
    // characteristic entry excess over the booked window: the speed excess
    // grows at rate a*rho/c_f; the impulse-weighted window scale is declared
    // as the half-window (estimate-grade proxy)
    const vExc = a * rho * (windowEnd / 2);
    return { angularAccel: a, vExc, impulse: r.signedTangentialClickImpulse, converged: r.converged };
  });
  const S = (cells[2].impulse - cells[0].impulse) / (cells[2].vExc - cells[0].vExc);
  const Sv5 = S * couplingScale; // declared unit bridge: controlled crossing at kappa=1, rho=0.8165 -> V5 evaluator units (kappa*=couplingScale; radius mismatch ~O(1) declared)
  const cases = clicksPerRotationCases.map((cpr) => {
    const nu = (cpr * omega) / (2 * Math.PI);
    const dClick = (nu * Math.abs(Sv5) * zM * zM) / 2;
    return { clicksPerRotation: cpr, clickRatePerTime: nu, dClick };
  });
  return { stratum: rhoC, cells, sensitivityS: S, sensitivityV5Units: Sv5, couplingScale, zM, cases };
}

export function buildSelfHitBrakeCentralMeasurement(options = {}) {
  const rigid = measureRigidCrossingOnProductionSolver(options.rigid ?? {});
  const acceleratingSign = measureAcceleratingCrossingSign(options.acceleratingSign ?? {});
  const magnitude = measureBrakeMagnitudeVsStratum(options.magnitude ?? {});

  const absorbedRange = magnitude.rows.map((r) => r.absorbedFractionOfCertifiedPump);
  const magnitudeStratumDependent =
    Math.max(...absorbedRange) - Math.min(...absorbedRange) > 0.05;

  return {
    schema: "self_hit_brake_central_measurement.diagnostic.v0",
    authority: "priority_only_central_solver_measurement_not_accepted_evidence",
    production_runtime: "src/solver/app/AbsoluteHistoryRootRuntime.mjs",
    production_entry_point: "solveMovingCircularSameSourceCausalRoots",
    canonical_constants: CANONICAL,

    rigid_reconstruction: rigid,
    accelerating_sign: acceleratingSign,
    magnitude_vs_declared_stratum: magnitude,

    signed_orientation_emitted_by_production: rigid.rootFound
      ? Number.isFinite(rigid.signedBranchOrientation)
      : false,
    sign_decided_absorptive: acceleratingSign.allAbsorptive,
    magnitude_reduces_to_declared_stratum: magnitudeStratumDependent,

    named_producer_gaps: [
      {
        gap: "same_source_branch_weight_discards_sign",
        status: "resolved",
        detail:
          "AbsoluteHistoryRootRuntime.receiverNormalFields now emits an explicit signedBranchOrientation = D_T/D_s on every root (same-source and partner). branchWeight remains the unsigned magnitude by contract; the signed handle is available for the hinge force law.",
        fix_boundary: "carry the signed branch orientation on same-source roots",
      },
      {
        gap: "rigid_circle_same_source_history_reflection_locks_sign",
        status: "resolved",
        detail:
          "the moving-circular source history now accepts an optional angularAcceleration (default 0 preserves the fixed-omega circle exactly); with alpha != 0 the same-source root realizes the pump-driven crossing directly and returns signedBranchOrientation < 0 (absorptive), measured here on the production path rather than reconstructed.",
        fix_boundary: "an accelerating (or sampled absolute-history) same-source root path",
      },
      {
        gap: "coincidence_stratum_is_a_numerical_floor",
        status: "resolved_by_operator_declared_d0_2026_07_08",
        detail:
          "safeDistance = max(EPSILON, distance) with EPSILON = 1e-9 is a numerical floor, not a physical length; the signed click impulse is log-divergent as the stratum shrinks, so the magnitude is undefined without a declared coincidence stratum. The operator declared that stratum on 2026-07-08 as d0, of order kappa*epsilon^2/c_f^2 (the near-field two-body scale R_*; in the minimum-circular-binary reading d0 = R_MCB, the collapse-arresting radius). Evaluated at d0 the symmetric single-site self-hit magnitude is about 50x the certified tangential pump, so the symmetric self-hit is NOT load-bearing as a retention absorber. The T3 engine modeled the pre-declaration floor as jacobianFloorOrDeclaredStratum (missing_same_record_jacobian_floor_or_declared_stratum); the ontology input is now supplied. d0 exact-value derivation from (kappa, epsilon, c_f) remains open (content/markdown/aaa/assemblies/particle-masses.md).",
        fix_boundary: "supplied 2026-07-08: operator-declared coincidence-stratum d0 (R_MCB); surviving open route is the non-coincident cross-hit hinge",
      },
    ],

    disposition:
      "central_solver_self_hit_brake_sign_absorptive_magnitude_set_by_operator_declared_d0_not_load_bearing",

    operator_ontology_input: {
      declared: "coincidence_stratum_length_scale",
      symbol: "d0",
      of_order: "kappa*epsilon^2/c_f^2",
      reading: "minimum_circular_binary_radius_R_MCB_collapse_arresting",
      operator_decision_date: "2026-07-08",
      exact_value_derivation_status: "open_from_kappa_epsilon_cf",
      symmetric_self_hit_load_bearing: false,
      symmetric_self_hit_magnitude_vs_pump: "about_50x_too_large",
    },
    declared_stratum_supplied_by_operator: true,

    // Standing fail-closed constraints.
    retainedBranchClaim: false,
    scoreMovement: "no_score_increase",
    accepted_seed_path_certificate: false,
    central_solver_retained_history_acceptance: false,
    first_missing_object: "non_coincident_cross_hit_hinge_sustained_alignment_over_a_click_window",
    orientational_order_caveat:
      "sea-screened context assumes aligned neighbor order; aligned order is assumed, not self-selected.",
  };
}

function isMain() {
  return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
}

if (isMain()) {
  const pretty = process.argv.includes("--pretty");
  const report = buildSelfHitBrakeCentralMeasurement();
  process.stdout.write(JSON.stringify(report, null, pretty ? 2 : 0) + "\n");
}
