import test from "node:test";
import assert from "node:assert/strict";
import {
  supportRatios, tangentialLedger, searchTangentialClosure, capCreditProxy,
  seaRowsTruePlacement, cageReciprocity, TANGENTIAL_CLOSURE_V2, SELF_CONSISTENT_V3,
  OCTAHEDRAL_CAGE_V4, SEA_BOOKING_S50, FAIL_CLOSED,
  angularMomentumFlowLedger, complexEscapementReduced, coupledComplexFixedPoint,
  brokenSymmetryTransportGate, internalDeformationPencil,
  globalDrainShortfall, seaTiltDampingEstimate, coOrbitalCageSink,
  nativeSaturatedCageDrain, selfTorqueMemoryDepth, farFieldAngularMomentumFlux,
  boundInternalBalance, magneticAnalogFarFieldFlux,
  integrateMagneticAngularMomentumFlux, outgoingHelicalMagneticPositiveControl,
  wholeBraidNetSelfTorque,
  certifiedCausalRoots, stressAngularMomentumFluxQuadrature,
  analyticOutgoingRadiatorB, analyticBoundNearFieldB,
  correctedRadiationInstrument, honestNetSelfTorque,
  canonicalMagneticFarFieldFlux,
  braidNetZTorque, freeBraidTorqueNullSearch,
  braidPerOmegaEvaluate, braidClosureRigidity, perLayerOmegaTorqueNullSearch,
  globalDrainDynamicalSea,
  gyroscopicTiltAnalysisFull, interleavedFlutterPoint, interleavingFlutterSweep, fourPiReturnProbe,
  nonlinearFlutterSaturationAnalysis,
  sameRecordWakeAngularMomentumWard, balancedCellTransportKernel,
} from "../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs";
import { nearFieldReadout } from "../scripts/braid-ideal/positional-sea-breathing-margin-instrument.mjs";

const d = Math.PI / 180;
// Support-candidate v1 (Section 36): found by the support-first search after opening
// the inner-azimuth knob thetaI (never a knob in the closure-first searches).
export const SUPPORT_V1 = { qI: 0.462, qO: 1.236, alphaI: -10.44 * d, alphaM: -2.67 * d, alphaO: 84 * d, thetaO: 337.04 * d, thetaI: -23.7 * d };

test("baseline validation: champion support ratios reproduce the native seed rows", () => {
  const r = supportRatios({});
  assert.ok(Math.abs(r.ratios.I - 0.90) < 0.02, `I ${r.ratios.I}`);
  assert.ok(Math.abs(r.ratios.M - 0.755) < 0.02, `M ${r.ratios.M}`);
  assert.ok(Math.abs(r.ratios.O - 0.53) < 0.02, `O ${r.ratios.O}`);
});

test("support-candidate v1: all layers above 0.85, closure BELOW the old champion (co-improvement)", () => {
  const r = supportRatios({ geo: SUPPORT_V1 });
  assert.ok(r.minRatio > 0.85, `minRatio ${r.minRatio}`);
  assert.ok(r.ratios.I > 0.94 && r.ratios.O > 0.96, "inner and outer near full support");
  assert.ok(r.closure < 0.35, `closure ${r.closure} beats the 0.4721/0.4531 champion line`);
});

test("static toy sea is not the support fix: named spacing negligible, closer sea harmful", () => {
  const bare = supportRatios({ geo: SUPPORT_V1 });
  const named = supportRatios({ geo: SUPPORT_V1, sea: { Rsea: 4.25, sepSea: 0.5 } });
  const close = supportRatios({ geo: SUPPORT_V1, sea: { Rsea: 2.0, sepSea: 0.8 } });
  assert.ok(Math.abs(named.ratios.M - bare.ratios.M) < 0.01, "named spacing negligible on the middle");
  assert.ok(close.objective > bare.objective, "close static sea degrades the support objective");
});

// --- Tangential-closure search (item 25 follow-on; spec Section 51 by title) ---

test("v1 tangential ledger: the single-time booking reproduces the -0.218 inner brake and the ledger fails", () => {
  const rows = supportRatios({ geo: SUPPORT_V1 });
  assert.ok(Math.abs(rows.tanRows.I - (-0.218)) < 0.005, `tau_I ${rows.tanRows.I}`);
  const led = tangentialLedger(rows);
  assert.ok(led.pen.I > 0, "inner brake beyond the sea's 0.12 feed cap");
  assert.equal(led.ledgerCloses, false);
});

test("TANGENTIAL-CLOSURE V2: bare I/M close with the inner brake ELIMINATED; the residual is the caps", () => {
  const rows = supportRatios({ geo: TANGENTIAL_CLOSURE_V2 });
  assert.ok(rows.ratios.I > 0.99, `I ${rows.ratios.I}`);
  assert.ok(rows.ratios.M > 0.98, `M ${rows.ratios.M}`);
  assert.ok(Math.abs(rows.tanRows.I) < 0.01, `tau_I ${rows.tanRows.I} (the Rows 1-4 blocker, gone in geometry)`);
  assert.ok(Math.abs(rows.tanRows.O) < 0.01, `tau_O ${rows.tanRows.O}`);
  assert.ok(Math.abs(rows.ratios.O - 0.50) < 0.03, `bare cap support ${rows.ratios.O} — the single residual number`);
  assert.ok(rows.closure < 0.30, `closure ${rows.closure} — new family best`);
  // ledger closes at the matched credit, fails at the Section 50 primary booking
  assert.equal(tangentialLedger(rows, { seaO: 0.5 }).ledgerCloses, true);
  assert.equal(tangentialLedger(rows, { seaO: SEA_BOOKING_S50.seaO }).ledgerCloses, false);
});

test("the cap credit is geometry-coupled: V2's claim-grade credit collapses relative to v1's (no constant booking)", () => {
  const v2 = nearFieldReadout({ geo: TANGENTIAL_CLOSURE_V2, spacings: [3.4], Nphi: 4 }).spacingRows[0];
  const v1 = nearFieldReadout({ geo: SUPPORT_V1, spacings: [3.4], Nphi: 4 }).spacingRows[0];
  assert.ok(2 * v1.radO_pair_frozen > 0.3, `v1 credit ${2 * v1.radO_pair_frozen}`);
  assert.ok(2 * v2.radO_pair_frozen < 0.1, `V2 credit ${2 * v2.radO_pair_frozen} — hypersensitive to cap geometry`);
});

test("search wiring: freeze list removes knobs; the coordinate descent improves the ledger objective from v1", () => {
  const r = searchTangentialClosure({ rounds: 1, freeze: ["alphaO", "alphaM"] });
  assert.equal(r.best.geo.alphaO, SUPPORT_V1.alphaO, "frozen knob untouched");
  assert.equal(r.best.geo.alphaM, SUPPORT_V1.alphaM, "frozen knob untouched");
  const v1J = tangentialLedger(supportRatios({ geo: SUPPORT_V1 })).J;
  assert.ok(r.best.J < v1J, `objective improved ${r.best.J} < ${v1J}`);
});

// --- Self-consistent cap-credit fixed point (spec Section 52 by title) ---

test("credit proxy anchors to the Section 50 instrument at v1, and the Nt-aliasing trap is pinned", () => {
  const c = capCreditProxy({ geo: SUPPORT_V1, a: 3.4 });
  assert.ok(Math.abs(c.credit - 0.42) < 0.02, `proxy credit at v1/3.4: ${c.credit} (instrument 0.42)`);
  // the coarse slow-limit average can alias at close spacings on some cells:
  // per-cell instrument verification is mandatory before citing a credit
  const fine = capCreditProxy({ geo: SELF_CONSISTENT_V3.geo, a: SELF_CONSISTENT_V3.aSea, Nt: 48 });
  assert.ok(Math.abs(fine.credit - SELF_CONSISTENT_V3.creditVerified) < 0.01,
    `converged proxy ${fine.credit} vs verified ${SELF_CONSISTENT_V3.creditVerified}`);
});

test("SELF-CONSISTENT V3: bare I/M close with tau ~ 0; the verified credit puts ALL layers in the corridor", () => {
  const rows = supportRatios({ geo: SELF_CONSISTENT_V3.geo });
  assert.ok(rows.ratios.I > 0.99 && rows.ratios.I < 1.02, `I ${rows.ratios.I}`);
  assert.ok(rows.ratios.M > 0.99 && rows.ratios.M < 1.02, `M ${rows.ratios.M}`);
  assert.ok(Math.abs(rows.tanRows.I) < 0.01, `tau_I ${rows.tanRows.I} (no sea feed needed: static sea, no waves, no lag)`);
  assert.ok(Math.abs(rows.tanRows.O) < 0.015, `tau_O ${rows.tanRows.O}`);
  assert.ok(rows.closure < 0.22, `closure ${rows.closure} (family record)`);
  const led = tangentialLedger(rows, { seaO: SELF_CONSISTENT_V3.creditVerified, capTan: 0.01 });
  assert.equal(led.ledgerCloses, true, "ledger closes at the instrument-verified credit");
  const dressed = { I: rows.ratios.I - 0.0013, M: rows.ratios.M - 0.0023, O: rows.ratios.O + SELF_CONSISTENT_V3.creditVerified };
  for (const L of ["I", "M", "O"]) assert.ok(dressed[L] > 0.97 && dressed[L] < 1.03, `dressed ${L} ${dressed[L]} in corridor`);
});

test("V3 credit verifies on the claim instrument (frozen-pair, dt-stable)", () => {
  const row = nearFieldReadout({ geo: SELF_CONSISTENT_V3.geo, spacings: [SELF_CONSISTENT_V3.aSea], Nphi: 4 }).spacingRows[0];
  assert.ok(Math.abs(2 * row.radO_pair_frozen - SELF_CONSISTENT_V3.creditVerified) < 0.005,
    `instrument credit ${2 * row.radO_pair_frozen} vs ${SELF_CONSISTENT_V3.creditVerified}`);
  assert.ok(Math.abs(2 * row.radI_pair_frozen) < 0.005 && Math.abs(2 * row.radM_pair_frozen) < 0.005,
    "the static sea leaves I and M untaxed at claim grade");
});

// --- True-placement, axis-declared credit (spec Section 54 by title) ---

test("true placement reproduces the Row 5 rejection: FCC first shell cannot hold the caps and taxes the middle", () => {
  const f1 = seaRowsTruePlacement({ geo: SELF_CONSISTENT_V3.geo, a: 2.453, shells: ["first"] });
  assert.ok(f1.rows.O < 0, `FCC1 O credit ${f1.rows.O} (native found -0.034)`);
  assert.ok(f1.rows.M < -0.01, `FCC1 middle tax ${f1.rows.M} (mid-latitude sites tax the rail layer)`);
});

