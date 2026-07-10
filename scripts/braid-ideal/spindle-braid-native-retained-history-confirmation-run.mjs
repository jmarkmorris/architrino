#!/usr/bin/env node
// Spindle Braid Native Retained-History Confirmation Run.
//
// Scope contract: reference/priorities/braid-ideal/spindle-braid-native-confirmation-handoff.md
// (the named candidate row for `native_retained_history_promotion`, queue item 4).
//
// What this run does (packet Section 2):
//  1. SEED: the six prescribed spindle-braid worldlines (held phase) — exact
//     moving-circular source histories in the production runtime's own model.
//  2. RELEASE at t = 0 onto the native central-solver retained-history path:
//     every causal root, every D_s / D_T / W^rec / signedBranchOrientation is
//     solved and read from the production runtime
//     (AbsoluteHistoryRootRuntime.solveMovingCircularSourceCausalRoots,
//     consumed read-only — no new solver, no parallel stack, no schema change).
//     Post-release retained path history is consumed through the production
//     runtime's own declared approximation policy
//     ("linearized-moving-circular-source-segments"): each retained history
//     step is presented to the production solver as a zero-radius
//     moving-circular source with the retained center velocity, exactly the
//     source shape createMovingCircularSourceLinearizedRootRequests emits.
//     Cheap residual sampling over the retained record is used ONLY to bracket
//     candidate segments; every retained root row is produced by the
//     production solver call on that segment.
//  3. Retains full path history over a declared finite memory window and
//     reports the packet Section 3 same-record acceptance rows.
//
// Fail-closed (packet Section 3): this script flips no acceptance flag.
//   retainedBranchClaim = false, scoreMovement = no_score_increase.
// The accept/reject decision belongs to the operator, in the run thread.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { solveMovingCircularSourceCausalRoots } from "../../src/solver/app/AbsoluteHistoryRootRuntime.mjs";
import {
  railPinnedEquilibrium,
  radialStabilityMatrix,
  tiltStiffness,
  supportRatios as instrumentSupportRatios,
  SELF_EQUILIBRATED_V5,
} from "./spindle-support-ratio-targeted-search.mjs";

export const SCHEMA = "spindle_braid_native_retained_history_confirmation_run.v0";
export const HANDOFF_PACKET_REF =
  "reference/priorities/braid-ideal/spindle-braid-native-confirmation-handoff.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false,
  acceptedSameLevelBranchClaim: false,
  retainedBranch: null,
  scoreMovement: "no_score_increase",
  acceptedSeedPathCertificate: false,
  authority:
    "priority_only_native_runtime_confirmation_run_operator_acceptance_pending_same_thread",
});

const TWO_PI = 2 * Math.PI;
const deg = (d) => (d * Math.PI) / 180;

// ---------------------------------------------------------------------------
// Tabled candidate rows (handoff packet; geometry is TABLED, not a knob).
//  Row 1: the Section 22 unified-closure champion (packet Section 1).
//  Row 2: support-candidate v1 (packet "Candidate Row 2", tabled 2026-07-09;
//         spec Sections 36-37 support-first search + sum rule). Cadence is
//         pinned to the transverse rail: omega = c_f / (R_M cos alpha_M).
//  Row 5: SELF-CONSISTENT STATIC-SEA CANDIDATE V3 (packet "Candidate Row 5",
//         tabled 2026-07-09; spec Sections 51-52 by title — the tangential-
//         closure search + self-consistent cap-credit fixed point; exported
//         SELF_CONSISTENT_V3 in spindle-support-ratio-targeted-search.mjs).
//         Tilted rail: alpha_M = -29.04 deg, cadence omega = 1/cos(alpha_M)
//         ~ 1.144, all layers sub-field. Selecting Row 5 ALSO selects its
//         environment (the static pair-resolved sea below): geometry and
//         environment are one tabled row, not separate knobs.
//  Row 6: OCTAHEDRAL-CAGE CANDIDATE V4 (packet "Candidate Row 6", tabled
//         2026-07-09; spec Sections 54-55 by title — the true-placement
//         axis-declared credit fixed point + cage reciprocity; exported
//         OCTAHEDRAL_CAGE_V4 in spindle-support-ratio-targeted-search.mjs).
//         Tilted rail: alpha_M = -30.16 deg, cadence omega = 1/cos(alpha_M)
//         ~ 1.156, all layers sub-field. Selecting Row 6 ALSO selects its
//         environment: the HELD octahedral cage (six sites at radius
//         1.645*sqrt(2) = 2.326 — two polar, four equatorial), same frozen
//         antipodal-pair build as Row 5 on the octahedral placement.
//         CLAIM BOUNDARY (packet, declared up front): a survival certifies
//         the braid INSIDE A HELD CAGE, not a self-supporting braid+cage
//         complex; the declared cage strain (Section 55: polar -0.641 of the
//         corridor force scale inward, equatorial +0.09..0.15, torques ~0)
//         is a seed row, not a tunable.
//  Row 7: SELF-EQUILIBRATED CANDIDATE V5 (packet "Candidate Row 7", tabled
//         2026-07-09; spec Sections 57-59 by title — the seed-grade radial
//         stability matrix, the absolute-scale instrument, and the tilt
//         block; exported SELF_EQUILIBRATED_V5 in
//         spindle-support-ratio-targeted-search.mjs). NO ENVIRONMENT: bare
//         braid. Tilted rail: alpha_M = +16.24 deg, cadence
//         omega = 1/cos(alpha_M) ~ 1.0415, all layers sub-field
//         (speeds ~ 0.51 / 1.00 / 0.34). Binding obligations (packet Row 7):
//         (1) the FULL stability gate is re-derived IN-BUILD before release
//         (radial equilibrium residual + rail-pinned basin spectrum, tau
//         rows, tilt block with exact global null and quotient relative-tilt
//         spectrum), witnessed, and the release seeds from the RE-DERIVED
//         equilibrium; (2) frozen-kappa discipline — the release coupling is
//         the gauge-invariant equilibrium value kappa_eq = kappa_fit/lambda
//         (= c_f^2 R_M(eq)^-1 in kappa units, Section 58 Result 3: the
//         per-configuration kappa refit is a gauge that hides the size mode,
//         so kappa is fitted ONCE on the bare channel and frozen; the
//         equilibrium coupling is invariant under where along the gauge
//         orbit the single fit is taken).
// ---------------------------------------------------------------------------
export const TABLED_ROWS = Object.freeze({
  1: Object.freeze([
    Object.freeze({ name: "I", R: 0.5, alpha: deg(-12), theta: 0 }),
    Object.freeze({ name: "M", R: 1.0, alpha: 0, theta: deg(120) }),
    Object.freeze({ name: "O", R: 1.65, alpha: deg(84), theta: deg(330) }),
  ]),
  2: Object.freeze([
    Object.freeze({ name: "I", R: 0.462, alpha: deg(-10.44), theta: deg(-23.7) }),
    Object.freeze({ name: "M", R: 1.0, alpha: deg(-2.67), theta: deg(120) }),
    Object.freeze({ name: "O", R: 1.236, alpha: deg(84.0), theta: deg(337.04) }),
  ]),
  5: Object.freeze([
    Object.freeze({ name: "I", R: 0.4935, alpha: deg(-3.65), theta: deg(-12.2) }),
    Object.freeze({ name: "M", R: 1.0, alpha: deg(-29.04), theta: deg(120) }),
    Object.freeze({ name: "O", R: 1.036, alpha: deg(67.5), theta: deg(333.5) }),
  ]),
  6: Object.freeze([
    Object.freeze({ name: "I", R: 0.4935, alpha: deg(2.85), theta: deg(-4.2) }),
    Object.freeze({ name: "M", R: 1.0, alpha: deg(-30.16), theta: deg(120) }),
    Object.freeze({ name: "O", R: 1.106, alpha: deg(67.5), theta: deg(333.5) }),
  ]),
  7: Object.freeze([
    Object.freeze({ name: "I", R: 0.55, alpha: deg(-27.15), theta: deg(-16.2) }),
    Object.freeze({ name: "M", R: 1.0, alpha: deg(16.24), theta: deg(120) }),
    Object.freeze({ name: "O", R: 0.75, alpha: deg(64.5), theta: deg(339.5) }),
  ]),
});

export function selectTabledRow(row) {
  const layers = TABLED_ROWS[row];
  if (!layers) throw new Error(`unknown tabled candidate row: ${row}`);
  DECLARED.candidateRow = row;
  DECLARED.layers = layers;
  const aM = layers.find((L) => L.name === "M").alpha;
  DECLARED.omega = 1 / Math.cos(aM); // beta_M = omega R_M cos(alpha_M) = 1 (rail)
  // Rows 5/6: the frozen static-pair environment is part of the tabled row
  // (packet Candidate Rows 5 and 6) — geometry and environment are one row.
  DECLARED.staticPairSea.enabled = row === 5 || row === 6;
  const sp = DECLARED.staticPairSea;
  if (row === 5) {
    sp.placement = "fcc12";
    sp.spacing = 2.453; // SELF_CONSISTENT_V3.aSea (tabled, not a knob)
    sp.tabledInstrumentCredit = 0.3172; // Section 52 x2-count-scaled anchor
    sp.tabledSeaRows = null;
    sp.tabledTotals = null;
  } else if (row === 6) {
    sp.placement = "octahedral6";
    sp.spacing = 1.645 * Math.SQRT2; // OCTAHEDRAL_CAGE_V4.siteRadius = 2.326 (tabled)
    // Section 54 tabled anchors (true placement, axis-declared; NOT count-scaled):
    sp.tabledInstrumentCredit = 0.4178; // per-layer O sea row (the cap credit)
    sp.tabledSeaRows = { I: 0.0013, M: -0.01, O: 0.4178 };
    sp.tabledTotals = { I: 1.0006, M: 0.9961, O: 0.9937 };
  }
  // Row 7 is the BARE self-equilibrated candidate: no environment of any kind,
  // and the in-build stability gate (binding obligation 1) is armed.
  DECLARED.bareGate.enabled = row === 7;
}

