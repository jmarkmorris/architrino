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
  driftRailPinnedEquilibrium,
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
  // Row 8 (packet "Candidate Row 8: Marginal-Stratum Release of V5") releases
  // the IDENTICAL Row 7 seed (SELF_EQUILIBRATED_V5, re-derived in-build
  // equilibrium, frozen gauge-invariant kappa_eq): the row differs only in
  // BOOKING discipline — the chart-booking coincidence stratum rho_c is set
  // by the binding pre-release stratum map (marginal brake=pump cell), not
  // declared a priori. Geometry lookup therefore aliases to the Row 7 table.
  const layers = TABLED_ROWS[row === 8 ? 7 : row];
  if (!layers) throw new Error(`unknown tabled candidate row: ${row}`);
  DECLARED.candidateRow = row;
  DECLARED.layers = layers;
  const aM = layers.find((L) => L.name === "M").alpha;
  // Drift cadence pin (instrument touch point 4). At rest the rail pin is
  // omega = 1 / cos(alpha_M) so beta_M = omega R_M cos(alpha_M) = 1 (the c_f
  // rail). Under uniform axial drift u the middle transverse speed is pinned at
  // c_f/gamma = sqrt(1 - u^2) so the TOTAL middle-site speed sqrt((c_f/gamma)^2
  // + u^2) = c_f stays on the rail; hence omega = sqrt(1 - u^2) / cos(alpha_M),
  // matching the driftSupportRatios convention. alpha_M is left FREE (tabled),
  // not re-pinned — letting the tilt relax is the whole point over the
  // screw-rigid reference. axialDrift = 0 gives sqrt(1) = 1 (exact regression).
  const u = DECLARED.axialDrift ?? 0;
  const driftCadence = Math.sqrt(Math.max(0, 1 - u * u));
  DECLARED.omega = driftCadence / Math.cos(aM);
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
  // Rows 7/8 are the BARE self-equilibrated candidate: no environment of any
  // kind, and the in-build stability gate (binding obligation 1) is armed.
  DECLARED.bareGate.enabled = row === 7 || row === 8;
  DECLARED.row8.enabled = row === 8;
}