test("OCTAHEDRAL-CAGE V4: no FCC combination closes, but the axis-covering cage does — all totals in corridor, dt-exact", () => {
  const geo = OCTAHEDRAL_CAGE_V4.geo, a = OCTAHEDRAL_CAGE_V4.aLattice;
  const bare = supportRatios({ geo });
  const sea16 = seaRowsTruePlacement({ geo, a, shells: ["secondAxial"], Nt: 16 });
  const sea32 = seaRowsTruePlacement({ geo, a, shells: ["secondAxial"], Nt: 32 });
  for (const L of ["I", "M", "O"]) {
    assert.ok(Math.abs(sea16.rows[L] - sea32.rows[L]) < 1e-3, `dt witness ${L}`);
    const total = bare.ratios[L] + sea16.rows[L];
    assert.ok(total > 0.97 && total < 1.03, `total ${L} ${total} in corridor`);
  }
  assert.ok(Math.abs(bare.tanRows.I) < 0.01 && Math.abs(bare.tanRows.O) < 0.01, "static-sea compatible: no tangential feed needed");
  assert.ok(sea16.polarFractionO > 1, `axis-declared: polar pair carries the credit (${sea16.polarFractionO})`);
  // the FCC1+FCC2 combination stays short (FCC1's middle tax loses the corridor)
  const both = seaRowsTruePlacement({ geo: SELF_CONSISTENT_V3.geo, a: 2.573, shells: ["first", "secondAxial"] });
  const bareV3 = supportRatios({ geo: SELF_CONSISTENT_V3.geo });
  assert.ok(bareV3.ratios.O + both.rows.O < 0.97, "FCC1+FCC2 cannot reach the cap corridor at V3-class geometry");
});

test("CAGE RECIPROCITY (Row 6 gate): orientation torque-equilibrated; the polar pair carries the credit's Newton-pair as declared strain", () => {
  const r = cageReciprocity({ Nt: 24 });
  const pol = r.rows.find((x) => x.polar);
  assert.ok(r.maxTorque < 0.01, `slow-limit orientation is torque-equilibrated (${r.maxTorque})`);
  assert.ok(pol.FradOverNeedO < -0.4 && pol.FradOverNeedO > -0.9,
    `polar member inward pull ${pol.FradOverNeedO} of the corridor scale (dt-stable; the cap credit's reaction)`);
  const r48 = cageReciprocity({ Nt: 48 });
  const pol48 = r48.rows.find((x) => x.polar);
  assert.ok(Math.abs(pol.FradOverNeedO - pol48.FradOverNeedO) < 0.01, "polar row dt-stable");
});

test("STABILITY MATRIX: dressed V4 is an equilibrium WITHOUT a basin (the native Row 6 mechanism); the bare radial block IS a basin", async () => {
  const { radialStabilityMatrix } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  const dressed = radialStabilityMatrix({});
  assert.equal(dressed.basin, false);
  assert.ok(dressed.maxEig > 0.5, `positive eigenvalue ${dressed.maxEig}`);
  // escape direction dominated by the (rO, aCage) block — the native capture mode
  const v = dressed.escapeDirection;
  assert.ok(Math.abs(v[2]) + Math.abs(v[3]) > 0.8 * Math.hypot(...v),
    `escape direction is the cap-cage mode: ${v.map((x) => x.toFixed(2))}`);
  const bare = radialStabilityMatrix({ withCage: false });
  assert.equal(bare.basin, true, "bare radial displacements are restoring");
  assert.ok(bare.seedNetForces[2] < -0.1, `bare cap carries net inward force ${bare.seedNetForces[2]} (contraction, not dispersal)`);
});

test("RAIL-PINNED EQUILIBRIUM: the speed pin is also the size pin — the bare braid self-equilibrates with a basin", async () => {
  const { railPinnedEquilibrium, SELF_EQUILIBRATED_V5, supportRatios: sr } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  const eq = railPinnedEquilibrium({ geo: SELF_EQUILIBRATED_V5.geo });
  assert.ok(Math.max(...eq.residualF.map(Math.abs)) < 1e-3, `radial residual ${eq.residualF}`);
  assert.equal(eq.basin, true, "fully restoring rail-pinned spectrum");
  assert.ok(eq.railPinnedSpectrum.every((v) => v < 0), `spectrum ${eq.railPinnedSpectrum}`);
  const rows = sr({ geo: { ...SELF_EQUILIBRATED_V5.geo, qI: eq.shapeEq.qI, qO: eq.shapeEq.qO } });
  assert.ok(Math.abs(rows.tanRows.I) < 0.02 && Math.abs(rows.tanRows.O) < 0.02,
    `tangential ledger closed at the fixed point: ${rows.tanRows.I}, ${rows.tanRows.O}`);
  const ReqOverKappa = eq.lambda / eq.kappaFrozen;
  assert.ok(ReqOverKappa > 2 && ReqOverKappa < 5,
    `derived size constant R_eq ~ ${ReqOverKappa} kappa*eps^2/c_f^2 (kappa-scale, above the d0 floor)`);
});

test("TILT BLOCK at V5: global tilt is an exact null (isotropy witness); relative tilts are restoring", async () => {
  const { tiltStiffness } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  const r = tiltStiffness({ Nt: 8 });
  assert.ok(r.globalNullOk, `global-mode residual ${r.globalModeResidual} (isotropy null)`);
  assert.ok(r.restoringRelative, `relative-tilt eigenvalues ${JSON.stringify(r.relativeEigen)}`);
  assert.ok(r.relativeEigen.every((e) => e.re < -0.05), "both relative modes clearly restoring");
});

test("GYROSCOPIC-CIRCULATORY axis analysis at V5: validation rows, exact global-pair deflation, FLUTTER verdict, dt witness", async () => {
  const { gyroscopicTiltAnalysis, tiltStiffness } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  const r = gyroscopicTiltAnalysis({ Nt: 8 });
  // validation rows built into the physics
  assert.ok(r.baselineTransverse < 1e-10, `tilt equilibrium automatic: baseline transverse torques ${r.baselineTransverse}`);
  assert.ok(r.covarianceWitness.EminusA < 1e-10 && r.covarianceWitness.DplusB < 1e-10,
    "cycle-averaged response is z-rotation covariant (E ~ A, D ~ -B)");
  assert.ok(r.globalNull.A < 1e-10, `x-x block global null (Section 59 isotropy witness) ${r.globalNull.A}`);
  assert.ok(r.globalNull.pumpWitness < 0.005,
    `cross-block row sums equal the baseline layer z-torques (the pump entering the axis sector): ${r.globalNull.pumpWitness}`);
  // the x-x block reproduces the Section 59 tilt block (same evaluator)
  const t = tiltStiffness({ Nt: 8 });
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++)
    assert.ok(Math.abs(r.blocks.A[i][j] - t.K[i][j]) < 1e-9, "A block == tiltStiffness K");
  // quotient discipline: exact global-tilt double zero root, deflated
  assert.ok(r.globalPairDeflated.every((p) => Math.hypot(p.re, p.im) < 1e-3),
    `global pair at numerical zero: ${JSON.stringify(r.globalPairDeflated)}`);
  assert.equal(r.quotientEigenvalues.length, 10);
  // the verdict: FLUTTER — a growing whirl pair; restoring K did not survive G + circulatory coupling
  assert.ok(r.flutter, "flutter-class instability present at V5");
  assert.ok(Math.abs(r.maxGrowthRate - 0.183) < 0.02, `max growth rate ${r.maxGrowthRate}`);
  assert.ok(Math.abs(r.maxGrowthWhirlFrequency - 0.382) < 0.02, `whirl frequency ${r.maxGrowthWhirlFrequency}`);
  // mode shape: middle-dominated with strong inner participation (the Section 59
  // inner-tilt -> middle-torque pathway), outer nearly a spectator
  const amp = Object.fromEntries(r.flutterModeShape.map((s) => [s.layer, s.amplitude]));
  assert.ok(amp.M === 1 && amp.I > 0.4 && amp.O < amp.I, `mode shape ${JSON.stringify(r.flutterModeShape)}`);
  assert.ok(r.dkResidual < 1e-10, `eigenvalue solve converged ${r.dkResidual}`);
  // dt witness: doubling the cycle sampling does not move the verdict rows
  const w = gyroscopicTiltAnalysis({ Nt: 16 });
  assert.ok(Math.abs(w.maxGrowthRate - r.maxGrowthRate) < 1e-3, "Nt 8/16 growth rate identical");
  assert.ok(Math.abs(w.maxGrowthWhirlFrequency - r.maxGrowthWhirlFrequency) < 1e-3, "Nt 8/16 whirl frequency identical");
});

test("GYROSCOPIC-CIRCULATORY pump-absorbed counterfactual: the axis sector is independently unstable", async () => {
  const { gyroscopicTiltAnalysis } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  const r = gyroscopicTiltAnalysis({ Nt: 8, pumpAbsorbed: true });
  assert.ok(r.flutter, "flutter persists with the middle's rail-pump transport removed");
  assert.ok(r.maxGrowthRate > 0.2, `pump-absorbed growth rate ${r.maxGrowthRate} (not weaker than the physical cell)`);
});

test("DELAY-MEMORY completed pencil: the measured tilt-rate block is anti-damping and worsens the flutter; verdict stands", async () => {
  const { gyroscopicTiltAnalysisFull } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  const full = gyroscopicTiltAnalysisFull({ Nt: 8 });
  // validation rows
  assert.ok(full.covarianceWitness.staticBlocks < 1e-10 && full.covarianceWitness.rateBlocks < 1e-10,
    "static and rate blocks z-rotation covariant");
  assert.ok(full.globalNull.ok, "global null + pump witness hold with the rate block included");
  assert.ok(full.globalPairDeflated.every((p) => Math.hypot(p.re, p.im) < 1e-3),
    "exact global-tilt double zero unchanged (P(0) = Gamma - K)");
  // the wake tilt-rate response is anti-damping on every layer diagonal
  for (let l = 0; l < 3; l++)
    assert.ok(full.blocks.P[l][l] > 0, `dT_x/d(etaDot_x) diagonal positive (anti-damping) on layer ${l}`);
  // verdict: flutter, worse than the kinematic-transport-only pencil
  const kin = gyroscopicTiltAnalysisFull({ Nt: 8, rateBlockScale: 0 });
  assert.ok(full.flutter && kin.flutter, "flutter in both cells");
  assert.ok(Math.abs(kin.maxGrowthRate - 0.183) < 0.02, `scale-0 cell reproduces the Section 61 verdict (${kin.maxGrowthRate})`);
  assert.ok(full.maxGrowthRate > kin.maxGrowthRate, "measured delay-memory block worsens the growth");
  assert.ok(Math.abs(full.maxGrowthRate - 0.199) < 0.02, `full-pencil max growth ${full.maxGrowthRate}`);
  assert.ok(full.flutterModes.length >= kin.flutterModes.length, "growing-pair count does not decrease");
  assert.ok(full.dkResidual < 1e-10, "eigenvalue solve converged");
});

test("DELAY-MEMORY absorber requirement: order-one isotropic damping needed to close the axis sector", async () => {
  const { gyroscopicTiltAnalysisFull } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  const below = gyroscopicTiltAnalysisFull({ Nt: 8, extraDamping: 0.9 });
  const above = gyroscopicTiltAnalysisFull({ Nt: 8, extraDamping: 1.15 });
  assert.ok(below.maxGrowthRate > 0, `still growing at d=0.9 (${below.maxGrowthRate})`);
  assert.ok(above.maxGrowthRate < 0, `restoring at d=1.15 (${above.maxGrowthRate})`);
});