// ---------------------------------------------------------------------------
// Declared run parameters (all regulators named; packet Section 3 discipline).
// ---------------------------------------------------------------------------
export const DECLARED = {
  fieldSpeed: 1, // c_f
  omega: 1, // pinned transverse cadence (beta_M = 1 on the rail); set by selectTabledRow
  candidateRow: 1,
  // Tabled candidate row (canonical, NOT a knob; selected via --row, default
  // Row 1 = the packet Section 1 champion). See TABLED_ROWS below.
  layers: null, // assigned by selectTabledRow at module load (bottom of DECLARED)
  // Regulators (declared, lane canon):
  soft: 0.02, // Jacobian softening in m_reg = D_T D_s / (D_s^2 + soft^2)
  coincidenceStratum: 0.01, // rho_c: declared d0-stratum run regulator.
  // d0 per the 2026-07-08 operator declaration is ~kappa*eps^2/c_f^2 (R_MCB,
  // exact value open); the pin-stability bound is d0 <= rho_c* ~ 0.022
  // (spec Section 12). rho_c = 0.01 sits inside the stable range. Regulator
  // dependence is reported, not hidden (report.regulatorSensitivity).
  // d_min must sit BELOW the stratum: the same-source fold-click brake lives at
  // emission delays of order rho_c right after a rail crossing; excluding
  // delays below rho_c silently skips the click transaction (measured in the
  // first smoke run of this script). Coincidence is regularized by rho_c in
  // the force denominator, so near-coincident roots are safe to book.
  sameSourceMinimumDelay: 1e-4, // d_min << rho_c (coincidence handling declared)
  timeStep: 0.0025, // must resolve the stratum-scale click window at the rail
  bracketStrideCoarse: 4, // released-history bracket sampling stride (far zone)
  bracketFineDelay: 0.12, // delays below this sampled at stride 1 (near zone)
  memoryWindowRotations: 3, // declared finite memory depth
  runRotations: 3,
  twinRotations: 1,
  twinPerturbation: 1e-3, // tangential kick on the middle + site (stability row)
  causalSlack: 0.8, // additive slack on the causal delay bound per pair
  haltMaxRadius: 12,
  haltMaxSpeed: 6,
  tubeRadiusForShapeQuestion: 0.1, // |x - x_rigid| threshold (R_M units), declared
  // Chart-clean same-source click booking (spec Sections 2/3.1/3.3; opt-in via
  // --chart). The pointwise soft-regularized m_reg suppresses the same-source
  // brake by ~soft/D_s near the rail (D_s << soft there), which is exactly the
  // fold-flagged regime where the contract says the integrated weight must
  // replace the pointwise weight. In chart mode the same-source channel books
  // m = D_T/D_s unsoftened (production signedBranchOrientation, treated as a
  // density-of-states integral via substeps), with the declared d0 stratum in
  // the force denominator; cross-pair channels keep the canonical m_reg.
  // Non-circular same-level seed (opt-in via --em/--ei/--eo): per-layer
  // epicyclic release. The layer is seeded at its apsis radius rho*f with
  // angular-momentum-matched tangential speed beta/f, and its HELD prehistory
  // is the matched circle (omega/f^2) — exactly representable as a production
  // moving-circular source, so release carries no position/velocity
  // discontinuity. e=0 reproduces the tabled circular seed exactly. Declared
  // hunt probe: the escapement's natural cycle is sub-rail at apoapsis,
  // rail-crossing clicks near periapsis.
  //
  // Epicyclic-hunt knobs (epicyclic-hunt-handoff.md; both declared):
  //  - apsisStart (--start-i/--start-m/--start-o = apo|peri): which apsis the
  //    layer is released from. f = 1+e (apoapsis, slower matched circle) or
  //    f = 1-e (periapsis, faster matched circle). Both are a.m.-matched
  //    (rho*f * beta/f = rho*beta) and both keep the exact-prehistory
  //    property: with an origin-centered matched-circle prehistory the
  //    release point necessarily has zero radial velocity, i.e. release is
  //    always AT an apsis — the start choice selects which one.
  //  - apsidalPhase (--phi-i/--phi-m/--phi-o, degrees): per-layer azimuthal
  //    offset of the apsis line (argument of apsis). The layer is released at
  //    azimuth theta + phi instead of theta, i.e. the release point / apsis
  //    is placed elsewhere along the closed epicycle relative to the braid
  //    pattern. The tabled azimuth theta itself is untouched; phi is the
  //    declared epicyclic knob. phi=0 regresses exactly.
  epicycle: { I: 0, M: 0, O: 0 },
  apsidalPhase: { I: 0, M: 0, O: 0 }, // radians
  apsisStart: { I: "apo", M: "apo", O: "apo" }, // "apo" | "peri"
  // Sea-confined mode (opt-in via --sea): the SH-0-sea FCC-12 static shell
  // (held-release-causal-wake-toy.mjs sea-screened decoration; spec Section 27
  // precedent) as a ONE-WAY held environment — 12 aligned face-opposite
  // six-site braid units on the FCC nearest-neighbor directions, static in the
  // void frame, acting on the released seed with no back-reaction (declared
  // held histories). Environment sources are zero-radius static
  // moving-circular production sources; only canon-named spacings are used:
  // the SH-0-sea named spacing 4.25 and the minimum non-overlap spacing
  // 2*sqrt(2). No spacing tuning.
  sea: {
    enabled: false,
    spacing: 4.25, // SH-0-sea named spacing (CLI --sea-spacing; 2.8284 = min non-overlap)
    unitOffsets: [
      [1, 0, 0], [0, 1, 0], [0, 0, 1],
      [-1, 0, 0], [0, -1, 0], [0, 0, -1],
    ],
    unitPolarities: [1, 1, 1, -1, -1, -1],
    fccDirections: [
      [1, 1, 0], [1, -1, 0], [-1, 1, 0], [-1, -1, 0],
      [1, 0, 1], [1, 0, -1], [-1, 0, 1], [-1, 0, -1],
      [0, 1, 1], [0, 1, -1], [0, -1, 1], [0, -1, -1],
    ],
  },
  // Responsive-sea mode (opt-in via --responsive-sea): Candidate Row 3 —
  // the sea-dressed release of support-candidate v1 (handoff packet Row 3,
  // tabled 2026-07-09). ALL parameters are pre-existing named quantities;
  // nothing is fit:
  //  - Geometry: the FCC first coordination shell — 12 sites at the named
  //    spacing a = 4.25 (the SH-0-sea named spacing; same fccDirections set
  //    as the static --sea mode).
  //  - Each site: a saturable orientational dipole of magnitude p0 = 2.20
  //    (the spindle's own axial polarity dipole at v1 geometry —
  //    sh0-sea-orientation-saturation-margin-estimate.mjs braidAxialDipole),
  //    direction evolving by first-order relaxation toward the local
  //    retarded braid field direction, dpHat/dt = gamma (EHat - pHat)_perp,
  //    at the measured one-sided fast-alignment floor gamma = 2 omega_braid
  //    (spec "The Dressed Budget" Result 3).
  //  - Sea sites are environment sources with their own retarded emission
  //    (the braid reads each dipole's orientation at the emission time
  //    t_e = t - r/c_f); static in position — orientation-only dynamics at
  //    this row's scope (declared idealization, reported).
  //  - Kernel: the Section 43 receiver-normal saturated-dipole kernel —
  //    braid->sea drive leg carries the signed branch weight m = c_f/D_s at
  //    the retarded braid source; sea->braid leg carries the receiver-normal
  //    factor D_T/c_f on the moving braid site and the point-dipole field of
  //    p = p0 pHat(t_e). This is the accepted estimate-instrument kernel
  //    promoted to the live release; the dipoles are NOT production
  //    moving-circular sources (a reorienting dipole arm is not representable
  //    without superluminal arm motion), so the environment channel is
  //    analytic-kernel grade on top of the native braid-braid root machinery
  //    (declared honestly in the certificate).
  responsiveSea: {
    enabled: false,
    // Tabled spacings only (CLI --rsea-spacing; NOT a search knob):
    //  4.25 = Candidate Row 3 (the SH-0-sea named spacing; executed, rejected —
    //         anti-confining at exact per-pair causal delays, spec Section 44);
    //  3.40 = Candidate Row 4 (the exact-delay supply=deficit fixed-point
    //         region, deliberate mild surplus side; tabled 2026-07-09 — the
    //         named-constant re-declaration decision is deferred pending the
    //         Row 4 verdict).
    spacing: 4.25,
    p0: 2.2, // the spindle's own axial polarity dipole at v1 (not a knob)
    gammaOverOmega: 2, // measured one-sided fast-alignment floor (not a knob)
    settleRotations: 3, // held-prehistory settle window before release (declared)
    orientationInit: "delayed_field_direction_at_settle_start", // declared
  },
  // Static pair-resolved sea (Candidate Row 5; selected BY --row=5, not a
  // separate flag — the environment is part of the tabled row). Packet block
  // "Candidate Row 5: Static-Sea Release of Self-Consistent Candidate V3";
  // design record spec Sections 51-52 (by title). NO dynamic sea knobs:
  //  - FCC first coordination shell, 12 sites, TRUE angular placement, at the
  //    tabled a = 2.453 (SELF_CONSISTENT_V3.aSea; not a knob).
  //  - Each site realized as its declared antipodal unit-polarity pair:
  //    monopoles of polarity +-1 at +- p0/2 along the site's slow-limit
  //    orientation, p0 = the braid's own axial polarity dipole
  //    |sum_sites pol * z0| (= |sum_layers 2 R sin alpha|; not a knob).
  //  - Slow-limit orientation computed IN-BUILD: unit(cycle-averaged bare
  //    retarded braid field at the site center), the gamma->0 selection —
  //    exact per-source retardation iteration on the held rigid worldlines,
  //    averaged over ntOrientation phases of the braid cycle — then FROZEN.
  //    Sampling witness at ntWitness (the Section 52 proxy-aliasing trap:
  //    binding obligation 2, no aliased shortcut anywhere).
  //  - Positions and orientations static for the whole release: exact causal
  //    delays are trivial; every endpoint is a zero-radius static production
  //    source booked through the SAME native path as the braid (production
  //    solver roots, canonical m_reg force law) — unlike the Rows 3-4
  //    analytic-kernel dipoles, this environment channel is production-grade.
  //  - Channel split: the sea books into the dressed wake AND separately into
  //    aSea, so the kappa* fit stays on the bare braid channel (Rows 1-4
  //    protocol) and the cap credit is re-derived in-build at true placement
  //    (binding obligation 1; tabled instrument value 0.3172 at x2-scaled
  //    6-direction placement is the comparison anchor, not the seed anchor).
  staticPairSea: {
    enabled: false, // set by selectTabledRow(5|6)
    // Placement is part of the tabled row (set by selectTabledRow, not a knob):
    //  "fcc12"      = Row 5: FCC first coordination shell, 12 sites, true
    //                 angular placement at a = 2.453 (SELF_CONSISTENT_V3.aSea).
    //  "octahedral6" = Row 6: the HELD octahedral cage — six braid-selected
    //                 neighbors at radius 1.645*sqrt(2) = 2.326 (two polar
    //                 +-z, four equatorial +-x/+-y; OCTAHEDRAL_CAGE_V4,
    //                 spec Section 54 by title). Same frozen antipodal
    //                 unit-polarity pair build; positions and orientations
    //                 HELD for the whole release (the strain is declared,
    //                 not hidden — see cageStrainDeclared below).
    placement: "fcc12",
    spacing: 2.453,
    octahedralDirections: [
      [0, 0, 1], [0, 0, -1], // polar
      [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], // equatorial
    ],
    ntOrientation: 64, // in-build slow-limit cycle average (dt-stable grade)
    ntWitness: 32, // sampling witness resolution (must agree; obligation 2)
    tabledInstrumentCredit: 0.3172, // per-row comparison anchor (report row)
    tabledSeaRows: null, // Row 6: Section 54 per-layer sea rows (report anchors)
    tabledTotals: null, // Row 6: Section 54 dressed totals (report anchors)
    corridor: [0.97, 1.03], // dressed-support release gate (binding obligation 1)
    // Row 6 cage honesty anchors (Section 55 by title; DECLARED seed strain,
    // not tunables): per-member net radial force / corridor force scale
    // (needO = omega^2 qO cos alphaO), torque-free orientations.
    cageStrainDeclared: {
      polarFradOverNeedO: -0.641, // inward; the cap credit's Newton-pair
      equatorialFradOverNeedO: [0.09, 0.15], // sampling-sensitive band
      torqueOverNeedO: 0.01, // zero to instrument precision (< 0.01)
    },
    cageHonestyNt: 24, // Section 55 cycle-average resolution (Nt=24/48 identical)
    stericClearanceDeclared: 0.8, // endpoint-to-cap reach (Section 54 caveat)
  },
  // Row 7 in-build bare stability gate (binding obligation 1; spec Sections
  // 57-59 by title). All anchors are the TABLED gate-certificate rows
  // (comparison anchors, not tunables); all tolerances are declared here.
  bareGate: {
    enabled: false, // set by selectTabledRow(7)
    // Tabled anchors (packet Row 7 gate certificate). kappaCertificate is the
    // certificate's fit gauge (fitted at the V4-shape start of the Section 58
    // descent and frozen); the in-build fit lands on a different point of the
    // same gauge orbit — the invariant rows are kappa_eq = kappa_fit/lambda
    // and R_M(eq) = lambda/kappa_fit (Section 58 Result 3).
    anchors: {
      kappaCertificate: 0.4615,
      ReqOverKappa: 3.494, // R_M(eq) in units kappa*eps^2/c_f^2 (gauge-invariant)
      radialSpectrum: [-0.63, -2.0, -6.27], // certificate gauge (scales as lambda^2)
      tauI: 0.0006,
      tauO: 0.0004,
      railPumpM: 0.227, // the escapement's, as always (excluded from the gate)
      tiltRelativeEigen: [-0.1247, -0.7485],
      closure: 0.425, // Section 58: closure and ledger metrics disagree openly
    },
    // Declared gate tolerances (release only if every row passes):
    maxEquilibriumResidual: 5e-5, // max |net radial force| at the release seed
    maxAbsTau: 0.005, // |tau_I|, |tau_O| at the re-derived equilibrium
    maxShapeCorrection: 0.02, // |qI,qO re-derived - tabled| (report, gate loose)
    epsWitness: 0.005, // radial-matrix displacement witness (base eps 0.01)
    spectrumWitnessRelTol: 0.05,
    tiltNt: 8,
    tiltNtWitness: 16, // Section 59: Nt=8/16 identical
    tiltWitnessRelTol: 0.05,
    // Basin-width instrument (Row 7 decisive diagnostic 1): twin rows at
    // SEVERAL kick sizes; the declared returning-classification is
    // maxSep < tubeRadius AND final separation < 0.9 * peak (turned around).
    twinKicks: [0.001, 0.003, 0.01, 0.03],
  },
  chart: {
    enabled: false,
    foldJacobianThreshold: 0.02, // |D_s| below this = fold-flagged, substep-integrate
    windowMinDelay: 0.002, // same-source window emission-delay floor (the accepted
    // brake-measurement convention, self-hit-brake-central-measurement.mjs)
    subSteps: 32,
    witnessSubSteps: 64, // regularization-independence witness resolution
    maxClickRows: 60, // detailed click rows retained (aggregates always kept)
  },
};
selectTabledRow(1);

// ---------------------------------------------------------------------------
// Site construction (identical geometry to the Section 22 champion evaluator).
// ---------------------------------------------------------------------------
export function buildSites() {
  const sites = [];
  for (const L of DECLARED.layers) {
    const e = DECLARED.epicycle[L.name] ?? 0;
    const phi = DECLARED.apsidalPhase[L.name] ?? 0;
    const start = DECLARED.apsisStart[L.name] ?? "apo";
    // apsis factor: apoapsis f=1+e (slower matched circle), periapsis f=1-e
    // (faster matched circle); both a.m.-matched, both exact-prehistory.
    const f = start === "peri" ? 1 - e : 1 + e;
    for (const sgn of [+1, -1]) {
      const rho = L.R * Math.cos(L.alpha) * f;
      sites.push({
        id: `${L.name}${sgn > 0 ? "+" : "-"}`,
        layer: L.name,
        R: L.R,
        alpha: L.alpha,
        rho,
        z0: sgn * L.R * Math.sin(L.alpha),
        phase: L.theta + phi + (sgn > 0 ? 0 : Math.PI),
        pol: sgn, // polarity product sigma_i sigma_j is all the force law uses
        // held cadence: angular-momentum-matched circle at the chosen apsis
        omegaHeld: DECLARED.omega / (f * f),
        epicycle: e,
        apsisFactor: f,
        apsisStart: start,
        apsidalPhase: phi,
      });
    }
  }
  return sites;
}

export function buildSeaSites() {
  if (!DECLARED.sea.enabled) return [];
  const out = [];
  const s = DECLARED.sea.spacing;
  for (let d = 0; d < DECLARED.sea.fccDirections.length; d += 1) {
    const dir = DECLARED.sea.fccDirections[d];
    const n = Math.hypot(dir[0], dir[1], dir[2]);
    const center = [(dir[0] / n) * s, (dir[1] / n) * s, (dir[2] / n) * s];
    for (let k = 0; k < DECLARED.sea.unitOffsets.length; k += 1) {
      const o = DECLARED.sea.unitOffsets[k];
      out.push({
        id: `sea:${d}:${k}`,
        position: [center[0] + o[0], center[1] + o[1], center[2] + o[2]],
        pol: DECLARED.sea.unitPolarities[k],
      });
    }
  }
  return out;
}

function staticSeaSourceModel(seaSite) {
  return {
    centerAtEpoch: { x: seaSite.position[0], y: seaSite.position[1], z: seaSite.position[2] },
    centerVelocity: { x: 0, y: 0, z: 0 },
    radiusU: { x: 0, y: 0, z: 0 },
    radiusV: { x: 0, y: 0, z: 0 },
    angularVelocity: 0,
    phaseAtEpoch: 0,
    epochTime: 0,
  };
}

// Static held environment source: the causal root sits exactly at
// t_e = t_H - |x_r - s|/c_f; a narrow production window around it suffices.
export function seaWakeContribution({ seaSites, xi, vi, receiverPol, tH }) {
  const soft = DECLARED.soft;
  const rc2 = DECLARED.coincidenceStratum * DECLARED.coincidenceStratum;
  const a = [0, 0, 0];
  let netRadial = 0;
  for (const sea of seaSites) {
    const dist = Math.hypot(
      xi[0] - sea.position[0],
      xi[1] - sea.position[1],
      xi[2] - sea.position[2]
    );
    const tRoot = tH - dist / DECLARED.fieldSpeed;
    const result = solveMovingCircularSourceCausalRoots({
      source: staticSeaSourceModel(sea),
      receiver: {
        startTime: tH,
        positionAtStart: { x: xi[0], y: xi[1], z: xi[2] },
        velocity: { x: vi[0], y: vi[1], z: vi[2] },
      },
      hitTime: tH,
      signalSpeed: DECLARED.fieldSpeed,
      sourceStartTime: tRoot - 0.05,
      sourceEndTime: Math.min(tRoot + 0.05, tH),
      rootTolerance: 1e-12,
      scanSubdivisions: 8,
      maxRoots: 2,
    });
    for (const root of result.roots ?? []) {
      const r = root.distance;
      if (!(r > 0) || !Number.isFinite(r)) continue;
      const dir = [
        (root.receiverPoint.x - root.sourcePoint.x) / r,
        (root.receiverPoint.y - root.sourcePoint.y) / r,
        (root.receiverPoint.z - root.sourcePoint.z) / r,
      ];
      const Ds = root.sourceNormalDenominator;
      const Dt = root.receiverNormalNumerator;
      const mReg = (Dt * Ds) / (Ds * Ds + soft * soft);
      const w = (receiverPol * sea.pol * mReg) / (r * r + rc2);
      a[0] += w * dir[0];
      a[1] += w * dir[1];
      a[2] += w * dir[2];
    }
  }
  const rho = Math.hypot(xi[0], xi[1]);
  if (rho > 1e-12) netRadial = (a[0] * xi[0] + a[1] * xi[1]) / rho;
  return { a, netRadial };
}

// ---------------------------------------------------------------------------
// Static pair-resolved sea (Candidate Row 5). Build is deterministic from the
// tabled row: true FCC-12 placement at the tabled spacing, in-build slow-limit
// orientations on the held rigid worldlines, frozen antipodal unit-polarity
// pair endpoints. Endpoints are plain static sites ({position, pol}), booked
// through seaWakeContribution's production-solver path.
// ---------------------------------------------------------------------------
export function braidAxialDipole(sites) {
  let pz = 0;
  for (const s of sites) pz += s.pol * s.z0; // = sum_layers 2 R sin(alpha)
  return Math.abs(pz);
}

export function buildStaticPairSeaSites(sites, nt = DECLARED.staticPairSea.ntOrientation) {
  if (!DECLARED.staticPairSea.enabled) return null;
  const a = DECLARED.staticPairSea.spacing;
  const p0 = braidAxialDipole(sites);
  const period = TWO_PI / DECLARED.omega;
  const shell = [];
  const endpoints = [];
  const placement = DECLARED.staticPairSea.placement;
  const directions =
    placement === "octahedral6"
      ? DECLARED.staticPairSea.octahedralDirections
      : DECLARED.sea.fccDirections;
  for (let k = 0; k < directions.length; k += 1) {
    const dir = directions[k];
    const n = Math.hypot(dir[0], dir[1], dir[2]);
    const center = [(dir[0] / n) * a, (dir[1] / n) * a, (dir[2] / n) * a];
    // slow-limit orientation: unit(cycle-averaged bare retarded braid field),
    // exact per-source retardation on the held rigid worldlines (histories
    // null => rigid), averaged over nt phases of the braid cycle, then FROZEN.
    const acc = [0, 0, 0];
    for (let q = 0; q < nt; q += 1) {
      const E = braidRetardedFieldAt(center, sites, null, (q / nt) * period);
      acc[0] += E[0];
      acc[1] += E[1];
      acc[2] += E[2];
    }
    const pHat = unit3(acc);
    // axis declaration (the Row 5 lesson: credit at true placement,
    // axis-declared): polar = on-axis site, equatorial = in-plane site.
    const siteClass = Math.abs(dir[2] / n) > 0.9 ? "polar" : "equatorial";
    shell.push({ id: `spsea:${k}`, center, pHat, siteClass });
    for (const pm of [+1, -1]) {
      endpoints.push({
        id: `spsea:${k}:${pm > 0 ? "+" : "-"}`,
        position: [
          center[0] + pm * (p0 / 2) * pHat[0],
          center[1] + pm * (p0 / 2) * pHat[1],
          center[2] + pm * (p0 / 2) * pHat[2],
        ],
        pol: pm,
        shellIndex: k,
        siteClass,
      });
    }
  }
  return { shell, endpoints, p0, spacing: a, ntUsed: nt, placement };
}

// Cycle-averaged per-layer sea rows on the held braid, through the SAME
// production-solver booking path (seaWakeContribution). The tabled Row 6
// anchors (+0.0013/-0.0100/+0.4178, Section 54 by title) are cycle averages
// (the instrument convention); a single-phase sample differs by the cage's
// angular ripple (the 4-fold equatorial pattern beats against the 2-sample
// antipodal pair — strongest on M). This is phase AVERAGING of the declared
// quantity, exact per phase for static sources; it is NOT count scaling (the
// Row 5 lesson bans count scaling, not averaging). The per-phase ripple is
// reported alongside — the released dynamics feel the ripple, and that is a
// release finding, not a seed correction.
export function cycleAveragedSeaRows(sites, endpoints, kappa, nt = 16) {
  const period = TWO_PI / DECLARED.omega;
  const w2 = DECLARED.omega * DECLARED.omega;
  const rows = {};
  const rippleMin = {};
  const rippleMax = {};
  for (let q = 0; q < nt; q += 1) {
    const t = (q / nt) * period;
    const phaseRow = {};
    for (const s of sites) {
      const xi = rigidPosition(s, t);
      const vi = rigidVelocity(s, t);
      const sea = seaWakeContribution({ seaSites: endpoints, xi, vi, receiverPol: s.pol, tH: t });
      const rho = Math.hypot(xi[0], xi[1]);
      if (!(rho > 1e-12)) continue;
      const inward = -((sea.a[0] * xi[0] + sea.a[1] * xi[1]) / rho);
      const frac = (kappa * inward) / (w2 * rho);
      rows[s.layer] = (rows[s.layer] ?? 0) + frac / (2 * nt);
      phaseRow[s.layer] = (phaseRow[s.layer] ?? 0) + frac / 2;
    }
    for (const L of Object.keys(phaseRow)) {
      rippleMin[L] = Math.min(rippleMin[L] ?? Infinity, phaseRow[L]);
      rippleMax[L] = Math.max(rippleMax[L] ?? -Infinity, phaseRow[L]);
    }
  }
  return { rows, rippleMin, rippleMax, ntUsed: nt };
}

