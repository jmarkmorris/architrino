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
        status: "open_operator_ontology_decision",
        detail:
          "safeDistance = max(EPSILON, distance) with EPSILON = 1e-9 is a numerical floor, not a physical length; the signed click impulse is log-divergent as the stratum shrinks, so the magnitude is undefined without a declared coincidence stratum. The T3 engine already models this as jacobianFloorOrDeclaredStratum (missing_same_record_jacobian_floor_or_declared_stratum).",
        fix_boundary: "a declared coincidence-stratum length scale (operator ontology input)",
      },
    ],

    disposition:
      "central_solver_self_hit_brake_sign_decided_absorptive_magnitude_reduces_to_declared_coincidence_stratum",

    // Standing fail-closed constraints.
    retainedBranchClaim: false,
    scoreMovement: "no_score_increase",
    accepted_seed_path_certificate: false,
    central_solver_retained_history_acceptance: false,
    first_missing_object: "declared_coincidence_stratum_for_same_source_hinge_magnitude",
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