test("PER-LAYER absorber structure: middle-only damping cannot close the axis sector; escapement + inner/cap damping composes", async () => {
  const { gyroscopicTiltAnalysisFull } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  // middle-only damping at 8x the isotropic requirement still leaves growth:
  // the escapement alone, at ANY strength, is not the axis absorber
  const mid = gyroscopicTiltAnalysisFull({ Nt: 8, extraDampingLayers: [0, 8, 0] });
  assert.ok(mid.maxGrowthRate > 0.05, `middle-only floor ${mid.maxGrowthRate}`);
  // sea-target row: with the click channel at its measured band on the middle
  // (d_M = 3.2), inner+cap damping of 0.5 closes the sector; 0.4 does not
  const closed = gyroscopicTiltAnalysisFull({ Nt: 8, extraDampingLayers: [0.5, 3.2, 0.5] });
  const open = gyroscopicTiltAnalysisFull({ Nt: 8, extraDampingLayers: [0.4, 3.2, 0.4] });
  assert.ok(closed.maxGrowthRate < 0, `stabilized at dI=dO=0.5 (${closed.maxGrowthRate})`);
  assert.ok(open.maxGrowthRate > 0, `still growing at dI=dO=0.4 (${open.maxGrowthRate})`);
});

test("OFF-DIAGONAL click route: measured coupling class is an order below requirement and cannot move the flutter", async () => {
  const { clickOffDiagonalEstimate, gyroscopicTiltAnalysisFull } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  const est = clickOffDiagonalEstimate({ Nphi: 16 });
  const inner = est.perLayer.find((p) => p.layer === "I");
  assert.ok(Math.abs(inner.firstHarmonic - 0.289) < 0.05, `inner first harmonic ${inner.firstHarmonic}`);
  assert.ok(est.perLayer.every((p) => p.dOffdiagEstimate < 0.15),
    "all off-diagonal click couplings an order below the ~0.5-class requirement");
  // pencil insensitivity at the estimated class, best structure/sign, with headroom
  const V = Array.from({ length: 6 }, () => Array(6).fill(0));
  V[1][3] = -0.1; V[4][0] = 0.1;
  const withCoupling = gyroscopicTiltAnalysisFull({ Nt: 8, velocityBlockAdd: V });
  const base = gyroscopicTiltAnalysisFull({ Nt: 8 });
  assert.ok(withCoupling.flutter, "flutter unmoved by the off-diagonal click coupling");
  assert.ok(base.maxGrowthRate - withCoupling.maxGrowthRate < 0.02,
    `best-case improvement ${base.maxGrowthRate - withCoupling.maxGrowthRate} is marginal`);
});

test("SEA TILT-DAMPING estimate: band-structured in whirl frequency; inner row starved; best-cell block destabilizes the pencil at any scale", async () => {
  const { seaTiltDampingEstimate, gyroscopicTiltAnalysisFull } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  const r = seaTiltDampingEstimate({ Rsea: 3.4, gamma: 1.0, omegaList: [0.28, 0.46] });
  const low = r.results[0], band = r.results[1];
  // spacing/frequency band structure (causal-delay physics): anti-damping at
  // low whirl frequency, damping in the band near 0.46 at R = 3.4
  assert.ok(low.dSea[1][1] > 0.5, `low-frequency middle row anti-damping (${low.dSea[1][1]})`);
  assert.ok(band.dSea[1][1] < -0.2, `in-band middle row damping (${band.dSea[1][1]})`);
  // the sea starves the inner layer's tilt sector everywhere probed
  assert.ok(Math.abs(low.dSea[0][0]) < 0.06 && Math.abs(band.dSea[0][0]) < 0.06,
    "inner diagonal two orders below the requirement class");
  // pencil verdict: with the native click pump on the middle, inserting the
  // best-cell sea block WORSENS the growth, and more coupling worsens it more
  const insert = (scale) => {
    const V = Array.from({ length: 6 }, () => Array(6).fill(0));
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      V[i][j] = -scale * band.dSea[i][j]; V[3 + i][3 + j] = -scale * band.dSea[i][j];
    }
    return gyroscopicTiltAnalysisFull({ Nt: 8, extraDampingLayers: [0, -0.3, 0], velocityBlockAdd: V }).maxGrowthRate;
  };
  const g0 = insert(0), g1 = insert(1), g3 = insert(3);
  assert.ok(g1 > g0, `sea block at physical scale worsens growth (${g0} -> ${g1})`);
  assert.ok(g3 > g1, `more sea coupling worsens further (${g3})`);
});

// --- DRIFTING FAMILY: moving fixed point V5(u) and the drift axis pencil (spec Section 68) ---

test("DRIFT FIXED POINT: at u=0 reproduces V5; at u=0.2 the moving braid has a rail-pinned radial basin", async () => {
  const { driftFixedPoint, driftSupportRatios, supportRatios: sr, SELF_EQUILIBRATED_V5 } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  // u=0 witness: at matched geometry the drift support ratios reduce to supportRatios
  const rest = sr({ geo: SELF_EQUILIBRATED_V5.geo });
  const d0 = driftSupportRatios({ u: 0, geo: SELF_EQUILIBRATED_V5.geo });
  for (const L of ["I", "M", "O"]) assert.ok(Math.abs(d0.ratios[L] - rest.ratios[L]) < 1e-9, `u=0 ${L} reduces to rest`);
  const fp0 = driftFixedPoint({ u: 0, passes: 2 });
  assert.ok(Math.abs(fp0.ReqOverKappa - 3.494) < 0.05, `u=0 derived size ${fp0.ReqOverKappa} reproduces V5 3.494`);
  assert.equal(fp0.basin, true, "u=0 rail-pinned basin (V5)");
  // u=0.2: a genuine moving fixed point with a radial basin
  const fp2 = driftFixedPoint({ u: 0.2, passes: 3 });
  assert.ok(Math.max(...fp2.residualF.map(Math.abs)) < 1e-3, `radial residual ${fp2.residualF}`);
  assert.equal(fp2.basin, true, "moving rail-pinned radial basin at u=0.2");
  assert.ok(Math.abs(fp2.tanRows.I) < 0.02 && Math.abs(fp2.tanRows.O) < 0.02, `tangential ledger closed at drift: ${fp2.tanRows.I}, ${fp2.tanRows.O}`);
});

test("DRIFT PENCIL at u=0 reproduces the resting completed pencil exactly (§63 witness), with the double null", async () => {
  const { driftAxisPencil, gyroscopicTiltAnalysisFull } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  const rest = gyroscopicTiltAnalysisFull({ Nt: 8 });
  const d0 = driftAxisPencil({ u: 0, Nt: 8 });
  assert.ok(Math.abs(d0.maxGrowthRate - rest.maxGrowthRate) < 1e-6, `u=0 growth ${d0.maxGrowthRate} == resting ${rest.maxGrowthRate}`);
  assert.ok(Math.abs(d0.maxGrowthWhirlFrequency - rest.maxGrowthWhirlFrequency) < 1e-6, "u=0 whirl frequency matches resting");
  // validation rows: z-rotation covariant, pump enters the axis sector, exact double null
  assert.ok(d0.covarianceWitness.staticBlocks < 1e-10, `z-rotation covariant ${d0.covarianceWitness.staticBlocks}`);
  assert.ok(d0.globalNull.pumpWitness < 5e-3, `cross-block row sums = baseline pump ${d0.globalNull.pumpWitness}`);
  assert.equal(d0.nullCount, 2, "u=0 double global-tilt null (isotropy)");
  assert.ok(Math.abs(d0.orientationTorque.kGlobalX) < 5e-3 && Math.abs(d0.orientationTorque.kGlobalY) < 5e-3, "no orientation torque at rest");
  assert.ok(d0.dkResidual < 1e-10, "eigenvalue solve converged");
});

test("DRIFT NULL STRUCTURE: at drift the double null breaks and the orientation torque is restoring, near-isotropic", async () => {
  const { driftAxisPencil } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  const r = driftAxisPencil({ u: 0.35, Nt: 8 });
  assert.equal(r.nullCount, 0, "drift breaks the double global-tilt null");
  assert.ok(r.orientationTorque.restoring, `orientation torque restoring (kGx=${r.orientationTorque.kGlobalX}, kGy=${r.orientationTorque.kGlobalY})`);
  assert.ok(r.orientationTorque.kGlobalX > 0.15, `orientation torque grew with u (kGx=${r.orientationTorque.kGlobalX})`);
  assert.ok(r.orientationTorque.isotropy < 0.15 * r.orientationTorque.kGlobalX + 0.02,
    `near-isotropic (residual axisymmetry about the drift axis): iso=${r.orientationTorque.isotropy}`);
});

test("DRIFT VERDICT: the orientation torque stiffens the GLOBAL axis mode but does NOT stabilize the internal flutter — no restoring u in the basin", async () => {
  const { driftVerdictLadder } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  const ladder = driftVerdictLadder({ uGrid: [0, 0.2, 0.35, 0.5, 0.6], Nt: 8 });
  // orientation torque grows from 0 and peaks in the closure basin
  const k = Object.fromEntries(ladder.rows.map((r) => [r.u, r.kGlobalX]));
  assert.ok(k[0.2] > k[0] && k[0.5] > k[0.2], "orientation torque grows with u");
  assert.ok(k[0.5] > 0.35, `orientation torque reaches the ~0.5 class in the basin (${k[0.5]})`);
  // but every cell still flutters: no threshold crossing anywhere in the basin
  assert.ok(ladder.rows.every((r) => r.maxGrowthRate > 0), "flutter persists at every u in the basin");
  assert.equal(ladder.thresholdU, null, "no u where the axis sector turns restoring");
  assert.equal(ladder.stabilizes, false, "drift does not stabilize the axis sector");
});

test("DRIFT PENCIL: flutter is pump-independent and worsens with the native click pump (as in the resting sector)", async () => {
  const { driftAxisPencil } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  const base = driftAxisPencil({ u: 0.35, Nt: 8 });
  const pump = driftAxisPencil({ u: 0.35, Nt: 8, clickPump: 0.3 });
  const absorbed = driftAxisPencil({ u: 0.35, Nt: 8, pumpAbsorbed: true });
  assert.ok(pump.maxGrowthRate > base.maxGrowthRate, "native click pump worsens the drift flutter");
  assert.ok(absorbed.maxGrowthRate > 0, "flutter persists with the rail pump absorbed (pump-independent, as §61)");
  // Nt witness: the verdict does not move under cycle-sample doubling
  const w = driftAxisPencil({ u: 0.35, Nt: 16 });
  assert.ok(Math.abs(w.maxGrowthRate - base.maxGrowthRate) < 1.5e-2, `Nt 8/16 growth stable ${base.maxGrowthRate} vs ${w.maxGrowthRate}`);
});

// --- Section 68 route (a): the coupled breathing-flutter pencil ---

test("INTERNAL-DEFORMATION PENCIL: the block-diagonal control reproduces the Section 61 flutter and the Section 57 basin", async () => {
  const { internalDeformationPencil, gyroscopicTiltAnalysis } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  const none = internalDeformationPencil({ Nt: 8, coupling: "none" });
  const g = gyroscopicTiltAnalysis({ Nt: 8 });
  // coupling=none block-diagonalizes: the tilt sector must be identical to §61
  assert.ok(Math.abs(none.maxGrowthRate - g.maxGrowthRate) < 1e-6, `decoupled flutter ${none.maxGrowthRate} vs §61 ${g.maxGrowthRate}`);
  assert.ok(Math.abs(none.maxGrowthRate - 0.183) < 0.02, `flutter reproduces §61 (${none.maxGrowthRate})`);
  // the radial sector is the §57 bare basin (all restoring)
  assert.equal(none.radialBasin, true, "radial sector is a basin (§57)");
  assert.ok(none.radialEigen.every((e) => e.value < 0), "all radial eigenvalues restoring");
  assert.ok(none.dkResidual < 1e-10, `degree-18 DK converged (${none.dkResidual})`);
});