// Frozen-sea back-reaction honesty row (Row 5 diagnostic 5): a static
// environment cannot respond, so record what the frozen sites WOULD feel —
// the misalignment of the braid's live retarded field against each frozen
// orientation, and the net force each pair would carry (per unit kappa).
// Large sustained values flag the frozen-orientation idealization as the
// row's scope boundary; this row reports, it does not tune.
export function frozenSeaBackReactionRow(staticPairSea, sites, histories, t) {
  let sumAngle = 0;
  let maxAngle = 0;
  let sumForce = 0;
  let netRadial = 0;
  const n = staticPairSea.shell.length;
  for (let k = 0; k < n; k += 1) {
    const site = staticPairSea.shell[k];
    const E = braidRetardedFieldAt(site.center, sites, histories, t);
    const eHat = unit3(E);
    const dot = Math.max(-1, Math.min(1,
      eHat[0] * site.pHat[0] + eHat[1] * site.pHat[1] + eHat[2] * site.pHat[2]));
    const ang = Math.acos(dot);
    sumAngle += ang / n;
    if (ang > maxAngle) maxAngle = ang;
    // net pair force per unit kappa: F = sum_pm pm * E(endpoint)
    const F = [0, 0, 0];
    for (const pm of [+1, -1]) {
      const X = [
        site.center[0] + pm * (staticPairSea.p0 / 2) * site.pHat[0],
        site.center[1] + pm * (staticPairSea.p0 / 2) * site.pHat[1],
        site.center[2] + pm * (staticPairSea.p0 / 2) * site.pHat[2],
      ];
      const Ee = braidRetardedFieldAt(X, sites, histories, t);
      F[0] += pm * Ee[0];
      F[1] += pm * Ee[1];
      F[2] += pm * Ee[2];
    }
    sumForce += Math.hypot(F[0], F[1], F[2]) / n;
    const rC = Math.hypot(site.center[0], site.center[1], site.center[2]);
    netRadial +=
      (F[0] * site.center[0] + F[1] * site.center[1] + F[2] * site.center[2]) / rC / n;
  }
  return {
    t,
    meanMisalignmentDeg: (sumAngle * 180) / Math.PI,
    maxMisalignmentDeg: (maxAngle * 180) / Math.PI,
    meanPairNetForcePerKappa: sumForce,
    meanPairNetOutwardRadialPerKappa: netRadial,
  };
}

// ---------------------------------------------------------------------------
// Row 6 cage rows (packet Candidate Row 6; spec Section 55 conventions).
// ---------------------------------------------------------------------------
// Retarded braid field at a static point with the Section 55 SOFTENED branch
// weight m = D_s / (D_s^2 + soft^2) — the rail layer's caustic fan crosses
// external points, so the unsoftened c/D_s kernel is not usable on cage
// endpoints. Exact per-source retardation; held prehistory rigid, released
// history from the retained record (same lookup shape as braidRetardedFieldAt).
export function braidRetardedFieldSoftenedAt(X, sites, histories, t) {
  const c = DECLARED.fieldSpeed;
  const soft = DECLARED.soft;
  const E = [0, 0, 0];
  for (let i = 0; i < sites.length; i += 1) {
    const posAt = (tE) =>
      histories && tE > 0 ? histories[i].positionAt(tE) : rigidPosition(sites[i], tE);
    let tE = t - Math.hypot(X[0], X[1], X[2]) / c;
    for (let it = 0; it < 60; it += 1) {
      const p = posAt(tE);
      const r = Math.hypot(X[0] - p[0], X[1] - p[1], X[2] - p[2]);
      const next = t - r / c;
      if (Math.abs(next - tE) < 1e-12) {
        tE = next;
        break;
      }
      tE = next;
    }
    const p = posAt(tE);
    const dx = [X[0] - p[0], X[1] - p[1], X[2] - p[2]];
    const r = Math.hypot(dx[0], dx[1], dx[2]);
    if (!(r > 0)) continue;
    const rh = [dx[0] / r, dx[1] / r, dx[2] / r];
    let v;
    if (histories && tE > 0) {
      const h = histories[i];
      let k = Math.min(h.ts.length - 1, Math.max(0, Math.floor(tE / DECLARED.timeStep)));
      while (k > 0 && h.ts[k] > tE) k -= 1;
      while (k < h.ts.length - 1 && h.ts[k + 1] <= tE) k += 1;
      v = h.vs[k];
    } else {
      v = rigidVelocity(sites[i], tE);
    }
    const Ds = c - (v[0] * rh[0] + v[1] * rh[1] + v[2] * rh[2]);
    const m = Ds / (Ds * Ds + soft * soft);
    for (let cc = 0; cc < 3; cc += 1) E[cc] += (sites[i].pol * m * rh[cc]) / (r * r);
  }
  return E;
}

// Cage honesty row (Row 6 diagnostic 5): the held sites cannot respond, so
// record the would-be net force and torque each cage member carries — braid
// legs at exact causal delays with the softened branch weight, cage-cage legs
// as static endpoint sums — at kappa, normalized by the braid's outer-layer
// centripetal need (the corridor force scale, Section 55 convention).
// Cycle-averaged over the trailing braid period ending at t (Nt samples on
// the retained record; at t = 0 this reproduces the Section 55 instrument).
// Growth or sign change vs the DECLARED seed strain (-0.641 polar /
// +0.09..0.15 equatorial / torque-free) flags the held-cage idealization's
// scope boundary. This row reports, it does not tune.
export function cageHonestyRow(staticPairSea, sites, histories, t, kappa, nt = DECLARED.staticPairSea.cageHonestyNt) {
  const period = TWO_PI / DECLARED.omega;
  const oLayer = DECLARED.layers.find((L) => L.name === "O");
  const needO = DECLARED.omega * DECLARED.omega * (oLayer.R * Math.cos(oLayer.alpha));
  const p0 = staticPairSea.p0;
  const rows = [];
  for (let qi = 0; qi < staticPairSea.shell.length; qi += 1) {
    const site = staticPairSea.shell[qi];
    const F = [0, 0, 0];
    const T = [0, 0, 0];
    for (const pm of [+1, -1]) {
      const Xe = [
        site.center[0] + pm * (p0 / 2) * site.pHat[0],
        site.center[1] + pm * (p0 / 2) * site.pHat[1],
        site.center[2] + pm * (p0 / 2) * site.pHat[2],
      ];
      const Fe = [0, 0, 0];
      // braid legs: trailing-cycle average on the retained/held worldlines
      for (let q = 0; q < nt; q += 1) {
        const tq = t - (q / nt) * period;
        const E = braidRetardedFieldSoftenedAt(Xe, sites, histories, tq);
        for (let c = 0; c < 3; c += 1) Fe[c] += (pm * E[c]) / nt;
      }
      // cage-cage legs: static monopole endpoint sums (exact, delay-trivial)
      for (const other of staticPairSea.endpoints) {
        if (other.shellIndex === qi) continue;
        const dx = [
          Xe[0] - other.position[0],
          Xe[1] - other.position[1],
          Xe[2] - other.position[2],
        ];
        const r = Math.hypot(dx[0], dx[1], dx[2]);
        for (let c = 0; c < 3; c += 1) Fe[c] += (pm * other.pol * dx[c]) / (r * r * r);
      }
      const arm = [
        Xe[0] - site.center[0],
        Xe[1] - site.center[1],
        Xe[2] - site.center[2],
      ];
      T[0] += arm[1] * Fe[2] - arm[2] * Fe[1];
      T[1] += arm[2] * Fe[0] - arm[0] * Fe[2];
      T[2] += arm[0] * Fe[1] - arm[1] * Fe[0];
      for (let c = 0; c < 3; c += 1) F[c] += Fe[c];
    }
    const rC = Math.hypot(site.center[0], site.center[1], site.center[2]);
    const dirC = [site.center[0] / rC, site.center[1] / rC, site.center[2] / rC];
    rows.push({
      id: site.id,
      siteClass: site.siteClass,
      FradOverNeedO: (kappa * (F[0] * dirC[0] + F[1] * dirC[1] + F[2] * dirC[2])) / needO,
      FmagOverNeedO: (kappa * Math.hypot(F[0], F[1], F[2])) / needO,
      torqueOverNeedO: (kappa * Math.hypot(T[0], T[1], T[2])) / needO,
    });
  }
  const byClass = (cls) => rows.filter((r) => r.siteClass === cls);
  const mean = (arr, key) => arr.reduce((s, r) => s + r[key], 0) / (arr.length || 1);
  return {
    t,
    needO,
    rows,
    polarMeanFradOverNeedO: mean(byClass("polar"), "FradOverNeedO"),
    equatorialMeanFradOverNeedO: mean(byClass("equatorial"), "FradOverNeedO"),
    maxTorqueOverNeedO: Math.max(...rows.map((r) => r.torqueOverNeedO)),
    declaredSeedStrain: DECLARED.staticPairSea.cageStrainDeclared,
  };
}

// Steric row (Row 6 binding obligation 3): cage-pair endpoints reach within
// ~0.8 of the caps — declare assembly extents and report closest approaches.
// At the seed this scans one held cycle; along the release it is evaluated on
// the live states each step (minimum over braid sites x cage endpoints).
export function stericSeedDeclaration(staticPairSea, sites, nt = 96) {
  const period = TWO_PI / DECLARED.omega;
  let minOverall = Infinity;
  const perLayer = {};
  for (let q = 0; q < nt; q += 1) {
    const t = (q / nt) * period;
    for (const s of sites) {
      const x = rigidPosition(s, t);
      for (const e of staticPairSea.endpoints) {
        const d = Math.hypot(
          x[0] - e.position[0],
          x[1] - e.position[1],
          x[2] - e.position[2]
        );
        if (d < minOverall) minOverall = d;
        if (!(s.layer in perLayer) || d < perLayer[s.layer]) perLayer[s.layer] = d;
      }
    }
  }
  const braidExtent = Math.max(...sites.map((s) => Math.hypot(s.rho, s.z0)));
  const endpointInnerReach = Math.min(
    ...staticPairSea.endpoints.map((e) => Math.hypot(...e.position))
  );
  return {
    declaredClearance: DECLARED.staticPairSea.stericClearanceDeclared,
    braidExtent,
    cageEndpointInnerReach: endpointInnerReach,
    closestApproachOverall: minOverall,
    closestApproachPerLayer: perLayer,
  };
}

export function minCageClearance(staticPairSea, states) {
  let minD = Infinity;
  for (const st of states) {
    for (const e of staticPairSea.endpoints) {
      const d = Math.hypot(
        st.x[0] - e.position[0],
        st.x[1] - e.position[1],
        st.x[2] - e.position[2]
      );
      if (d < minD) minD = d;
    }
  }
  return minD;
}

// Axis-wobble watch (Row 6 diagnostic 6): the prescribed family is
// precession-free by construction — the seed is a rigid co-rotation about +z,
// so the least-squares rigid rotation vector omega solving v_i = omega x x_i
// (normal equations A omega = L with A the unit-mass inertia tensor and L the
// total angular momentum) is exactly +z at the seed. Any released tilt drift
// (nutation) or azimuth drift (precession) of omega-hat is a FINDING, not a
// defect. |omega| doubles as the released cadence row.
export function braidAxisRow(states) {
  const A = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const L = [0, 0, 0];
  for (const st of states) {
    const [x, y, z] = st.x;
    const r2 = x * x + y * y + z * z;
    A[0][0] += r2 - x * x;
    A[0][1] += -x * y;
    A[0][2] += -x * z;
    A[1][1] += r2 - y * y;
    A[1][2] += -y * z;
    A[2][2] += r2 - z * z;
    L[0] += st.x[1] * st.v[2] - st.x[2] * st.v[1];
    L[1] += st.x[2] * st.v[0] - st.x[0] * st.v[2];
    L[2] += st.x[0] * st.v[1] - st.x[1] * st.v[0];
  }
  A[1][0] = A[0][1];
  A[2][0] = A[0][2];
  A[2][1] = A[1][2];
  // 3x3 solve (adjugate; the inertia tensor of a non-degenerate configuration
  // is invertible)
  const det =
    A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) -
    A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) +
    A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
  if (!(Math.abs(det) > 1e-300)) return { axisTiltDeg: null, axisAzimuthDeg: null, omegaFit: null };
  const inv = [
    [
      (A[1][1] * A[2][2] - A[1][2] * A[2][1]) / det,
      (A[0][2] * A[2][1] - A[0][1] * A[2][2]) / det,
      (A[0][1] * A[1][2] - A[0][2] * A[1][1]) / det,
    ],
    [
      (A[1][2] * A[2][0] - A[1][0] * A[2][2]) / det,
      (A[0][0] * A[2][2] - A[0][2] * A[2][0]) / det,
      (A[0][2] * A[1][0] - A[0][0] * A[1][2]) / det,
    ],
    [
      (A[1][0] * A[2][1] - A[1][1] * A[2][0]) / det,
      (A[0][1] * A[2][0] - A[0][0] * A[2][1]) / det,
      (A[0][0] * A[1][1] - A[0][1] * A[1][0]) / det,
    ],
  ];
  const w = [
    inv[0][0] * L[0] + inv[0][1] * L[1] + inv[0][2] * L[2],
    inv[1][0] * L[0] + inv[1][1] * L[1] + inv[1][2] * L[2],
    inv[2][0] * L[0] + inv[2][1] * L[1] + inv[2][2] * L[2],
  ];
  const n = Math.hypot(w[0], w[1], w[2]) || 1e-300;
  return {
    axisTiltDeg: (Math.acos(Math.max(-1, Math.min(1, w[2] / n))) * 180) / Math.PI,
    axisAzimuthDeg: (Math.atan2(w[1], w[0]) * 180) / Math.PI,
    omegaFit: n,
  };
}

// ---------------------------------------------------------------------------
// Row 7 in-build bare stability gate (binding obligation 1). Re-derives the
// FULL Sections 57-59 gate on the owner instruments at the tabled geometry:
//  1. rail-pinned radial equilibrium (Newton at frozen kappa, omega live on
//     the rail) -> lambda, equilibrium shape, and the gauge-invariant release
//     coupling kappa_eq = kappa_fit/lambda (frozen-kappa discipline, binding
//     obligation 2: one fit on the bare channel, then frozen; the equilibrium
//     coupling is invariant under the fit gauge, witnessed via ReqOverKappa);
//  2. equilibrium verification AT the release gauge (the seed the release
//     actually uses): residual floor + rail-pinned basin spectrum, with a
//     displacement-eps witness;
//  3. tangential rows at the re-derived equilibrium (tau_I, tau_O ~ 0; the
//     middle's rail pump is the escapement's, reported not gated);
//  4. the tilt block: exact global-null witness + quotient relative-tilt
//     spectrum (restoring required; complex would be whirl), Nt-witnessed.
// Returns the gate block; gate.pass gates the release (fail-closed).
// ---------------------------------------------------------------------------
export function bareStabilityGateInBuild() {
  const g = DECLARED.bareGate;
  const L = Object.fromEntries(DECLARED.layers.map((x) => [x.name, x]));
  const geoTabled = {
    qI: L.I.R,
    qO: L.O.R,
    alphaI: L.I.alpha,
    alphaM: L.M.alpha,
    alphaO: L.O.alpha,
    thetaI: L.I.theta,
    thetaM: L.M.theta,
    thetaO: L.O.theta,
  };
  // 0. tabled-row / exported-candidate consistency (guards against drift
  // between the run's TABLED_ROWS block and the instrument's export)
  const exp = SELF_EQUILIBRATED_V5.geo;
  const exportConsistent = ["qI", "qO", "alphaI", "alphaM", "alphaO", "thetaI", "thetaO"]
    .every((k) => Math.abs(geoTabled[k] - exp[k]) < 1e-9);
  // 1. rail-pinned Newton at the single frozen bare-channel fit
  const eq = railPinnedEquilibrium({ geo: geoTabled });
  const kappaRelease = eq.kappaFrozen / eq.lambda;
  const ReqOverKappa = eq.lambda / eq.kappaFrozen;
  const geoEq = { ...geoTabled, qI: eq.shapeEq.qI, qO: eq.shapeEq.qO };
  const shapeCorrection = {
    qI: geoEq.qI - geoTabled.qI,
    qO: geoEq.qO - geoTabled.qO,
  };
  // 2. equilibrium verification at the release gauge (+ eps witness)
  const ver = radialStabilityMatrix({
    geo: geoEq, withCage: false, railPinned: true, kapFixed: kappaRelease,
  });
  const verWitness = radialStabilityMatrix({
    geo: geoEq, withCage: false, railPinned: true, kapFixed: kappaRelease,
    eps: g.epsWitness,
  });
  const residualMax = Math.max(...ver.seedNetForces.slice(0, 3).map(Math.abs));
  const spectrum = ver.symEigen.map((e) => e.value);
  const spectrumWitness = verWitness.symEigen.map((e) => e.value);
  const spectrumWitnessOk = spectrum.every(
    (v, k) => Math.abs(v - spectrumWitness[k]) <= g.spectrumWitnessRelTol * Math.abs(v)
  );
  // 3. tangential rows at the re-derived equilibrium (gauge-robust zeros)
  const rows = instrumentSupportRatios({ geo: geoEq });
  const tauI = rows.tanRows.I;
  const tauO = rows.tanRows.O;
  const railPumpM = rows.tanRows.M;
  // 4. tilt block (+ Nt witness)
  const tilt = tiltStiffness({ geo: geoEq, Nt: g.tiltNt });
  const tiltWitness = tiltStiffness({ geo: geoEq, Nt: g.tiltNtWitness });
  const tiltEig = tilt.relativeEigen;
  const tiltEigW = tiltWitness.relativeEigen;
  const tiltWitnessOk = tiltEig.every(
    (e, k) =>
      Math.abs(e.re - tiltEigW[k].re) <= g.tiltWitnessRelTol * Math.abs(e.re) &&
      Math.abs(e.im - tiltEigW[k].im) <= g.tiltWitnessRelTol * Math.max(Math.abs(e.re), 1e-9)
  );
  const checks = {
    exportConsistent,
    newtonConverged: Math.max(...eq.residualF.map(Math.abs)) < g.maxEquilibriumResidual,
    equilibriumResidualOk: residualMax < g.maxEquilibriumResidual,
    basin: ver.basin,
    spectrumWitnessOk,
    tauOk: Math.abs(tauI) <= g.maxAbsTau && Math.abs(tauO) <= g.maxAbsTau,
    shapeCorrectionOk:
      Math.abs(shapeCorrection.qI) <= g.maxShapeCorrection &&
      Math.abs(shapeCorrection.qO) <= g.maxShapeCorrection,
    tiltGlobalNullOk: tilt.globalNullOk,
    tiltRestoring: tilt.restoringRelative,
    tiltWitnessOk,
  };
  const pass = Object.values(checks).every(Boolean);
  return {
    pass,
    checks,
    tabledGeoRef: "SELF_EQUILIBRATED_V5 (spindle-support-ratio-targeted-search.mjs)",
    kappaFitBareChannel: eq.kappaFrozen,
    lambda: eq.lambda,
    kappaRelease,
    ReqOverKappa,
    ReqOverKappaAnchor: g.anchors.ReqOverKappa,
    kappaCertificateGaugeNote:
      "certificate kappa* 0.4615 and in-build fit lie on one gauge orbit; kappa_eq = kappa_fit/lambda and R_M(eq) = lambda/kappa_fit are the invariants",
    equilibrium: {
      geo: geoEq,
      shapeCorrectionVsTabled: shapeCorrection,
      newtonResidualF: eq.residualF,
      residualMaxAtReleaseGauge: residualMax,
      netForcesAtReleaseGauge: ver.seedNetForces.slice(0, 3),
      railPinnedSpectrum: spectrum,
      railPinnedSpectrumEpsWitness: spectrumWitness,
      spectrumCertificateGauge: eq.railPinnedSpectrum,
      anchorsSpectrum: g.anchors.radialSpectrum,
    },
    tangential: { tauI, tauO, railPumpM, anchors: { tauI: g.anchors.tauI, tauO: g.anchors.tauO, railPumpM: g.anchors.railPumpM } },
    closureAtEquilibrium: rows.closure,
    closureAnchor: g.anchors.closure,
    tilt: {
      globalModeResidual: tilt.globalModeResidual,
      relativeEigen: tiltEig,
      relativeEigenNtWitness: tiltEigW,
      anchors: g.anchors.tiltRelativeEigen,
      ntBase: g.tiltNt,
      ntWitness: g.tiltNtWitness,
    },
  };
}

