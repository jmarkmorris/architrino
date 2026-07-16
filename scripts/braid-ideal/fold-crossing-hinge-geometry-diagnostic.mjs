// Non-coincident hinge geometry diagnostic.
//
// Answers the closure goal following the vt095 measurement: does a hinge
// geometry exist whose causal-root fold is born at FINITE chord r_c = O(rho),
// restoring the generic Whitney fold (A2) and the finite chart impulse of
// reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md Section 2, rather
// than the cusp-at-coincidence of the symmetric self-hit (Section 6)?
//
// Two results:
//   (1) SELF-HIT COINCIDENCE THEOREM. For any smooth worldline, a same-source
//       root nucleates from Delta -> 0 exactly at the instant the site speed
//       crosses c_f, because |X(T) - X(T-Delta)| = |v| Delta + O(Delta^2). Hence
//       the self-hit fold chord r_c = c_f Delta* -> 0 at birth for EVERY path -
//       symmetric or asymmetric. The self-hit route is closed in general.
//   (2) CROSS-HIT FINITE-CHORD FOLD. A fold between DISTINCT sites i != j is born
//       where the source-normal denominator D_s = c_f - v_j . rhat_ij vanishes,
//       i.e. where the source moves along the sightline to the receiver's causal
//       position at field speed (v_j . rhat = c_f). When that alignment holds at
//       finite separation, r_c = O(rho) and the fold curvature a = d^2 F/d tau^2
//       is nonzero: a generic A2 fold. The Section 2 finite impulse then applies
//       and is independent of the SPATIAL regulator (softening), because the fold
//       is decoupled from the coincidence stratum {r_ij = 0}.
//
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "fold_crossing_hinge_geometry_diagnostic.v0";
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

// ----------------------------------------------------------------------------
// (1) Self-hit coincidence theorem, exhibited on an ASYMMETRIC worldline.
// A generic (non-circular) path: rim rotation at radius rho plus a radial drift
// and a tangential pump. The self-hit residual F(Delta) = |X(T) - X(T-Delta)|
// - c_f Delta is measured directly; the fold chord r_c at the nascent root is
// shown to vanish as the speed crosses c_f, regardless of the asymmetry.
// ----------------------------------------------------------------------------
export function asymmetricSelfHitChord({ rho = 1, radialDrift = 0.15, pump = 0.4 }) {
  // Worldline near reception time T=0: angle theta(t), radius R(t), pumped speed.
  // theta(t) = w0 t + 0.5*pump*t^2/rho ; R(t) = rho + radialDrift*t (asymmetry).
  const speedAt = (b0) => {
    // choose w0 so that instantaneous rim speed = b0*c_f at t=0
    return b0 / rho;
  };
  const pos = (t, w0) => {
    const th = w0 * t + (0.5 * pump * t * t) / rho;
    const R = rho + radialDrift * t;
    return [R * Math.cos(th), R * Math.sin(th)];
  };
  const speed = (t, w0) => {
    const h = 1e-6;
    const p1 = pos(t + h, w0);
    const p0 = pos(t - h, w0);
    return Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) / (2 * h);
  };
  const rows = [];
  for (const beta of [1.02, 1.05, 1.1, 1.2]) {
    // find w0 such that speed(0) = beta (Newton on w0)
    let w0 = beta / rho;
    for (let k = 0; k < 40; k++) {
      const s = speed(0, w0);
      const ds = (speed(0, w0 + 1e-5) - s) / 1e-5;
      w0 -= (s - beta) / ds;
    }
    // self-hit residual at reception T=0, emission tau=-Delta (Delta>0)
    const F = (D) => {
      const a = pos(0, w0);
      const b = pos(-D, w0);
      return Math.hypot(a[0] - b[0], a[1] - b[1]) - cf * D;
    };
    // nascent positive root
    let prev = F(1e-5);
    let pd = 1e-5;
    let rc = null;
    for (let D = 2e-4; D < 4; D += 4 / 40000) {
      const f = F(D);
      if (prev > 0 && f <= 0) {
        let lo = pd;
        let hi = D;
        for (let j = 0; j < 70; j++) {
          const m = (lo + hi) / 2;
          if (F(lo) > 0 === F(m) > 0) lo = m;
          else hi = m;
        }
        const Dstar = (lo + hi) / 2;
        rc = cf * Dstar;
        break;
      }
      prev = f;
      pd = D;
    }
    rows.push({ beta, epsBeta: beta - 1, foldChord_rc: rc });
  }
  // r_c shrinks toward zero as beta -> 1 (coincidence birth) even with asymmetry
  const ratios = rows.map((r) => (r.foldChord_rc ?? NaN) / Math.sqrt(r.epsBeta));
  return {
    rows,
    coincidenceBirthConfirmed: rows.every((r) => r.foldChord_rc !== null && r.foldChord_rc < 2 * Math.sqrt(r.epsBeta)),
    note: "self-hit fold chord -> 0 as beta -> 1 for asymmetric path: coincidence birth is general",
    sqrtRatios: ratios,
  };
}