test("INTERNAL-DEFORMATION PENCIL: linear cross-blocks vanish by axisymmetry — coupling does NOT flip the flutter (the coupling is parametric)", async () => {
  const { internalDeformationPencil } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  const all = internalDeformationPencil({ Nt: 8, coupling: "all" });
  // selection rule: scalar radial force carries no linear vector-tilt term, and
  // vector tilt-torque no linear scalar-breath term -> both cross-blocks null.
  assert.ok(all.crossBlocks.crtNormRel < 1e-9, `C_rt at the null level (${all.crossBlocks.crtNormRel})`);
  assert.ok(all.crossBlocks.ctrNormRel < 1e-9, `C_tr at the null level (${all.crossBlocks.ctrNormRel})`);
  // so the coupled flutter is the §61 flutter, unshifted, and does NOT flip
  assert.ok(Math.abs(all.flutterShift) < 1e-6, `no linear flutter shift (${all.flutterShift})`);
  assert.equal(all.flip, false, "linear coupling does not turn the flutter restoring");
});

test("BREATHING-ESCAPEMENT (Deliverable 2): the bare braid runs away and no bounded cycle net-damps the flutter", async () => {
  const { breathingEscapementReduced } = await import("../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs");
  // bare measured 2/3 brake: the deficit is un-absorbed -> Row 7 coherent expansion
  const bare = breathingEscapementReduced({});
  assert.equal(bare.bounded, false, "bare braid is not bounded (Row 7 runaway)");
  assert.ok(bare.dispersalTime > 0 && bare.dispersalTime < 40, `disperses (${bare.dispersalTime})`);
  // a bounded state needs an ENVIRONMENT that lifts the brake above the pump
  // (the structured sea) — but even then the flutter is NOT net-damped, because
  // the bounded mean size falls short of gamma0/|dGammaDs|
  const env = breathingEscapementReduced({ speedPinRatio: 2.0, kInv: 0.05 });
  assert.equal(env.bounded, true, "environment (rho>1) bounds the size");
  assert.ok(env.meanS < env.meanSizeNeededForDamp, `mean size ${env.meanS.toFixed(3)} below the ${env.meanSizeNeededForDamp.toFixed(3)} damping threshold`);
  assert.equal(env.fluttrNetDamped, false, "no bounded breathing cycle net-damps the flutter");
});

// --- Coupled braid+sea complex fixed-point instrument (Section 70 reframe) ---

test("am-ledger: the transport-off-equator gate is axisymmetry-forbidden (crtNorm=ctrNorm=0), so the full 1/3-pump deficit escapes", () => {
  const L = angularMomentumFlowLedger({});
  assert.ok(L.gates.transportOffEquatorDC < 1e-4, `transport DC ${L.gates.transportOffEquatorDC} is ~0 (§68a axisymmetry-forbidden)`);
  // pump - self-hit(2/3) = the 1/3 deficit, and none of it leaves the equator
  assert.ok(Math.abs(L.gates.escapeResidual - (1 - 0.667) * 0.2274) < 2e-3, `escape residual ${L.gates.escapeResidual} = the 1/3-pump deficit`);
  assert.ok(Math.abs(L.escapeFractionOfPump - 0.333) < 0.01, `escape fraction ${L.escapeFractionOfPump} ≈ 1/3`);
  assert.equal(L.globalDrainCloses, false, "global drain does not close");
  assert.equal(L.bottleneck, "transport_off_equator_axisymmetry_forbidden");
});

test("am-ledger: the off-equatorial sea drain is inner-starved (<=0.02) and circulatory-dominated (§67)", () => {
  const L = angularMomentumFlowLedger({});
  assert.ok(L.gates.seaDrainOffEquatorInner <= 0.02, `sea inner drain ${L.gates.seaDrainOffEquatorInner} starves the inner (§67 Result 2)`);
  assert.ok(L.seaCirculatoryRatio > 1, `sea block circulatory-dominated (ratio ${L.seaCirculatoryRatio} > 1, §67 Result 3)`);
});

test("am-ledger block-diagonal control (coupling=none) reproduces the same escape residual — the composition is transparent", () => {
  const L = angularMomentumFlowLedger({ coupling: "all" });
  const none = angularMomentumFlowLedger({ coupling: "none" });
  assert.ok(Math.abs(L.gates.escapeResidual - none.gates.escapeResidual) < 1e-6, "coupling on/off give the same escape (transport gate is null either way)");
  assert.equal(none.bottleneck, "transport_off_equator_axisymmetry_forbidden");
});

test("complex-escapement: at MEASURED transport/drain the size mode runs away (Row-7 coherent expansion reproduced)", () => {
  const e = complexEscapementReduced({ transportDC: 0, drainRate: 0.014 });
  assert.equal(e.bounded, false, "measured (transportDC=0, starved drain) → runaway");
  assert.ok(e.dispersalTime != null && e.dispersalTime < 40, `disperses at t≈${e.dispersalTime}`);
  assert.ok(e.drainRate < e.drainNeededToBound, `drain ${e.drainRate} below the ${e.drainNeededToBound} (1/3-pump) needed to bound`);
});

test("complex-escapement POSITIVE control: a hypothetical transport+drain exceeding 1/3 pump DOES bound — the integrator is not rigged", () => {
  // if the transport moved the deficit off-equator AND the drain exceeded it,
  // the size mode would bound. It doesn't in reality (measured values above),
  // but the integrator must be able to bound when the authorities suffice.
  const e = complexEscapementReduced({ transportDC: 1.2, drainRate: 0.5 });
  assert.equal(e.bounded, true, "sufficient transport (fraction>1) + drain bounds the size mode");
});

test("coupledComplexFixedPoint Deliverable 1: global drain does NOT close; coherent expansion survives; bottleneck is the transport gate", () => {
  const r = coupledComplexFixedPoint({ driftU: 0.2 });
  assert.equal(r.verdict, "global_drain_does_not_close_coherent_expansion_survives");
  assert.equal(r.bottleneck, "transport_off_equator_axisymmetry_forbidden");
  assert.ok(Math.abs(r.escapeFractionOfPump - 0.333) < 0.01, `escape fraction ${r.escapeFractionOfPump} ≈ 1/3 of the pump`);
  assert.equal(r.escapement.bounded, false, "the reduced complex escapement runs away");
  assert.equal(r.retainedBranchClaim, false);
});

// --- §72: drift / broken-symmetry cross-block probe (does breaking axisymmetry open the transport gate?) ---

test("broken-symmetry regression: the axisymmetric rest cross-blocks are EXACTLY zero (defaults preserve §68a/§71)", () => {
  const p = internalDeformationPencil({ coupling: "all" }); // u=0, driftAngle=0, baseTilt=0
  assert.ok(p.crossBlocks.crtNorm < 1e-9, `crtNorm ${p.crossBlocks.crtNorm} ~ 0 at rest`);
  assert.ok(p.crossBlocks.ctrNorm < 1e-9, `ctrNorm ${p.crossBlocks.ctrNorm} ~ 0 at rest`);
});

test("broken symmetry OPENS the transport-off-equator gate: oblique drift + anchored axis give nonzero C_rt/C_tr", () => {
  const d = Math.PI / 180;
  const oblique = internalDeformationPencil({ coupling: "all", u: 0.2, driftAngle: 90 * d, baseTilt: 0 });
  assert.ok(oblique.crossBlocks.crtNorm > 0.05, `oblique drift opens C_rt (${oblique.crossBlocks.crtNorm})`);
  const anchored = internalDeformationPencil({ coupling: "all", u: 0.2, driftAngle: 90 * d, baseTilt: 30 * d });
  assert.ok(anchored.crossBlocks.ctrNormRel > 0.3, `anchored-oblique opens C_tr past 0.3 (${anchored.crossBlocks.ctrNormRel})`);
});

test("brokenSymmetryTransportGate: rest closed, broken symmetry opens the gate PAST the 1/3-pump deficit — reframe re-opened", () => {
  const g = brokenSymmetryTransportGate({});
  assert.equal(g.restGateClosed, true, "rest gate closed (§71)");
  assert.equal(g.gateOpensUnderBrokenSymmetry, true, "broken symmetry opens the transport gate");
  assert.equal(g.transportReachesDeficitFraction, true, "the opened transport reaches the 1/3-pump deficit fraction");
  assert.equal(g.verdict, "broken_symmetry_opens_transport_gate_past_deficit_bottleneck_moves_to_sea_drain");
});

test("broken-symmetry ledger: with the gate open the bottleneck MOVES from transport to the inner-starved sea drain", () => {
  const d = Math.PI / 180;
  const L = angularMomentumFlowLedger({ u: 0.35, driftAngle: 90 * d, baseTilt: 30 * d, parametric: false });
  assert.ok(L.gates.transportOffEquatorDC > 0.05, `transport gate open (${L.gates.transportOffEquatorDC})`);
  assert.equal(L.bottleneck, "sea_drain_inner_starved", "bottleneck moved to the drain");
  assert.ok(L.gates.escapeResidual < (1 - 0.667) * 0.2274, "escape residual drops below the full deficit (transport now removes some)");
});

// --- §73: the global drain-shortfall probe (the last gate) ---

test("sea drain regression: baseTilt=0 reproduces the §67 inner-starved damping-band cell", () => {
  const s = seaTiltDampingEstimate({}); // baseTilt=0
  const band = s.results.filter((r) => r.dampingDiagonal);
  const cell = band.reduce((a, b) => (Math.abs(b.diag[0]) > Math.abs(a.diag[0]) ? b : a));
  assert.ok(Math.abs(cell.diag[0]) <= 0.02, `§67 inner starved ${cell.diag[0]}`);
});

test("sea drain does NOT lift when the braid is tilted: the inner-starvation persists (even worsens) at the anchored complex", () => {
  const d = Math.PI / 180;
  const flat = seaTiltDampingEstimate({});
  const tilted = seaTiltDampingEstimate({ baseTilt: 30 * d });
  const innerBand = (s) => { const b = s.results.filter((r) => r.dampingDiagonal); const c = (b.length ? b : s.results).reduce((a, x) => (Math.abs(x.diag[0]) > Math.abs(a.diag[0]) ? x : a)); return Math.abs(c.diag[0]); };
  assert.ok(innerBand(tilted) <= 0.02, `tilted inner drain still starved ${innerBand(tilted)}`);
});

