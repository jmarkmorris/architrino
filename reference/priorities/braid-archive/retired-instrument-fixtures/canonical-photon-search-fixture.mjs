// Canonical-photon search fixture — declared configuration space, grids, and
// protocol constants. Successor to the retired §99 photon branch; governed by
// reference/priorities/braid-archive/braid-ideal/canonical-photon-search-dispatch-packet.md.
//
// EVERY range and grid below is declared BEFORE any run is scored and is
// echoed verbatim in the coverage statement of the spec. Range rationale is
// stated inline. Widening any range is a costed follow-up lever, not a silent
// edit.
//
// Gauges (exact symmetries of the master equation, not search restrictions):
// - phi_I^lead = 0 fixes global rotation about z.
// - sense_I^lead = +1 fixes the y-reflection (all-sense flip composed with
//   y -> -y and phase negation is an isometry).
// - R_M = 1 fixes the overall spatial scale: with the common coupling
//   kappa* fitted per row, scaling all lengths by L rescales kappa* by L and
//   leaves the binding residual invariant.

export const CANONICAL_PHOTON_SEARCH_SCHEMA = "canonical_photon_search.v1";
export const CANONICAL_PHOTON_SEARCH_SPEC =
  "reference/priorities/braid-archive/braid-ideal/canonical-photon-search-spec.md";