// ---------------------------------------------------------------------------
// Declared run parameters (all regulators named; packet Section 3 discipline).
// ---------------------------------------------------------------------------
export const DECLARED = {
  fieldSpeed: 1, // c_f
  omega: 1, // pinned transverse cadence (beta_M = 1 on the rail); set by selectTabledRow
  // Native axial-drift envelope instrument (build spec
  // reference/priorities/braid-ideal/native-axial-drift-envelope-instrument-spec.md;
  // theorem target ../master-equation-closure/boosted-delay-attractor-theorem-target.md):
  // boost velocity u along +z (the aligned spin axis), in units of c_f. This is
  // expressed ENTIRELY through the existing centerVelocity/receiver-velocity
  // surfaces (heldSourceModel.centerVelocity.z, rigidPosition/rigidVelocity z)
  // — no native-ABI field is added, the central solver contract is unchanged.
  // At axialDrift = 0 every rest-only path regresses exactly. Touch point 1.
  axialDrift: 0,
  // Oblique drift (Corollary 1 sigma test). driftAngle theta is the angle
  // between the drift direction and the spin axis (+z), in radians; the drift
  // 3-vector is u * (sin theta, 0, cos theta) with u = axialDrift the magnitude.
  // theta = 0 is pure axial screw drift (exact regression of the axial knob);
  // theta > 0 is oblique — NOT screw-rigid, so the spin axis tumbles/reorients
  // freely during the release (the point of the two-axis test). The drift is
  // still carried entirely by the existing centerVelocity 3-vector surface; the
  // central solver is unchanged.
  driftAngle: 0,
  // Co-drifting structured-sea axis absorber (the dynamic co-orbital-cage route,
  // the one surviving sea route after the held-static Rows 5/6 scoped negatives).
  // Reuses the Row-6 octahedral cage (six sites at radius 2.326, two polar/four
  // equatorial) but CO-MOVING with the braid drift (each cage endpoint carries
  // centerVelocity = the braid drift vector) and re-oriented so the cage polar
  // axis is along the drift direction d_hat (polar pair leads/trails along
  // d_hat) — the configuration that can torque the braid spin axis toward d_hat.
  // Axis-only intent: the braid closes its own radial ledger (bare V5), so the
  // cage should anchor the axis without spoiling the radial basin (measured).
  // geometry: "octahedral" (2 polar + 4 equatorial, the full Row-6 cage),
  // "polarPairOnly" (2 co-drifting polar sites fore/aft along d_hat only —
  // axisymmetric about d_hat, cannot inject a transverse anisotropy), or
  // "ring6"/"ring8" (2 polar + a 6-/8-fold equatorial ring approaching
  // axisymmetric — the higher-symmetry fallback).
  coDriftCage: { enabled: false, spacing: 1.645 * Math.SQRT2, ntOrientation: 64, geometry: "octahedral" },
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
  // Candidate Row 8 (packet block by title: "Candidate Row 8: Marginal-Stratum
  // Release of V5 — the d0-From-Survival Row"; design record spec Section 60
  // by title). Seed/gate identical to Row 7; this block declares ONLY the
  // stratum-map instrument and the claim-contract report thresholds. All
  // values are declared regulator-honesty conventions, not physics knobs.
  row8: {
    enabled: false, // set by selectTabledRow(8)
    // Binding pre-release obligation — the stratum map: log-spaced rho_c grid
    // spanning [0.005, 0.08] (7 cells = 0.005 * 16^(k/6); brackets the Row 7
    // regime-map cells 0.01 destructive-push and 0.05 over-absorption), plus
    // the canonical soft booking as the zero-absorption reference.
    stratumGrid: [0.005, 0.007937, 0.012599, 0.02, 0.031748, 0.050397, 0.08],
    holdRotations: 0.25, // short holds/releases at the V5 seed (declared)
    // The Row 7 rail pump (Section 60 seed row; packet constant). The in-build
    // gate re-derives railPumpM each run — the report cross-checks both.
    pumpDeclared: 0.2274,
    railResidenceBand: 0.02, // |beta_M - 1| <= band counts as rail residence
    marginalTarget: 1.0, // absorbed pump fraction at the marginal stratum
    // Regulator-honesty witnesses (the two Row 7 flagged channels). The
    // marginal cell is CLEAN only if both hold; otherwise the map books the
    // scoped negative (no clean marginal stratum at this booking).
    witnessSpreadClean: 0.02, // max quadrature witness relative spread (0.01 artifact was 7.3%)
    dtHalvingClean: 0.10, // max relative change of absorbed fraction under dt/2
    // Impulse-resolved follow-up instrument (spec Sections 62/63 by title; the
    // dt-converged escapement booking). NOT a candidate row: no release, no
    // re-release. Two blocks:
    //  - impulseSpanExtension: the re-map span extends past the Row 8 declared
    //    grid to the Section 62 receding-crossing probe scale (log-midpoint +
    //    0.112 itself), so the converged booking answers "does the crossing
    //    relocate into the physical range" on one map.
    //  - dt-halving cleanliness applies to BOTH the absorbed fraction and the
    //    mean per-click impulse (the Section 62 durable positive: per-click
    //    impulse calibration is the binding constraint, not click count).
    impulseSpanExtension: [0.094657, 0.112], // log-mid(0.08, 0.112), 0.112
    // Escapement-under-tilt projection (Section 63 composition target): the
    // click channel's tilt-sector torque response dT_x/d(etaDot_x) on the
    // MIDDLE layer, prescribed-worldline family (zero tilt, constant tilt
    // rate at readout — the gyroscopicTiltAnalysisFull family), impulse-
    // resolved same-source booking only (aFrozen = 0 isolates the click
    // channel; partner channels already live in the measured K and D blocks).
    // Units match the completed pencil: kappa-scaled layer torque (both
    // middle sites summed) per unit tilt rate; compare |diagonal| against
    // dStarIsotropic. Readout base time is declared so the same-source chart
    // delay cap (2.0) never reads the untilted held prehistory.
    tiltProjection: {
      etaDot: 0.02, // Section 63 rate step (central difference +-etaDot)
      etaDotWitness: 0.01, // linearity witness (rate step halved)
      readouts: 8, // cycle samples (Section 61/63 convention Nt=8/16)
      readoutsWitness: 16,
      tReadBase: 2.5, // > chart same-source delay cap 2.0 (declared above)
      dStarIsotropic: 1.02, // Section 63 absorber requirement (comparison anchor)
    },
    // Claim-contract verdict channels (separable clocks):
    flutterClockDeg: 10, // flutter clock = first crossing of this nutation angle
    // h_act row: kinematic click bound N_click ~ 2 pi c1 beta ~ 18 beta per
    // rotation near the ceiling (spec Sections 2.5/8 by title).
    clickBoundPerRotation: 18,
  },
  chart: {
    enabled: false,
    foldJacobianThreshold: 0.02, // |D_s| below this = fold-flagged, event-integrate
    windowMinDelay: 0.002, // same-source window emission-delay floor (the accepted
    // brake-measurement convention, self-hit-brake-central-measurement.mjs)
    maxClickRows: 60, // detailed click rows retained (aggregates always kept)
    // Impulse-resolved click integration (spec Section 62 route (a) / Section 63
    // composition; the dt-converged escapement booking). The per-step uniform
    // substep trapezoid is REPLACED: click events (same-source root-count
    // transitions = fold crossings) are located inside the window by bisection
    // on the production root count, the window is partitioned at the event
    // times, and each subinterval is integrated by Gauss-Legendre under a
    // smoothstep grading map tau = a + (b-a)(3s^2 - 2s^3) whose vanishing
    // endpoint derivative absorbs the integrable inverse-square-root fold
    // singularity at either endpoint. All samples remain production
    // solveDirectedRelation roots (no parallel booking path). Declared
    // regulator-honesty conventions, not physics knobs:
    // The window booking is a stiff ODE dv' = F(tau, dv): near the rail the
    // fold factor 1/D_s ~ 1/(beta - 1) amplifies the booked impulse back into
    // itself, and the integrand carries integrable |tau - tau*|^(-1/2) fold
    // singularities plus root-count jump discontinuities (click events) and
    // solver-tolerance tangency slivers. The impulse-resolved booking is an
    // adaptive embedded Euler/trapezoid pair with error control on the booked
    // impulse per step; root-count transitions are localized by step
    // rejection down to the declared event floor and CROSSED by a floor-width
    // Euler micro-step (the declared sub-floor truncation of the one-sided
    // sqrt tail); slivers below the event floor book their (vanishing)
    // resolved weight or are truncated identically. Witness reruns tighten
    // both tolerances by the declared factor; a cell whose witness exceeds
    // the clean threshold books DIRTY (fail-closed), the Row 8 protocol.
    impulse: {
      initialStepFraction: 1 / 64, // first trial step h0 = dt/64
      maxStepFraction: 1 / 8, // step growth cap h <= dt/8
      atol: 1e-7, // absolute impulse tolerance per accepted step
      rtol: 3e-4, // relative tolerance vs the window impulse booked so far
      eventFloorFraction: 1e-7, // event-time localization floor (of dt)
      stepMinFraction: 1e-9, // hard step floor inside singular approaches
      maxEvalsPerWindow: 40000, // guard; beyond -> window flagged unconverged
      witnessTolFactor: 1 / 8, // witness rerun tolerance tightening
      // Tangency guard: inside |D_s| < dsGuard the pointwise solver rows are
      // noise-dominated (the reported D_s of a near-tangent root carries the
      // root-position uncertainty, so 1/D_s is unbounded numerical noise, not
      // physics — measured on the release-instant poised window, where the
      // refined uniform ladder converges to ~0 while naive event-resolved
      // sampling diverges). The booking therefore reads the same-source row
      // as the unsoftened density-of-states m = D_T/D_s OUTSIDE the guard
      // and as the guard-regularized m = D_T D_s/(D_s^2 + g^2) INSIDE it.
      // g is a DECLARED REGULATOR with its own halving witness: witness
      // reruns tighten the tolerances AND halve g, so guard dependence is
      // measured per cell, never assumed away. g << the canonical soft 0.02.
      dsGuard: 2e-3,
      witnessGuardFactor: 0.5, // witness rerun guard halving
    },
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
  // seaSite.position is the endpoint at epoch 0; seaSite.velocity (optional) is
  // a uniform co-drift velocity carried on the existing centerVelocity surface.
  // Absent velocity => static (Rows 5/6 regress exactly).
  const v = seaSite.velocity ?? [0, 0, 0];
  return {
    centerAtEpoch: { x: seaSite.position[0], y: seaSite.position[1], z: seaSite.position[2] },
    centerVelocity: { x: v[0], y: v[1], z: v[2] },
    radiusU: { x: 0, y: 0, z: 0 },
    radiusV: { x: 0, y: 0, z: 0 },
    angularVelocity: 0,
    phaseAtEpoch: 0,
    epochTime: 0,
  };
}

// Held or co-drifting environment source: the causal root sits near t_e = t_H -
// |x_r - s(t_H)|/c_f; a narrow production window around it suffices. For a
// co-drifting endpoint the position at t_H is base + velocity * t_H, and the
// production solver carries the motion through centerVelocity (staticSeaSourceModel).
export function seaWakeContribution({ seaSites, xi, vi, receiverPol, tH }) {
  const soft = DECLARED.soft;
  const rc2 = DECLARED.coincidenceStratum * DECLARED.coincidenceStratum;
  const a = [0, 0, 0];
  let netRadial = 0;
  for (const sea of seaSites) {
    const vel = sea.velocity ?? [0, 0, 0];
    const posH = [
      sea.position[0] + vel[0] * tH,
      sea.position[1] + vel[1] * tH,
      sea.position[2] + vel[2] * tH,
    ];
    const dist = Math.hypot(xi[0] - posH[0], xi[1] - posH[1], xi[2] - posH[2]);
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

// Rotation matrix (Rodrigues) taking +z to the unit vector d. For d = +z it is
// the identity; used to orient the octahedral cage so its polar axis is d_hat.
function rotZtoD(d) {
  const z = [0, 0, 1];
  const c = z[0] * d[0] + z[1] * d[1] + z[2] * d[2]; // cos angle
  const ax = [z[1] * d[2] - z[2] * d[1], z[2] * d[0] - z[0] * d[2], z[0] * d[1] - z[1] * d[0]];
  const s = Math.hypot(ax[0], ax[1], ax[2]);
  if (s < 1e-12) {
    // parallel (d = +z) or antiparallel (d = -z)
    return c > 0
      ? [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
      : [[1, 0, 0], [0, 1, 0], [0, 0, -1]];
  }
  const k = [ax[0] / s, ax[1] / s, ax[2] / s];
  const K = [[0, -k[2], k[1]], [k[2], 0, -k[0]], [-k[1], k[0], 0]];
  const R = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      let kk = 0;
      for (let m = 0; m < 3; m += 1) kk += K[i][m] * K[m][j];
      R[i][j] = (i === j ? 1 : 0) + s * K[i][j] + (1 - c) * kk;
    }
  }
  return R;
}
function matVec(R, v) {
  return [
    R[0][0] * v[0] + R[0][1] * v[1] + R[0][2] * v[2],
    R[1][0] * v[0] + R[1][1] * v[1] + R[1][2] * v[2],
    R[2][0] * v[0] + R[2][1] * v[1] + R[2][2] * v[2],
  ];
}

// Co-drifting octahedral cage (the structured-sea AXIS absorber). Same six-site
// Row-6 cage (two polar, four equatorial at radius DECLARED.coDriftCage.spacing,
// frozen antipodal unit-polarity pairs) but (a) rotated so the polar pair is
// along the drift direction d_hat (leading/trailing the drift), and (b) each
// endpoint carries velocity = the braid drift vector so the whole cage co-moves
// with the drifting braid. Orientations are the in-build slow-limit frozen
// pHats (same convention as Row 6). Endpoints are booked through the SAME
// production-solver path (seaWakeContribution) with the co-drift centerVelocity.
// Cage direction set in the cage frame (polar along +-z -> +-d_hat after
// rotation). "octahedral" keeps the exact Row-6 4-fold equatorial set (+-x,+-y)
// so the full-cage run regresses; "polarPairOnly" drops the equatorial sites
// (axisymmetric); "ring6"/"ring8" replace the 4-fold set with an N-fold ring.
function cageDirections(geometry) {
  const polar = [
    { dir: [0, 0, 1], cls: "polar" },
    { dir: [0, 0, -1], cls: "polar" },
  ];
  if (geometry === "polarPairOnly") return polar;
  if (geometry === "octahedral") {
    return [
      ...polar,
      { dir: [1, 0, 0], cls: "equatorial" },
      { dir: [-1, 0, 0], cls: "equatorial" },
      { dir: [0, 1, 0], cls: "equatorial" },
      { dir: [0, -1, 0], cls: "equatorial" },
    ];
  }
  const nEq = geometry === "ring8" ? 8 : geometry === "ring6" ? 6 : 4;
  const eq = [];
  for (let k = 0; k < nEq; k += 1) {
    const phi = (k * TWO_PI) / nEq;
    eq.push({ dir: [Math.cos(phi), Math.sin(phi), 0], cls: "equatorial" });
  }
  return [...polar, ...eq];
}

export function buildCoDriftCage(sites, nt = DECLARED.coDriftCage.ntOrientation) {
  const a = DECLARED.coDriftCage.spacing;
  const p0 = braidAxialDipole(sites);
  const period = TWO_PI / DECLARED.omega;
  const drift = driftVector();
  const dmag = Math.hypot(drift[0], drift[1], drift[2]);
  // A co-drift cage is only defined with drift; at u = 0 there is no cage (the
  // u = 0 reference cell stays bare, so the axial/rest regressions are clean).
  if (dmag < 1e-12) return null;
  const dHat = [drift[0] / dmag, drift[1] / dmag, drift[2] / dmag];
  const R = rotZtoD(dHat);
  const geometry = DECLARED.coDriftCage.geometry ?? "octahedral";
  const cageFrameDirs = cageDirections(geometry);
  const shell = [];
  const endpoints = [];
  for (let k = 0; k < cageFrameDirs.length; k += 1) {
    const dirLab = matVec(R, cageFrameDirs[k].dir); // rotate into the lab (polar -> d_hat)
    const center = [dirLab[0] * a, dirLab[1] * a, dirLab[2] * a];
    // slow-limit orientation: unit(cycle-averaged bare retarded braid field) at
    // the cage center, exact per-source retardation on the (drifting) held
    // worldlines, averaged over nt phases, then frozen (Row 6 convention).
    const acc = [0, 0, 0];
    for (let q = 0; q < nt; q += 1) {
      const E = braidRetardedFieldAt(center, sites, null, (q / nt) * period);
      acc[0] += E[0];
      acc[1] += E[1];
      acc[2] += E[2];
    }
    const pHat = unit3(acc);
    const siteClass = cageFrameDirs[k].cls;
    shell.push({ id: `codrift:${k}`, center, pHat, siteClass });
    for (const pm of [+1, -1]) {
      endpoints.push({
        id: `codrift:${k}:${pm > 0 ? "+" : "-"}`,
        position: [
          center[0] + pm * (p0 / 2) * pHat[0],
          center[1] + pm * (p0 / 2) * pHat[1],
          center[2] + pm * (p0 / 2) * pHat[2],
        ],
        velocity: drift.slice(), // co-drift on the centerVelocity surface
        pol: pm,
        shellIndex: k,
        siteClass,
      });
    }
  }
  return { shell, endpoints, p0, spacing: a, ntUsed: nt, placement: `coDrift_${geometry}`, geometry, driftHat: dHat, coDrift: true };
}

// Co-drift cage coherence row (measurement 3). At each shell site (co-moving
// center at t) the antipodal pair would feel the braid's live retarded field:
// netForce = sum_pm pm * E(endpoint(t)). Reported as the mean/max net pair
// force magnitude per unit kappa and the polar/equatorial split — bounded ⇒ the
// cage can co-move coherently; growing ⇒ it would disperse. The −0.641 polar
// reciprocity pull (Row 6, Section 55) is the held-static reference.
export function coDriftCageCoherenceRow(cage, sites, histories, t, kappa) {
  const drift = driftVector();
  let sumF = 0;
  let maxF = 0;
  let polarF = 0;
  let polarN = 0;
  let eqF = 0;
  let eqN = 0;
  for (const site of cage.shell) {
    const c = [
      site.center[0] + drift[0] * t,
      site.center[1] + drift[1] * t,
      site.center[2] + drift[2] * t,
    ];
    const F = [0, 0, 0];
    for (const pm of [+1, -1]) {
      const X = [
        c[0] + pm * (cage.p0 / 2) * site.pHat[0],
        c[1] + pm * (cage.p0 / 2) * site.pHat[1],
        c[2] + pm * (cage.p0 / 2) * site.pHat[2],
      ];
      const E = braidRetardedFieldAt(X, sites, histories, t);
      F[0] += pm * E[0];
      F[1] += pm * E[1];
      F[2] += pm * E[2];
    }
    const mag = kappa * Math.hypot(F[0], F[1], F[2]);
    sumF += mag;
    if (mag > maxF) maxF = mag;
    if (site.siteClass === "polar") { polarF += mag; polarN += 1; }
    else { eqF += mag; eqN += 1; }
  }
  return {
    meanNetPairForce: sumF / cage.shell.length,
    maxNetPairForce: maxF,
    polarMeanNetPairForce: polarN ? polarF / polarN : null,
    equatorialMeanNetPairForce: eqN ? eqF / eqN : null,
    heldStaticPolarReciprocityReference: -0.641,
  };
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
  // Orient the spin-axis unit vector into the +z hemisphere (sign of the
  // rotation vector is a convention; the physical axis is the line).
  const s = w[2] >= 0 ? 1 : -1;
  const axisUnit = [(s * w[0]) / n, (s * w[1]) / n, (s * w[2]) / n];
  return {
    axisTiltDeg: (Math.acos(Math.max(-1, Math.min(1, w[2] / n))) * 180) / Math.PI,
    axisAzimuthDeg: (Math.atan2(w[1], w[0]) * 180) / Math.PI,
    omegaFit: n,
    axisUnit,
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

// The uniform drift 3-vector: magnitude u = axialDrift, direction at angle
// driftAngle theta from the spin axis (+z), in the x-z plane. At theta = 0 this
// is [0, 0, u] (pure axial), so every axial-drift path regresses exactly.
export function driftVector() {
  const u = DECLARED.axialDrift ?? 0;
  const th = DECLARED.driftAngle ?? 0;
  return [u * Math.sin(th), 0, u * Math.cos(th)];
}

export function heldSourceModel(site) {
  // Touch point 3: the held source drifts uniformly at the drift 3-vector
  // through the existing centerVelocity surface. centerAtEpoch stays the rest
  // center and epochTime = 0, so the source center is x0 + driftVec * t,
  // consistent with rigidPosition/rigidVelocity (touch point 2). At u = 0 (and
  // for any theta at u = 0) this is the rest source model exactly.
  const d = driftVector();
  return {
    centerAtEpoch: { x: 0, y: 0, z: site.z0 },
    centerVelocity: { x: d[0], y: d[1], z: d[2] },
    radiusU: { x: site.rho, y: 0, z: 0 },
    radiusV: { x: 0, y: site.rho, z: 0 },
    angularVelocity: site.omegaHeld ?? DECLARED.omega,
    angularAcceleration: 0,
    phaseAtEpoch: site.phase,
    epochTime: 0,
  };
}

export function rigidPosition(site, t) {
  // Touch point 2: the held/seed worldline drifts uniformly at the drift
  // 3-vector (axial screw at theta = 0, oblique at theta > 0).
  const w = site.omegaHeld ?? DECLARED.omega;
  const a = w * t + site.phase;
  const d = driftVector();
  return [
    site.rho * Math.cos(a) + d[0] * t,
    site.rho * Math.sin(a) + d[1] * t,
    site.z0 + d[2] * t,
  ];
}

export function rigidVelocity(site, t) {
  // Touch point 2: uniform drift rides the receiver-velocity and seed-velocity
  // surfaces (circular transverse motion + the uniform drift 3-vector).
  const w = site.omegaHeld ?? DECLARED.omega;
  const a = w * t + site.phase;
  const v = site.rho * w;
  const d = driftVector();
  return [-v * Math.sin(a) + d[0], v * Math.cos(a) + d[1], d[2]];
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
// Chart-clean same-source booking (spec Sections 2/3.1/3.3), IMPULSE-RESOLVED
// (spec Sections 62/63 by title — the dt-converged escapement booking): the
// same-source channel over one base step, reading the production row's signed
// branch orientation unsoftened (density-of-states integral) with the declared
// d0 stratum in the force denominator. The booking is treated as the window
// ODE dv' = F(tau, dv) it actually is (the fold factor 1/D_s ~ 1/(beta - 1)
// feeds the booked impulse back into the integrand near the rail): an
// adaptive embedded Euler/trapezoid pair with per-step error control on the
// booked impulse. Click events (production root-count transitions = fold
// crossings) are localized by step rejection down to the declared event
// floor and crossed by a floor-width Euler micro-step; per-event impulses
// are attributed by the declared region convention (edge regions to their
// single bounding event; interior regions split equally between their two
// bounding events). Every integrand sample is a production
// solveDirectedRelation root row — no parallel booking path. Returns the
// booked velocity increment plus the chart quantities for the click row.
// ---------------------------------------------------------------------------
export function chartWindowIntegrate({
  histories,
  sites, // eslint-disable-line no-unused-vars -- call-signature stability
  i,
  t0,
  dt,
  x0,
  v0,
  aFrozen, // non-chart acceleration (partner channels), frozen over the step
  kappa,
  atol = DECLARED.chart.impulse.atol,
  rtol = DECLARED.chart.impulse.rtol,
  dsGuard = DECLARED.chart.impulse.dsGuard,
}) {
  const rc2 = DECLARED.coincidenceStratum * DECLARED.coincidenceStratum;
  const dv = [0, 0, 0];
  let minChord = Infinity;
  let mu = 0; // unfolding parameter, mu-dot = D_T (fold-branch diagnostic)
  let prevDtSample = null;
  let prevMuTau = null;
  const dsSamples = [];
  let evals = 0;
  // Progressive receiver state: dv is frozen over each trial step and
  // re-frozen at every accepted step; xCur is the receiver position at the
  // committed frontier tauCommitted under the piecewise-frozen dv.
  let tauCommitted = 0;
  let xCur = x0.slice();

  // One integrand sample at window offset tau >= tauCommitted, receiver
  // advanced from the committed state under the frozen dv + partner channels.
  const sample = (tau, wantDiagnostics) => {
    const tK = t0 + tau;
    const da = tau - tauCommitted;
    const xK = [
      xCur[0] + (v0[0] + dv[0]) * da + 0.5 * aFrozen[0] * (tau * tau - tauCommitted * tauCommitted),
      xCur[1] + (v0[1] + dv[1]) * da + 0.5 * aFrozen[1] * (tau * tau - tauCommitted * tauCommitted),
      xCur[2] + (v0[2] + dv[2]) * da + 0.5 * aFrozen[2] * (tau * tau - tauCommitted * tauCommitted),
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
    const integrand = [0, 0, 0];
    let foldBranch = null; // min-|D_s| root this sample (the fold-near branch)
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
      if (!Number.isFinite(Ds)) continue;
      // unsoftened density-of-states outside the tangency guard, guard-
      // regularized inside it (declared regulator; halved in witness reruns)
      const m = (Dt * Ds) / (Ds * Ds + dsGuard * dsGuard);
      const w = (kappa * m) / (r * r + rc2); // sigma_self = +1
      integrand[0] += w * dir[0];
      integrand[1] += w * dir[1];
      integrand[2] += w * dir[2];
      if (wantDiagnostics) minChord = Math.min(minChord, r);
      if (!foldBranch || Math.abs(Ds) < Math.abs(foldBranch.Ds)) foldBranch = { Ds, Dt };
    }
    if (wantDiagnostics) {
      if (foldBranch) {
        if (prevDtSample !== null && prevMuTau !== null) {
          mu += 0.5 * (foldBranch.Dt + prevDtSample) * (tau - prevMuTau);
        }
        dsSamples.push({ mu, Ds: foldBranch.Ds, Dt: foldBranch.Dt });
        prevDtSample = foldBranch.Dt;
        prevMuTau = tau;
      } else {
        prevDtSample = null;
        prevMuTau = null;
      }
    }
    evals += 1;
    return { integrand, rootCount: roots.length };
  };

  // Commit an accepted step [tauCommitted, b] with impulse seg: advance the
  // receiver position under the pre-commit frozen dv, then re-freeze.
  let committedSegments = 0;
  const commit = (b, seg, regionImpulse) => {
    const a = tauCommitted;
    const da = b - a;
    xCur = [
      xCur[0] + (v0[0] + dv[0]) * da + 0.5 * aFrozen[0] * (b * b - a * a),
      xCur[1] + (v0[1] + dv[1]) * da + 0.5 * aFrozen[1] * (b * b - a * a),
      xCur[2] + (v0[2] + dv[2]) * da + 0.5 * aFrozen[2] * (b * b - a * a),
    ];
    tauCommitted = b;
    for (let c = 0; c < 3; c += 1) {
      dv[c] += seg[c];
      regionImpulse[c] += seg[c];
    }
    committedSegments += 1;
  };

  // Region-to-event impulse attribution (declared convention).
  const events = [];
  let prevEvent = null;
  let pendingRegion = [0, 0, 0];
  const closeRegion = (nextEvent) => {
    if (prevEvent && nextEvent) {
      for (let c = 0; c < 3; c += 1) {
        prevEvent.impulse[c] += 0.5 * pendingRegion[c];
        nextEvent.impulse[c] += 0.5 * pendingRegion[c];
      }
    } else if (prevEvent || nextEvent) {
      const ev = prevEvent ?? nextEvent;
      for (let c = 0; c < 3; c += 1) ev.impulse[c] += pendingRegion[c];
    }
    pendingRegion = [0, 0, 0];
  };

  // Adaptive embedded Euler/trapezoid walk with event localization.
  const P = DECLARED.chart.impulse;
  const hMax = dt * P.maxStepFraction;
  const hEventFloor = dt * P.eventFloorFraction;
  const hMin = dt * P.stepMinFraction;
  let h = dt * P.initialStepFraction;
  let F0 = sample(0, true);
  let unconverged = false;
  while (tauCommitted < dt - 1e-15) {
    if (evals > P.maxEvalsPerWindow) {
      unconverged = true;
      // book the remainder in one frozen Euler stretch (flagged, witness-visible)
      const rem = dt - tauCommitted;
      commit(dt, F0.integrand.map((c) => c * rem), pendingRegion);
      break;
    }
    h = Math.min(h, dt - tauCommitted);
    const tauB = tauCommitted + h;
    const F1 = sample(tauB, true);
    if (F1.rootCount !== F0.rootCount) {
      if (h > hEventFloor) {
        h = 0.5 * h; // localize the event by rejection
        continue;
      }
      // cross the event with a floor-width Euler micro-step (the declared
      // sub-floor truncation of the one-sided sqrt tail)
      commit(tauB, F0.integrand.map((c) => c * h), pendingRegion);
      const ev = {
        tau: tauB,
        rootCountBefore: F0.rootCount,
        rootCountAfter: F1.rootCount,
        kind: F1.rootCount > F0.rootCount ? "root_birth" : "root_death",
        impulse: [0, 0, 0],
      };
      closeRegion(ev);
      events.push(ev);
      prevEvent = ev;
      F0 = F1;
      h = dt * P.initialStepFraction;
      continue;
    }
    const segEuler = F0.integrand.map((c) => c * h);
    const segTrap = F0.integrand.map((c, k) => 0.5 * h * (c + F1.integrand[k]));
    const err = Math.hypot(
      segTrap[0] - segEuler[0],
      segTrap[1] - segEuler[1],
      segTrap[2] - segEuler[2]
    );
    const tolStep = Math.max(atol, rtol * Math.hypot(...dv));
    if (err > tolStep && h > hMin) {
      h = Math.max(0.5 * h, hMin);
      continue;
    }
    commit(tauB, segTrap, pendingRegion);
    // re-freeze: resample the frontier under the committed dv when the step
    // moved the receiver appreciably; reuse F1 otherwise
    F0 = Math.hypot(...segTrap) > 0.1 * tolStep ? sample(tauCommitted, true) : F1;
    h = Math.min(hMax, h * (err < 0.25 * tolStep ? 2 : 1.2));
  }
  closeRegion(null);
  const rootCountAtEnd = F0.rootCount;

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
    clickEvents: events.map((e) => ({
      tau: e.tau,
      time: t0 + e.tau,
      kind: e.kind,
      rootCountBefore: e.rootCountBefore,
      rootCountAfter: e.rootCountAfter,
      impulse: e.impulse,
    })),
    quadrature: {
      scheme: "adaptive_embedded_euler_trapezoid_event_localized_guarded",
      atol,
      rtol,
      dsGuard,
      committedSegments,
      evals,
      unconverged,
    },
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
// ---------------------------------------------------------------------------
// Envelope readback (instrument touch point 5). Measures the spindle braid's
// envelope semiaxes under axial drift from the RELAXED states (native free
// tilt), all definitions matching canon
// (content/markdown/aaa/archie/mathematics-terminology.md: xi == R_parallel /
// R_perp, lambda == R_perp / R_perp,0).
//
// The whole braid translates along +z at u, so tilt and axial extent are
// measured about the co-moving braid center zCenter = mean_site z (which is
// u t at the seed and tracks the drift after release). Per layer a: R_a =
// mean pair radius about the center, alpha_a = mean |tilt| = mean |atan2(z -
// zCenter, rho)| of its two sites; then R_parallel = max_a |R_a sin alpha_a|,
// R_perp = max_a R_a cos alpha_a, xi = R_parallel / R_perp, alongside
// 1/gamma = sqrt(1 - u^2). lambda = R_perp / R_perp(u=0) is filled by the
// sweep (needs the u=0 reference); an optional RperpRef supplies it in-record.
// ---------------------------------------------------------------------------
export function envelopeReadback(states, u = DECLARED.axialDrift ?? 0, RperpRef = null) {
  const n = states.length;
  let zCenter = 0;
  for (const st of states) zCenter += st.x[2];
  zCenter /= n;
  const perLayer = {};
  const layers = DECLARED.layers;
  for (let k = 0; k < layers.length; k += 1) {
    const name = layers[k].name;
    const pair = [states[2 * k], states[2 * k + 1]];
    let R = 0;
    let alpha = 0;
    for (const st of pair) {
      const rho = Math.hypot(st.x[0], st.x[1]);
      const zRel = st.x[2] - zCenter;
      R += Math.hypot(rho, zRel) / 2;
      alpha += Math.abs(Math.atan2(zRel, rho)) / 2;
    }
    perLayer[name] = {
      R,
      alphaDeg: (alpha * 180) / Math.PI,
      Rpar: Math.abs(R * Math.sin(alpha)),
      Rperp: R * Math.cos(alpha),
    };
  }
  const rows = Object.values(perLayer);
  const Rpar = Math.max(...rows.map((l) => l.Rpar));
  const Rperp = Math.max(...rows.map((l) => l.Rperp));
  const RparLayer = Object.keys(perLayer).find((k) => perLayer[k].Rpar === Rpar);
  const RperpLayer = Object.keys(perLayer).find((k) => perLayer[k].Rperp === Rperp);
  const xi = Rperp > 1e-12 ? Rpar / Rperp : null;
  const oneOverGamma = Math.sqrt(Math.max(0, 1 - u * u));
  return {
    u,
    zCenter,
    perLayer,
    Rpar,
    Rperp,
    RparLayer,
    RperpLayer,
    xi,
    oneOverGamma,
    lambda: RperpRef && RperpRef > 1e-12 ? Rperp / RperpRef : null,
  };
}

// 2x2 symmetric-eigen helper for the transverse shape block.
function eig2(qxx, qyy, qxy) {
  const tr = qxx + qyy;
  const det = qxx * qyy - qxy * qxy;
  const disc = Math.sqrt(Math.max(0, (tr / 2) * (tr / 2) - det));
  const l1 = tr / 2 + disc;
  const l2 = tr / 2 - disc;
  const anisotropy = l1 + l2 > 1e-12 ? (l1 - l2) / (l1 + l2) : 0;
  return { major: l1, minor: l2, anisotropy };
}

// Orthonormal basis {e1, e2} spanning the plane perpendicular to a unit normal.
// For normalHat = z-hat this returns {x-hat, y-hat} exactly (so the axial-drift
// lab-frame block is unchanged). Used to read the transverse shape block in the
// DRIFT frame for oblique drift.
function perpBasis(normalHat) {
  const n = normalHat;
  const a = Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  const adotn = a[0] * n[0] + a[1] * n[1] + a[2] * n[2];
  let e1 = [a[0] - adotn * n[0], a[1] - adotn * n[1], a[2] - adotn * n[2]];
  const m = Math.hypot(e1[0], e1[1], e1[2]) || 1;
  e1 = [e1[0] / m, e1[1] / m, e1[2] / m];
  const e2 = [
    n[1] * e1[2] - n[2] * e1[1],
    n[2] * e1[0] - n[0] * e1[2],
    n[0] * e1[1] - n[1] * e1[0],
  ];
  return { e1, e2 };
}

// Cycle-averaged transverse shape tensor block (instrument touch point 5, the
// sigma = 0 corollary channel). q_ab = < x_a x_b > about the COM, projected
// onto the plane perpendicular to normalHat (default +z = the axial-drift lab
// frame), averaged over the 6 constituents AND over one cadence period ending
// at tCenter (retained-history samples). The full 2x2 block [[q11, q12],[q12,
// q22]] is recorded (not only its max); its two eigenvalues are q_perp1 >=
// q_perp2 and sigma = (q_perp1 - q_perp2)/(q_perp1 + q_perp2) is the transverse
// shape anisotropy (the S3 shear residual). For a single-axis drift measured in
// the DRIFT frame the block is isotropic by residual axisymmetry (sigma -> 0);
// Corollary 1 is the claim that a two-axis (oblique) composed state relaxes to
// that isotropy as the spin axis realigns with the drift.
export function transverseShapeTensorBlock(histories, tCenter, period, normalHat = [0, 0, 1]) {
  const dt = DECLARED.timeStep;
  const kEnd = Math.max(0, Math.round(tCenter / dt));
  const kLo = Math.max(0, kEnd - Math.round(period / dt));
  const { e1, e2 } = perpBasis(normalHat);
  let q11 = 0;
  let q22 = 0;
  let q12 = 0;
  let samples = 0;
  const kTop = Math.min(kEnd, histories[0].xs.length - 1);
  for (let k = kLo; k <= kTop; k += 1) {
    // full 3D COM (drifts in x and z under oblique drift), subtracted per sample
    const c = [0, 0, 0];
    for (let i = 0; i < histories.length; i += 1) {
      c[0] += histories[i].xs[k][0];
      c[1] += histories[i].xs[k][1];
      c[2] += histories[i].xs[k][2];
    }
    c[0] /= histories.length;
    c[1] /= histories.length;
    c[2] /= histories.length;
    let s11 = 0;
    let s22 = 0;
    let s12 = 0;
    for (let i = 0; i < histories.length; i += 1) {
      const rx = histories[i].xs[k][0] - c[0];
      const ry = histories[i].xs[k][1] - c[1];
      const rz = histories[i].xs[k][2] - c[2];
      const p1 = rx * e1[0] + ry * e1[1] + rz * e1[2];
      const p2 = rx * e2[0] + ry * e2[1] + rz * e2[2];
      s11 += p1 * p1;
      s22 += p2 * p2;
      s12 += p1 * p2;
    }
    q11 += s11 / histories.length;
    q22 += s22 / histories.length;
    q12 += s12 / histories.length;
    samples += 1;
  }
  if (samples === 0) return null;
  q11 /= samples;
  q22 /= samples;
  q12 /= samples;
  const e = eig2(q11, q22, q12);
  return {
    block: [[q11, q12], [q12, q22]],
    trace: q11 + q22,
    qPerp1: e.major,
    qPerp2: e.minor,
    sigma: e.anisotropy, // (q_perp1 - q_perp2)/(q_perp1 + q_perp2)
    ...e,
    frameNormal: normalHat,
    samples,
    windowRotations: (kTop - kLo) * dt / TWO_PI,
  };
}

// Constituent bidirectional-wake phase offsets (instrument touch point 5, the
// S_asm synchrony-selection corollary). For each layer's antipodal pair the
// one-way causal leg from + -> - and - -> + differ under drift (fore-aft
// anisotropy of the simultaneity tilt t' = t - (v/c_f^2) x_parallel). The half
// difference of the primary (most recent) causal-leg delays is the constituent
// phase offset read directly from the native root machinery. At u = 0 the two
// legs are symmetric so the offset is ~0.
export function constituentPhaseOffsets(histories, sites, states, t) {
  const primaryDelay = (i, j) => {
    const res = solveDirectedRelation({
      histories,
      i,
      j,
      tH: t,
      xi: states[i].x,
      vi: states[i].v,
      sameSource: false,
    });
    if (!res.roots || res.roots.length === 0) return null;
    const root = res.roots[res.roots.length - 1]; // largest emissionTime = most recent
    return t - root.emissionTime;
  };
  const out = {};
  const layers = DECLARED.layers;
  for (let k = 0; k < layers.length; k += 1) {
    const iPlus = 2 * k;
    const iMinus = 2 * k + 1;
    const dForward = primaryDelay(iPlus, iMinus); // + reads -
    const dBack = primaryDelay(iMinus, iPlus); // - reads +
    out[layers[k].name] =
      dForward != null && dBack != null
        ? {
            legForward: dForward,
            legBackward: dBack,
            halfDifference: 0.5 * (dForward - dBack),
          }
        : null;
  }
  return out;
}

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
  // Row 5/6 frozen environment (held-static) OR the co-drifting octahedral cage
  // (the axis absorber): both are deterministic from the declared config, so
  // rebuilding on resume reproduces them exactly. The co-drift cage overrides
  // the tabled static-pair sea when enabled (they are mutually exclusive).
  const staticPairSea = DECLARED.coDriftCage.enabled
    ? buildCoDriftCage(sites)
    : buildStaticPairSeaSites(sites);
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
      totalClickEvents: 0,
      perClickTangentialImpulseSum: 0,
      perClickTangentialImpulseSumSq: 0,
      rows: [],
    };
    chartLedger.totalClickEvents ??= 0;
    chartLedger.perClickTangentialImpulseSum ??= 0;
    chartLedger.perClickTangentialImpulseSumSq ??= 0;
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
      totalClickEvents: 0,
      perClickTangentialImpulseSum: 0,
      perClickTangentialImpulseSumSq: 0,
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
      // impulse-resolved per-click booking (Sections 62/63 follow-up): every
      // located event books its attributed impulse; the tangential projection
      // uses the receiver's window-start direction (declared convention).
      for (const ev of booking.clickEvents ?? []) {
        const evTan =
          ev.impulse[0] * tHat[0] + ev.impulse[1] * tHat[1] + ev.impulse[2] * tHat[2];
        chartLedger.totalClickEvents += 1;
        chartLedger.perClickTangentialImpulseSum += evTan;
        chartLedger.perClickTangentialImpulseSumSq += evTan * evTan;
      }
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
              atol: DECLARED.chart.impulse.atol * DECLARED.chart.impulse.witnessTolFactor,
              rtol: DECLARED.chart.impulse.rtol * DECLARED.chart.impulse.witnessTolFactor,
              dsGuard: DECLARED.chart.impulse.dsGuard * DECLARED.chart.impulse.witnessGuardFactor,
            });
            const base = Math.hypot(...booking.dv);
            witness = {
              quadratureBase: {
                atol: DECLARED.chart.impulse.atol,
                rtol: DECLARED.chart.impulse.rtol,
                dsGuard: DECLARED.chart.impulse.dsGuard,
              },
              quadratureWitness: {
                atol: DECLARED.chart.impulse.atol * DECLARED.chart.impulse.witnessTolFactor,
                rtol: DECLARED.chart.impulse.rtol * DECLARED.chart.impulse.witnessTolFactor,
                dsGuard: DECLARED.chart.impulse.dsGuard * DECLARED.chart.impulse.witnessGuardFactor,
              },
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
            clickEvents: booking.clickEvents ?? [],
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
        // Native axial-drift envelope readback (instrument touch point 5). The
        // semiaxes (R_parallel, R_perp, xi), 1/gamma, the cycle-averaged
        // transverse shape block (sigma channel), and the constituent phase
        // offsets (S_asm channel). lambda is filled by the sweep against the
        // u=0 reference. Present at every drift; at u=0 these read the rest
        // envelope (xi(0) ~ 0.707, the caveat-1 reference).
        envelope: envelopeReadback(states, DECLARED.axialDrift ?? 0),
        transverseShape: transverseShapeTensorBlock(histories, t, TWO_PI / DECLARED.omega),
        phaseOffsets: constituentPhaseOffsets(histories, sites, states, t),
        // Oblique-drift readback (Corollary 1 sigma test). The spin-axis unit
        // vector n_hat(t) (from the least-squares rotation axis), the transverse
        // shape anisotropy sigma in the DRIFT frame, and the angle between the
        // spin axis and the drift direction (initially theta; -> 0 if the axis
        // realigns). Null when there is no drift (u = 0) or the drift is purely
        // axial in the readout below (still recorded as the z-frame case).
        driftFrameShape: (() => {
          const d = driftVector();
          const dm = Math.hypot(d[0], d[1], d[2]);
          if (dm < 1e-12) return null;
          const dHat = [d[0] / dm, d[1] / dm, d[2] / dm];
          const blk = transverseShapeTensorBlock(histories, t, TWO_PI / DECLARED.omega, dHat);
          const nUnit = axisRow.axisUnit ?? null;
          const axisDotDrift = nUnit
            ? Math.abs(nUnit[0] * dHat[0] + nUnit[1] * dHat[1] + nUnit[2] * dHat[2])
            : null;
          return {
            sigma: blk ? blk.sigma : null,
            qPerp1: blk ? blk.qPerp1 : null,
            qPerp2: blk ? blk.qPerp2 : null,
            block: blk ? blk.block : null,
            driftHat: dHat,
            axisUnit: nUnit,
            axisVsDriftDeg:
              axisDotDrift != null
                ? (Math.acos(Math.max(-1, Math.min(1, axisDotDrift))) * 180) / Math.PI
                : null,
            axisTiltVsZDeg: axisRow.axisTiltDeg,
          };
        })(),
        // Co-drift cage coherence (measurement 3): the net pair force each cage
        // site would feel from the released braid (bounded => coherent co-move).
        cageCoherence:
          staticPairSea && staticPairSea.coDrift
            ? coDriftCageCoherenceRow(staticPairSea, sites, histories, t, kappa)
            : null,
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
// Candidate Row 8: the stratum-map instrument (binding pre-release obligation).
// One cell = a short hold/release at the V5 seed with the chart booking at a
// declared rho_c (or the canonical soft booking as the zero-absorption
// reference), booking the absorbed pump fraction per rotation (click-ledger
// tangential sum / pumpDeclared, as rates — dimensionless, equal to the
// per-rotation ratio), rail residence statistics, the substep witness spread
// (the Row 7 coincidence-push artifact channel), and the halt row. dt-halving
// is a second cell at dtFactor = 0.5 compared by the caller.
// ---------------------------------------------------------------------------
export function stratumMapCell({
  rhoC = null, // null = canonical soft pointwise booking (zero-absorption reference)
  kappa,
  rotations = DECLARED.row8.holdRotations,
  dtFactor = 1,
  dsGuardFactor = 1, // cell-level tangency-guard halving witness (declared)
  resumeState = null,
  budgetMs = Infinity,
}) {
  const saved = {
    rc: DECLARED.coincidenceStratum,
    chart: DECLARED.chart.enabled,
    dt: DECLARED.timeStep,
    dsGuard: DECLARED.chart.impulse.dsGuard,
  };
  try {
    DECLARED.chart.enabled = rhoC != null;
    if (rhoC != null) DECLARED.coincidenceStratum = rhoC;
    DECLARED.timeStep = saved.dt * dtFactor;
    DECLARED.chart.impulse.dsGuard = saved.dsGuard * dsGuardFactor;
    const run = runRelease({ rotations, kappa, recordRotations: [], resumeState, budgetMs });
    if (!run.completed) return { pending: true, state: run.state };
    const dt = DECLARED.timeStep;
    const duration = run.diag.length ? run.diag[run.diag.length - 1].t + dt : 0;
    const rotationsCompleted = duration / TWO_PI;
    const tanSum = run.chartLedger ? run.chartLedger.totalBookedTangentialImpulse : 0;
    // absorbed pump fraction per rotation: brake rate (negative booked
    // tangential impulse per unit time) over the declared pump rate.
    const absorbedPumpFractionPerRotation =
      duration > 0 ? -tanSum / duration / DECLARED.row8.pumpDeclared : null;
    const band = DECLARED.row8.railResidenceBand;
    let inBand = 0;
    let bMin = Infinity;
    let bMax = -Infinity;
    for (const d of run.diag) {
      if (Math.abs(d.betaM - 1) <= band) inBand += 1;
      bMin = Math.min(bMin, d.betaM);
      bMax = Math.max(bMax, d.betaM);
    }
    const witnessRows = (run.chartLedger?.rows ?? [])
      .map((r) => r.regularizationIndependenceWitness)
      .filter(Boolean);
    const betaMFinal = run.diag.length ? run.diag[run.diag.length - 1].betaM : null;
    return {
      rhoC,
      booking: rhoC == null ? "canonical_soft_pointwise" : "chart_d0_stratum",
      dt,
      dtFactor,
      dsGuardFactor,
      dsGuardEffective: DECLARED.chart.impulse.dsGuard,
      rotationsRequested: rotations,
      rotationsCompleted,
      halted: run.halted,
      absorbedPumpFractionPerRotation,
      bookedTangentialImpulseSum: tanSum,
      bookedSteps: run.chartLedger?.bookedSteps ?? 0,
      crossingEvents: run.chartLedger?.crossingEvents ?? 0,
      clickTransitions: run.clickLedger.totalTransitions,
      clicksPerRotation:
        rotationsCompleted > 0 ? run.clickLedger.totalTransitions / rotationsCompleted : null,
      // impulse-resolved per-click rows (Sections 62/63 follow-up): resolved
      // event count, mean per-click tangential impulse, and its relative
      // dispersion inside the cell (the stratum-stability witness).
      perClick: (() => {
        const n = run.chartLedger?.totalClickEvents ?? 0;
        if (!(n > 0)) {
          return { events: 0, eventsPerRotation: null, meanTangentialImpulse: null, relativeStd: null };
        }
        const s1 = run.chartLedger.perClickTangentialImpulseSum;
        const s2 = run.chartLedger.perClickTangentialImpulseSumSq;
        const mean = s1 / n;
        const varr = Math.max(0, s2 / n - mean * mean);
        return {
          events: n,
          eventsPerRotation: rotationsCompleted > 0 ? n / rotationsCompleted : null,
          meanTangentialImpulse: mean,
          relativeStd: Math.abs(mean) > 0 ? Math.sqrt(varr) / Math.abs(mean) : null,
        };
      })(),
      railResidence: {
        band,
        fractionInBand: run.diag.length ? inBand / run.diag.length : null,
        betaMMin: Number.isFinite(bMin) ? bMin : null,
        betaMMax: Number.isFinite(bMax) ? bMax : null,
        betaMFinal,
        // zero-absorption reference row: the un-absorbed pump's measured climb
        betaMClimbRatePerUnitTime: duration > 0 && betaMFinal != null ? (betaMFinal - 1) / duration : null,
        railCrossings: run.railCrossings.length,
      },
      substepWitness: {
        count: witnessRows.length,
        maxRelativeSpread: witnessRows.length
          ? Math.max(...witnessRows.map((w) => w.relativeSpread))
          : null,
      },
      tubeLossRotations: (() => {
        const hit = run.diag.find(
          (d) => d.maxShapeDeviation > DECLARED.tubeRadiusForShapeQuestion
        );
        return hit ? hit.t / TWO_PI : null;
      })(),
    };
  } finally {
    DECLARED.coincidenceStratum = saved.rc;
    DECLARED.chart.enabled = saved.chart;
    DECLARED.timeStep = saved.dt;
    DECLARED.chart.impulse.dsGuard = saved.dsGuard;
  }
}

// Marginal-cell detection on the completed grid rows (dtFactor=1 cells,
// ascending rho_c): the marginal stratum rho_c* is where the absorbed pump
// fraction crosses the declared target (1) — on the Row 7 regime map the
// fraction DECREASES with rho_c (smaller stratum = harder brake), so the
// crossing is approached from above. Log-linear interpolation inside the
// bracketing pair; witness cleanliness is judged by the caller on the bracket
// plus the confirmation cell.
export function locateMarginalStratum(gridRows, target = DECLARED.row8.marginalTarget) {
  const rows = gridRows
    .filter((r) => r.rhoC != null && Number.isFinite(r.absorbedPumpFractionPerRotation))
    .sort((a, b) => a.rhoC - b.rhoC);
  for (let k = 0; k + 1 < rows.length; k += 1) {
    const f0 = rows[k].absorbedPumpFractionPerRotation;
    const f1 = rows[k + 1].absorbedPumpFractionPerRotation;
    if ((f0 - target) * (f1 - target) <= 0 && f0 !== f1) {
      const l0 = Math.log(rows[k].rhoC);
      const l1 = Math.log(rows[k + 1].rhoC);
      const rhoCStar = Math.exp(l0 + ((target - f0) * (l1 - l0)) / (f1 - f0));
      return {
        found: true,
        rhoCStar,
        bracket: [rows[k].rhoC, rows[k + 1].rhoC],
        bracketFractions: [f0, f1],
      };
    }
  }
  return {
    found: false,
    rhoCStar: null,
    bracket: null,
    bracketFractions: null,
    note:
      rows.length && rows.every((r) => r.absorbedPumpFractionPerRotation > target)
        ? "all_cells_over_absorb"
        : "no_crossing_in_declared_span",
  };
}

// ---------------------------------------------------------------------------
// Escapement-under-tilt projection (spec Section 63 composition target; the
// remaining bare-braid axis-absorber candidate). Prescribed-worldline family
// exactly as the gyroscopicTiltAnalysisFull rate blocks (zero layer tilt and
// constant tilt rate at each readout time, so the causal roots see the past
// tilt = the delay-memory content), on the MIDDLE layer about x. At each
// readout the impulse-resolved chart booking integrates the same-source click
// channel ONLY (aFrozen = 0: the partner channels already live in the
// measured K and D blocks of the completed pencil), and the kappa-scaled
// transverse torque rate on the layer (both middle sites summed, cycle-
// averaged) is differenced centrally in the tilt rate:
//   P_click[M][M] = dT_x / d(etaDot_x)  (positive = anti-damping, the
//   Section 63 sign convention; damping supply posts NEGATIVE).
// Compare |P_click| against dStarIsotropic. Seed-grade instrument on
// prescribed worldlines: flips no acceptance flag, authorizes no release.
// ---------------------------------------------------------------------------
export function escapementUnderTiltProjection({
  kappa,
  rhoC,
  etaDot = DECLARED.row8.tiltProjection.etaDot,
  readouts = DECLARED.row8.tiltProjection.readouts,
  atol = DECLARED.chart.impulse.atol,
  rtol = DECLARED.chart.impulse.rtol,
  dsGuard = DECLARED.chart.impulse.dsGuard,
} = {}) {
  const saved = { rc: DECLARED.coincidenceStratum, chart: DECLARED.chart.enabled };
  try {
    DECLARED.coincidenceStratum = rhoC;
    DECLARED.chart.enabled = true;
    const sites = buildSites();
    const dt = DECLARED.timeStep;
    const w = DECLARED.omega;
    const period = TWO_PI / w;
    const tBase = DECLARED.row8.tiltProjection.tReadBase;
    const middleIdx = sites
      .map((s, k) => ({ s, k }))
      .filter(({ s }) => s.layer === "M")
      .map(({ k }) => k);
    const rotX = (v, c, s) => [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]];
    // one readout sample: family tilted about x with angle etaDot*(t - tRead)
    // on the middle layer, impulse-resolved same-source booking at tRead
    const bookOne = (iSite, tRead, rate) => {
      const site = sites[iSite];
      const tilted = (t) => {
        const p0 = rigidPosition(site, t);
        const v0 = rigidVelocity(site, t);
        const ax = rate * (t - tRead);
        const c = Math.cos(ax);
        const s = Math.sin(ax);
        const p = rotX(p0, c, s);
        const vr = rotX(v0, c, s);
        // d/dt [Rx(ax(t)) p0(t)] = rate * (xhat cross Rx p0) + Rx v0
        return { p, v: [vr[0], vr[1] - rate * p[2], vr[2] + rate * p[1]] };
      };
      const h = new RetainedHistory(site);
      const nS = Math.ceil((tRead + 2 * dt) / dt);
      for (let k = 0; k <= nS; k += 1) {
        const t = k * dt;
        const { p, v } = tilted(t);
        h.push(t, p, v);
      }
      const histories = [];
      histories[iSite] = h;
      const { p: xi, v: vi } = tilted(tRead);
      const booking = chartWindowIntegrate({
        histories,
        sites,
        i: iSite,
        t0: tRead,
        dt,
        x0: xi,
        v0: vi,
        aFrozen: [0, 0, 0],
        kappa,
        atol,
        rtol,
        dsGuard,
      });
      // kappa-scaled transverse torque rate booked by the click channel over
      // the window (dv already carries kappa; F = dv/dt)
      return {
        Tx: (xi[1] * booking.dv[2] - xi[2] * booking.dv[1]) / dt,
        Ty: (xi[2] * booking.dv[0] - xi[0] * booking.dv[2]) / dt,
        events: (booking.clickEvents ?? []).length,
        tangentialImpulse:
          (booking.dv[0] * vi[0] + booking.dv[1] * vi[1] + booking.dv[2] * vi[2]) /
          (Math.hypot(...vi) || 1),
      };
    };
    // cycle-averaged layer torque rate at a tilt rate (both middle sites)
    const layerTorque = (rate) => {
      let Tx = 0;
      let Ty = 0;
      let events = 0;
      let tan = 0;
      for (let q = 0; q < readouts; q += 1) {
        const tRead = tBase + (q / readouts) * period;
        for (const iSite of middleIdx) {
          const row = bookOne(iSite, tRead, rate);
          Tx += row.Tx / readouts;
          Ty += row.Ty / readouts;
          events += row.events;
          tan += row.tangentialImpulse / readouts;
        }
      }
      return { Tx, Ty, events, tangentialImpulse: tan };
    };
    const plus = layerTorque(+etaDot);
    const minus = layerTorque(-etaDot);
    const base = layerTorque(0);
    const P = (plus.Tx - minus.Tx) / (2 * etaDot);
    const Pxy = (plus.Ty - minus.Ty) / (2 * etaDot);
    return {
      rhoC,
      etaDot,
      readouts,
      quadrature: { atol, rtol, dsGuard },
      baselineTx: base.Tx, // transverse-torque null witness at zero rate
      baselineTangentialImpulsePerWindow: base.tangentialImpulse,
      clickEventsSeen: { plus: plus.events, minus: minus.events, base: base.events },
      // the click channel's M-M diagonal tilt-rate response (kappa-scaled
      // torque per unit tilt rate; positive = anti-damping)
      PclickXX: P,
      PclickYX: Pxy,
      dStarIsotropic: DECLARED.row8.tiltProjection.dStarIsotropic,
      dampingSupplyFractionOfDStar:
        P < 0 ? -P / DECLARED.row8.tiltProjection.dStarIsotropic : 0,
      convention:
        "gyroscopicTiltAnalysisFull rate-block sign convention: positive diagonal = anti-damping; damping supply posts negative",
    };
  } finally {
    DECLARED.coincidenceStratum = saved.rc;
    DECLARED.chart.enabled = saved.chart;
  }
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
  // Axial drift (instrument touch point 1) must be set BEFORE selectTabledRow so
  // the drift cadence pin omega = sqrt(1-u^2)/cos(alpha_M) is applied. The drift
  // ANGLE (degrees between drift and the spin axis) enables the oblique two-axis
  // Corollary-1 sigma test; 0 = pure axial screw drift (exact regression).
  DECLARED.axialDrift = readCliNumber("axial-drift", 0);
  DECLARED.driftAngle = deg(readCliNumber("drift-angle", 0));
  // Co-drifting octahedral cage (the structured-sea axis absorber). Enabling it
  // routes the release through the co-moving drift-aligned cage instead of any
  // held-static sea; requires drift (u = 0 cells stay bare).
  DECLARED.coDriftCage.enabled = process.argv.includes("--co-drift-cage") || process.argv.includes("--polar-pair-sea");
  // --polar-pair-sea is the axisymmetric polar-pair-only variant; otherwise
  // --cage-geometry selects octahedral (default) | polarPairOnly | ring6 | ring8.
  DECLARED.coDriftCage.geometry = process.argv.includes("--polar-pair-sea")
    ? "polarPairOnly"
    : process.argv.find((a) => a.startsWith("--cage-geometry="))?.slice("--cage-geometry=".length) ?? "octahedral";
  selectTabledRow(readCliNumber("row", 1));
  if (DECLARED.staticPairSea.enabled && (DECLARED.sea.enabled || DECLARED.responsiveSea.enabled)) {
    process.stderr.write(
      "[abort] Rows 5/6 carry their own frozen static-pair environment; --sea/--responsive-sea do not compose with --row=5 or --row=6\n"
    );
    process.exit(1);
  }
  if (DECLARED.bareGate.enabled && (DECLARED.sea.enabled || DECLARED.responsiveSea.enabled)) {
    process.stderr.write(
      "[abort] Rows 7/8 are the BARE self-equilibrated candidate (no environment); --sea/--responsive-sea do not compose with --row=7 or --row=8\n"
    );
    process.exit(1);
  }
  const stratumMapMode = process.argv.includes("--stratum-map");
  // Impulse-resolved follow-up instruments (spec Sections 62/63 by title; NOT
  // candidate rows — no release is authorized by either mode):
  //  --impulse-map: the converged-booking stratum re-map over the extended
  //    span [0.005, 0.112] (Row 8 grid + impulseSpanExtension).
  //  --tilt-projection: the escapement-under-tilt torque response vs d*.
  const impulseMapMode = process.argv.includes("--impulse-map");
  const tiltProjectionMode = process.argv.includes("--tilt-projection");
  const anyMapMode = stratumMapMode || impulseMapMode;
  if (DECLARED.row8.enabled && !anyMapMode && !tiltProjectionMode && !DECLARED.chart.enabled) {
    process.stderr.write(
      "[abort] the Row 8 release is BY DEFINITION at the marginal chart-booking stratum: run --stratum-map first, then release with --chart --rc=<rho_c*>\n"
    );
    process.exit(1);
  }
  if ((anyMapMode || tiltProjectionMode) && !DECLARED.row8.enabled) {
    process.stderr.write(
      "[abort] --stratum-map/--impulse-map/--tilt-projection ride the Candidate Row 8 seed/gate machinery; require --row=8\n"
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

  // -------------------------------------------------------------------------
  // Native axial-drift envelope sweep (the instrument's top-level mode). For
  // each u in the grid it runs the native free-tilt release at the drift
  // cadence pin and reads back the envelope semiaxes, testing the Lorentz ruler
  // law as RELATIVE flattening xi(u)/xi(0) vs 1/gamma (caveat 1: the raw
  // layer-max gives xi(0) ~ 0.707, not 1). kappa is fitted once at u = 0 (bare
  // braid channel) and FROZEN across the sweep (frozen-kappa discipline). The
  // sweep is resumable per u-cell via a state file (repo chunking discipline);
  // the screw-rigid driftFixedPoint reference is NOT used (caveat 2: unphysical
  // for u >= 0.4). Row 7 (self-equilibrated V5) is the intended geometry.
  // -------------------------------------------------------------------------
  if (process.argv.includes("--drift-envelope")) {
    const baseRow = readCliNumber("row", 1);
    const driftRotations = readCliNumber("drift-rotations", Math.min(rotations, 1));
    const driftDt = readCliNumber("drift-dt", NaN);
    if (Number.isFinite(driftDt)) DECLARED.timeStep = driftDt;
    const gridArg = process.argv.find((a) => a.startsWith("--u-grid="))?.slice(9);
    let uGrid = gridArg
      ? gridArg.split(",").map(Number).filter((v) => Number.isFinite(v) && v >= 0 && v < 1)
      : [0, 0.2];
    // u = 0 must lead the grid: it fits/freezes kappa and anchors xi(0), R_perp(0).
    uGrid = Array.from(new Set(uGrid)).sort((a, b) => a - b);
    if (uGrid[0] !== 0) uGrid = [0, ...uGrid];
    // Sample the envelope trajectory finely (~12 records across the window) so
    // the xi(t) relaxation is visible even in a short pre-dispersal release.
    const recStep = Math.max(0.05, driftRotations / 12);
    const recRot = [];
    for (let r = recStep; r < driftRotations - 1e-9; r += recStep) recRot.push(Number(r.toFixed(4)));
    recRot.push(Number(Math.max(0.01, driftRotations - Math.min(0.02, driftRotations * 0.03)).toFixed(4)));
    // Frozen-kappa discipline (Row 7 protocol): the release runs at the
    // gauge-invariant equilibrium coupling kappa_eq = 1/R_M(eq), computed ONCE
    // at u = 0 and frozen across the sweep. The bare-channel fitted kappa*
    // under-supports the braid (the sum-rule dilation deficit) and would make
    // the envelope collapse rather than relax; kappa_eq pins the size. The u=0
    // equilibrium shape (qI0, qO0) is the frozen seed geometry for every cell —
    // NOT the per-u screw-rigid driftRailPinnedEquilibrium, which is unphysical
    // for u >= 0.4 (caveat 2). The native free-tilt release does the relaxing.
    const statePath = path.join(outDir, `drift-envelope-${tag}.json`);
    let prior = fs.existsSync(statePath)
      ? JSON.parse(fs.readFileSync(statePath, "utf8"))
      : { schema: SCHEMA, mode: "native_axial_drift_envelope_sweep", cells: [], kappaFrozen: null, seedShape: null };
    if (prior.kappaFrozen == null) {
      const eq0 = driftRailPinnedEquilibrium({ u: 0 });
      prior.kappaFrozen = 1 / eq0.ReqOverKappa; // kappa_eq at u=0 (gauge-invariant)
      prior.seedShape = { qI: eq0.shapeEq.qI, qO: eq0.shapeEq.qO };
      prior.seedEquilibrium = {
        lambda: eq0.lambda,
        ReqOverKappa: eq0.ReqOverKappa,
        railPinnedSpectrum: eq0.railPinnedSpectrum,
        basin: eq0.basin,
      };
    }
    const kappaFrozen = prior.kappaFrozen;
    const seedShape = prior.seedShape;
    const doneU = new Set(prior.cells.map((c) => c.u));
    for (const u of uGrid) {
      if (doneU.has(u)) continue;
      if (Date.now() - t0 > budgetMs) {
        process.stderr.write(
          `[drift] budget reached; ${prior.cells.length}/${uGrid.length} cells done; rerun to resume\n`
        );
        fs.writeFileSync(statePath, JSON.stringify(prior));
        process.exit(0);
      }
      DECLARED.axialDrift = u;
      selectTabledRow(baseRow); // refresh the drift cadence pin for this u
      // re-anchor to the frozen u=0 equilibrium shape (M stays R_M = 1);
      // angles stay tabled so the tilt relaxes freely during the release.
      DECLARED.layers = DECLARED.layers.map((L) =>
        L.name === "I" ? { ...L, R: seedShape.qI } : L.name === "O" ? { ...L, R: seedShape.qO } : { ...L }
      );
      const sites = buildSites();
      const seedHistories = sites.map((s) => new RetainedHistory(s));
      const seed = seedRecordEvaluation(sites, seedHistories, null, kappaFrozen);
      const seedStates = sites.map((s) => ({ x: rigidPosition(s, 0), v: rigidVelocity(s, 0) }));
      const seedEnvelope = envelopeReadback(seedStates, u);
      process.stderr.write(
        `[drift] u=${u} omega=${DECLARED.omega.toFixed(5)} kappaFrozen=${kappaFrozen.toFixed(6)} ` +
          `kappaSeed=${seed.kappaStar.toFixed(6)} running ${driftRotations} rot dt=${DECLARED.timeStep}\n`
      );
      const run = runRelease({
        rotations: driftRotations,
        kappa: kappaFrozen,
        recordRotations: recRot,
        budgetMs: Math.max(2000, budgetMs - (Date.now() - t0)),
      });
      const finalEnvelope = envelopeReadback(run.states, u);
      prior.cells.push({
        u,
        cadence: DECLARED.omega,
        kappaFrozen,
        kappaSeedFit: seed.kappaStar,
        seedEnvelope,
        finalEnvelope,
        records: run.records.map((r) => ({
          rotations: r.rotations,
          envelope: r.envelope,
          transverseShape: r.transverseShape,
          driftFrameShape: r.driftFrameShape,
          phaseOffsets: r.phaseOffsets,
          // co-drift cage channels: coherence (measurement 3) and the per-layer
          // radial support ratio (measurement 4 — cage must not spoil the basin)
          cageCoherence: r.cageCoherence,
          layerSupport: r.layerRows
            ? Object.fromEntries(
                Object.entries(r.layerRows).map(([L, v]) => [L, v.supportRatio])
              )
            : null,
        })),
        coDriftCage: DECLARED.coDriftCage.enabled,
        halted: run.halted,
        completed: run.completed,
      });
      fs.writeFileSync(statePath, JSON.stringify(prior));
      process.stderr.write(
        `[drift] u=${u} DONE xi=${finalEnvelope.xi?.toFixed(4)} ` +
          `R_par/R_perp=${finalEnvelope.Rpar.toFixed(4)}/${finalEnvelope.Rperp.toFixed(4)} ` +
          `1/gamma=${finalEnvelope.oneOverGamma.toFixed(4)} halted=${JSON.stringify(run.halted)}\n`
      );
    }
    // Summary. The bare braid coherently expands during release (the un-absorbed
    // rail pump, the Row 7 finding), so the final-state envelope is confounded.
    // The ruler law is therefore tested as RELATIVE flattening at MATCHED
    // rotation: xi(u, t)/xi(0, t) vs 1/gamma (caveat 1). The u=0 cell supplies
    // the xi(0, t) and R_perp(0, t) references at each record rotation.
    const cell0 = prior.cells.find((c) => c.u === 0);
    const xiOfRot = (cell, rot) => {
      if (!cell) return null;
      const rec = cell.records.find((r) => Math.abs(r.rotations - rot) < 1e-6);
      return rec ? rec.envelope.xi : null;
    };
    const RperpOfRot = (cell, rot) => {
      if (!cell) return null;
      const rec = cell.records.find((r) => Math.abs(r.rotations - rot) < 1e-6);
      return rec ? rec.envelope.Rperp : null;
    };
    // Per-u matched-rotation relative-flattening track vs 1/gamma.
    const relativeFlatteningByCell = prior.cells
      .slice()
      .sort((a, b) => a.u - b.u)
      .filter((c) => c.u !== 0)
      .map((c) => {
        const oneOverGamma = Math.sqrt(Math.max(0, 1 - c.u * c.u));
        const track = c.records
          .map((rec) => {
            const xi0 = xiOfRot(cell0, rec.rotations);
            const Rp0 = RperpOfRot(cell0, rec.rotations);
            return xi0 && rec.envelope.xi != null
              ? {
                  rotations: rec.rotations,
                  xiRelative: rec.envelope.xi / xi0,
                  lambda: Rp0 ? rec.envelope.Rperp / Rp0 : null,
                  residualVsOneOverGamma: rec.envelope.xi / xi0 - oneOverGamma,
                }
              : null;
          })
          .filter(Boolean);
        // closest approach of xi(u)/xi(0) to 1/gamma over the tracked window
        const best = track.reduce(
          (b, r) =>
            b == null || Math.abs(r.residualVsOneOverGamma) < Math.abs(b.residualVsOneOverGamma) ? r : b,
          null
        );
        return { u: c.u, oneOverGamma, closestApproach: best, track };
      });
    // Corollary 1 (sigma -> 0): the drift-frame transverse anisotropy sigma(t)
    // and the spin-axis realignment n_hat(t) toward the drift, per drift cell.
    const sigmaAxisByCell = prior.cells
      .slice()
      .sort((a, b) => a.u - b.u)
      .filter((c) => c.u !== 0)
      .map((c) => {
        const track = c.records
          .filter((r) => r.driftFrameShape)
          .map((r) => ({
            rotations: r.rotations,
            sigma: r.driftFrameShape.sigma,
            axisVsDriftDeg: r.driftFrameShape.axisVsDriftDeg,
            axisTiltVsZDeg: r.driftFrameShape.axisTiltVsZDeg,
            axisUnit: r.driftFrameShape.axisUnit,
            qPerp1: r.driftFrameShape.qPerp1,
            qPerp2: r.driftFrameShape.qPerp2,
            cageMaxPairForce: r.cageCoherence ? r.cageCoherence.maxNetPairForce : null,
            cagePolarPairForce: r.cageCoherence ? r.cageCoherence.polarMeanNetPairForce : null,
            layerSupport: r.layerSupport ?? null,
          }));
        const first = track[0] ?? null;
        const last = track[track.length - 1] ?? null;
        return {
          u: c.u,
          driftAngleDeg: (DECLARED.driftAngle * 180) / Math.PI,
          sigmaFirst: first ? first.sigma : null,
          sigmaLast: last ? last.sigma : null,
          axisVsDriftFirstDeg: first ? first.axisVsDriftDeg : null,
          axisVsDriftLastDeg: last ? last.axisVsDriftDeg : null,
          sigmaDecays: first && last ? last.sigma < first.sigma : null,
          axisRealigns: first && last ? last.axisVsDriftDeg < first.axisVsDriftDeg : null,
          track,
        };
      });
    const xi0f = cell0 ? cell0.finalEnvelope.xi : null;
    const Rperp0f = cell0 ? cell0.finalEnvelope.Rperp : null;
    const ruler = prior.cells
      .slice()
      .sort((a, b) => a.u - b.u)
      .map((c) => ({
        u: c.u,
        xiFinal: c.finalEnvelope.xi,
        xiRelativeFinal: xi0f && c.finalEnvelope.xi != null ? c.finalEnvelope.xi / xi0f : null,
        oneOverGamma: c.finalEnvelope.oneOverGamma,
        lambdaFinal: Rperp0f ? c.finalEnvelope.Rperp / Rperp0f : null,
        Rpar: c.finalEnvelope.Rpar,
        Rperp: c.finalEnvelope.Rperp,
        transverseAnisotropyFinal: c.records.length
          ? c.records[c.records.length - 1].transverseShape?.anisotropy ?? null
          : null,
        halted: c.halted,
      }));
    const report = {
      schema: SCHEMA,
      handoffPacketRef: HANDOFF_PACKET_REF,
      mode: "native_axial_drift_envelope_sweep",
      theoremTargetRef:
        "reference/priorities/master-equation-closure/boosted-delay-attractor-theorem-target.md",
      instrumentSpecRef:
        "reference/priorities/braid-ideal/native-axial-drift-envelope-instrument-spec.md",
      declared: {
        candidateRow: DECLARED.candidateRow,
        driftRotations,
        timeStep: DECLARED.timeStep,
        uGrid,
        driftAngleDeg: (DECLARED.driftAngle * 180) / Math.PI,
        coDriftCage: DECLARED.coDriftCage.enabled,
        cageGeometry: DECLARED.coDriftCage.enabled ? DECLARED.coDriftCage.geometry : null,
        kappaFrozen: prior.kappaFrozen,
        rulerLawTest: "relative_flattening_xi(u)/xi(0)_vs_1/gamma (caveat 1)",
        screwRigidReferenceUsed: false,
        note:
          "the bare braid coherently expands during release (un-absorbed rail pump, Row 7); read the ruler law from relativeFlatteningByRotation (matched-rotation xi(u)/xi(0)), NOT the confounded final-state ruler block",
      },
      rulerLaw: ruler,
      relativeFlatteningByRotation: relativeFlatteningByCell,
      sigmaCorollary1: sigmaAxisByCell,
      cells: prior.cells,
      failClosed: FAIL_CLOSED,
      elapsedSeconds: (Date.now() - t0) / 1000,
    };
    fs.writeFileSync(path.join(outDir, outName), JSON.stringify(report, null, 1));
    process.stdout.write(
      JSON.stringify(
        {
          schema: SCHEMA,
          mode: "native_axial_drift_envelope_sweep",
          rulerLawRelativeFlattening: relativeFlatteningByCell.map((c) => ({
            u: c.u,
            oneOverGamma: Number(c.oneOverGamma.toFixed(4)),
            closestXiRelative: c.closestApproach ? Number(c.closestApproach.xiRelative.toFixed(4)) : null,
            atRotations: c.closestApproach ? c.closestApproach.rotations : null,
            residual: c.closestApproach ? Number(c.closestApproach.residualVsOneOverGamma.toFixed(4)) : null,
          })),
          sigmaCorollary1: sigmaAxisByCell.map((c) => ({
            u: c.u,
            driftAngleDeg: c.driftAngleDeg,
            sigmaFirst: c.sigmaFirst != null ? Number(c.sigmaFirst.toFixed(4)) : null,
            sigmaLast: c.sigmaLast != null ? Number(c.sigmaLast.toFixed(4)) : null,
            axisVsDriftFirstDeg: c.axisVsDriftFirstDeg != null ? Number(c.axisVsDriftFirstDeg.toFixed(2)) : null,
            axisVsDriftLastDeg: c.axisVsDriftLastDeg != null ? Number(c.axisVsDriftLastDeg.toFixed(2)) : null,
            sigmaDecays: c.sigmaDecays,
            axisRealigns: c.axisRealigns,
          })),
          reportPath: path.join(outDir, outName),
          ...FAIL_CLOSED,
        },
        null,
        1
      ) + "\n"
    );
    process.exit(0);
  }

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

  // ------------------------------------------------------------------------
  // Candidate Row 8 binding pre-release obligation: the stratum map. Runs
  // INSTEAD of a release (--stratum-map): grid cells + dt-halving witnesses +
  // the canonical soft reference, chunked/resumable like the release phases;
  // when all cells complete, locates the marginal cell rho_c*, runs the
  // confirmation cell (+ dt witness) there, judges witness cleanliness, and
  // writes the map report. Fail-closed: the map flips no acceptance flag.
  // ------------------------------------------------------------------------
  if (anyMapMode) {
    const loadJson = (p) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null);
    const mapStatePath = path.join(
      outDir,
      `${impulseMapMode ? "impulse-map" : "stratum-map"}-results-${tag}.json`
    );
    const mapState = loadJson(mapStatePath) ?? { results: {} };
    const grid = impulseMapMode
      ? [...DECLARED.row8.stratumGrid, ...DECLARED.row8.impulseSpanExtension]
      : DECLARED.row8.stratumGrid;
    const cells = [
      { id: "soft-reference", rhoC: null, dtFactor: 1 },
      ...grid.flatMap((rc, k) => [
        { id: `rc${k}`, rhoC: rc, dtFactor: 1 },
        { id: `rc${k}-dtw`, rhoC: rc, dtFactor: 0.5 },
      ]),
      // impulse-map only: the cell-level tangency-guard halving witness at the
      // mid-grid stratum (crossing-row witnesses cannot fire when no rail
      // crossing occurs, so the guard sensitivity is measured on a whole cell)
      ...(impulseMapMode
        ? [{ id: "rc-guard-witness", rhoC: 0.050397, dtFactor: 1, dsGuardFactor: 0.5 }]
        : []),
    ];
    const runCell = (cell) => {
      if (mapState.results[cell.id]) return true;
      const cellStatePath = path.join(outDir, `stratum-map-cellstate-${tag}-${cell.id}.json`);
      const remaining = budgetMs - (Date.now() - t0);
      if (remaining < 2000) {
        process.stderr.write(`[chunk] stratum map budget exhausted before cell ${cell.id}; rerun to resume\n`);
        process.exit(0);
      }
      const res = stratumMapCell({
        rhoC: cell.rhoC,
        kappa: seed.kappaStar,
        dtFactor: cell.dtFactor,
        dsGuardFactor: cell.dsGuardFactor ?? 1,
        resumeState: loadJson(cellStatePath),
        budgetMs: remaining,
      });
      if (res.pending) {
        fs.writeFileSync(cellStatePath, JSON.stringify(res.state));
        process.stderr.write(`[chunk] stratum map cell ${cell.id} paused; rerun to resume\n`);
        process.exit(0);
      }
      mapState.results[cell.id] = res;
      fs.writeFileSync(mapStatePath, JSON.stringify(mapState));
      // stale-cellstate cleanup is best-effort (some sandboxes deny unlink);
      // a completed cell in mapState.results always wins over a state file.
      try {
        if (fs.existsSync(cellStatePath)) fs.rmSync(cellStatePath);
      } catch {
        /* completed result already persisted; stale state file is inert */
      }
      process.stderr.write(
        `[map] cell ${cell.id} rhoC=${cell.rhoC ?? "soft"} dtFactor=${cell.dtFactor} ` +
          `absorbed=${res.absorbedPumpFractionPerRotation?.toFixed(4) ?? "n/a"} ` +
          `railX=${res.railResidence.railCrossings} inBand=${res.railResidence.fractionInBand?.toFixed(3)} ` +
          `witnessSpread=${res.substepWitness.maxRelativeSpread?.toExponential(2) ?? "none"} halted=${res.halted ? res.halted.reason : "no"}\n`
      );
      return true;
    };
    for (const cell of cells) runCell(cell);
    // grid complete: locate the marginal cell and run the confirmation pair
    const gridRows = grid.map((rc, k) => mapState.results[`rc${k}`]);
    const marginal = locateMarginalStratum(gridRows);
    if (marginal.found) {
      const conf = { id: "rcstar", rhoC: marginal.rhoCStar, dtFactor: 1 };
      const confW = { id: "rcstar-dtw", rhoC: marginal.rhoCStar, dtFactor: 0.5 };
      runCell(conf);
      runCell(confW);
    }
    // No crossing inside the declared span but the top cell still over-absorbs:
    // quantify the d0 statement with ONE out-of-span extrapolation probe at the
    // log-slope crossing (labeled, report-only — NOT a release site; the
    // scoped negative stands because the crossing is outside the tabled span).
    let outOfSpanExtrapolation = null;
    if (!marginal.found) {
      const top = gridRows[gridRows.length - 1];
      const prev = gridRows[gridRows.length - 2];
      if (
        top?.absorbedPumpFractionPerRotation > DECLARED.row8.marginalTarget &&
        prev?.absorbedPumpFractionPerRotation > top.absorbedPumpFractionPerRotation
      ) {
        const slope =
          (Math.log(top.absorbedPumpFractionPerRotation) -
            Math.log(prev.absorbedPumpFractionPerRotation)) /
          (Math.log(top.rhoC) - Math.log(prev.rhoC));
        const rhoCExtrap = Math.exp(
          Math.log(top.rhoC) +
            (Math.log(DECLARED.row8.marginalTarget) -
              Math.log(top.absorbedPumpFractionPerRotation)) /
              slope
        );
        runCell({ id: "rcx", rhoC: rhoCExtrap, dtFactor: 1 });
        runCell({ id: "rcx-dtw", rhoC: rhoCExtrap, dtFactor: 0.5 });
        outOfSpanExtrapolation = { rhoCExtrapolated: rhoCExtrap, logSlopeTopPair: slope };
      }
    }
    // assemble: per-cell dt-halving deltas + witness cleanliness verdict.
    // Impulse-resolved cleanliness (Sections 62/63 follow-up) covers BOTH the
    // absorbed fraction and the mean per-click impulse.
    const dtDelta = (base, w) =>
      base && w && Number.isFinite(base.absorbedPumpFractionPerRotation) && Number.isFinite(w.absorbedPumpFractionPerRotation)
        ? Math.abs(w.absorbedPumpFractionPerRotation - base.absorbedPumpFractionPerRotation) /
          Math.max(Math.abs(base.absorbedPumpFractionPerRotation), 1e-9)
        : null;
    const dtDeltaPerClick = (base, w) =>
      base && w && Number.isFinite(base.perClick?.meanTangentialImpulse) && Number.isFinite(w.perClick?.meanTangentialImpulse)
        ? Math.abs(w.perClick.meanTangentialImpulse - base.perClick.meanTangentialImpulse) /
          Math.max(Math.abs(base.perClick.meanTangentialImpulse), 1e-9)
        : null;
    const gridBlock = grid.map((rc, k) => {
      const base = mapState.results[`rc${k}`];
      const w = mapState.results[`rc${k}-dtw`];
      const dAbs = dtDelta(base, w);
      const dClick = dtDeltaPerClick(base, w);
      return {
        ...base,
        dtHalvingRelDeltaOnAbsorbedFraction: dAbs,
        dtHalvingRelDeltaOnPerClickImpulse: dClick,
        cellClean:
          base != null &&
          (base.substepWitness.maxRelativeSpread == null ||
            base.substepWitness.maxRelativeSpread <= DECLARED.row8.witnessSpreadClean) &&
          dAbs != null &&
          dAbs <= DECLARED.row8.dtHalvingClean &&
          (dClick == null || dClick <= DECLARED.row8.dtHalvingClean),
        dtWitnessRow: w,
      };
    });
    const conf = mapState.results["rcstar"] ?? null;
    const confW = mapState.results["rcstar-dtw"] ?? null;
    const confDelta = dtDelta(conf, confW);
    const cleanRow = (r, delta, deltaClick) =>
      r != null &&
      (r.substepWitness.maxRelativeSpread == null ||
        r.substepWitness.maxRelativeSpread <= DECLARED.row8.witnessSpreadClean) &&
      delta != null &&
      delta <= DECLARED.row8.dtHalvingClean &&
      (deltaClick == null || deltaClick <= DECLARED.row8.dtHalvingClean);
    let witnessesClean = null;
    if (marginal.found) {
      const bracketRows = marginal.bracket.map((rc) => {
        const k = grid.indexOf(rc);
        return {
          row: mapState.results[`rc${k}`],
          delta: dtDelta(mapState.results[`rc${k}`], mapState.results[`rc${k}-dtw`]),
          deltaClick: dtDeltaPerClick(mapState.results[`rc${k}`], mapState.results[`rc${k}-dtw`]),
        };
      });
      witnessesClean =
        cleanRow(conf, confDelta, dtDeltaPerClick(conf, confW)) &&
        bracketRows.every((b) => cleanRow(b.row, b.delta, b.deltaClick));
    }
    const mapReport = {
      schema: SCHEMA,
      handoffPacketRef: HANDOFF_PACKET_REF,
      mode: impulseMapMode
        ? "row8b_impulse_resolved_stratum_map_no_release"
        : "row8_stratum_map_pre_release_obligation",
      declared: DECLARED,
      seedRecord: {
        kappaStarNative: seed.kappaStar,
        kappaStarFitted: seed.kappaStarFitted ?? seed.kappaStar,
        globalRelResidualNative: seed.globalRelResidual,
        supportRatios: seed.supportRatios,
        bareStabilityGate: bareGateBlock,
        candidateRow: DECLARED.candidateRow,
      },
      softReference: mapState.results["soft-reference"],
      gridRows: gridBlock,
      marginalCell: {
        ...marginal,
        confirmationRow: conf,
        confirmationDtWitnessRow: confW,
        confirmationDtHalvingRelDelta: confDelta,
        witnessesClean,
        witnessSpreadCleanDeclared: DECLARED.row8.witnessSpreadClean,
        dtHalvingCleanDeclared: DECLARED.row8.dtHalvingClean,
        scopedNegative: !marginal.found || witnessesClean === false,
      },
      guardWitness: impulseMapMode
        ? (() => {
            const base = mapState.results[`rc${grid.indexOf(0.050397)}`];
            const gw = mapState.results["rc-guard-witness"];
            if (!base || !gw) return null;
            const b = base.absorbedPumpFractionPerRotation;
            const g = gw.absorbedPumpFractionPerRotation;
            return {
              rhoC: 0.050397,
              dsGuardBase: base.dsGuardEffective ?? DECLARED.chart.impulse.dsGuard,
              dsGuardWitness: gw.dsGuardEffective,
              absorbedBase: b,
              absorbedGuardHalved: g,
              relDelta:
                Number.isFinite(b) && Number.isFinite(g)
                  ? Math.abs(g - b) / Math.max(Math.abs(b), 1e-9)
                  : null,
            };
          })()
        : null,
      outOfSpanExtrapolation: outOfSpanExtrapolation
        ? {
            ...outOfSpanExtrapolation,
            note:
              `report-only d0 quantification: the absorbed-fraction crossing sits OUTSIDE the declared span [${grid[0]}, ${grid[grid.length - 1]}]; NOT a release site — the scoped negative stands on the tabled span`,
            probeRow: mapState.results["rcx"] ?? null,
            probeDtWitnessRow: mapState.results["rcx-dtw"] ?? null,
            probeDtHalvingRelDelta: dtDelta(mapState.results["rcx"], mapState.results["rcx-dtw"]),
          }
        : null,
      failClosed: FAIL_CLOSED,
      elapsedSeconds: (Date.now() - t0) / 1000,
    };
    fs.writeFileSync(path.join(outDir, outName), JSON.stringify(mapReport, null, 1));
    process.stderr.write(
      `[map:done] marginal found=${marginal.found} rhoCStar=${marginal.rhoCStar ?? "none"} ` +
        `witnessesClean=${witnessesClean} scopedNegative=${mapReport.marginalCell.scopedNegative}\n`
    );
    process.stdout.write(
      JSON.stringify(
        {
          schema: SCHEMA,
          mode: impulseMapMode ? "row8b_impulse_resolved_stratum_map" : "row8_stratum_map",
          marginalCell: {
            found: marginal.found,
            rhoCStar: marginal.rhoCStar,
            bracket: marginal.bracket,
            witnessesClean,
            scopedNegative: mapReport.marginalCell.scopedNegative,
          },
          reportPath: path.join(outDir, outName),
          ...FAIL_CLOSED,
        },
        null,
        1
      ) + "\n"
    );
    process.exit(0);
  }

  // ------------------------------------------------------------------------
  // Escapement-under-tilt projection (--tilt-projection): the Section 63
  // composition target. Runs INSTEAD of a release; flips no acceptance flag.
  // Cells: declared comparison strata (CLI --tp-rc=a,b,c). Witness rows on
  // the FIRST cell: rate step halved (linearity), readouts doubled (cycle
  // sampling), quadrature doubled (booking independence).
  // ------------------------------------------------------------------------
  if (tiltProjectionMode) {
    const loadJson = (p) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null);
    const tpStatePath = path.join(outDir, `tilt-projection-results-${tag}.json`);
    const tpState = loadJson(tpStatePath) ?? { results: {} };
    const rcArg = process.argv.find((a) => a.startsWith("--tp-rc="))?.slice(8);
    const rcList = rcArg
      ? rcArg.split(",").map(Number).filter(Number.isFinite)
      : [0.022, 0.08, 0.112];
    const tp = DECLARED.row8.tiltProjection;
    const cells = [
      ...rcList.map((rc, k) => ({ id: `tp${k}`, args: { rhoC: rc, kappa: seed.kappaStar } })),
      {
        id: "tp0-rate-witness",
        args: { rhoC: rcList[0], kappa: seed.kappaStar, etaDot: tp.etaDotWitness },
      },
      {
        id: "tp0-readout-witness",
        args: { rhoC: rcList[0], kappa: seed.kappaStar, readouts: tp.readoutsWitness },
      },
      {
        id: "tp0-quadrature-witness",
        args: {
          rhoC: rcList[0],
          kappa: seed.kappaStar,
          atol: DECLARED.chart.impulse.atol * DECLARED.chart.impulse.witnessTolFactor,
          rtol: DECLARED.chart.impulse.rtol * DECLARED.chart.impulse.witnessTolFactor,
          dsGuard: DECLARED.chart.impulse.dsGuard * DECLARED.chart.impulse.witnessGuardFactor,
        },
      },
    ];
    for (const cell of cells) {
      if (tpState.results[cell.id]) continue;
      if (Date.now() - t0 > budgetMs) {
        process.stderr.write(`[chunk] tilt-projection budget exhausted before ${cell.id}; rerun to resume\n`);
        process.exit(0);
      }
      const res = escapementUnderTiltProjection(cell.args);
      tpState.results[cell.id] = res;
      fs.writeFileSync(tpStatePath, JSON.stringify(tpState));
      process.stderr.write(
        `[tp] ${cell.id} rhoC=${res.rhoC} etaDot=${res.etaDot} Nt=${res.readouts} ` +
          `PclickXX=${res.PclickXX.toExponential(4)} baselineTx=${res.baselineTx.toExponential(2)} ` +
          `events(+/-/0)=${res.clickEventsSeen.plus}/${res.clickEventsSeen.minus}/${res.clickEventsSeen.base}\n`
      );
    }
    const report = {
      schema: SCHEMA,
      handoffPacketRef: HANDOFF_PACKET_REF,
      mode: "row8b_escapement_under_tilt_projection_no_release",
      declared: { tiltProjection: tp, chartImpulse: DECLARED.chart.impulse },
      seedRecord: {
        kappaStarNative: seed.kappaStar,
        bareStabilityGate: bareGateBlock,
        candidateRow: DECLARED.candidateRow,
      },
      cells: tpState.results,
      failClosed: FAIL_CLOSED,
      elapsedSeconds: (Date.now() - t0) / 1000,
    };
    fs.writeFileSync(path.join(outDir, outName), JSON.stringify(report, null, 1));
    process.stdout.write(
      JSON.stringify(
        {
          schema: SCHEMA,
          mode: "row8b_escapement_under_tilt_projection",
          cells: Object.fromEntries(
            Object.entries(tpState.results).map(([k, v]) => [
              k,
              { rhoC: v.rhoC, PclickXX: v.PclickXX, dampingSupplyFractionOfDStar: v.dampingSupplyFractionOfDStar },
            ])
          ),
          dStarIsotropic: tp.dStarIsotropic,
          reportPath: path.join(outDir, outName),
          ...FAIL_CLOSED,
        },
        null,
        1
      ) + "\n"
    );
    process.exit(0);
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
  // Candidate Row 8 claim-contract blocks (packet Row 8, release protocol):
  // separable verdict channels (dispersal clock vs flutter clock), rail
  // residence, absorbed pump fraction along the release, h_act clicks per
  // rotation vs the kinematic bound, and the implied-d0 row (the primary
  // claim: rail residence by marginal absorption converts the coincidence
  // stratum from a declared regulator into a derived persistence requirement).
  const row8Block = (() => {
    if (!DECLARED.row8.enabled) return null;
    const dt = DECLARED.timeStep;
    const duration = main.diag.length ? main.diag[main.diag.length - 1].t + dt : 0;
    const rotationsCompleted = duration / TWO_PI;
    const tanSum = main.chartLedger ? main.chartLedger.totalBookedTangentialImpulse : 0;
    const band = DECLARED.row8.railResidenceBand;
    let inBand = 0;
    let bMin = Infinity;
    let bMax = -Infinity;
    for (const d of main.diag) {
      if (Math.abs(d.betaM - 1) <= band) inBand += 1;
      bMin = Math.min(bMin, d.betaM);
      bMax = Math.max(bMax, d.betaM);
    }
    const flutterHit = main.diag.find(
      (d) => d.axisRow && d.axisRow.axisTiltDeg >= DECLARED.row8.flutterClockDeg
    );
    const tiltAt = (tRef) => {
      const row = main.diag.find((d) => d.t >= tRef && d.axisRow);
      return row ? row.axisRow.axisTiltDeg : null;
    };
    const clicksPerRotation =
      rotationsCompleted > 0 ? main.clickLedger.totalTransitions / rotationsCompleted : null;
    const rhoCStar = DECLARED.coincidenceStratum;
    return {
      claimContractRef:
        "handoff packet Candidate Row 8 (marginal-stratum release; d0-from-survival)",
      verdictChannels: {
        dispersalClockRotations: (() => {
          const hit = main.diag.find(
            (d) => d.maxShapeDeviation > DECLARED.tubeRadiusForShapeQuestion
          );
          return hit ? hit.t / TWO_PI : null;
        })(),
        flutterClockRotations: flutterHit ? flutterHit.t / TWO_PI : null,
        flutterClockAngleDeg: DECLARED.row8.flutterClockDeg,
        nutationAtT02Deg: tiltAt(0.2),
        nutationAtT10Deg: tiltAt(1.0),
        row7References: { tubeLossRotations: 0.113, nutationAtT10Deg: 7.8 },
      },
      absorbedPumpFractionPerRotation:
        duration > 0 ? -tanSum / duration / DECLARED.row8.pumpDeclared : null,
      pumpDeclared: DECLARED.row8.pumpDeclared,
      pumpInBuildGate: bareGateBlock ? bareGateBlock.tangential.railPumpM : null,
      railResidence: {
        band,
        fractionInBand: main.diag.length ? inBand / main.diag.length : null,
        huntingBand: [Number.isFinite(bMin) ? bMin : null, Number.isFinite(bMax) ? bMax : null],
        railCrossings: main.railCrossings.length,
        row7OverAbsorptionReference: "rho_c=0.05 hunting band 0.78-0.99 (Section 60)",
      },
      hActRow: {
        clicksPerRotation,
        kinematicBoundPerRotation: DECLARED.row8.clickBoundPerRotation,
        clicksOverBound:
          clicksPerRotation != null
            ? clicksPerRotation / DECLARED.row8.clickBoundPerRotation
            : null,
      },
      impliedD0: {
        rhoCStarReleaseBooking: rhoCStar,
        units: "R_M = 1 release units",
        overReqDerivedSize: bareGateBlock ? rhoCStar / bareGateBlock.ReqOverKappa : null,
        timesKappaEq: bareGateBlock ? rhoCStar * bareGateBlock.kappaRelease : null,
        declaredD0Note:
          "declared d0 = R_MCB (2026-07-08 operator declaration; exact value open) — the marginal stratum is the run-derived persistence requirement to report against it",
      },
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
        DECLARED.candidateRow === 7 || DECLARED.candidateRow === 8
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
      row8: row8Block,
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