test("globalDrainShortfall: transport opens but the dissipative drain is starved across ALL anchored angles — the complex does NOT close (angle-robust)", () => {
  const g = globalDrainShortfall({});
  assert.equal(g.globalDrainCloses, false, "the global drain does not close");
  assert.equal(g.drainStarvedRobustly, true, "the drain is <=0.02 across every anchored angle");
  assert.equal(g.anchoringRestoringAllConfigs, true, "the §68 anchoring is restoring (an anchored angle exists) — but it does not rescue the drain");
  assert.equal(g.verdict, "drain_starved_at_anchored_complex_transport_opens_but_dissipative_drain_short_reframe_blocked_on_the_drain");
  // every row: transport delivers more than the starved drain can remove
  for (const r of g.rows) assert.ok(r.transported > r.drain, `transport ${r.transported} exceeds drain ${r.drain} at baseTilt ${r.baseTilt}`);
});

// --- §74: the co-orbital-cage angular-momentum-sink probe (the one surviving route) ---

test("co-orbital sink: the STATIC cage (Omega=0) transfers zero secular tangential force (Corollary S c0 cancellation anchor)", () => {
  const g = coOrbitalCageSink({ omegaOrbitFracs: [0], Nper: 4 });
  assert.ok(Math.abs(g.rows[0].secularTangential) < 1e-3, `static secular tangential ~0 (${g.rows[0].secularTangential})`);
});

test("co-orbital sink: co-orbital motion does NOT open a secular tangential sink — stays within the static Corollary-S <=10% bound, far below the residual", () => {
  const g = coOrbitalCageSink({});
  assert.equal(g.beatsStaticCorollaryS_10pct, false, "co-orbital secular tangential stays within the static <=10% bound");
  assert.equal(g.reachesTransportedResidual, false, "does not reach the ~0.044 transported residual");
  assert.ok(g.maxSecularTangentialFracOfPump < 0.10, `max secular tangential ${g.maxSecularTangentialFracOfPump} < 0.10`);
  assert.equal(g.verdict, "co_orbital_cage_secular_tangential_stays_within_static_corollary_s_bound_no_conservative_sink");
});

// --- §75: door (a) native gate — nonlinear/saturable cage back-reaction chi'' ---

test("native drain gate: the nonlinear/saturable orientational response does NOT beat the linear chi'' by ~10x — the multiple is ~1 (saturation caps a bounded rotator)", () => {
  const g = nativeSaturatedCageDrain({});
  assert.ok(g.maxNonlinearMultiple < 1.5, `nonlinear multiple ${g.maxNonlinearMultiple} is O(1), not the ~10x needed`);
  assert.ok(g.maxNonlinearMultiple > 0.5, "and is a genuine response (not degenerate)");
});

test("native drain gate: fails the shortfall even with the BEST-CASE linear anchor, R_perp still runs away — local-sink no-go sealed at native grade", () => {
  const g = nativeSaturatedCageDrain({});
  assert.equal(g.clearsShortfall, false, "native drain below the transported deficit");
  assert.ok(g.nativeDrain < g.transportedTarget, `native drain ${g.nativeDrain} < target ${g.transportedTarget}`);
  assert.equal(g.RperpFlattens, false, "R_perp still expands (S1/S2 does not close)");
  assert.equal(g.verdict, "native_saturated_chi_below_shortfall_local_sink_nogo_sealed_at_native_grade");
});

test("native drain gate: the conservative guard confirms the drain is DISSIPATIVE — gamma->inf (no lag) collapses the drain (§74 lesson)", () => {
  const g = nativeSaturatedCageDrain({});
  const peak = Math.max(...g.cells.map((c) => c.dNl));
  assert.ok(g.conservativeGuardDrain < peak / 2, `gamma->inf drain ${g.conservativeGuardDrain} collapses vs peak ${peak} (dissipative, not conservative)`);
});

// --- §77: the (b) feasibility proxy — net self-torque vs memory depth ---

test("self-torque memory proxy reproduces the §60 near-field pump (+0.227) as the partner roots enter the causal window", () => {
  const g = selfTorqueMemoryDepth({});
  const atDepth1 = g.rows.find((r) => r.dmax >= 1.0);
  assert.ok(Math.abs(atDepth1.net - 0.2274) < 0.02, `pump reproduced ${atDepth1.net} vs +0.2274 (§60 regression)`);
});

test("self-torque memory proxy: the bounded self-interaction CONVERGES flat within ~2R/c_f — NO far-field brake emerges with depth (persistence, hands to the field-flux build)", () => {
  const g = selfTorqueMemoryDepth({});
  assert.equal(g.converged, true, "net self-torque converges");
  assert.equal(g.signChange, false, "no sign change to a brake");
  assert.equal(g.turnsToBrake, false, "does not move toward a brake with depth");
  assert.equal(g.verdict, "self_torque_persists_anti_damping_bounded_self_interaction_no_far_field_brake_hands_to_field_flux_build");
});

// --- §78: the field-momentum-flux build — Φ_∞(r) + the light-cylinder test ---
// REPRODUCIBILITY-ONLY: these two tests pin the §78 probe's SELF-REPORTED numbers so
// the withdrawn code stays runnable and diffable. The §78 PHYSICS verdict ("vanishing
// flux ⇒ reactive residual ⇒ S1/S2 closes") is WITHDRAWN by the §82 audit — the
// electric integrator omits the R·sinθ lever and is unconverged. The load-bearing
// measurement is the §82 `correctedRadiationInstrument` / `canonicalMagneticFarFieldFlux`
// tests below. Do not treat a green here as support for the §78 conclusion.

test("[reproducibility-only; §78 verdict withdrawn by §82] far-field flux: the outgoing-wake angular-momentum flux VANISHES with radius (bound velocity field), it is NOT r-independent radiation", () => {
  const g = farFieldAngularMomentumFlux({ radii: [16, 32, 64, 128, 256], Ntheta: 10, Nphi: 20, Nt: 10 });
  assert.ok(g.endpointSlope < -1.5, `endpoint slope ${g.endpointSlope} ≤ −1.5 (bound; radiation would be ~0)`);
  assert.ok(g.fluxOverResidual < 1e-2, `far flux ${g.fluxOverResidual} ≪ residual — no radiation sink`);
});

test("[reproducibility-only; §78 verdict withdrawn by §82] far-field flux: the light-cylinder verdict — bound field, pin holds, the +0.076 residual is reactive (no far-field sink because no net source)", () => {
  const g = farFieldAngularMomentumFlux({ radii: [16, 32, 64, 128, 256], Ntheta: 10, Nphi: 20, Nt: 10 });
  assert.equal(g.fluxVanishesAtFarField, true);
  assert.equal(g.verdict, "far_field_angular_momentum_flux_vanishes_bound_field_light_cylinder_pin_holds_residual_reactive_S1S2_closes");
});

// --- §79: the bound-field internal angular-momentum balance (S1/S2 closure) ---

test("internal balance: the reactive-vs-drive dichotomy — the §66 near-field DRIVE runs away (Row-7), the §78 REACTIVE residual + §57 basin is bounded", () => {
  const g = boundInternalBalance({});
  assert.equal(g.driveBranch_row7_nearFieldTruncation.bounded, false, "residual as a real secular drive → Row-7 runaway");
  assert.equal(g.reactiveBranch_s78_boundField.bounded, true, "residual reactive (§78) + §57 basin → bounded");
});

test("internal balance (§82 REPAIRED): dichotomy valid, but branch selection is UNDETERMINED (held-seed); kSize is the LIVE §57 rail-pinned least eigenvalue, not the stale 0.25", () => {
  const g = boundInternalBalance({});
  assert.equal(g.dichotomyClean, true, "the reactive-vs-drive dichotomy is clean (reactive bounded, drive runaway)");
  assert.equal(g.branchSelectedByNetSelfTorque, "undetermined_held_seed", "§82: +0.424 is a held-seed diagnostic, not a free-particle drive; field bound on both channels");
  assert.equal(g.s1s2Closes, false, "S1/S2 not closed at this grade");
  // (Defect 7) §57 correction made executable: kSize is the |least rail-pinned eigenvalue| ≈ 0.638, NOT 0.25
  assert.ok(Math.abs(g.kSize - 0.638) < 0.02, `kSize ${g.kSize} is the live §57 rail-pinned least eigenvalue magnitude ≈ 0.638`);
  assert.ok(Math.abs(g.section57LeastEigenvalue + 0.638) < 0.02, `§57 least eigenvalue ${g.section57LeastEigenvalue} ≈ −0.638 (recomputed; −0.635 was a rounding)`);
});

// --- §80: ceiling (i) — the magnetic-analog far-field-flux test ---

test("magnetic-analog flux: the history-generated A_wake reconstruction reports a resolved far-field scaling verdict", () => {
  const g = magneticAnalogFarFieldFlux({ radii: [16, 32, 64, 128, 256] });
  assert.equal(g.claimLevel, "seed_grade_far_field_measurement_declared_effective_reconstruction");
  assert.equal(g.stressTensorChoice, "magnetic_type_Maxwell_Tij_BiBj_minus_one_half_deltaij_B2");
  assert.ok(Number.isFinite(g.magneticFluxEndpointSlope));
  assert.equal(g.magneticFluxIsRadiative, true);
  assert.ok(Math.abs(g.magneticFluxEndpointSlope) < 0.1);
  assert.ok(g.magneticFluxRadialSpreadFraction < 0.1);
  assert.equal(g.verdict, "history_generated_magnetic_analog_carries_constant_far_field_flux_radiation_reaction_channel_exists");
});

test("magnetic-analog flux: the embedded outgoing-helical m=1 positive control carries radius-independent angular momentum flux", () => {
  const g = magneticAnalogFarFieldFlux({ radii: [16, 32, 64, 128, 256] });
  assert.equal(g.positiveControl.passesConstantFlux, true);
  assert.ok(Math.abs(g.positiveControl.endpointSlope) < 0.05);
});

test("magnetic-flux integrator positive control independently resolves constant Phi_mag", () => {
  const radii = [16, 32, 64, 128, 256], omega = 1.1;
  const g = integrateMagneticAngularMomentumFlux({
    radii, Ntheta: 10, Nphi: 20, Nt: 10, period: 2 * Math.PI / omega,
    magneticFieldAt: outgoingHelicalMagneticPositiveControl({ omega }),
  });
  assert.ok(Math.abs(g.endpointSlope) < 0.05, `control slope ${g.endpointSlope} ≈ 0`);
});

// --- §81: whole-braid net self-torque — the conservation check that refutes §79/§80 ---
// REPRODUCIBILITY-ONLY: this test pins the §81 probe's self-reported "+0.14" so the
// withdrawn code stays runnable. The §82 audit showed that value is FABRICATED — it is
// the held-seed partner torque (+0.424) minus the §66 MAXIMUM brake applied
// algebraically (0.667·0.4229), not a measured self-torque. The honest, transient-free,
// complete-certifier measurement is +0.424 (a HELD-SEED diagnostic), asserted by the
// §82 `honestNetSelfTorque` test below. Do not treat this as a free-particle drive.

test("[reproducibility-only; §81 value fabricated, withdrawn by §82] net self-torque: the whole-braid net secular z-torque is NONZERO (the middle pump) — the residual is a REAL drive, not reactive; refutes the §79/§80 closure", () => {
  const g = wholeBraidNetSelfTorque({});
  assert.ok(Math.abs(g.netWithSelfHitBrake) > 0.05, `net self-torque ${g.netWithSelfHitBrake} is nonzero (~+0.14)`);
  assert.equal(g.netIsZero, false);
  assert.equal(g.verdict, "net_self_torque_NONZERO_residual_is_a_real_drive_refutes_s79_s80_reactive_closure_inconsistent_with_s78_vanishing_flux");
  // the net is carried by the middle layer (the rail pump); inner/outer ~0
  assert.ok(Math.abs(g.perLayerZTorque.M) > 0.3 && Math.abs(g.perLayerZTorque.I) < 0.05, "net z-torque concentrated on the middle rail");
});