export const CANONICAL_PHOTON_SEARCH_FIXTURE = {
  fieldSpeed: 1,
  chargeUnit: 1 / 6, // |e|/6 per architrino, explicit per-site signs

  // --- Declared grids -----------------------------------------------------
  // Stage P1 (structure pass, full factorial): geometry and speeds at the
  // canonical phase lattice (phi_M = phi_O = 0), senses (+,+,+),
  // sense-only mirror, H-pi partner offset. Run in full at u = 0 (rest
  // check) and u = 0.99 (primary near-luminal point).
  // Rationale: radii bracket the ratios of the only prior converged braid
  // geometry (the section 97 finalist, 0.55/1.0/0.75) and include an
  // outer-larger branch; speeds cover sub-c_f (0.6, 0.9), the exact
  // transverse pin (1.0), and the super-c_f self-hit regime (1.25);
  // spacings and gap bracket the pocket scales that appeared in sections
  // 92-99 (0.35-1.5).
  grids: {
    radiusI: [0.55, 0.75, 1.0, 1.3],
    radiusO: [0.55, 0.75, 1.0, 1.3],
    radiusM: 1.0, // scale gauge
    speed: [0.6, 0.9, 1.0, 1.25], // per pair, independent: v_I, v_M, v_O
    spacing: [0.35, 0.7], // d_1 and d_2, independent
    gap: [0.5, 1.0, 1.5], // g
    driftPrimary: [0, 0.99], // full-factorial stages P1 and P2
    driftContinuation: [0.999, 0.9999], // stage P3 champion re-solve
    driftLuminal: 1.0, // stage P4 direct evaluation + extrapolation
    // Stage P1b (phase-forward pass): the FULL discrete cross
    // (phi_M, phi_O) x sense patterns x polarity variants x Delta runs
    // against this reduced independent geometry core (not champion-derived),
    // at both primary drifts, so phasing is searched in its own right:
    coreB: {
      radius: [0.55, 1.0], // R_I and R_O
      speed: [0.6, 0.9, 1.0, 1.25], // common v_I = v_M = v_O
      spacing: [0.35, 0.7], // d_1 = d_2
      gap: [0.5, 1.5],
    },
    // Stage P2 (discrete/phase pass) applied to the best certified P1/P1b
    // rows per drift value:
    phase: [0, Math.PI / 3, (2 * Math.PI) / 3], // phi_M and phi_O
    // Within-braid sense patterns (s_I = + gauge-fixed):
    sensePatterns: [
      [1, 1, 1],
      [1, 1, -1],
      [1, -1, 1],
      [1, -1, -1],
    ],
    // (c) polarity-mirror variants: trail = sense-reversed copy (false) or
    // sense-reversed AND polarity-conjugated copy (true).
    polarityConjugate: [false, true],
    // (a) lead/trail partner phase offset Delta: the H-pi family is
    // Delta = pi; the relaxed family sweeps Delta and reports whether pi
    // is selected.
    partnerOffset: [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2],
    partnerOffsetPrimary: Math.PI,
  },

  // Stage HEX (operator-directed coplanar family, 2026-07-15): d_1 = d_2 = 0
  // collapses each braid to a rigid hexagonal 6-site ring (all binaries in
  // one plane, same radius R = 1 gauge, common speed so the hexagon
  // persists). Exactly two polarity classes exist up to rotation and global
  // conjugation: alternating (+-+-+-; binaries at 120 degrees) and blocked
  // (+++---; binaries at 60 degrees). The trail ring contra-rotates by the
  // mirror rule; its polarity-conjugation variant is absorbed by the Delta
  // sweep (conjugation = 60-degree rotation for alternating, 180 for
  // blocked), so conj is not a separate knob here. Gap starts very small
  // per the operator; the collision floor gate (0.02) still applies.
  hexPlanar: {
    speed: [0.3, 0.6, 0.9, 0.99, 1.1, 1.25], // common v; 1.0 exact excluded (luminalSelfPin at rest) in favor of 0.99/1.1 brackets
    gap: [0.05, 0.1, 0.2, 0.35, 0.5, 0.75, 1.0, 1.5],
    classes: ["alternating", "blocked"],
    partnerOffset: Array.from({ length: 12 }, (_, k) => (k * Math.PI) / 12), // 0..165 degrees in 15-degree steps
    drift: [0, 0.99, 0.999, 0.9999, 1.0],
  },

  // Champion-selection protocol (fixed before scoring): rank certified rows
  // by binding residual; ties by |axial pump|.
  selection: {
    stageP2ChampionsPerDrift: 24,
    stageP3Champions: 12,
    // P3/P4 neighborhood re-solve: each continuous DOF stepped one at a
    // time by the declared factors (geometry re-solved per drift speed,
    // never frozen).
    neighborhoodFactors: [0.8, 1.25],
    neighborhoodDofs: ["radiusI", "radiusO", "speedI", "speedM", "speedO", "d1", "d2", "gap"],
  },

  // Sampling protocol: base screen at 3 cycle samples of the slowest binary
  // period; ladder replay for champions and near-marginal rows.
  samplingLadder: [3, 6, 12, 24],
  nearMarginalFactor: 2, // rows with epsilon_bind <= factor * gate replay the ladder

  // Master-equation screen numerics (sharp law, no softening; self-pairs
  // included; fail-closed flags rather than silent omission).
  screen: {
    rootTolerance: 1e-12,
    scanOversample: 16, // initial scan points per shortest source feature period
    scanWindowPeriods: 3, // slowest-binary periods retained
    scanWindowLengths: 3, // times assembly extent / c_f, whichever larger
    windowMargin: 1.5,
    maxScanPoints: 20000,
    sourceNormalFloor: 1e-6, // |D_s| below this flags the row uncertified
    endpointExclusion: 1e-9,
    // Complete-root recursion: cells prune under the rigorous slope bound
    // |g'| <= c_f + |v_src|; an unresolved cell at the width floor fails
    // closed as a tangency flag.
    widthFloor: 1e-10,
    tangentThreshold: 1e-9,
    duplicateRootSpacing: 1e-10,
    // Per-solve refinement work cap. Exhaustion fails the row closed with
    // scanBudgetExhausted (expected on the luminal near-tangency band at
    // u = c_f, where the co-moving causal residual is persistently
    // near-critical — the documented singular structure of the endpoint).
    maxCellsPerSolve: 60000,
    // Roots older than the scan window are REPORTED as a per-row tail
    // diagnostic (not a certification gate): the bound assumes at most
    // maxRootsPerSourcePeriod tail roots per source period at receiver
    // strength <= tailStrengthCap. Window sufficiency is instead controlled
    // empirically by the declared window-doubling ladder on champions and
    // near-marginal rows.
    maxRootsPerSourcePeriod: 4,
    tailStrengthCap: 25,
    tailBudget: 1e-3, // diagnostic threshold echoed in reports
    windowLadder: [1, 2],
  },

  // Gates (screen grade only; locking and temporal verdicts belong to the
  // eom coupled release, never to this screen).
  gates: {
    bindResidual: 0.03, // same declared gate as section 99
    pump: 0.02,
    charge: 1e-12,
    collisionFloor: 0.02,
    rootResidual: 1e-9,
  },

  // Luminal endpoint protocol: direct evaluation at u = c_f with the
  // helical-residual scanner (no moving-circular reparametrization), with
  // self-pair rows flagged luminal_self_pin (every self-root sits at a
  // D_s = 0 fold; the sharp evaluator cannot certify them, so the self term
  // is reported via the u -> c_f trend of stage P3 instead). Extrapolation
  // cross-check: Richardson in (1 - u/c_f) over {0.99, 0.999, 0.9999} with
  // error budget = |two-point - three-point| extrapolant difference.
  luminal: {
    richardsonPoints: [0.99, 0.999, 0.9999],
  },

  // Independent references for this instrument (evidence independence):
  // 1. Non-self pair roots cross-checked against the production
  //    moving-circular runtime on declared sample rows (tolerance below).
  // 2. Self roots checked against the closed-form helical residual
  //    2 R |sin(omega delta / 2)| = sqrt(c_f^2 - u^2) delta solved to high
  //    precision by an independent Python/mpmath comparator, which also
  //    recomputes the master-equation acceleration from those roots.
  // 3. Section 99 analytic symmetric-pair anchor and the section 92/93/95
  //    controls reproduced as implementation tests (no target authority).
  crossCheck: {
    legacyRootTolerance: 1e-9,
    oracleForceTolerance: 1e-6,
    controlsTolerance: 1e-9,
  },

  evidenceDir: ".tmp/canonical-photon-search",
};
