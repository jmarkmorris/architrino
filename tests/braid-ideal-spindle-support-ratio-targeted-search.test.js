import test from "node:test";
import assert from "node:assert/strict";
import {
  supportRatios, tangentialLedger, searchTangentialClosure, capCreditProxy,
  seaRowsTruePlacement, cageReciprocity, TANGENTIAL_CLOSURE_V2, SELF_CONSISTENT_V3,
  OCTAHEDRAL_CAGE_V4, SEA_BOOKING_S50, FAIL_CLOSED,
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

test("fail-closed", () => {
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.scoreMovement, "no_score_increase");
});