// --- §82: the CORRECTED radiation / self-torque instrument (audit rebuild). ---
// NOTE: the §78-81 tests above assert the SELF-REPORTED verdicts of the ORIGINAL
// probes, whose physical conclusions were WITHDRAWN by the adversarial audit
// (circular §80, unconverged §78, fabricated §81 self-torque). Those functions
// are retained for reproducibility; the corrected measurement is §82 below.

test("certified causal roots: bracketed bisection asserts a residual tolerance (throws if a root is not converged)", () => {
  const omega = 1.04;
  const posC = (te) => [Math.cos(omega * te), Math.sin(omega * te), 0];
  const r = certifiedCausalRoots([100, 0, 0], posC, 0, { extent: 3, tol: 1e-9 });
  assert.ok(r.roots.length >= 1, "at least one causal root for a far field point");
  assert.ok(r.maxResidual < 1e-9, `root residual ${r.maxResidual} within asserted tolerance`);
  assert.ok(r.roots.every((x) => x < 0), "all roots are causal (emission before reception)");
  assert.equal(r.rootCountStable, true, "root count is stable under scan refinement");
});

// (Defect 2) COMPLETENESS regressions: the repaired certifier detects a TANGENT
// (double) root that a sign-change-only scan misses, and exposes a near-tangent as
// an inactive-root gap (a Jacobian floor), so 'zero residual' can no longer mean
// 'no root detected'.
test("certified roots COMPLETENESS: a TANGENT/double root (g touches 0 without crossing) is detected, not silently dropped", () => {
  // g(te) = (te+1.5)^2 : |pos| = 1.25+(te+1)^2 with X=0, cf=1, t=0 -> g never crosses 0, touches at te=-1.5
  const posT = (te) => [1.25 + (te + 1) ** 2, 0, 0];
  const r = certifiedCausalRoots([0, 0, 0], posT, 0, { extent: 3, tol: 1e-6, jacobianFloor: 1e-2 });
  assert.equal(r.tangentRoots.length, 1, "the double/tangent root is found via g′ bracketing");
  assert.ok(Math.abs(r.tangentRoots[0] + 1.5) < 1e-3, `tangent root at te≈−1.5 (got ${r.tangentRoots[0]})`);
  assert.equal(r.rootCount, 1, "the tangent root is counted (a sign-change-only scan would report 0)");
});

test("certified roots COMPLETENESS: a NEAR-tangent is exposed as an inactive-root gap (Jacobian floor), not a false zero", () => {
  const posN = (te) => [1.25 + 1e-3 + (te + 1) ** 2, 0, 0]; // min |g| ≈ 1e-3 > tol → grazes, no root
  const r = certifiedCausalRoots([0, 0, 0], posN, 0, { extent: 3, tol: 1e-9, jacobianFloor: 1e-2 });
  assert.equal(r.rootCount, 0, "no transverse root");
  assert.equal(r.tangentRoots.length, 0, "no tangent root within tol");
  assert.ok(r.inactiveRootGaps.length >= 1, "the near-tangent is reported as an inactive-root gap");
});

test("stress quadrature CONTROLS: a known outgoing radiator gives slope ≈ 0, a known bound field gives slope ≈ −1 (SAME integrator)", () => {
  const omega = 1.04, radii = [16, 32, 64, 128, 256], period = 2 * Math.PI / omega;
  const rad = stressAngularMomentumFluxQuadrature({ radii, fieldAt: analyticOutgoingRadiatorB({ omega }), period });
  const bnd = stressAngularMomentumFluxQuadrature({ radii, fieldAt: analyticBoundNearFieldB({ omega }), period });
  assert.ok(Math.abs(rad.endpointSlope) < 0.02, `radiator slope ${rad.endpointSlope} ≈ 0 (radius-independent flux)`);
  assert.ok(rad.spread < 0.02, `radiator flux radius-independent (spread ${rad.spread})`);
  assert.ok(Math.abs(bnd.endpointSlope + 1) < 0.05, `bound slope ${bnd.endpointSlope} ≈ −1`);
});

test("corrected instrument (repaired): the full-pipeline control passes, the ELECTRIC channel is BOUND as an interval, and the MAGNETIC channel from the canonical W^rec force is BOUND", () => {
  const g = correctedRadiationInstrument({
    radii: [16, 32, 64], softSweep: [0.02, 0.08], hcSweep: [0.02, 0.04],
    magRadii: [16, 32, 64], magNt: 6, magNtheta: 6, magNphi: 12, Nt: 8, Ntheta: 8, Nphi: 16,
  });
  // (Defect 1) controlsPass now requires BOTH the quadrature controls AND a full-pipeline control
  assert.equal(g.controls.quadratureControls.pass, true, "quadrature+curl controls pass");
  assert.equal(g.controls.fullPipelineControl.pass, true, "full-pipeline control passes (roots+reg+quadrature end-to-end)");
  assert.ok(g.controls.fullPipelineControl.fieldReconstructionMaxRelErr < 1e-2, "reconstructed field matches the exact canonical Coulomb-from-causal-delay field");
  // (D1) end-to-end, not compositional: the SAME pipeline must FLAG an injected 1/r tail
  assert.equal(g.controls.fullPipelineControl.radiativeDetected, true, "radiative positive control: an injected 1/r tail is flagged (flux slope ≈ 0), so controlsPass is end-to-end not bound-only");
  assert.ok(Math.abs(g.controls.fullPipelineControl.radiativeFluxEndpointSlope) < 0.3, "radiative control flux is radius-independent (slope ≈ 0)");
  assert.ok(g.controls.fullPipelineControl.radiativeFluxEndpointSlope > g.controls.fullPipelineControl.fluxEndpointSlope + 0.5, "the pipeline discriminates the radiating source from the bound source");
  assert.equal(g.controls.controlsPass, true, "instrument is trustworthy before it touches braid data");
  // (Defect 3) electric channel bound as an interval / stable vanishing flux
  assert.equal(g.electricChannel.boundAcrossRegulator, true, "electric/branch field is a bound stable-vanishing-flux channel");
  assert.ok(Array.isArray(g.electricChannel.slopeInterval) && g.electricChannel.slopeInterval.length === 2, "electric bound reported as a slope interval");
  assert.ok(g.electricChannel.aggregateSlopeInterval[1] < -0.8, "robust aggregate slopes clearly steeper than radiation");
  // (Defect 4) magnetic channel from the canonical W^rec force is measured BOUND
  assert.equal(g.magneticChannel.primary_canonicalWrec.magneticBound, true, "canonical-W^rec antisymmetric channel is bound");
  assert.equal(g.magneticChannel.surrogate_Awake_curl_comparison.nonConvergent, true, "the A_wake curl surrogate is non-convergent (a curl artifact, not the law)");
  assert.equal(g.verdict, "both_channels_bound_canonical_Wrec_field_is_1_over_r2_no_far_field_radiation_rigid_circular_braid_does_not_radiate");
  assert.ok(g.maxRootResidual < 1e-9, `roots certified (max residual ${g.maxRootResidual})`);
});

test("canonical magnetic channel: E_anti = E_full − E_static from the W^rec force is BOUND (soft-extrapolated, caustic-resolution-converged) — the rigid-circular braid does not radiate", () => {
  const g = canonicalMagneticFarFieldFlux({ radii: [16, 32, 64], softSweep: [0.08, 0.04, 0.02], Nt: 8, Ntheta: 10, Nphi: 20 });
  assert.equal(g.magneticBound, true, "antisymmetric channel bound");
  assert.equal(g.fluxVanishes, true, "far flux vanishes (≪ residual) across the regulator");
  assert.ok(g.sweep.every((r) => r.endpointSlope < -0.6), "every regulator slope is clearly bound (not radiation ≈ 0)");
  assert.equal(g.causticResolutionScaling.converges, true, "the near-D_s=0 caustic contribution converges under grid refinement");
  assert.ok(g.maxRootResidual < 1e-9, "roots certified");
});

test("honest self-torque: net +0.424 (held-seed), self-hit ≈0, complete-root certifier, β=1±δ onset ξ0≈√(6μ), honest torque labels", () => {
  const g = honestNetSelfTorque({ NtList: [8, 16], softList: [0.02, 0.08] });
  assert.ok(Math.abs(g.netSecularZTorque - 0.424) < 0.01, `net secular z-torque ${g.netSecularZTorque} ≈ +0.424`);
  assert.equal(g.selfHitIsCoincidenceOnly, true, "reconstructed self-hit ≈ 0 at β_M=1 (coincidence-only, §77)");
  assert.equal(g.ntConverged, true, "Nt-converged");
  assert.equal(g.softStable, true, "soft-robust");
  assert.ok(g.maxRootResidual < 1e-7, `roots certified (max residual ${g.maxRootResidual})`);
  assert.ok(Math.abs(g.section81FabricatedValue - 0.142) < 0.02, `§81's +0.142 reproduced as the fabricated netPartner − (2/3)·M value (${g.section81FabricatedValue})`);
  // (Defect 6) honest labels
  assert.ok(Math.abs(g.internalPartnerTorqueOnHeldRigidSeed - 0.424) < 0.01, "internal partner torque on the held rigid seed = +0.424");
  assert.ok(Math.abs(g.externalHoldingTorqueRequired + 0.424) < 0.01, "external holding torque required = −0.424");
  assert.equal(g.rootCompletenessTested, true, "root completeness (not just residual) is tested");
  assert.equal(g.rootCompleteness.rootCountStableEverywhere, true, "per-hit root counts stable under refinement");
  // (Defect 5) self-hit label + β=1±δ branch-birth onset
  assert.equal(g.selfHitLabel, "analyticNoPositiveDelaySelfHitAtExactBetaOne_sin_xi_equals_xi_over_beta");
  assert.equal(g.noPositiveDelayAtOrBelowBetaOne, true, "no positive-delay self root at β≤1");
  assert.equal(g.branchBornAboveBetaOne, true, "a self-hit branch is born for β=1+μ");
  const born = g.selfHitOnset.find((r) => r.mu === 0.05);
  assert.ok(Math.abs(born.xi0Measured - born.xi0Predicted) < 0.05, `branch born at ξ0≈√(6μ) (measured ${born.xi0Measured} vs ${born.xi0Predicted})`);
  assert.equal(g.conservationIdentity.canClose, false, "the ⟨τ_mech⟩+⟨Φ_out⟩=0 identity cannot be closed in a common normalization at this grade");
});

// --- §83: the bounded non-rigid force-free search (the §60 dispersal successor). ---

test("braidNetZTorque reproduces the honest +0.424 net secular z-torque at the pin (M-carried, I/O≈0)", () => {
  const g = braidNetZTorque({ Nt: 16 });
  assert.ok(Math.abs(g.net - 0.424) < 0.01, `net z-torque ${g.net} ≈ +0.424`);
  assert.ok(Math.abs(g.byLayer.M - 0.423) < 0.01 && Math.abs(g.byLayer.I) < 0.02 && Math.abs(g.byLayer.O) < 0.02, "concentrated on the middle rail pump");
  assert.ok(g.maxRootResidual < 1e-9, "roots certified");
});