// ---------------------------------------------------------------------------
// Responsive sea (Candidate Row 3): 12 saturable orientational dipoles on the
// FCC first coordination shell, orientation-only dynamics (positions static),
// first-order relaxation toward the local retarded braid field at
// gamma = 2 omega_braid. Full orientation history is retained so the braid
// reads each dipole at its own emission time (the sea's retarded emission).
// ---------------------------------------------------------------------------
const unit3 = (v) => {
  const n = Math.hypot(v[0], v[1], v[2]);
  return n > 1e-300 ? [v[0] / n, v[1] / n, v[2] / n] : [0, 0, 1];
};

export function buildResponsiveSeaState() {
  if (!DECLARED.responsiveSea.enabled) return null;
  const s = DECLARED.responsiveSea.spacing;
  const sites = DECLARED.sea.fccDirections.map((dir, k) => {
    const n = Math.hypot(dir[0], dir[1], dir[2]);
    return {
      id: `rsea:${k}`,
      position: [(dir[0] / n) * s, (dir[1] / n) * s, (dir[2] / n) * s],
    };
  });
  return {
    sites,
    p0: DECLARED.responsiveSea.p0,
    gamma: DECLARED.responsiveSea.gammaOverOmega * DECLARED.omega,
    // retained orientation record (shared time axis, per-site direction rows)
    ts: [],
    ps: sites.map(() => []),
    clampedLookups: 0,
  };
}

// Retarded braid field at a static point X (the braid->sea drive leg;
// Section 43 kernel: signed branch weight m = c_f / D_s at the braid source).
// Held prehistory (t_e <= 0) is exact rigid; released history is read from the
// retained record's linear segments (pass histories = null during settle).
export function braidRetardedFieldAt(X, sites, histories, t) {
  const c = DECLARED.fieldSpeed;
  const E = [0, 0, 0];
  for (let i = 0; i < sites.length; i += 1) {
    const posAt = (tE) =>
      histories && tE > 0 ? histories[i].positionAt(tE) : rigidPosition(sites[i], tE);
    let tE = t - Math.hypot(X[0], X[1], X[2]) / c;
    for (let it = 0; it < 60; it += 1) {
      const p = posAt(tE);
      const r = Math.hypot(X[0] - p[0], X[1] - p[1], X[2] - p[2]);
      const next = t - r / c;
      if (Math.abs(next - tE) < 1e-12) {
        tE = next;
        break;
      }
      tE = next;
    }
    const p = posAt(tE);
    const dx = [X[0] - p[0], X[1] - p[1], X[2] - p[2]];
    const r = Math.hypot(dx[0], dx[1], dx[2]);
    if (!(r > 0)) continue;
    const rh = [dx[0] / r, dx[1] / r, dx[2] / r];
    let v;
    if (histories && tE > 0) {
      const h = histories[i];
      let k = Math.min(h.ts.length - 1, Math.max(0, Math.floor(tE / DECLARED.timeStep)));
      while (k > 0 && h.ts[k] > tE) k -= 1;
      while (k < h.ts.length - 1 && h.ts[k + 1] <= tE) k += 1;
      v = h.vs[k];
    } else {
      v = rigidVelocity(sites[i], tE);
    }
    const Ds = c - (v[0] * rh[0] + v[1] * rh[1] + v[2] * rh[2]);
    const m = c / Ds;
    for (let cc = 0; cc < 3; cc += 1) E[cc] += (sites[i].pol * m * dx[cc]) / (r * r * r);
  }
  return E;
}

// One first-order relaxation step for all sea orientations at time t, pushing
// the post-step directions onto the retained orientation record at t + dt.
export function stepResponsiveSea(seaState, sites, histories, t, dt) {
  const g = seaState.gamma;
  const n = seaState.sites.length;
  if (seaState.ts.length === 0) {
    // declared init: instantaneous delayed-field direction at settle start
    seaState.ts.push(t);
    for (let j = 0; j < n; j += 1) {
      const E = braidRetardedFieldAt(seaState.sites[j].position, sites, histories, t);
      seaState.ps[j].push(unit3(E));
    }
  }
  const last = seaState.ts.length - 1;
  const next = [];
  for (let j = 0; j < n; j += 1) {
    const ph = seaState.ps[j][last];
    const E = braidRetardedFieldAt(seaState.sites[j].position, sites, histories, t);
    const eh = unit3(E);
    next.push(
      unit3([
        ph[0] + g * dt * (eh[0] - ph[0]),
        ph[1] + g * dt * (eh[1] - ph[1]),
        ph[2] + g * dt * (eh[2] - ph[2]),
      ])
    );
  }
  seaState.ts.push(t + dt);
  for (let j = 0; j < n; j += 1) seaState.ps[j].push(next[j]);
}

// Dipole orientation at emission time (linear interpolation on the retained
// orientation record, renormalized; clamped lookups counted, honesty row).
export function seaOrientationAt(seaState, j, tE) {
  const ts = seaState.ts;
  const ps = seaState.ps[j];
  if (ts.length === 0) return [0, 0, 1];
  if (tE <= ts[0]) {
    seaState.clampedLookups += 1;
    return ps[0];
  }
  if (tE >= ts[ts.length - 1]) return ps[ps.length - 1];
  let lo = 0;
  let hi = ts.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (ts[mid] <= tE) lo = mid;
    else hi = mid;
  }
  const f = (tE - ts[lo]) / (ts[hi] - ts[lo]);
  return unit3([
    ps[lo][0] + f * (ps[hi][0] - ps[lo][0]),
    ps[lo][1] + f * (ps[hi][1] - ps[lo][1]),
    ps[lo][2] + f * (ps[hi][2] - ps[lo][2]),
  ]);
}

function dipoleFieldAt(pHat, rvec) {
  const r = Math.hypot(rvec[0], rvec[1], rvec[2]);
  const rh = [rvec[0] / r, rvec[1] / r, rvec[2] / r];
  const pr = pHat[0] * rh[0] + pHat[1] * rh[1] + pHat[2] * rh[2];
  const r3 = r * r * r;
  return [
    (3 * pr * rh[0] - pHat[0]) / r3,
    (3 * pr * rh[1] - pHat[1]) / r3,
    (3 * pr * rh[2] - pHat[2]) / r3,
  ];
}

// Sea->braid environment acceleration per unit kappa (Section 43 kernel:
// receiver-normal factor D_T/c_f on the moving braid site; point-dipole field
// p = p0 pHat(t_e) read at the emission time t_e = t - r/c_f, exact for the
// static sea positions).
export function responsiveSeaAcceleration(seaState, xi, vi, receiverPol, tH) {
  const c = DECLARED.fieldSpeed;
  const a = [0, 0, 0];
  for (let j = 0; j < seaState.sites.length; j += 1) {
    const P = seaState.sites[j].position;
    const dx = [xi[0] - P[0], xi[1] - P[1], xi[2] - P[2]];
    const r = Math.hypot(dx[0], dx[1], dx[2]);
    if (!(r > 0)) continue;
    const rh = [dx[0] / r, dx[1] / r, dx[2] / r];
    const Dt = c - (vi[0] * rh[0] + vi[1] * rh[1] + vi[2] * rh[2]);
    const pHat = seaOrientationAt(seaState, j, tH - r / c);
    const E = dipoleFieldAt(pHat, dx);
    const w = (receiverPol * seaState.p0 * Dt) / c;
    a[0] += w * E[0];
    a[1] += w * E[1];
    a[2] += w * E[2];
  }
  return a;
}

// Sea orientation order parameters (diagnostic 5: does the braid drive its
// bath?): magnitude of the mean direction vector and mean axial projection.
export function seaOrderParameter(seaState) {
  const last = seaState.ts.length - 1;
  if (last < 0) return { meanVectorMagnitude: 0, meanAxialProjection: 0 };
  const m = [0, 0, 0];
  let mz = 0;
  const n = seaState.sites.length;
  for (let j = 0; j < n; j += 1) {
    const p = seaState.ps[j][last];
    m[0] += p[0] / n;
    m[1] += p[1] / n;
    m[2] += p[2] / n;
    mz += p[2] / n;
  }
  return { meanVectorMagnitude: Math.hypot(m[0], m[1], m[2]), meanAxialProjection: mz };
}

// Settle the sea on the held braid prehistory over the declared window ending
// at tEnd (release epoch t = 0 for the main run).
export function settleResponsiveSea(seaState, sites, tEnd = 0) {
  const dt = DECLARED.timeStep;
  const t0 = tEnd - DECLARED.responsiveSea.settleRotations * TWO_PI;
  const steps = Math.round((tEnd - t0) / dt);
  for (let k = 0; k < steps; k += 1) {
    stepResponsiveSea(seaState, sites, null, t0 + k * dt, dt);
  }
  return seaState;
}

export function heldSourceModel(site) {
  return {
    centerAtEpoch: { x: 0, y: 0, z: site.z0 },
    centerVelocity: { x: 0, y: 0, z: 0 },
    radiusU: { x: site.rho, y: 0, z: 0 },
    radiusV: { x: 0, y: site.rho, z: 0 },
    angularVelocity: site.omegaHeld ?? DECLARED.omega,
    angularAcceleration: 0,
    phaseAtEpoch: site.phase,
    epochTime: 0,
  };
}

export function rigidPosition(site, t) {
  const w = site.omegaHeld ?? DECLARED.omega;
  const a = w * t + site.phase;
  return [site.rho * Math.cos(a), site.rho * Math.sin(a), site.z0];
}

export function rigidVelocity(site, t) {
  const w = site.omegaHeld ?? DECLARED.omega;
  const a = w * t + site.phase;
  const v = site.rho * w;
  return [-v * Math.sin(a), v * Math.cos(a), 0];
}

// ---------------------------------------------------------------------------
// Retained path history (held analytic prehistory + released samples).
// ---------------------------------------------------------------------------
class RetainedHistory {
  constructor(site) {
    this.site = site;
    this.ts = [];
    this.xs = [];
    this.vs = [];
    this.maxRadiusSeen = Math.hypot(site.rho, site.z0);
  }
  push(t, x, v) {
    this.ts.push(t);
    this.xs.push(x.slice());
    this.vs.push(v.slice());
    const r = Math.hypot(x[0], x[1], x[2]);
    if (r > this.maxRadiusSeen) this.maxRadiusSeen = r;
  }
  // Position at emission time (held phase exact, released linear-in-segment —
  // the production linearization policy's own interpolation shape).
  positionAt(tE) {
    if (tE <= 0 || this.ts.length === 0) return rigidPosition(this.site, tE);
    const dt = DECLARED.timeStep;
    let k = Math.min(this.ts.length - 1, Math.max(0, Math.floor(tE / dt)));
    while (k > 0 && this.ts[k] > tE) k -= 1;
    while (k < this.ts.length - 1 && this.ts[k + 1] <= tE) k += 1;
    const h = tE - this.ts[k];
    const x = this.xs[k];
    const v = this.vs[k];
    return [x[0] + v[0] * h, x[1] + v[1] * h, x[2] + v[2] * h];
  }
  segment(k) {
    return { t: this.ts[k], x: this.xs[k], v: this.vs[k] };
  }
}

// ---------------------------------------------------------------------------
// Native root solve for one directed relation (receiver i <- source j).
// All roots come from production solver calls; local sampling only brackets.
// ---------------------------------------------------------------------------
function receiverRecord(xi, vi, tH) {
  return {
    startTime: tH,
    positionAtStart: { x: xi[0], y: xi[1], z: xi[2] },
    velocity: { x: vi[0], y: vi[1], z: vi[2] },
  };
}

function collectRoots(result, out, boundary) {
  if (!result || !Array.isArray(result.roots)) return;
  for (const root of result.roots) {
    if (boundary && (root.emissionTime < boundary.lo - 1e-9 || root.emissionTime > boundary.hi + 1e-9)) continue;
    out.push(root);
  }
}