// ----------------------------------------------------------------------------
// (2) Cross-hit finite-chord fold: a distinct source approaches a distinct
// receiver head-on (source velocity along the sightline), pumped through c_f at
// finite separation L. This is the clean realization of the alignment condition
// v_src . rhat = c_f at finite chord.
// Source-normal D_s = c_f - speed (aligned); fold at speed = c_f, separation L.
// Fold curvature a = d^2 F / d tau^2 = -g (the pump/approach acceleration) != 0.
// ----------------------------------------------------------------------------
export function crossHitFold({ L = 1.0, g = 0.5 }) {
  // emission offset u (u<0 = earlier/farther). separation d(u), speed s(u).
  const sep = (u) => L - (u + (g * u * u) / 2); // d(0)=L
  const speed = (u) => 1 + g * u;
  const Ds = (u) => cf - speed(u); // = -g u  (head-on aligned: v . rhat = speed)
  const DT = cf; // static receiver
  // fold at u=0: separation, curvature
  const rc = sep(0);
  const a = -g; // d^2 F / d tau^2
  return {
    foldChord_rc: rc,
    foldCurvature_a: a,
    finiteChord: rc > 0.1,
    nondegenerate: Math.abs(a) > 1e-9,
    alignmentCondition: "v_src . rhat = c_f  at finite separation",
    branchWeightNote: "m = D_T / D_s = c_f / (g|u|): ordinary A2 orientation caustic, integrable via the density-of-states measure (spec Section 1.3), regulated by the causal-root Jacobian, NOT by spatial softening",
    // spec Section 2.2 finite impulse: |Dp| = chi * kappa / r_c^2 * sqrt(2 mu0 / a)
    sectionTwoImpulse: ({ kappa = 1, chi = 1, mu0 = 0.5 }) =>
      (chi * kappa) / (rc * rc) * Math.sqrt((2 * mu0) / Math.abs(a)),
  };
}

// Softening (spatial-regulator) independence: because r_c = L stays finite, the
// factor 1/(r_c^2 + soft^2) is bounded and the impulse converges as soft -> 0 -
// the opposite of the self-hit, whose r_c -> 0 made the impulse log-divergent in
// softening. Here we integrate one branch over the crossing window in the
// unfolding variable and confirm convergence.
export function softeningIndependence({ L = 1.0, g = 0.5 }, softSweep = [0.2, 0.1, 0.05, 0.02, 0.01, 0.005, 0.001]) {
  const sep = (u) => L - (u + (g * u * u) / 2);
  const Ds = (u) => -g * u;
  // impulse ~ integral over the unfolding variable mu = (1/2) a u^2 of the A2
  // density-of-states weight, with the finite chord bounding the kernel.
  // the click window must stay non-coincident: bound u0 so the chord sep(u) > 0
  // throughout (the finite-chord decoupling holds only while r_c stays finite).
  const u0 = Math.min(0.5, 0.4 * L);
  const impulseAt = (soft) => {
    let s = 0;
    const N = 200000;
    const du = u0 / N;
    for (let i = 0; i < N; i++) {
      const u = (i + 0.5) * du; // one branch, u>0
      const mu = 0.5 * Math.abs(-g) * u * u; // unfolding parameter
      const dsAbs = Math.abs(Ds(u));
      // density-of-states weight sqrt-integrable in mu; chord bounds the kernel
      s += (1 / (sep(u) ** 2 + soft * soft)) * (1 / Math.sqrt(2 * Math.abs(-g) * mu + 1e-30)) * dsAbs * du;
    }
    return s;
  };
  const values = softSweep.map((soft) => ({ soft, impulse: impulseAt(soft) }));
  const impulses = values.map((v) => v.impulse);
  const tail = impulses.slice(-3);
  const tailSpread = Math.max(...tail) - Math.min(...tail);
  const total = Math.max(...impulses) - Math.min(...impulses);
  return {
    values,
    tailSpread,
    // converges: the change per decade of softening vanishes at small soft
    softeningIndependent: tailSpread < 0.02 * Math.abs(impulses[impulses.length - 1]),
    total,
  };
}

export function diagnosticReport() {
  const selfHit = asymmetricSelfHitChord({});
  const cross = crossHitFold({});
  const softInd = softeningIndependence({});
  return {
    schema: SCHEMA,
    specPacketRef: SPEC_PACKET_REF,
    selfHitCoincidenceTheorem: selfHit,
    crossHitFiniteChordFold: {
      foldChord_rc: cross.foldChord_rc,
      foldCurvature_a: cross.foldCurvature_a,
      finiteChord: cross.finiteChord,
      nondegenerate: cross.nondegenerate,
      alignmentCondition: cross.alignmentCondition,
      branchWeightNote: cross.branchWeightNote,
      sectionTwoImpulse: cross.sectionTwoImpulse({}),
    },
    softeningIndependence: softInd,
    disposition:
      selfHit.coincidenceBirthConfirmed && cross.finiteChord && cross.nondegenerate && softInd.softeningIndependent
        ? "non_coincident_cross_hit_hinge_restores_a2_finite_impulse_contingent_on_sustained_velocity_alignment"
        : "inconclusive",
    contractRows: {
      action_ledger_row: {
        fold_curvature_a: cross.foldCurvature_a,
        fold_chord_rc: cross.foldChord_rc,
        chart_validity: "a_nonzero_finite_chord_generic_A2_fold",
        regularization_independence_witness: softInd.softeningIndependent
          ? "passed_softening_independent"
          : "failed",
        alignment_condition: cross.alignmentCondition,
      },
    },
    ...FAIL_CLOSED,
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(diagnosticReport(), null, 2));
}