test("bounded torque-null search: NO torque-free AND radially-supported config exists near V5 — the net z-torque is sign-definite positive across the whole bounded family; a free stable braid needs an environment", () => {
  const g = freeBraidTorqueNullSearch({ Nt: 12, betaList: [0.5, 0.7, 0.9, 1.0, 1.1], tiltDeltaDegList: [-12, -6, 0, 6, 12] });
  // the rail pump is sign-definite: net secular z-torque > 0 everywhere in the window
  assert.ok(g.speedScan.every((r) => r.net > 0), "net z-torque never crosses zero along the speed axis");
  assert.ok(g.tiltScan.every((r) => r.net > 0), "net z-torque never crosses zero along the middle-tilt axis");
  assert.equal(g.speedTorqueZero, null, "no torque-null in the bounded speed window");
  assert.equal(g.tiltTorqueZero, null, "no torque-null in the bounded tilt window");
  // the best force-free residual anywhere is far above a genuinely force-free orbit
  assert.ok(g.minForceFreeResidual > g.residualSmallThreshold, `min force-free residual ${g.minForceFreeResidual} ≫ ${g.residualSmallThreshold}`);
  assert.equal(g.torqueFreeAndSupported, false, "the two conditions are incompatible in the bare rigid family");
  assert.match(g.verdict, /no_free_stable_braid_at_this_scale_without_an_environment/);
});

// --- §84: the per-layer-independent-omega torque-null landscape (the §83 differential extension). ---

test("braidPerOmegaEvaluate iso-frequency (mult 1,1,1) reproduces the §83/jh9 +0.424 net secular z-torque exactly", () => {
  const iso = braidPerOmegaEvaluate({ Nt: 16, omegaMult: { I: 1, M: 1, O: 1 } });
  const base = braidNetZTorque({ Nt: 16 });
  assert.ok(Math.abs(iso.net - 0.424) < 0.01, `iso net ${iso.net} ≈ +0.424`);
  assert.ok(Math.abs(iso.net - base.net) < 1e-3, `iso path matches braidNetZTorque (${iso.net} vs ${base.net})`);
  assert.ok(Math.abs(iso.byLayer.M - 0.423) < 0.01 && Math.abs(iso.byLayer.I) < 0.02 && Math.abs(iso.byLayer.O) < 0.02,
    "net concentrated on the middle rail pump (I/O ≈ 0)");
  assert.ok(Math.abs(iso.forceFreeResidual - 0.427) < 0.01, `iso force-free residual ${iso.forceFreeResidual} ≈ §83 pin 0.427`);
  assert.equal(iso.compositeCycles, 1, "iso-frequency has a single-period (K=1) composite");
  assert.ok(iso.maxRootResidual < 1e-7, "roots certified");
});

test("braidClosureRigidity: iso-frequency is a representable rigid closed braid; differential and counter-rotation are NOT", () => {
  const iso = braidClosureRigidity({ omegaMult: { I: 1, M: 1, O: 1 } });
  assert.ok(iso.rigidityResidual < 1e-9, `iso rigid in the co-rotating frame (${iso.rigidityResidual})`);
  assert.equal(iso.representable, true, "iso-frequency is a representable closed braid");
  const diff = braidClosureRigidity({ omegaMult: { I: 2, M: 1, O: 1 } });
  assert.ok(diff.rigidityResidual > 0.1, `differential inner sweeps the frame (${diff.rigidityResidual})`);
  assert.equal(diff.representable, false, "differential-omega is not a single closed braid");
  const ctr = braidClosureRigidity({ omegaMult: { I: 1, M: 1, O: -1 } });
  assert.ok(ctr.rigidityResidual > 0.1, `counter-rotating outer sweeps the frame (${ctr.rigidityResidual})`);
  assert.equal(ctr.representable, false, "counter-rotation is not a single closed braid");
});

test("per-layer-omega search: the pump is sign-definite on the representable locus, and every differential/counter torque-null fails closure AND radial support — no bare braid is a free particle (rigid + differential)", () => {
  const r = perLayerOmegaTorqueNullSearch({
    multI: [-1, 1], multM: [1], multO: [-1, 0.5, 1, 2],
    isoMultList: [0.5, 1.0, 1.2], Nt: 8,
  });
  // (1) the iso-frequency (representable) locus reproduces §83: sign-definite positive pump
  assert.ok(r.isoScan.every((x) => x.net > 0), "net z-torque sign-definite positive across the representable iso-frequency family");
  const pin = r.isoScan.find((x) => Math.abs(x.omegaMult.I - 1) < 1e-9);
  assert.ok(Math.abs(pin.net - 0.424) < 0.01, `iso pin reproduces +0.424 (${pin.net})`);
  assert.equal(r.representableSignDefinite, true, "every representable row has net > 0");
  // (2) differential/counter CAN null the pump — but only off the representable locus
  assert.equal(r.anyTorqueNull, true, "counter-rotating the inner layer drives the net z-torque through zero");
  assert.equal(r.torqueNullsAllNonRepresentable, true, "every torque-null point fails the closure gate (independently spinning layers)");
  assert.equal(r.torqueNullsAllUnsupported, true, "every torque-null point fails radial support (residual ≫ 0.05, harmonic-matching)");
  // (3) the decisive existence test: no representable, radially-supported, torque-free point anywhere
  assert.equal(r.representableTorqueFreeSupportedExists, false, "no bare per-layer-omega orbit is torque-free AND supported AND a closed braid");
  assert.ok(r.minForceFreeResidualAny > r.residualSmallThreshold,
    `min force-free residual anywhere ${r.minForceFreeResidualAny} ≫ ${r.residualSmallThreshold}`);
  assert.match(r.verdict, /no_bare_braid_is_a_free_particle_rigid_plus_differential/);
  assert.equal(r.retainedBranchClaim, false);
});

// §85 — the first global-drain dynamical-sea instrument (coarse pilot).
test("global-drain sea BARE regression: no sea reproduces the sign-definite pump and the bare flutter exactly (zero L-export/reaction/sea-pump)", () => {
  const r = globalDrainDynamicalSea({ withSea: false, Nt: 8, Nper: 3 });
  assert.equal(r.withSea, false);
  // pump target reproduced verbatim from braidNetZTorque
  assert.ok(Math.abs(r.pumpTarget.net - 0.424) < 0.01, `pump ${r.pumpTarget.net}`);
  // every z-torque channel is exactly zero with no sea
  for (const row of r.coOrbitalRows) {
    assert.equal(row.Lexport, 0, "no braid->sea L-export without a sea");
    assert.equal(row.braidReaction, 0, "no sea->braid reaction without a sea");
    assert.equal(row.seaOwnPump, 0, "no sea internal pump without a sea");
  }
  // the bare whirl growth reproduces the §61/§68 +0.199, and the dressed sweep is the bare pencil
  assert.ok(Math.abs(r.bareGrowth - 0.199) < 0.01, `bare whirl growth ${r.bareGrowth}`);
  assert.ok(r.flutterSweep.every((c) => Math.abs(c.maxGrowthRate - r.bareGrowth) < 1e-9), "no-sea dressed flutter == bare pencil");
  assert.equal(r.dissipativeReorientChannel, null);
  assert.match(r.verdict, /bare_regression_no_sea/);
});

test("global-drain sea COARSE PILOT: the conservative co-orbital cage exports ≈0 secular L_z (does not drain the pump) but acquires its OWN secular z-torque — the drain relocates the pump into the sea", () => {
  const r = globalDrainDynamicalSea({ withSea: true, omegaOrbitFracs: [0, 0.5], Nt: 8, Nper: 3 });
  // the +0.424 pump is the target
  assert.ok(Math.abs(r.pumpTarget.net - 0.424) < 0.01, `pump ${r.pumpTarget.net}`);
  // conservative co-orbital channel drains essentially nothing (§74 as an L_z book)
  assert.ok(r.maxLexportFracOfPump < 0.1, `L-export ${r.maxLexportFracOfPump} of pump — no conservative drain`);
  assert.equal(r.drainReachesPump, false, "conservative co-orbit + capped saturable χ'' do not reach the pump");
  // but the co-orbiting sea develops its own secular z-torque (relocation, not dissipation)
  assert.equal(r.seaAcquiresOwnPump, true, "the sea acquires its own un-nulled secular z-torque");
  assert.match(r.verdict, /hands_back_to_codex/);
  assert.equal(r.drainsSelfConsistently, false);
  assert.equal(r.retainedBranchClaim, false);
});

test("global-drain sea COARSE PILOT: the flutter is un-quieted — the whirl needs a velocity-block damping of order the growth rate, far above the sea's measured off-equatorial authority (§67)", () => {
  const r = globalDrainDynamicalSea({ withSea: true, omegaOrbitFracs: [0], Nt: 8, Nper: 2 });
  assert.ok(r.bareGrowth > 0.15, `bare whirl grows (+${r.bareGrowth})`);
  assert.ok(r.dRequiredToQuiet != null && r.dRequiredToQuiet >= 0.8, `quieting needs damping ~O(growth) (${r.dRequiredToQuiet})`);
  assert.ok(r.seaDampingAuthority < 0.05, `measured sea authority is tiny (${r.seaDampingAuthority})`);
  assert.equal(r.flutterQuietsWithMeasuredSea, false, "the measured sea does not quiet the whirl");
  assert.ok(r.flutterDampingShortfall > 10, `flutter damping shortfall ${r.flutterDampingShortfall}x`);
});

// --- §86: the spin-interleaving flutter sweep (is the axis-sector flutter spin-1/2
// precession read in the wrong inter-layer interleaving?). ---

test("§86 regression: interleaving defaults reproduce the known +0.199-class growing flutter EXACTLY", () => {
  const base = gyroscopicTiltAnalysisFull({});
  const withDefaults = gyroscopicTiltAnalysisFull({ dTheta: { I: 0, M: 0, O: 0 }, sense: { I: 1, M: 1, O: 1 } });
  assert.equal(withDefaults.maxGrowthRate, base.maxGrowthRate, "explicit interleaving defaults are bit-identical");
  assert.ok(Math.abs(base.maxGrowthRate - 0.19886) < 2e-3, `leading Re λ ${base.maxGrowthRate} ≈ +0.199 flutter`);
  assert.ok(base.maxGrowthRate > 0, "the baseline interleaving is a growing flutter (Re λ > 0)");
  assert.ok(Math.abs(base.maxGrowthWhirlFrequency - 2.4125) < 2e-2, `whirl frequency ${base.maxGrowthWhirlFrequency} ≈ 2.41`);
});

test("§86 azimuthal covariance: a GLOBAL precession-phase shift is a symmetry (flutter invariant); a RELATIVE phase is not", () => {
  const base = gyroscopicTiltAnalysisFull({});
  const uniform = gyroscopicTiltAnalysisFull({ dTheta: { I: 0.4, M: 0.4, O: 0.4 } });
  assert.ok(Math.abs(uniform.maxGrowthRate - base.maxGrowthRate) < 1e-3, "uniform azimuthal shift leaves the flutter invariant");
  const relative = gyroscopicTiltAnalysisFull({ dTheta: { I: 0, M: Math.PI / 2, O: 0 } });
  assert.ok(Math.abs(relative.maxGrowthRate - base.maxGrowthRate) > 0.05, "a relative rephasing moves the flutter (not a symmetry)");
});