export function solveDirectedRelation({ histories, i, j, tH, xi, vi, sameSource, minimumDelayOverride = null, delayCapOverride = null }) {
  const c = DECLARED.fieldSpeed;
  const hj = histories[j];
  const receiverR = Math.hypot(xi[0], xi[1], xi[2]);
  let delayMax = Math.min(
    (receiverR + hj.maxRadiusSeen + DECLARED.causalSlack) / c,
    DECLARED.memoryWindowRotations * TWO_PI
  );
  if (delayCapOverride != null) {
    delayMax = Math.min(delayMax, delayCapOverride);
  }
  const tLo = tH - delayMax;
  const dMin = minimumDelayOverride ?? DECLARED.sameSourceMinimumDelay;
  const tEnd = sameSource ? tH - dMin : tH;
  const roots = [];
  let heldScan = null;

  // Held-phase window: exact production moving-circular solve.
  const heldEnd = Math.min(0, tEnd);
  if (tLo < heldEnd) {
    const window = heldEnd - tLo;
    const result = solveMovingCircularSourceCausalRoots({
      source: heldSourceModel(hj.site),
      receiver: receiverRecord(xi, vi, tH),
      hitTime: tH,
      signalSpeed: c,
      sourceStartTime: tLo,
      sourceEndTime: heldEnd,
      rootTolerance: 1e-12,
      scanSubdivisions: Math.max(32, Math.min(2048, Math.ceil(window / 0.01))),
      maxRoots: 32,
    });
    collectRoots(result, roots, { lo: tLo, hi: heldEnd });
    heldScan = result.scan ?? null;
  }

  // Released window: bracket over retained samples, refine per segment on the
  // production solver (zero-radius moving-circular segment sources).
  let releasedGap = Infinity;
  const relStart = Math.max(0, tLo);
  if (tEnd > relStart && hj.ts.length > 0) {
    const dt = DECLARED.timeStep;
    const kLo = Math.max(0, Math.floor(relStart / dt) - 1);
    const kHi = Math.min(hj.ts.length - 1, Math.ceil(tEnd / dt));
    const g = (k) => {
      const p = hj.xs[k];
      return (
        Math.hypot(xi[0] - p[0], xi[1] - p[1], xi[2] - p[2]) - c * (tH - hj.ts[k])
      );
    };
    let gPrev = g(kLo);
    let kPrev = kLo;
    releasedGap = Math.abs(gPrev);
    const solveSegment = (k) => {
      const seg = hj.segment(k);
      const segEnd = Math.min(k + 1 < hj.ts.length ? hj.ts[k + 1] : tEnd, tEnd);
      if (segEnd <= seg.t) return;
      const result = solveMovingCircularSourceCausalRoots({
        source: {
          centerAtEpoch: { x: seg.x[0], y: seg.x[1], z: seg.x[2] },
          centerVelocity: { x: seg.v[0], y: seg.v[1], z: seg.v[2] },
          radiusU: { x: 0, y: 0, z: 0 },
          radiusV: { x: 0, y: 0, z: 0 },
          angularVelocity: 0,
          phaseAtEpoch: 0,
          epochTime: seg.t,
        },
        receiver: receiverRecord(xi, vi, tH),
        hitTime: tH,
        signalSpeed: c,
        sourceStartTime: seg.t,
        sourceEndTime: segEnd,
        rootTolerance: 1e-12,
        scanSubdivisions: 8,
        maxRoots: 4,
      });
      collectRoots(result, roots, { lo: seg.t, hi: segEnd });
    };
    // Adaptive bracket stride: coarse in the far zone, fine within
    // bracketFineDelay of the hit (where the stratum-scale same-source click
    // roots live). On a coarse-stride sign change, every sub-segment in the
    // stride is handed to the production solver.
    const fineFromK = Math.max(
      kLo,
      Math.floor((tH - DECLARED.bracketFineDelay) / dt)
    );
    let k = kLo;
    while (k < kHi) {
      const stride = k >= fineFromK ? 1 : DECLARED.bracketStrideCoarse;
      const kNext = Math.min(k + stride, kHi);
      if (hj.ts[kNext] > tEnd + dt * stride) break;
      const gK = g(kNext);
      releasedGap = Math.min(releasedGap, Math.abs(gK));
      if (Math.sign(gPrev) !== Math.sign(gK) || Math.abs(gK) <= 1e-12) {
        for (let kk = k; kk < kNext; kk += 1) solveSegment(kk);
      }
      gPrev = gK;
      kPrev = kNext;
      k = kNext;
    }
    // Final partial segment up to tEnd (covers roots between last sample and tEnd).
    const kLast = Math.min(hj.ts.length - 1, kHi);
    if (hj.ts[kLast] < tEnd) {
      const pEndPos = hj.positionAt(tEnd);
      const gEnd =
        Math.hypot(xi[0] - pEndPos[0], xi[1] - pEndPos[1], xi[2] - pEndPos[2]) -
        c * (tH - tEnd);
      releasedGap = Math.min(releasedGap, Math.abs(gEnd));
      if (Math.sign(gPrev) !== Math.sign(gEnd)) {
        for (let kk = Math.max(kPrev, 0); kk <= kLast; kk += 1) solveSegment(kk);
      }
    }
  }

  // Dedupe (held/released boundary can double-catch) and sort.
  roots.sort((a, b) => a.emissionTime - b.emissionTime);
  const retained = [];
  for (const root of roots) {
    if (
      retained.length > 0 &&
      Math.abs(root.emissionTime - retained[retained.length - 1].emissionTime) <= 1e-7
    ) {
      continue;
    }
    retained.push(root);
  }
  return { roots: retained, heldScan, releasedGap, delayMax };
}

// ---------------------------------------------------------------------------
// Wake acceleration from production root rows (declared force law, lane canon:
// a_i = kappa * sum sigma_i sigma_j * m_reg / (r^2 + rho_c^2) * r_hat,
// m_reg = D_T D_s / (D_s^2 + soft^2), all row fields read from the runtime).
// ---------------------------------------------------------------------------
export function wakeAcceleration({ histories, sites, i, tH, xi, vi, ledger = null, splitSelf = false, seaSites = null, responsiveSeaState = null, staticPairSea = null }) {
  const soft = DECLARED.soft;
  const rc2 = DECLARED.coincidenceStratum * DECLARED.coincidenceStratum;
  const a = [0, 0, 0];
  const aSelf = [0, 0, 0];
  const selfRows = [];
  let selfRootCount = 0;
  for (let j = 0; j < sites.length; j += 1) {
    const sameSource = j === i;
    const { roots, heldScan, releasedGap } = solveDirectedRelation({
      histories,
      i,
      j,
      tH,
      xi,
      vi,
      sameSource,
    });
    const sigma = sites[i].pol * sites[j].pol; // +1 for same-source
    const rows = [];
    for (const root of roots) {
      const r = root.distance;
      if (!(r > 0) || !Number.isFinite(r)) continue;
      const dir = [
        (root.receiverPoint.x - root.sourcePoint.x) / r,
        (root.receiverPoint.y - root.sourcePoint.y) / r,
        (root.receiverPoint.z - root.sourcePoint.z) / r,
      ];
      const Ds = root.sourceNormalDenominator;
      const Dt = root.receiverNormalNumerator;
      const mReg = (Dt * Ds) / (Ds * Ds + soft * soft);
      const w = (sigma * mReg) / (r * r + rc2);
      a[0] += w * dir[0];
      a[1] += w * dir[1];
      a[2] += w * dir[2];
      if (sameSource) {
        selfRootCount += 1;
        aSelf[0] += w * dir[0];
        aSelf[1] += w * dir[1];
        aSelf[2] += w * dir[2];
        if (splitSelf) {
          selfRows.push({ Ds, Dt, distance: r, dir, emissionTime: root.emissionTime });
        }
      }
      if (ledger) {
        rows.push({
          emissionTime: root.emissionTime,
          delay: root.delay,
          distance: r,
          Ds,
          Dt,
          signedBranchOrientation: root.signedBranchOrientation,
          branchWeightWrec: root.branchWeight,
          mRegularized: mReg,
          foldFlagged: Math.abs(Ds) < soft,
        });
      }
    }
    if (ledger) {
      ledger.push({
        receiver: sites[i].id,
        source: sites[j].id,
        relation: sameSource ? "same-source" : "cross-pair",
        activeRootCount: roots.length,
        roots: rows,
        inactiveGap:
          roots.length === 0
            ? {
                heldScanMinAbsResidual: heldScan ? heldScan.minAbsResidual : null,
                releasedMinAbsResidual: Number.isFinite(releasedGap) ? releasedGap : null,
              }
            : null,
      });
    }
  }
  if (seaSites && seaSites.length > 0) {
    const sea = seaWakeContribution({ seaSites, xi, vi, receiverPol: sites[i].pol, tH });
    a[0] += sea.a[0];
    a[1] += sea.a[1];
    a[2] += sea.a[2];
    if (ledger) {
      ledger.push({
        receiver: sites[i].id,
        source: "sea:FCC-12-aggregate",
        relation: "environment-one-way",
        activeRootCount: seaSites.length,
        seaAcceleration: sea.a,
        seaNetRadial: sea.netRadial,
        roots: [],
        inactiveGap: null,
      });
    }
  }
  const aSea = [0, 0, 0];
  if (staticPairSea) {
    // Row 5 environment: every frozen pair endpoint is a static production
    // source, solved and booked through the same native path as the braid
    // (seaWakeContribution: production roots, canonical m_reg force law).
    // Booked into the dressed wake AND split into aSea so the kappa* fit
    // stays on the bare braid channel (Rows 1-4 protocol).
    const sea = seaWakeContribution({
      seaSites: staticPairSea.endpoints,
      xi,
      vi,
      receiverPol: sites[i].pol,
      tH,
    });
    aSea[0] += sea.a[0];
    aSea[1] += sea.a[1];
    aSea[2] += sea.a[2];
    a[0] += sea.a[0];
    a[1] += sea.a[1];
    a[2] += sea.a[2];
    if (ledger) {
      ledger.push({
        receiver: sites[i].id,
        source: "spsea:FCC-12-true-placement-frozen-pairs",
        relation: "environment-static-pair-production-roots",
        activeRootCount: staticPairSea.endpoints.length,
        seaAcceleration: sea.a,
        seaNetRadial: sea.netRadial,
        roots: [],
        inactiveGap: null,
      });
    }
  }
  if (responsiveSeaState) {
    const sea = responsiveSeaAcceleration(responsiveSeaState, xi, vi, sites[i].pol, tH);
    aSea[0] = sea[0];
    aSea[1] = sea[1];
    aSea[2] = sea[2];
    a[0] += sea[0];
    a[1] += sea[1];
    a[2] += sea[2];
    if (ledger) {
      ledger.push({
        receiver: sites[i].id,
        source: "rsea:FCC-12-orientational-dipoles",
        relation: "environment-responsive-retarded",
        activeRootCount: responsiveSeaState.sites.length,
        seaAcceleration: sea,
        roots: [],
        inactiveGap: null,
      });
    }
  }
  return { a, aSelf, aSea, selfRows, selfRootCount };
}

// ---------------------------------------------------------------------------
// Chart-clean same-source booking (spec Sections 2/3.1/3.3): substep-integrate
// the same-source channel over one base step, reading the production row's
// signed branch orientation unsoftened (density-of-states integral) with the
// declared d0 stratum in the force denominator. Returns the booked velocity
// increment plus the chart quantities for the click row.
// ---------------------------------------------------------------------------
export function chartWindowIntegrate({
  histories,
  sites,
  i,
  t0,
  dt,
  x0,
  v0,
  aFrozen, // non-chart acceleration (partner channels), frozen over the step
  kappa,
  subSteps = DECLARED.chart.subSteps,
}) {
  const rc2 = DECLARED.coincidenceStratum * DECLARED.coincidenceStratum;
  const dv = [0, 0, 0];
  let prevIntegrand = null;
  let minChord = Infinity;
  let mu = 0; // unfolding parameter, mu-dot = D_T
  let prevDt = null;
  let rootCountAtEnd = 0;
  const dsSamples = [];
  const h = dt / subSteps;
  for (let k = 0; k <= subSteps; k += 1) {
    const tau = k * h;
    const tK = t0 + tau;
    // receiver provisionally advanced under frozen non-chart acceleration
    // plus the chart increment booked so far
    const xK = [
      x0[0] + (v0[0] + dv[0]) * tau + 0.5 * aFrozen[0] * tau * tau,
      x0[1] + (v0[1] + dv[1]) * tau + 0.5 * aFrozen[1] * tau * tau,
      x0[2] + (v0[2] + dv[2]) * tau + 0.5 * aFrozen[2] * tau * tau,
    ];
    const vK = [
      v0[0] + dv[0] + aFrozen[0] * tau,
      v0[1] + dv[1] + aFrozen[1] * tau,
      v0[2] + dv[2] + aFrozen[2] * tau,
    ];
    const { roots } = solveDirectedRelation({
      histories,
      i,
      j: i,
      tH: tK,
      xi: xK,
      vi: vK,
      sameSource: true,
      minimumDelayOverride: DECLARED.chart.windowMinDelay,
      delayCapOverride: 2.0, // same-source chart scan cap (declared)
    });
    rootCountAtEnd = roots.length;
    const integrand = [0, 0, 0];
    let foldBranch = null; // min-|D_s| root this substep (the fold-near branch)
    for (const root of roots) {
      const r = root.distance;
      if (!(r > 0) || !Number.isFinite(r)) continue;
      const dir = [
        (root.receiverPoint.x - root.sourcePoint.x) / r,
        (root.receiverPoint.y - root.sourcePoint.y) / r,
        (root.receiverPoint.z - root.sourcePoint.z) / r,
      ];
      const Ds = root.sourceNormalDenominator;
      const Dt = root.receiverNormalNumerator;
      if (!Number.isFinite(Ds) || Math.abs(Ds) < 1e-12) continue;
      const m = Dt / Ds; // production signedBranchOrientation, unsoftened
      const w = (kappa * m) / (r * r + rc2); // sigma_self = +1
      integrand[0] += w * dir[0];
      integrand[1] += w * dir[1];
      integrand[2] += w * dir[2];
      minChord = Math.min(minChord, r);
      if (!foldBranch || Math.abs(Ds) < Math.abs(foldBranch.Ds)) foldBranch = { Ds, Dt };
    }
    if (foldBranch) {
      if (prevDt !== null) mu += 0.5 * (foldBranch.Dt + prevDt) * h;
      dsSamples.push({ mu, Ds: foldBranch.Ds, Dt: foldBranch.Dt });
      prevDt = foldBranch.Dt;
    } else {
      prevDt = null;
    }
    if (prevIntegrand) {
      dv[0] += 0.5 * (integrand[0] + prevIntegrand[0]) * h;
      dv[1] += 0.5 * (integrand[1] + prevIntegrand[1]) * h;
      dv[2] += 0.5 * (integrand[2] + prevIntegrand[2]) * h;
    }
    prevIntegrand = integrand;
  }
  // fold-curvature fit D_s^2 = 2 a mu over the sampled window (least squares
  // through the origin; only meaningful when mu grew)
  let foldCurvature = null;
  let num = 0;
  let den = 0;
  for (const s of dsSamples) {
    if (s.mu > 0) {
      num += s.Ds * s.Ds * s.mu;
      den += 2 * s.mu * s.mu;
    }
  }
  if (den > 0) foldCurvature = num / den;
  return {
    dv,
    minChord: Number.isFinite(minChord) ? minChord : null,
    unfoldingWindowMu: mu,
    foldCurvature,
    rootCountAtEnd,
    sampleCount: dsSamples.length,
  };
}

// ---------------------------------------------------------------------------
// Seed-record native evaluation (t = 0-, all held): anchor + native kappa* fit.
// ---------------------------------------------------------------------------
export function seedRecordEvaluation(sites, histories, seaSites = null, frozenKappa = null, responsiveSeaState = null, staticPairSea = null) {
  const anySplitSea = Boolean(responsiveSeaState || staticPairSea);
  const samples = [];
  for (let i = 0; i < sites.length; i += 1) {
    const xi = rigidPosition(sites[i], 0);
    const vi = rigidVelocity(sites[i], 0);
    const w2 = DECLARED.omega * DECLARED.omega;
    const kin = [-w2 * xi[0], -w2 * xi[1], 0]; // circular need at tabled cadence
    // held-circle need: the seed's OWN prehistory circle (omegaHeld^2 * rho) —
    // the self-consistent convention for a non-circular seed (spec Section 36).
    const wH = sites[i].omegaHeld ?? DECLARED.omega;
    const kinHeld = [-wH * wH * xi[0], -wH * wH * xi[1], 0];
    const ledger = [];
    const { a, aSea } = wakeAcceleration({ histories, sites, i, tH: 0, xi, vi, ledger, seaSites, responsiveSeaState, staticPairSea });
    // Kappa* fit discipline (Rows 1-3 protocol): the coupling is fitted on the
    // BRAID channel only (identical to the bare Rows 1-2 seed record, so the
    // frozen kappa* is comparable across rows); sea rows are reported AT that
    // kappa, they do not enter the fit.
    const wakeBare = [a[0] - aSea[0], a[1] - aSea[1], a[2] - aSea[2]];
    // radial support bookkeeping (survivability statistic, spec Sections 36-37):
    // inward radial wake per unit kappa, against the centripetal need omega^2*rho
    const rhoCyl = Math.hypot(xi[0], xi[1]);
    const inwardOf = (vec) =>
      rhoCyl > 1e-12 ? -((vec[0] * xi[0] + vec[1] * xi[1]) / rhoCyl) : 0;
    const tHat = rhoCyl > 1e-12 ? [-xi[1] / rhoCyl, xi[0] / rhoCyl] : [0, 0];
    samples.push({
      site: sites[i].id,
      layer: sites[i].layer,
      kin,
      kinHeld,
      wake: a,
      wakeBare,
      seaWake: aSea,
      rhoCyl,
      wakeInwardRadial: inwardOf(a),
      wakeBareInwardRadial: inwardOf(wakeBare),
      seaInwardRadial: inwardOf(aSea),
      seaTangential: aSea[0] * tHat[0] + aSea[1] * tHat[1],
      ledger,
    });
  }
  const fitKappa = (key) => {
    let num = 0;
    let den = 0;
    for (const s of samples) {
      for (let c = 0; c < 3; c += 1) {
        num += s[key][c] * s.wakeBare[c];
        den += s.wakeBare[c] * s.wakeBare[c];
      }
    }
    return num / den;
  };
  const residuals = (key, kappa, wakeKey = "wakeBare") => {
    const perLayer = {};
    let rA = 0;
    let fA = 0;
    for (const s of samples) {
      let res = 0;
      let ref = 0;
      for (let c = 0; c < 3; c += 1) {
        const d = s[key][c] - kappa * s[wakeKey][c];
        res += d * d;
        ref += s[key][c] * s[key][c];
        rA += d * d;
        fA += s[key][c] * s[key][c];
      }
      // antipodal pair shares the value; keep per-site, summarize per layer
      perLayer[s.site] = Math.sqrt(res / ref);
    }
    return { perSiteRelResidual: perLayer, globalRelResidual: Math.sqrt(rA / fA) };
  };
  const kappaStar = fitKappa("kin");
  const circFitted = residuals("kin", kappaStar);
  // Dressed-record residual (braid + sea at the same kappa; diagnostics only).
  const dressedGlobalRelResidual = anySplitSea
    ? residuals("kin", kappaStar, "wake").globalRelResidual
    : null;
  // Both seed-record conventions per variant (epicyclic-hunt-handoff.md,
  // diagnostics only; the hunt's primary objective is the released dynamics):
  //  A. fitted-kappa*/circular-need (per-variant refit, tabled-cadence need)
  //  B. frozen-kappa*/held-circle-need (declared frozen coupling, the seed's
  //     own prehistory-circle need)
  const conventionPair = {
    fittedCircularNeed: { kappaStar, globalRelResidual: circFitted.globalRelResidual },
    frozenHeldCircleNeed:
      frozenKappa != null
        ? {
            kappa: frozenKappa,
            globalRelResidual: residuals("kinHeld", frozenKappa).globalRelResidual,
          }
        : null,
  };
  // Per-layer radial support ratios at a given coupling (antipodal pair mean):
  // s_a = kappa * inward-radial-wake / (omega^2 * rho) — the survivability
  // statistic, same convention as spindle-support-ratio-targeted-search.mjs.
  const supportAt = (kappa, key = "wakeBareInwardRadial") => {
    const acc = {};
    for (const s of samples) {
      const need = DECLARED.omega * DECLARED.omega * s.rhoCyl;
      const v = (kappa * s[key]) / need;
      if (!acc[s.layer]) acc[s.layer] = { sum: 0, n: 0 };
      acc[s.layer].sum += v;
      acc[s.layer].n += 1;
    }
    return Object.fromEntries(
      Object.entries(acc).map(([k, v]) => [k, v.sum / v.n])
    );
  };
  const supportRatios = {
    atFittedKappa: supportAt(kappaStar),
    atFrozenKappa: frozenKappa != null ? supportAt(frozenKappa) : null,
  };
  // Seed sea rows (Row 3 diagnostics 3-4; Row 5 cap-credit re-derivation):
  // per-layer radial supply fraction and tangential row from the split sea
  // channel, at the fitted (frozen-grade) kappa — the metabolism-ledger /
  // credit seed anchor. For Row 5, radialSupplyFraction.O IS the in-build
  // cap credit at true FCC-12 placement (binding obligation 1).
  let seaRows = null;
  if (anySplitSea) {
    const kap = frozenKappa != null ? frozenKappa : kappaStar;
    const tanAcc = {};
    for (const s of samples) {
      if (!tanAcc[s.layer]) tanAcc[s.layer] = { tan: 0, torque: 0 };
      tanAcc[s.layer].tan += (kap * s.seaTangential) / 2;
      tanAcc[s.layer].torque += kap * s.seaTangential * s.rhoCyl;
    }
    let netTorque = 0;
    for (const L of Object.keys(tanAcc)) netTorque += tanAcc[L].torque;
    seaRows = {
      kappaUsed: kap,
      radialSupplyFraction: supportAt(kap, "seaInwardRadial"),
      supportRatiosDressed: supportAt(kap, "wakeInwardRadial"),
      tangentialRowPerLayer: Object.fromEntries(
        Object.entries(tanAcc).map(([k, v]) => [k, v.tan])
      ),
      netSeaTorqueZ: netTorque,
    };
  }
  return {
    kappaStar,
    perSiteRelResidual: circFitted.perSiteRelResidual,
    globalRelResidual: circFitted.globalRelResidual,
    dressedGlobalRelResidual,
    conventionPair,
    supportRatios,
    seaRows,
    samples,
  };
}

// ---------------------------------------------------------------------------
// Per-layer force projections (tangential pump/brake rows, radial support).
// ---------------------------------------------------------------------------
// Per-layer projections of the responsive-sea channel alone (metabolism rows,
// Row 3 diagnostics 2-4: tangential row, radial supply fraction, net torque).
function seaLayerProjections(sites, states, seaAccs, kappa) {
  const rows = {};
  let netTorqueZ = 0;
  for (let i = 0; i < sites.length; i += 1) {
    const { x } = states[i];
    const rho = Math.hypot(x[0], x[1]);
    if (rho < 1e-12) continue;
    const rHat = [x[0] / rho, x[1] / rho];
    const tHat = [-x[1] / rho, x[0] / rho];
    const f = seaAccs[i].map((c) => kappa * c);
    const tan = f[0] * tHat[0] + f[1] * tHat[1];
    const rad = f[0] * rHat[0] + f[1] * rHat[1];
    netTorqueZ += tan * rho;
    const L = sites[i].layer;
    if (!rows[L]) rows[L] = { tangential: 0, radial: 0, cylRadius: 0 };
    rows[L].tangential += tan / 2;
    rows[L].radial += rad / 2;
    rows[L].cylRadius += rho / 2;
  }
  const w2 = DECLARED.omega * DECLARED.omega;
  for (const L of Object.keys(rows)) {
    rows[L].radialSupplyFraction = -rows[L].radial / (w2 * rows[L].cylRadius);
  }
  return { rows, netTorqueZ };
}

function layerProjections(sites, states, wakes, kappa) {
  const rows = {};
  for (let i = 0; i < sites.length; i += 1) {
    const { x } = states[i];
    const rho = Math.hypot(x[0], x[1]);
    if (rho < 1e-12) continue;
    const rHat = [x[0] / rho, x[1] / rho, 0];
    const tHat = [-x[1] / rho, x[0] / rho, 0];
    const f = wakes[i].map((c) => kappa * c);
    const row = {
      tangential: f[0] * tHat[0] + f[1] * tHat[1],
      radial: f[0] * rHat[0] + f[1] * rHat[1],
      axial: f[2],
      cylRadius: rho,
    };
    const L = sites[i].layer;
    if (!rows[L]) rows[L] = { tangential: 0, radial: 0, axial: 0, cylRadius: 0, n: 0 };
    // tangential sign is orientation-shared under the antipodal map; average
    rows[L].tangential += row.tangential / 2;
    rows[L].radial += row.radial / 2;
    rows[L].axial += Math.abs(row.axial) / 2;
    rows[L].cylRadius += row.cylRadius / 2;
    rows[L].n += 1;
  }
  for (const L of Object.keys(rows)) {
    const w2 = DECLARED.omega * DECLARED.omega;
    rows[L].supportRatio = -rows[L].radial / (w2 * rows[L].cylRadius);
  }
  // Instantaneous self-adjusted support (Row 7 decisive diagnostic 5: the
  // corridor should hold BY SELF-ADJUSTMENT, not by initial placement): the
  // same inward wake row against the LIVE centripetal need v_t^2/rho of the
  // released orbit, instead of the seed cadence's omega^2*rho. At the seed
  // the two coincide; along a self-adjusting release the instant row is the
  // claim-bearing one and the seed-cadence row is the drift indicator.
  const inst = {};
  for (let i = 0; i < sites.length; i += 1) {
    const { x, v } = states[i];
    const rho = Math.hypot(x[0], x[1]);
    if (rho < 1e-12) continue;
    const tHat = [-x[1] / rho, x[0] / rho];
    const vt = v[0] * tHat[0] + v[1] * tHat[1];
    const rHat = [x[0] / rho, x[1] / rho];
    const inward = -kappa * (wakes[i][0] * rHat[0] + wakes[i][1] * rHat[1]);
    const need = (vt * vt) / rho;
    const L = sites[i].layer;
    if (!inst[L]) inst[L] = { sum: 0, n: 0 };
    inst[L].sum += need > 1e-12 ? inward / need : 0;
    inst[L].n += 1;
  }
  for (const L of Object.keys(inst)) {
    if (rows[L]) rows[L].supportRatioInstant = inst[L].sum / inst[L].n;
  }
  return rows;
}