test("§86 opposite-sense (alternating) branch REOPENS closure and radial/tangential support — it does not count", () => {
  const alt = interleavedFlutterPoint({ Nt: 5, sense: { I: 1, M: -1, O: 1 } });
  assert.equal(alt.gate.closed, false, "middle-counter-rotating is not a representable closed braid");
  assert.ok(alt.gate.forceFreeResidual > 0.5, `force-free residual ${alt.gate.forceFreeResidual} well above the ~0.43 iso floor`);
  assert.equal(alt.gate.gateClosed, false, "the gate is open on the opposite-sense branch");
});

test("§86 sweep VERDICT: no admissible interleaving is marginal — the axis-sector flutter is a genuine instability, not mis-read spin precession", () => {
  const r = interleavingFlutterSweep({ Nt: 4, gridN: 3, chiN: 3, probeSteps: 3 });
  assert.equal(r.regressionBaseline.reproducesKnownFlutter, true, "sweep anchors on the known baseline flutter");
  assert.equal(r.covariance.uniformShiftInvariant, true, "global azimuthal shift invariant");
  assert.equal(r.landscape.allAdmissibleGrowing, true, "every gate-closed interleaving keeps Re λ > 0");
  assert.equal(r.landscape.marginalAdmissibleExists, false, "no admissible interleaving is marginal (Re λ → 0)");
  assert.ok(r.landscape.minAbsReAdmissible > 0.05, `admissible min |Re λ| ${r.landscape.minAbsReAdmissible} bounded away from 0`);
  assert.ok(r.senseBranches.every((s) => !s.gate.gateClosed), "every opposite-sense branch reopens a sector");
  assert.equal(r.spinHalfCheck.reached, false, "the 4π spin-1/2 check is not reached (no marginal mode to test)");
  assert.equal(r.decision, "flutter_is_a_genuine_instability_independent_of_interleaving_axis_sector_stays_closed");
});

test("§86 4π probe: the informative winding of the growing leading mode over a 2π precession loop is integer (no clean double-cover; candidate-only anyway)", () => {
  const p = fourPiReturnProbe({ Nt: 4, steps: 6 });
  assert.ok(Number.isFinite(p.accumulatedWindingTurns), "winding is measured");
  assert.equal(p.doubleCoverSignature, false, "no half-integer (4π) signature on the growing mode");
});

// --- §90: weakly-nonlinear continuation of the tracked 2.41246-frequency
// flutter branch. This is deliberately one owner test because the cubic tensor
// stencil reuses the full causal-root torque evaluator.

test("§90 nonlinear flutter: positive Landau coefficient is SUBCRITICAL and the direct cubic axis integration diverges without a bounded jitter cycle", () => {
  const r = nonlinearFlutterSaturationAnalysis({ integrationTime: 60 });
  assert.equal(r.linearRegression.exact, true, "linearization is bit-exact against the §86 base pencil");
  assert.equal(r.linearRegression.leadingRe, 0.19885688497216406);
  assert.equal(r.linearRegression.leadingIm, 2.41245971901678);
  assert.ok(Math.abs(r.hopfOnset.extraDamping - 0.171914) < 2e-5, `tracked Hopf damping ${r.hopfOnset.extraDamping}`);
  assert.ok(Math.abs(r.hopfOnset.trackedIm - 2.43282) < 2e-4, `tracked Hopf frequency ${r.hopfOnset.trackedIm}`);
  assert.ok(r.hopfOnset.transverseMaxGrowth > 0.15, "the lower-frequency transverse pair is still unstable at the tracked Hopf point");
  assert.equal(r.landau.classification, "subcritical");
  assert.ok(r.landau.firstLyapunov > 0.035 && r.landau.firstLyapunov < 0.05, `l1 ${r.landau.firstLyapunov} > 0`);
  assert.ok(r.landau.coefficientPhysical > 0.3, `physical cubic coefficient ${r.landau.coefficientPhysical} > 0`);
  assert.equal(r.directIntegration.bounded, false);
  assert.equal(r.directIntegration.diverged, true);
  assert.equal(r.directIntegration.saturatedAmplitudeRad, null);
  assert.equal(r.predictedSaturatedAmplitudeRad, null);
  assert.equal(r.decision, "subcritical_or_directly_divergent_seed_grade_flutter_is_fatal_at_cubic_order");
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
});

// §87 (jh13) — the same-record wake angular-momentum Ward completion (Phase 1) and
// the balanced-cell transport decider (Phase 2). Small grids for CI; the physical
// verdict is regulator/resolution-robust at the CLI defaults.

test("§87 Phase 1 BARE regression: the braid-only wake L-flux CONVERGES and reproduces the §82 bound-field result exactly — vanishing far-field export, reactively stored, zero cage contribution", () => {
  const r = sameRecordWakeAngularMomentumWard({ withSea: false, radii: [8, 16, 32], softSweep: [0.02, 0.01], Nt: 4, Ntheta: 6, Nphi: 10, resolutionScale: 2 });
  assert.equal(r.withSea, false);
  // the machinery converges on the non-superluminal bare braid (root residual certified)
  assert.equal(r.convergenceGuard.converges, true, "bare braid wake completion converges");
  assert.ok(r.convergenceGuard.maxRootResidual < 1e-8, `roots certified (${r.convergenceGuard.maxRootResidual})`);
  // §82 regression: E_anti/E_full far-field flux is BOUND (steeply negative slope) and VANISHES
  assert.equal(r.wakeChannels.antisymmetric.slopesBound, true, "1/r^2 field -> Phi ~ 1/R bound falloff");
  assert.equal(r.wakeChannels.antisymmetric.fluxVanishes, true, "far-field wake L-flux vanishes (a vanishing fraction of the pump)");
  assert.equal(r.mechanicalAnchors.seaOwnPump, 0, "no sea -> zero sea-own pump");
  // the Ward defect does NOT disappear via a flux: it is reactively stored (the +0.424 pump stays enclosed)
  assert.ok(Math.abs(r.wardClosure.wardDefectAfterWake - r.mechanicalAnchors.pump) < 0.01, "far-field wake carries ~none of the pump out; the defect is reactively stored");
  assert.equal(r.classification, "reactively_stored_pinned_gapped_KL_zero_zero_equals_zero_BARRED_leaning");
  assert.match(r.verdict, /reproduces_the_s82_bound_field_result/);
  assert.equal(r.retainedBranchClaim, false);
});

test("§87 Phase 1 co-orbiting cage record: reproduces the jh11 −0.6545 seaOwnPump; the cage endpoints are SUPERLUMINAL and the same-record wake completion is REGULATOR NON-CONVERGENT at the D_s=0 caustic (route a) — the −0.65 cannot be certified as a transportable current", () => {
  const r = sameRecordWakeAngularMomentumWard({ withSea: true, frac: 0.5, radii: [8, 16, 32, 64], softSweep: [0.08, 0.04, 0.02, 0.01], Nt: 4, Ntheta: 8, Nphi: 14, resolutionScale: 2, NtMech: 8, Nper: 3 });
  // exact same-record mechanical anchor: the jh11 seaOwnPump at frac 1/2
  assert.ok(Math.abs(r.mechanicalAnchors.seaOwnPump - (-0.6545)) < 0.01, `seaOwnPump ${r.mechanicalAnchors.seaOwnPump} ≈ −0.6545 (jh11 record)`);
  assert.ok(Math.abs(r.mechanicalAnchors.pairDefect_qABz) < 0.01, "q_{AB,z}=Lexport+braidReaction ≈ 0 on the conservative co-orbit");
  // the record is superluminal (the source of the caustic)
  assert.equal(r.superluminalDiagnostic.superluminalCage, true, "co-orbiting cage endpoints exceed c_f");
  assert.ok(r.superluminalDiagnostic.maxEndpointSpeed > 1, `max endpoint speed ${r.superluminalDiagnostic.maxEndpointSpeed} > c_f`);
  // the wake magnitude does NOT settle under the regulator sweep (route a)
  assert.equal(r.convergenceGuard.converges, false, "wake completion regulator non-convergent at the superluminal caustic");
  assert.ok(r.wakeChannels.antisymmetric.outerRatioAcrossSoft > 3, `flux magnitude scales with the regulator (ratio ${r.wakeChannels.antisymmetric.outerRatioAcrossSoft})`);
  assert.match(r.classification, /route_a_BARRED/);
  assert.match(r.verdict, /SUPERLUMINAL/);
  assert.equal(r.retainedBranchClaim, false);
});

test("§87 Phase 2 balanced-cell decider: the two-sublattice pro/anti cell is INTRINSICALLY PUMPED — the cross-hit relay absorbs only ~2% of the sign-definite pump, so local boundedness fails; not an admissible retained sea (BARRED route b, held to proof); the transport kernel is uncertified (moot)", () => {
  const r = balancedCellTransportKernel({ aCell: 4.0, Nt: 8, twistEps: 0.05, driveOmegaFracs: [0.3], soft: 0.02 });
  // intrinsic pumps p_+ = +0.424, p_- = -0.424 (coarse sum zero — NOT sufficient)
  assert.ok(Math.abs(r.intrinsicPumps.pPlus - 0.424) < 0.01 && Math.abs(r.intrinsicPumps.pMinus + 0.424) < 0.01, "intrinsic pumps ±0.424");
  assert.equal(r.intrinsicPumps.coarseSumIsZero, true, "coarse p_+ + p_- = 0");
  // the cross-hit relay is tiny (~1-2% of the pump) — the §14 ejective relay
  assert.ok(r.crossTorques.crossHitRelayFracOfPump < 0.05, `cross-hit relay ${r.crossTorques.crossHitRelayFracOfPump} ≪ pump`);
  assert.ok(r.crossTorques.maxRootResidual < 1e-9, "cross-torque roots certified");
  // local boundedness FAILS: p + T_{+<-} + W_+ ≈ the full pump, not zero
  assert.equal(r.localBoundedness.localRowsClose, false, "local boundedness fails");
  assert.ok(Math.abs(r.localBoundedness.rowPlus - 0.424) < 0.05, `rowPlus ${r.localBoundedness.rowPlus} ≈ +pump (un-cancelled)`);
  assert.equal(r.outcome, "intrinsically_pumped_local_row_fails_not_an_admissible_retained_homogeneous_sea");
  // the transport kernel is not licensed on an inadmissible cell
  assert.equal(r.transportKernel.certified, false, "kernel uncertified — cell fails admissibility");
  assert.match(r.verdict, /INTRINSICALLY_PUMPED.*BARRED_route_b/);
  assert.equal(r.retainedBranchClaim, false);
});

test("§87 Phase 2 gate-off: when Phase 1 does not construct a convergent completion, Phase 2 is gated off and no cell verdict is claimed", () => {
  const r = balancedCellTransportKernel({ gatedConvergent: false });
  assert.equal(r.gatedConvergent, false);
  assert.match(r.verdict, /GATED_OFF|not_run/);
  assert.equal(r.retainedBranchClaim, false);
});

test("fail-closed", () => {
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.scoreMovement, "no_score_increase");
});