// ---------------------------------------------------------------------------
// The release integration.
// ---------------------------------------------------------------------------
export function runRelease({
  rotations = DECLARED.runRotations,
  kappa,
  perturb = null,
  recordRotations = [0.25, 0.5, 1, 1.5, 2, 2.5, 3],
  onStep = null,
  maxClickLogEntries = 400,
  resumeState = null,
  budgetMs = Infinity,
} = {}) {
  const sites = buildSites();
  const seaSites = buildSeaSites();
  // Row 5 frozen environment: deterministic from the tabled row (held rigid
  // prehistory only), so rebuilding on resume reproduces it exactly.
  const staticPairSea = buildStaticPairSeaSites(sites);
  const dt = DECLARED.timeStep;
  const steps = Math.round((rotations * TWO_PI) / dt);
  let responsiveSeaState = null;
  let histories;
  let states;
  let diag;
  let records;
  let clickLedger;
  let chartLedger;
  let railCrossings;
  let prevSelfCounts;
  let prevBetaM;
  let halted;
  let startStep;
  let nextRecordIdx;

  if (resumeState) {
    histories = sites.map((s, i) => {
      const h = new RetainedHistory(s);
      h.ts = resumeState.histories[i].ts;
      h.xs = resumeState.histories[i].xs;
      h.vs = resumeState.histories[i].vs;
      h.maxRadiusSeen = resumeState.histories[i].maxRadiusSeen;
      return h;
    });
    states = resumeState.states;
    diag = resumeState.diag;
    records = resumeState.records;
    clickLedger = resumeState.clickLedger;
    chartLedger = resumeState.chartLedger ?? {
      bookedSteps: 0,
      crossingEvents: 0,
      totalBookedTangentialImpulse: 0,
      rows: [],
    };
    railCrossings = resumeState.railCrossings;
    prevSelfCounts = resumeState.prevSelfCounts;
    prevBetaM = resumeState.prevBetaM;
    halted = resumeState.halted;
    startStep = resumeState.step;
    nextRecordIdx = resumeState.nextRecordIdx;
    if (resumeState.responsiveSea) {
      responsiveSeaState = buildResponsiveSeaState();
      responsiveSeaState.ts = resumeState.responsiveSea.ts;
      responsiveSeaState.ps = resumeState.responsiveSea.ps;
      responsiveSeaState.clampedLookups = resumeState.responsiveSea.clampedLookups;
    }
  } else {
    histories = sites.map((s) => new RetainedHistory(s));
    states = sites.map((s) => ({
      x: rigidPosition(s, 0),
      v: rigidVelocity(s, 0),
    }));
    if (perturb) {
      const { siteIndex, tangentialKick } = perturb;
      const st = states[siteIndex];
      const rho = Math.hypot(st.x[0], st.x[1]);
      st.v[0] += (-st.x[1] / rho) * tangentialKick;
      st.v[1] += (st.x[0] / rho) * tangentialKick;
    }
    diag = [];
    records = [];
    clickLedger = { totalTransitions: 0, entries: [] };
    chartLedger = {
      bookedSteps: 0,
      crossingEvents: 0,
      totalBookedTangentialImpulse: 0,
      rows: [],
    };
    railCrossings = [];
    prevSelfCounts = sites.map(() => 0);
    prevBetaM = 1;
    halted = null;
    startStep = 0;
    nextRecordIdx = 0;
    if (DECLARED.responsiveSea.enabled) {
      responsiveSeaState = settleResponsiveSea(buildResponsiveSeaState(), sites, 0);
    }
  }

  const recordTimes = recordRotations
    .filter((r) => r <= rotations + 1e-9)
    .map((r) => r * TWO_PI);
  const tStart = Date.now();
  let step = startStep;

  for (; step < steps; step += 1) {
    if (Date.now() - tStart > budgetMs) break;
    const t = step * dt;
    // retain the record BEFORE stepping (samples at t)
    for (let i = 0; i < sites.length; i += 1) histories[i].push(t, states[i].x, states[i].v);

    const wantRecord =
      nextRecordIdx < recordTimes.length && t + dt / 2 >= recordTimes[nextRecordIdx];
    const ledgers = wantRecord ? [] : null;

    const wakes = [];
    const seaAccs = [];
    const selfCounts = [];
    const chartBookings = [];
    for (let i = 0; i < sites.length; i += 1) {
      const ledger = ledgers ? [] : null;
      const { a, aSelf, aSea, selfRows, selfRootCount } = wakeAcceleration({
        histories,
        sites,
        i,
        tH: t,
        xi: states[i].x,
        vi: states[i].v,
        ledger,
        splitSelf: DECLARED.chart.enabled,
        seaSites,
        responsiveSeaState,
        staticPairSea,
      });
      seaAccs.push(aSea);
      let booking = null;
      if (DECLARED.chart.enabled) {
        // chart-active: fold-flagged same-source row, or the total speed
        // crosses the rail within the provisional step
        const foldFlagged = selfRows.some(
          (row) => Math.abs(row.Ds) < DECLARED.chart.foldJacobianThreshold
        );
        const beta0 = Math.hypot(...states[i].v);
        const vProv = states[i].v.map((vc, c) => vc + kappa * a[c] * dt);
        const beta1 = Math.hypot(...vProv);
        const crossing = (beta0 - 1) * (beta1 - 1) < 0;
        if (foldFlagged || crossing || selfRootCount > 0) {
          const aFrozen = a.map((c, idx) => kappa * (c - aSelf[idx]));
          booking = chartWindowIntegrate({
            histories,
            sites,
            i,
            t0: t,
            dt,
            x0: states[i].x,
            v0: states[i].v,
            aFrozen,
            kappa,
          });
          booking.aFrozen = aFrozen;
          booking.beta0 = beta0;
          booking.crossing = crossing;
          booking.foldFlagged = foldFlagged;
        }
      }
      chartBookings.push(booking);
      // diagnostics see the effective wake (partner + booked self channel)
      if (booking) {
        wakes.push(
          booking.aFrozen.map((c, idx) => c / kappa + booking.dv[idx] / (kappa * dt))
        );
      } else {
        wakes.push(a);
      }
      selfCounts.push(booking ? booking.rootCountAtEnd : selfRootCount);
      if (ledger) ledgers.push(...ledger);
    }

    // chart ledger: booked crossing-window rows (spec Section 3.1 shape)
    for (let i = 0; i < sites.length; i += 1) {
      const booking = chartBookings[i];
      if (!booking) continue;
      chartLedger.bookedSteps += 1;
      const beta = Math.hypot(...states[i].v) || 1;
      const tHat = states[i].v.map((c) => c / beta);
      const tanImpulse =
        booking.dv[0] * tHat[0] + booking.dv[1] * tHat[1] + booking.dv[2] * tHat[2];
      chartLedger.totalBookedTangentialImpulse += tanImpulse;
      if (booking.crossing) {
        chartLedger.crossingEvents += 1;
        if (chartLedger.rows.length < DECLARED.chart.maxClickRows) {
          let witness = null;
          if (chartLedger.rows.length < 8) {
            const rerun = chartWindowIntegrate({
              histories,
              sites,
              i,
              t0: t,
              dt,
              x0: states[i].x,
              v0: states[i].v,
              aFrozen: booking.aFrozen,
              kappa,
              subSteps: DECLARED.chart.witnessSubSteps,
            });
            const base = Math.hypot(...booking.dv);
            witness = {
              subStepsBase: DECLARED.chart.subSteps,
              subStepsWitness: DECLARED.chart.witnessSubSteps,
              relativeSpread:
                base > 0 ? Math.hypot(
                  rerun.dv[0] - booking.dv[0],
                  rerun.dv[1] - booking.dv[1],
                  rerun.dv[2] - booking.dv[2]
                ) / base : 0,
              softeningInKernel: "none_density_of_states_integral",
            };
          }
          chartLedger.rows.push({
            clickId: `chart:${sites[i].id}:${chartLedger.crossingEvents}`,
            site: sites[i].id,
            crossingTime: t,
            betaAtWindowStart: booking.beta0,
            chartImpulse: booking.dv,
            tangentialImpulse: tanImpulse,
            foldChordMin: booking.minChord,
            unfoldingWindowMu: booking.unfoldingWindowMu,
            foldCurvature: booking.foldCurvature,
            orientationProjectionConvention: "single_resolved_branch_chi_1",
            integerRootCountAfter: booking.rootCountAtEnd,
            regularizationIndependenceWitness: witness,
          });
        }
      }
    }

    // click ledger: same-source root-count transitions (integer steps)
    for (let i = 0; i < sites.length; i += 1) {
      if (selfCounts[i] !== prevSelfCounts[i]) {
        clickLedger.totalTransitions += 1;
        if (clickLedger.entries.length < maxClickLogEntries) {
          clickLedger.entries.push({
            time: t,
            site: sites[i].id,
            rootCountBefore: prevSelfCounts[i],
            rootCountAfter: selfCounts[i],
            integerDelta: selfCounts[i] - prevSelfCounts[i],
          });
        }
      }
    }
    prevSelfCounts = selfCounts;

    // rail row
    const betaM =
      (Math.hypot(...states[2].v) + Math.hypot(...states[3].v)) / 2;
    if ((prevBetaM - 1) * (betaM - 1) < 0) {
      railCrossings.push({ time: t, betaBefore: prevBetaM, betaAfter: betaM });
    }
    prevBetaM = betaM;

    // per-step diagnostics
    const layerRows = layerProjections(sites, states, wakes, kappa);
    let seaRows = null;
    let seaOrder = null;
    if (responsiveSeaState || staticPairSea) {
      seaRows = seaLayerProjections(sites, states, seaAccs, kappa);
      if (responsiveSeaState) seaOrder = seaOrderParameter(responsiveSeaState);
    }
    const shapeDev = sites.map((s, i) => {
      const rp = rigidPosition(s, t);
      return Math.hypot(
        states[i].x[0] - rp[0],
        states[i].x[1] - rp[1],
        states[i].x[2] - rp[2]
      );
    });
    // Axis-wobble watch (Row 6 diagnostic 6; Row 7 decisive diagnostic 2 —
    // the tilt block predicts bounded/decaying nutation, growth = flutter)
    // + steric clearance (Row 6). Both cheap; axis row reported every step.
    const axisRow = braidAxisRow(states);
    const cageClearance = staticPairSea ? minCageClearance(staticPairSea, states) : null;
    diag.push({
      t,
      betaM,
      betaI: (Math.hypot(...states[0].v) + Math.hypot(...states[1].v)) / 2,
      betaO: (Math.hypot(...states[4].v) + Math.hypot(...states[5].v)) / 2,
      layerRadii: {
        I: (Math.hypot(...states[0].x) + Math.hypot(...states[1].x)) / 2,
        M: (Math.hypot(...states[2].x) + Math.hypot(...states[3].x)) / 2,
        O: (Math.hypot(...states[4].x) + Math.hypot(...states[5].x)) / 2,
      },
      maxShapeDeviation: Math.max(...shapeDev),
      selfRootCounts: selfCounts.slice(),
      layerRows,
      seaRows,
      seaOrder,
      axisRow,
      cageClearance,
      states: null,
    });

    if (wantRecord) {
      records.push({
        recordTime: t,
        rotations: t / TWO_PI,
        rootLedger: ledgers,
        layerRows,
        seaRows,
        seaOrder,
        // frozen-sea back-reaction honesty row (Row 5 diagnostic 5): what the
        // static environment WOULD feel from the released braid
        frozenSeaBackReaction: staticPairSea
          ? frozenSeaBackReactionRow(staticPairSea, sites, histories, t)
          : null,
        // cage honesty row (Row 6 diagnostic 5): per-member would-be
        // force/torque vs the DECLARED seed strain (Section 55 conventions)
        cageHonesty:
          staticPairSea && staticPairSea.placement === "octahedral6"
            ? cageHonestyRow(staticPairSea, sites, histories, t, kappa)
            : null,
        axisRow,
        cageClearance,
        betaM,
      });
      nextRecordIdx += 1;
    }

    // integrate (semi-implicit Euler; declared dt)
    for (let i = 0; i < sites.length; i += 1) {
      const st = states[i];
      for (let c = 0; c < 3; c += 1) {
        st.v[c] += kappa * wakes[i][c] * dt;
        st.x[c] += st.v[c] * dt;
      }
    }

    // advance the sea orientations t -> t+dt (orientation-only dynamics,
    // driven by the braid's retained/held retarded field at the sea sites)
    if (responsiveSeaState) {
      stepResponsiveSea(responsiveSeaState, sites, histories, t, dt);
    }

    // halt conditions (first-blocker discipline)
    for (let i = 0; i < sites.length; i += 1) {
      const st = states[i];
      const r = Math.hypot(...st.x);
      const sp = Math.hypot(...st.v);
      if (!Number.isFinite(r) || !Number.isFinite(sp)) {
        halted = { time: t, reason: "non_finite_state", site: sites[i].id };
        break;
      }
      if (r > DECLARED.haltMaxRadius) {
        halted = { time: t, reason: "shape_loss_radius_runaway", site: sites[i].id, radius: r };
        break;
      }
      if (sp > DECLARED.haltMaxSpeed) {
        halted = { time: t, reason: "speed_runaway", site: sites[i].id, speed: sp };
        break;
      }
    }
    if (halted) break;
    if (onStep && step % 100 === 0) onStep(step, steps, diag[diag.length - 1]);
  }

  const completed = halted != null || step >= steps;
  return {
    sites,
    histories,
    states,
    diag,
    records,
    clickLedger,
    chartLedger,
    railCrossings,
    halted,
    completed,
    responsiveSeaState,
    staticPairSea,
    state: {
      step,
      steps,
      states,
      responsiveSea: responsiveSeaState
        ? {
            ts: responsiveSeaState.ts,
            ps: responsiveSeaState.ps,
            clampedLookups: responsiveSeaState.clampedLookups,
          }
        : null,
      histories: histories.map((h) => ({
        ts: h.ts,
        xs: h.xs,
        vs: h.vs,
        maxRadiusSeen: h.maxRadiusSeen,
      })),
      diag,
      records,
      clickLedger,
      chartLedger,
      railCrossings,
      prevSelfCounts,
      prevBetaM,
      halted,
      nextRecordIdx,
    },
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function readCliNumber(name, fallback) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((entry) => entry.startsWith(prefix));
  const v = arg ? Number(arg.slice(prefix.length)) : NaN;
  return Number.isFinite(v) ? v : fallback;
}

function isMain() {
  return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
}

if (isMain()) {
  const outDir = path.join(".tmp", "braid-ideal", "spindle-braid-native-confirmation");
  fs.mkdirSync(outDir, { recursive: true });
  const rotations = readCliNumber("rotations", DECLARED.runRotations);
  const twinRotations = readCliNumber("twin-rotations", DECLARED.twinRotations);
  const budgetMs = readCliNumber("budget-seconds", 33) * 1000;
  const tag = process.argv.find((a) => a.startsWith("--tag="))?.slice(6) ?? "main";
  // Regulator overrides (for the reported regulator-dependence rows only;
  // the declared values above are the run's canonical regulators).
  DECLARED.timeStep = readCliNumber("dt", DECLARED.timeStep);
  DECLARED.coincidenceStratum = readCliNumber("rc", DECLARED.coincidenceStratum);
  DECLARED.sameSourceMinimumDelay = readCliNumber("dmin", DECLARED.sameSourceMinimumDelay);
  DECLARED.soft = readCliNumber("soft", DECLARED.soft);
  DECLARED.chart.enabled = process.argv.includes("--chart");
  DECLARED.sea.enabled = process.argv.includes("--sea");
  DECLARED.sea.spacing = readCliNumber("sea-spacing", DECLARED.sea.spacing);
  DECLARED.responsiveSea.enabled = process.argv.includes("--responsive-sea");
  DECLARED.responsiveSea.spacing = readCliNumber("rsea-spacing", DECLARED.responsiveSea.spacing);
  selectTabledRow(readCliNumber("row", 1));
  if (DECLARED.staticPairSea.enabled && (DECLARED.sea.enabled || DECLARED.responsiveSea.enabled)) {
    process.stderr.write(
      "[abort] Rows 5/6 carry their own frozen static-pair environment; --sea/--responsive-sea do not compose with --row=5 or --row=6\n"
    );
    process.exit(1);
  }
  if (DECLARED.bareGate.enabled && (DECLARED.sea.enabled || DECLARED.responsiveSea.enabled)) {
    process.stderr.write(
      "[abort] Row 7 is the BARE self-equilibrated candidate (no environment); --sea/--responsive-sea do not compose with --row=7\n"
    );
    process.exit(1);
  }
  DECLARED.epicycle.I = readCliNumber("ei", 0);
  DECLARED.epicycle.M = readCliNumber("em", 0);
  DECLARED.epicycle.O = readCliNumber("eo", 0);
  // Epicyclic-hunt knobs: apsidal phase offsets (degrees) and apsis start.
  DECLARED.apsidalPhase.I = deg(readCliNumber("phi-i", 0));
  DECLARED.apsidalPhase.M = deg(readCliNumber("phi-m", 0));
  DECLARED.apsidalPhase.O = deg(readCliNumber("phi-o", 0));
  const readStart = (name) => {
    const arg = process.argv.find((a) => a.startsWith(`--start-${name}=`));
    const v = arg ? arg.slice(`--start-${name}=`.length) : "apo";
    if (v !== "apo" && v !== "peri") {
      process.stderr.write(`[abort] --start-${name} must be apo|peri, got "${v}"\n`);
      process.exit(1);
    }
    return v;
  };
  DECLARED.apsisStart.I = readStart("i");
  DECLARED.apsisStart.M = readStart("m");
  DECLARED.apsisStart.O = readStart("o");
  let kappaOverride = readCliNumber("kappa", NaN);
  const outName = process.argv.find((a) => a.startsWith("--out="))?.slice(6) ?? "report.json";
  const t0 = Date.now();

  // Row 7 binding obligation 1: the FULL stability gate re-derived IN-BUILD
  // before anything else; release only from the re-derived equilibrium, at
  // the gauge-invariant frozen release coupling (binding obligation 2).
  let bareGateBlock = null;
  if (DECLARED.bareGate.enabled) {
    bareGateBlock = bareStabilityGateInBuild();
    process.stderr.write(
      `[gate] pass=${bareGateBlock.pass} kappaFit=${bareGateBlock.kappaFitBareChannel.toFixed(6)} ` +
        `lambda=${bareGateBlock.lambda.toFixed(6)} kappaRelease=${bareGateBlock.kappaRelease.toFixed(6)} ` +
        `R_M(eq)/kappa=${bareGateBlock.ReqOverKappa.toFixed(4)} (anchor ${bareGateBlock.ReqOverKappaAnchor})\n`
    );
    process.stderr.write(
      `[gate] radial spectrum (release gauge) ${bareGateBlock.equilibrium.railPinnedSpectrum.map((v) => v.toFixed(4)).join("/")} ` +
        `residualMax=${bareGateBlock.equilibrium.residualMaxAtReleaseGauge.toExponential(2)} ` +
        `tau I/O=${bareGateBlock.tangential.tauI.toFixed(5)}/${bareGateBlock.tangential.tauO.toFixed(5)} ` +
        `railPump=${bareGateBlock.tangential.railPumpM.toFixed(4)}\n`
    );
    process.stderr.write(
      `[gate] tilt globalNullResidual=${bareGateBlock.tilt.globalModeResidual.toExponential(2)} ` +
        `relativeEigen=${bareGateBlock.tilt.relativeEigen.map((e) => `${e.re.toFixed(4)}${e.im ? `+-${Math.abs(e.im).toFixed(4)}i` : ""}`).join("/")} ` +
        `(anchors ${bareGateBlock.tilt.anchors.join("/")})\n`
    );
    if (!bareGateBlock.pass) {
      const gateReport = {
        schema: SCHEMA,
        handoffPacketRef: HANDOFF_PACKET_REF,
        declared: DECLARED,
        firstBlocker: "stability_gate_failed_in_build",
        bareStabilityGate: bareGateBlock,
        failClosed: FAIL_CLOSED,
      };
      fs.writeFileSync(path.join(outDir, outName), JSON.stringify(gateReport, null, 1));
      process.stderr.write(
        "[abort] in-build stability gate failed; gate-only report written, no release (fail-closed)\n"
      );
      process.exit(0);
    }
    // Release only from the re-derived equilibrium: the layer radii are the
    // gate's equilibrium shape (M stays the R_M = 1 unit; angles tabled).
    DECLARED.layers = DECLARED.layers.map((L) =>
      L.name === "I"
        ? { ...L, R: bareGateBlock.equilibrium.geo.qI }
        : L.name === "O"
          ? { ...L, R: bareGateBlock.equilibrium.geo.qO }
          : { ...L }
    );
    // Frozen-kappa discipline: the release runs at kappa_eq (an explicit
    // operator --kappa still wins, reported as an override).
    if (!Number.isFinite(kappaOverride)) kappaOverride = bareGateBlock.kappaRelease;
  }

  // Seed record: native production-runtime evaluation at t = 0 (all held).
  const sites = buildSites();
  const seedHistories = sites.map((s) => new RetainedHistory(s));
  const seedSeaState = DECLARED.responsiveSea.enabled
    ? settleResponsiveSea(buildResponsiveSeaState(), sites, 0)
    : null;
  // Row 5 in-build environment + binding obligation 2 (dt/Nt witnesses on all
  // seed rows): the frozen sea is built at the declared Nt AND at the witness
  // Nt; orientations and every credit-bearing seed row must agree.
  const staticPairSea = buildStaticPairSeaSites(sites);
  const staticPairSeaWitness = DECLARED.staticPairSea.enabled
    ? buildStaticPairSeaSites(sites, DECLARED.staticPairSea.ntWitness)
    : null;
  let seaBuildWitness = null;
  if (staticPairSea) {
    let maxAngle = 0;
    for (let k = 0; k < staticPairSea.shell.length; k += 1) {
      const a = staticPairSea.shell[k].pHat;
      const b = staticPairSeaWitness.shell[k].pHat;
      const dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
      maxAngle = Math.max(maxAngle, (Math.acos(dot) * 180) / Math.PI);
    }
    seaBuildWitness = {
      ntBase: staticPairSea.ntUsed,
      ntWitness: staticPairSeaWitness.ntUsed,
      maxOrientationDeviationDeg: maxAngle,
    };
    process.stderr.write(
      `[spsea] p0=${staticPairSea.p0.toFixed(6)} a=${staticPairSea.spacing} ` +
        `orientation witness Nt=${seaBuildWitness.ntBase}/${seaBuildWitness.ntWitness} ` +
        `maxDev=${maxAngle.toExponential(3)} deg\n`
    );
  }
  const seed = seedRecordEvaluation(
    sites,
    seedHistories,
    buildSeaSites(),
    Number.isFinite(kappaOverride) ? kappaOverride : null,
    seedSeaState,
    staticPairSea
  );
  if (Number.isFinite(kappaOverride)) {
    // frozen coupling for cross-variant comparability (declared, no refit)
    seed.kappaStarFitted = seed.kappaStar;
    seed.kappaStar = kappaOverride;
  }
  process.stderr.write(
    `[seed] native kappa*=${seed.kappaStar.toFixed(6)} globalRelResidual=${seed.globalRelResidual.toFixed(6)}\n`
  );
  process.stderr.write(
    `[seed] conventionPair fitted/circular=${seed.conventionPair.fittedCircularNeed.globalRelResidual.toFixed(6)}` +
      (seed.conventionPair.frozenHeldCircleNeed
        ? ` frozen/held-circle=${seed.conventionPair.frozenHeldCircleNeed.globalRelResidual.toFixed(6)}`
        : "") +
      "\n"
  );
  const sf = seed.supportRatios.atFittedKappa;
  process.stderr.write(
    `[seed] row=${DECLARED.candidateRow} supportRatios(I/M/O)=` +
      `${sf.I.toFixed(4)}/${sf.M.toFixed(4)}/${sf.O.toFixed(4)} at fitted kappa* (bare braid channel)\n`
  );
  if (seed.seaRows) {
    const sr = seed.seaRows;
    process.stderr.write(
      `[seed:rsea] radialSupply(I/M/O)=` +
        `${sr.radialSupplyFraction.I.toFixed(4)}/${sr.radialSupplyFraction.M.toFixed(4)}/${sr.radialSupplyFraction.O.toFixed(4)} ` +
        `dressedSupport(I/M/O)=${sr.supportRatiosDressed.I.toFixed(4)}/${sr.supportRatiosDressed.M.toFixed(4)}/${sr.supportRatiosDressed.O.toFixed(4)} ` +
        `tanRow(I/M/O)=${sr.tangentialRowPerLayer.I.toFixed(4)}/${sr.tangentialRowPerLayer.M.toFixed(4)}/${sr.tangentialRowPerLayer.O.toFixed(4)} ` +
        `netTorqueZ=${sr.netSeaTorqueZ.toFixed(4)}\n`
    );
  }

  // Rows 5/6 binding obligations (packet Candidate Rows 5-6; spec Section 52
  // and Section 54-55 rules):
  //  1. credit re-derived in-build at the declared placement, corridor
  //     re-anchored on the in-build rows; release ONLY if all dressed layers
  //     are inside [0.97, 1.03];
  //  2. Nt witness on every credit-bearing seed row (full witness seed record
  //     at the witness-Nt orientations; no aliased sampling anywhere; no
  //     count scaling anywhere — the Row 5 lesson);
  //  3. (Row 6) steric declaration + cage honesty row at the seed.
  let staticPairSeaSeedBlock = null;
  if (staticPairSea) {
    const seedWitness = seedRecordEvaluation(
      sites,
      seedHistories,
      null,
      Number.isFinite(kappaOverride) ? kappaOverride : null,
      null,
      staticPairSeaWitness
    );
    // In-build seed rows for the corridor gate. Row 5 (fcc12) keeps its
    // executed single-phase booking (the executed history's convention).
    // Row 6 (octahedral6) gates on CYCLE-AVERAGED rows — the tabled Section 54
    // anchors are cycle averages, and the cage's 4-fold equatorial ripple
    // makes a single phase sample a different (reported, not gated) quantity.
    const bareAtKappa = Number.isFinite(kappaOverride)
      ? seed.supportRatios.atFrozenKappa
      : seed.supportRatios.atFittedKappa;
    let creditInBuild;
    let creditWitness;
    let dressed;
    let dressedWitness;
    let seaRowsInBuild;
    let cycleRowsBlock = null;
    if (staticPairSea.placement === "octahedral6") {
      const cyc = cycleAveragedSeaRows(sites, staticPairSea.endpoints, seed.kappaStar, 16);
      const cycW = cycleAveragedSeaRows(sites, staticPairSea.endpoints, seed.kappaStar, 32);
      seaRowsInBuild = cyc.rows;
      creditInBuild = cyc.rows.O;
      creditWitness = cycW.rows.O;
      dressed = Object.fromEntries(
        ["I", "M", "O"].map((L) => [L, bareAtKappa[L] + cyc.rows[L]])
      );
      dressedWitness = Object.fromEntries(
        ["I", "M", "O"].map((L) => [L, bareAtKappa[L] + cycW.rows[L]])
      );
      cycleRowsBlock = {
        convention: "cycle_averaged_production_booking_nt16_witness_nt32",
        rows: cyc.rows,
        rowsWitness: cycW.rows,
        phaseRipple: { min: cyc.rippleMin, max: cyc.rippleMax },
        phaseSampleT0: seed.seaRows.radialSupplyFraction,
      };
    } else {
      seaRowsInBuild = seed.seaRows.radialSupplyFraction;
      creditInBuild = seed.seaRows.radialSupplyFraction.O;
      creditWitness = seedWitness.seaRows.radialSupplyFraction.O;
      dressed = seed.seaRows.supportRatiosDressed;
      dressedWitness = seedWitness.seaRows.supportRatiosDressed;
    }
    const [cLo, cHi] = DECLARED.staticPairSea.corridor;
    const corridorHolds = ["I", "M", "O"].every(
      (L) => dressed[L] >= cLo && dressed[L] <= cHi
    );
    // Row 6 axis-declared credit split (the Row 5 rule made standing: credit
    // at true placement, axis-declared): polar-only and equatorial-only
    // endpoint subsets, booked through the same production path.
    let axisDeclaredSplit = null;
    let stericDeclaration = null;
    let cageHonestySeed = null;
    if (staticPairSea.placement === "octahedral6") {
      const subset = (cls) => staticPairSea.endpoints.filter((e) => e.siteClass === cls);
      const cycPolar = cycleAveragedSeaRows(sites, subset("polar"), seed.kappaStar, 16);
      const cycEq = cycleAveragedSeaRows(sites, subset("equatorial"), seed.kappaStar, 16);
      axisDeclaredSplit = {
        polarCreditO: cycPolar.rows.O,
        equatorialCreditO: cycEq.rows.O,
        polarFractionO: creditInBuild !== 0 ? cycPolar.rows.O / creditInBuild : null,
        tabledPolarFractionO: 1.11, // Section 54: polar pair carries 111%
      };
      stericDeclaration = stericSeedDeclaration(staticPairSea, sites);
      cageHonestySeed = cageHonestyRow(staticPairSea, sites, seedHistories, 0, seed.kappaStar);
    }
    staticPairSeaSeedBlock = {
      placement: staticPairSea.placement,
      p0: staticPairSea.p0,
      spacing: staticPairSea.spacing,
      shellOrientations: staticPairSea.shell.map((s) => ({ id: s.id, center: s.center, pHat: s.pHat, siteClass: s.siteClass })),
      orientationWitness: seaBuildWitness,
      capCreditInBuildTruePlacement: creditInBuild,
      capCreditWitnessNt: creditWitness,
      capCreditTabledInstrument: DECLARED.staticPairSea.tabledInstrumentCredit,
      capCreditCorrection: creditInBuild - DECLARED.staticPairSea.tabledInstrumentCredit,
      seaRowsInBuild,
      seaRowsTabled: DECLARED.staticPairSea.tabledSeaRows,
      cycleRows: cycleRowsBlock,
      dressedSupport: dressed,
      dressedSupportWitness: dressedWitness,
      dressedTotalsTabled: DECLARED.staticPairSea.tabledTotals,
      corridor: DECLARED.staticPairSea.corridor,
      corridorHolds,
      axisDeclaredSplit,
      stericDeclaration,
      cageHonestySeed,
      seaTaxes: { I: seed.seaRows.radialSupplyFraction.I, M: seed.seaRows.radialSupplyFraction.M },
    };
    process.stderr.write(
      `[spsea] in-build cap credit (${staticPairSea.placement}) = ${creditInBuild.toFixed(4)} ` +
        `(witness Nt: ${creditWitness.toFixed(4)}; tabled instrument ${DECLARED.staticPairSea.tabledInstrumentCredit}; ` +
        `correction ${(creditInBuild - DECLARED.staticPairSea.tabledInstrumentCredit >= 0 ? "+" : "")}${(creditInBuild - DECLARED.staticPairSea.tabledInstrumentCredit).toFixed(4)})\n`
    );
    if (axisDeclaredSplit) {
      process.stderr.write(
        `[cage] axis-declared credit split: polar ${axisDeclaredSplit.polarCreditO.toFixed(4)} ` +
          `equatorial ${axisDeclaredSplit.equatorialCreditO.toFixed(4)} ` +
          `polarFraction ${axisDeclaredSplit.polarFractionO?.toFixed(3)} (tabled 1.11)\n`
      );
      process.stderr.write(
        `[cage] steric: closest approach ${stericDeclaration.closestApproachOverall.toFixed(4)} ` +
          `(declared ~${stericDeclaration.declaredClearance}); braid extent ${stericDeclaration.braidExtent.toFixed(3)}, ` +
          `endpoint inner reach ${stericDeclaration.cageEndpointInnerReach.toFixed(3)}\n`
      );
      process.stderr.write(
        `[cage] honesty seed: polar Frad/needO ${cageHonestySeed.polarMeanFradOverNeedO.toFixed(4)} ` +
          `(declared -0.641), equatorial ${cageHonestySeed.equatorialMeanFradOverNeedO.toFixed(4)} ` +
          `(declared +0.09..0.15), maxTorque ${cageHonestySeed.maxTorqueOverNeedO.toFixed(4)} (declared <0.01)\n`
      );
    }
    process.stderr.write(
      `[spsea] dressed support (I/M/O) = ${dressed.I.toFixed(4)}/${dressed.M.toFixed(4)}/${dressed.O.toFixed(4)} ` +
        `corridor [${cLo}, ${cHi}] holds=${corridorHolds}\n`
    );
    if (!corridorHolds) {
      // Fail-closed corridor gate: report the seed block, do not release.
      const gateReport = {
        schema: SCHEMA,
        handoffPacketRef: HANDOFF_PACKET_REF,
        declared: DECLARED,
        firstBlocker: "corridor_gate_failed_at_in_build_credit",
        seedRecord: {
          kappaStarNative: seed.kappaStar,
          globalRelResidualNative: seed.globalRelResidual,
          supportRatios: seed.supportRatios,
          seaRows: seed.seaRows,
          staticPairSea: staticPairSeaSeedBlock,
          candidateRow: DECLARED.candidateRow,
        },
        failClosed: FAIL_CLOSED,
      };
      fs.writeFileSync(path.join(outDir, outName), JSON.stringify(gateReport, null, 1));
      process.stderr.write(
        "[abort] corridor gate failed at the in-build credit; seed-only report written, no release (fail-closed)\n"
      );
      process.exit(0);
    }
  }

  const progress = (step, steps, d) => {
    process.stderr.write(
      `[release:${tag}] step ${step}/${steps} t=${d.t.toFixed(2)} betaM=${d.betaM.toFixed(4)} ` +
        `maxDev=${d.maxShapeDeviation.toFixed(4)} radii I/M/O=` +
        `${d.layerRadii.I.toFixed(3)}/${d.layerRadii.M.toFixed(3)}/${d.layerRadii.O.toFixed(3)}\n`
    );
  };

  // Chunked execution (sandbox calls are wall-clock bounded): main phase, then
  // twin phase, resumable via state files; report assembled when both done.
  const mainStatePath = path.join(outDir, `state-${tag}.json`);
  const twinStatePath = path.join(outDir, `state-${tag}-twin.json`);
  const loadState = (p) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null);
  const mainPrior = loadState(mainStatePath);
  let main = null;
  if (!mainPrior || mainPrior.step < mainPrior.steps) {
    if (!mainPrior || !mainPrior.halted) {
      main = runRelease({
        rotations,
        kappa: seed.kappaStar,
        onStep: progress,
        resumeState: mainPrior,
        budgetMs,
      });
      fs.writeFileSync(mainStatePath, JSON.stringify(main.state));
      if (!main.completed) {
        process.stderr.write(
          `[chunk] main phase paused at step ${main.state.step}/${main.state.steps}; rerun to resume\n`
        );
        process.exit(0);
      }
    }
  }
  if (!main) {
    // main phase already complete on disk; rehydrate a result-shaped object
    const s = mainPrior;
    main = {
      sites: buildSites(),
      histories: s.histories,
      diag: s.diag,
      records: s.records,
      clickLedger: s.clickLedger,
      chartLedger: s.chartLedger,
      railCrossings: s.railCrossings,
      halted: s.halted,
      completed: true,
      state: s,
    };
  } else {
    main.histories = main.state.histories;
  }

  // Stability row: perturbed twin(s) over the shared window. Rows 1-6 book a
  // single kick at the declared twinPerturbation; Row 7 is the basin-width
  // instrument (decisive diagnostic 1): SEVERAL kick sizes, each classified
  // by the declared returning rule, largest returning kick reported.
  const thinArr = (arr, n) => arr.filter((_, k) => k % n === 0);
  const twinKicksCli = process.argv.find((a) => a.startsWith("--twin-kicks="))?.slice(13);
  const twinKicks = twinKicksCli
    ? twinKicksCli.split(",").map(Number).filter((v) => Number.isFinite(v) && v > 0)
    : DECLARED.bareGate.enabled
      ? DECLARED.bareGate.twinKicks
      : [DECLARED.twinPerturbation];
  const computeSeparation = (twinHistories) => {
    const sepSeries = [];
    const nTwin = Math.min(twinHistories[0].xs.length, main.histories[0].xs.length);
    for (let k = 0; k < nTwin; k += 1) {
      let sep = 0;
      for (let i = 0; i < 6; i += 1) {
        const a = main.histories[i];
        const b = twinHistories[i];
        sep = Math.max(
          sep,
          Math.hypot(
            a.xs[k][0] - b.xs[k][0],
            a.xs[k][1] - b.xs[k][1],
            a.xs[k][2] - b.xs[k][2]
          )
        );
      }
      sepSeries.push({ t: k * DECLARED.timeStep, separation: sep });
    }
    return sepSeries;
  };
  const twinRows = [];
  for (let ki = 0; ki < twinKicks.length && twinRotations > 0; ki += 1) {
    const kick = twinKicks[ki];
    const kickStatePath =
      twinKicks.length === 1 && !DECLARED.bareGate.enabled
        ? twinStatePath
        : path.join(outDir, `state-${tag}-twin-k${ki}.json`);
    let prior = loadState(kickStatePath);
    let twinState = null;
    if (!prior || (prior.step < prior.steps && !prior.halted)) {
      const t = runRelease({
        rotations: twinRotations,
        kappa: seed.kappaStar,
        perturb: { siteIndex: 2, tangentialKick: kick },
        recordRotations: [],
        resumeState: prior,
        budgetMs: Math.max(1000, budgetMs - (Date.now() - t0)),
      });
      fs.writeFileSync(kickStatePath, JSON.stringify(t.state));
      if (!t.completed) {
        process.stderr.write(
          `[chunk] twin kick=${kick} paused at step ${t.state.step}/${t.state.steps}; rerun to resume\n`
        );
        process.exit(0);
      }
      twinState = t.state;
    } else {
      twinState = prior;
    }
    const series = computeSeparation(twinState.histories);
    const maxSep = series.reduce((m, s) => Math.max(m, s.separation), 0);
    const finalSep = series.length ? series[series.length - 1].separation : null;
    // Declared returning rule (basin prediction: bounded, returning):
    // bounded inside the tube AND turned around by the window's end.
    const returning =
      maxSep < DECLARED.tubeRadiusForShapeQuestion && finalSep < 0.9 * maxSep;
    twinRows.push({
      kick,
      halted: twinState.halted,
      maxSeparation: maxSep,
      finalSeparation: finalSep,
      returning,
      separationThinned: thinArr(series, 10),
    });
    process.stderr.write(
      `[twin] kick=${kick} maxSep=${maxSep.toExponential(3)} finalSep=${finalSep?.toExponential(3)} returning=${returning}\n`
    );
  }
  const returningKicks = twinRows.filter((r) => r.returning).map((r) => r.kick);
  const largestReturningKick = returningKicks.length ? Math.max(...returningKicks) : null;

  const thin = thinArr;
  // Row 7 report blocks computed from the released record (no extra cost):
  //  - size mode (decisive diagnostic 3): R_M(t) about its equilibrium (the
  //    seed radius is the re-derived equilibrium, so equilibrium = 1) — the
  //    first native test of the size pin;
  //  - escapement statistics (diagnostic 4) at the tabled cadence;
  //  - axis dynamics (diagnostic 2): nutation series summary.
  const seriesStats = (vals) => {
    if (!vals.length) return null;
    let mn = Infinity, mx = -Infinity, sum = 0;
    for (const v of vals) { mn = Math.min(mn, v); mx = Math.max(mx, v); sum += v; }
    const mean = sum / vals.length;
    let var2 = 0;
    for (const v of vals) var2 += (v - mean) * (v - mean);
    return { mean, min: mn, max: mx, std: Math.sqrt(var2 / vals.length) };
  };
  const sizeModeBlock = (() => {
    const rM = main.diag.map((d) => d.layerRadii.M);
    const rI = main.diag.map((d) => d.layerRadii.I);
    const rO = main.diag.map((d) => d.layerRadii.O);
    let crossings = 0;
    for (let k = 1; k < rM.length; k += 1) {
      if ((rM[k - 1] - 1) * (rM[k] - 1) < 0) crossings += 1;
    }
    const half = Math.floor(rM.length / 2);
    const meanOf = (a, lo, hi) => a.slice(lo, hi).reduce((s, v) => s + v, 0) / Math.max(1, hi - lo);
    return {
      equilibriumRM: 1,
      rM: seriesStats(rM),
      rI: seriesStats(rI),
      rO: seriesStats(rO),
      rMEquilibriumCrossings: crossings,
      rMDriftFirstToSecondHalf: rM.length > 3 ? meanOf(rM, half, rM.length) - meanOf(rM, 0, half) : null,
    };
  })();
  const escapementBlock = (() => {
    const bM = main.diag.map((d) => d.betaM);
    const above = bM.filter((b) => b > 1).length;
    return {
      omegaDeclared: DECLARED.omega,
      betaM: seriesStats(bM),
      fractionAboveRail: bM.length ? above / bM.length : null,
      railCrossingTotal: main.railCrossings.length,
      clickTransitions: main.clickLedger.totalTransitions,
    };
  })();
  const axisBlock = (() => {
    const rows = main.diag.filter((d) => d.axisRow && d.axisRow.axisTiltDeg != null);
    if (!rows.length) return null;
    const tilt = rows.map((d) => d.axisRow.axisTiltDeg);
    const omega = rows.map((d) => d.axisRow.omegaFit);
    const last = rows[rows.length - 1];
    return {
      axisTiltDeg: seriesStats(tilt),
      axisTiltFinalDeg: last.axisRow.axisTiltDeg,
      omegaFit: seriesStats(omega),
    };
  })();
  const report = {
    schema: SCHEMA,
    handoffPacketRef: HANDOFF_PACKET_REF,
    declared: DECLARED,
    seedRecord: {
      kappaStarNative: seed.kappaStar,
      kappaStarFitted: seed.kappaStarFitted ?? seed.kappaStar,
      globalRelResidualNative: seed.globalRelResidual,
      dressedGlobalRelResidual: seed.dressedGlobalRelResidual,
      perSiteRelResidual: seed.perSiteRelResidual,
      conventionPair: seed.conventionPair,
      supportRatios: seed.supportRatios,
      seaRows: seed.seaRows,
      staticPairSea: staticPairSeaSeedBlock,
      bareStabilityGate: bareGateBlock,
      candidateRow: DECLARED.candidateRow,
      prescribedEvaluatorAnchor:
        DECLARED.candidateRow === 7
          ? 0.4265
          : DECLARED.candidateRow === 6
            ? 0.2474
            : DECLARED.candidateRow === 5
              ? 0.2058
              : DECLARED.candidateRow === 2
                ? 0.3240
                : 0.4721,
      seedRootLedger: seed.samples.map((s) => ({ site: s.site, ledger: s.ledger })),
    },
    release: {
      rotationsRequested: rotations,
      halted: main.halted,
      // dispersal clock (rotations of 2*pi time, Rows 1-4 convention): first
      // crossing of the declared tube radius by any site
      tubeLossTime: (() => {
        const hit = main.diag.find(
          (d) => d.maxShapeDeviation > DECLARED.tubeRadiusForShapeQuestion
        );
        return hit ? hit.t / TWO_PI : null;
      })(),
      records: main.records,
      clickLedger: main.clickLedger,
      chartLedger: main.chartLedger ?? null,
      chartMode: DECLARED.chart.enabled,
      railCrossings: main.railCrossings.slice(0, 400),
      railCrossingTotal: main.railCrossings.length,
      diagThinned: thin(main.diag, 10).map((d) => ({
        t: d.t,
        betaI: d.betaI,
        betaM: d.betaM,
        betaO: d.betaO,
        layerRadii: d.layerRadii,
        maxShapeDeviation: d.maxShapeDeviation,
        selfRootCounts: d.selfRootCounts,
        layerRows: d.layerRows,
        seaRows: d.seaRows ?? null,
        seaOrder: d.seaOrder ?? null,
        axisRow: d.axisRow ?? null,
        cageClearance: d.cageClearance ?? null,
      })),
      responsiveSeaMode: DECLARED.responsiveSea.enabled,
      responsiveSeaClampedLookups: main.state?.responsiveSea?.clampedLookups ?? null,
      staticPairSeaMode: DECLARED.staticPairSea.enabled,
      sizeMode: sizeModeBlock,
      escapement: escapementBlock,
      axisDynamics: axisBlock,
    },
    stabilityRow: {
      perturbedSite: "M+",
      kicks: twinKicks,
      returningRule:
        "maxSeparation < tubeRadiusForShapeQuestion AND finalSeparation < 0.9*maxSeparation",
      twinRows,
      largestReturningKick,
    },
    failClosed: FAIL_CLOSED,
    elapsedSeconds: (Date.now() - t0) / 1000,
  };
  fs.writeFileSync(path.join(outDir, outName), JSON.stringify(report, null, 1));
  process.stderr.write(
    `[done] ${report.elapsedSeconds.toFixed(1)}s halted=${JSON.stringify(main.halted)} ` +
      `records=${main.records.length} clicks=${main.clickLedger.totalTransitions}\n`
  );
  process.stdout.write(
    JSON.stringify(
      {
        schema: SCHEMA,
        seed: { kappaStar: seed.kappaStar, globalRelResidual: seed.globalRelResidual },
        halted: main.halted,
        clickCount: main.clickLedger.totalTransitions,
        railCrossingCount: main.railCrossings.length,
        reportPath: path.join(outDir, "report.json"),
        ...FAIL_CLOSED,
      },
      null,
      1
    ) + "\n"
  );
}
