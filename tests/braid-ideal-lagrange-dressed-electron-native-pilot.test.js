import test from "node:test";
import assert from "node:assert/strict";
import {
  buildLagrangeDressedElectron, binaryLagrangePoints, payloadAngularMomentum,
  dressedSupportLedger, dressedAxialPump, lagrangeTiltFlutter, twelveSiteTiltPencil,
  magneticMoment, dressedEMChannel, fallbackCoRotatingShell, bareRegressionWitness,
  LAGRANGE_DRESSED_ANSATZ, LAGRANGE_DOCK_V5, FAIL_CLOSED, SCHEMA,
} from "../scripts/braid-ideal/lagrange-dressed-electron-native-pilot.mjs";
import { supportRatios } from "../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs";

// jh15 / Section 89 -- the native Lagrange-docked co-rotating dressed electron
// (V5 scaffold + two electrinos per binary at the co-rotating-frame Lagrange
// points, 12 architrinos, net -1e). Seed-grade coarse pilot. The primary ansatz
// (vs Section 88's spinless on-axis column) gives J_pay != 0 by construction, so
// the spin-carrying payload can reach the gyroscopic sector G. These tests pin the
// exact bare regression, the certified bare-flutter cross-check, and the honest
// verdict: the payload DOES enter G but does NOT dissolve the Section 86 flutter.

test("inventory: 12-architrino Lagrange-docked seed, net charge -1e, all off-axis", () => {
  const d = buildLagrangeDressedElectron({});
  assert.equal(d.sites.length, 12, "6 scaffold + 6 co-rotating electrinos");
  assert.equal(d.payloadIdx.length, 6, "two electrinos per binary");
  assert.equal(d.netCharge, -6, "scaffold 0 + 6 electrinos (-6 epsilon) = -1e");
  assert.deepEqual([...d.payloadLayer].sort(), ["I", "I", "M", "M", "O", "O"], "two per binary I/M/O");
  for (const i of d.payloadIdx) {
    const s = d.sites[i];
    assert.ok(s.R * Math.cos(s.alpha) > 0.05, "every payload electrino is off-axis (rho > 0) -> carries J");
  }
});

test("regression: dropping the payload recovers the bare scaffold EXACTLY", () => {
  const w = bareRegressionWitness({});
  assert.equal(w.supportRatioMaxDelta, 0, "support ratios bit-identical to supportRatios()");
  assert.equal(w.kappaStarDelta, 0, "kappa* bit-identical");
  assert.equal(w.payloadPumpContributionWhenEmpty, 0, "empty payload adds zero pump");
  assert.equal(w.recoversBare, true);
});

test("regression: dropped-payload support ledger equals supportRatios() layer-by-layer", () => {
  const dropped = dressedSupportLedger({ drop: true });
  const bare = supportRatios({ geo: LAGRANGE_DRESSED_ANSATZ.geo });
  for (const L of ["I", "M", "O"]) assert.equal(dropped.ratios[L], bare.ratios[L], `layer ${L}`);
});

test("step 1: binary M Lagrange points exist, are unstable, and break mirror symmetry", () => {
  const r = binaryLagrangePoints({ layer: "M" });
  assert.ok(r.equilibria.length >= 2, "at least two co-rotating-frame equilibria");
  assert.ok(r.dockTwo.length === 2, "two docking sites reported");
  assert.ok(r.dockTwo.every((e) => e.residual < 1e-6), "docking sites are genuine equilibria");
  assert.ok(r.dockTwo.every((e) => e.rho > 0.05), "both docking sites off-axis (rho > 0)");
  assert.equal(r.anyStable, false, "every M Lagrange point is linearly unstable with Coriolis");
  assert.equal(r.mirrorWitness.mirrorSymmetric, false);
  assert.ok(r.mirrorWitness.mirrorResidual > 0.01, "rotating causal wake handedness -> no exact L4/L5 mirror pair");
});

test("step 3: the co-rotating payload carries nonzero angular momentum (J_pay != 0)", () => {
  const a = payloadAngularMomentum({});
  assert.equal(a.coRotating, true, "off-axis co-rotation -> L_z != 0");
  assert.ok(Math.abs(a.payloadLz) > 0.1, `payload L_z = ${a.payloadLz}`);
  assert.ok(Math.abs(a.payloadTiltBlockJ) > 0.1, "tilt-block spin nonzero");
});

test("gate A: dressed object does NOT close its ledgers at one coupling", () => {
  const s = dressedSupportLedger({});
  assert.equal(s.netCharge, -6);
  assert.equal(s.coRotating, true);
  assert.equal(s.closes, false, "the L4/L5 dock disrupts scaffold support; no one-coupling closure at seed grade");
  assert.ok(s.dockImbalance > 0.05, "the single-binary equilibria are not equilibria of the assembled 12-body object");
});

test("gate B (pump): the off-axis co-rotating payload carries a DIRECT z-torque and reshapes the pump (unlike the Section 88 on-axis column, whose direct z-torque was exactly zero)", () => {
  const pump = dressedAxialPump({});
  assert.ok(Math.abs(pump.bareScaffoldZTorque - 0.424) < 0.01, `bare z-torque ${pump.bareScaffoldZTorque}`);
  assert.ok(Math.abs(pump.payloadOwnZTorque) > 1e-3, "off-axis payload carries a direct z-torque (Section 88 on-axis payload had exactly zero)");
  assert.ok(Math.abs(pump.payloadContribution) > Math.abs(pump.bareScaffoldZTorque), "the co-rotating payload strongly reshapes the scaffold pump");
  assert.ok(["adds", "cancels"].includes(pump.verdict), `verdict ${pump.verdict}`);
});

test("gate B (flutter): 12-site pencil reproduces bare, payload enters G, but does NOT dissolve the flutter", () => {
  const f = lagrangeTiltFlutter({});
  // certification: my 12-site pencil with the payload dropped reproduces the base
  // gyroscopicTiltAnalysisFull growth rate exactly.
  assert.ok(Math.abs(f.bareMaxGrowthRate - 0.199) < 0.01, `bare Re lambda ${f.bareMaxGrowthRate}`);
  assert.equal(f.pencilBareValidation.agreesWithBaseInstrument, true, "bare-pencil validation matches the base instrument");
  // the co-rotating payload augments the per-layer spin -> it DOES enter G.
  assert.equal(f.payloadEntersGyroscopicSector, true);
  for (let i = 0; i < 3; i++) assert.ok(Math.abs(f.perLayerSpinJ_dressed[i]) > Math.abs(f.perLayerSpinJ_bare[i]), `layer ${i} spin grows`);
  // ... yet the flutter is not dissolved (it is aggravated).
  assert.notEqual(f.verdict, "dissolved");
  assert.ok(f.dressedMaxGrowthRate > f.bareMaxGrowthRate, "spin-carrying dressing worsens, not dissolves, the whirl");
});

test("gate B (flutter): the bare 12-site pencil validation is exact to the base instrument", () => {
  const bare = twelveSiteTiltPencil({ drop: true });
  assert.ok(Math.abs(bare.maxGrowthRate - 0.19886) < 0.01, `bare pencil Re lambda ${bare.maxGrowthRate}`);
});

test("gate C: the circulating charge sources a magnetic moment (mu_z != 0); orbital g-analog ~ 1", () => {
  const mu = magneticMoment({});
  assert.equal(mu.momentNonzero, true);
  assert.ok(Math.abs(mu.payloadMagneticMomentZ) > 0.1, `mu_z = ${mu.payloadMagneticMomentZ}`);
  assert.equal(mu.scaffoldMagneticMomentZ, 0, "neutral scaffold +/- pairs cancel");
  assert.ok(Math.abs(mu.orbitalGFactorAnalog - 1) < 0.05, "orbital circulation gives g_orb ~ 1 (g approx 2 needs spin structure)");
});

test("gate D: payload opens a -1e monopole EM channel absent on the neutral core", () => {
  const em = dressedEMChannel({});
  assert.equal(em.netChargeInE, -1);
  assert.equal(em.bareCoreNetCharge, 0);
  assert.equal(em.monopoleChannelOpen, true);
  assert.equal(em.leadingMultipole, "monopole");
});

test("fallback: no stable dock -> matched-J co-rotating shell is reported", () => {
  const fb = fallbackCoRotatingShell({});
  assert.equal(fb.isFallback, true);
  assert.equal(fb.shellCount, 6);
  assert.equal(fb.matches, true, "shell L_z matches the docked payload L_z");
});

test("fail-closed metadata: seed grade, no retained branch, no native release", () => {
  assert.equal(SCHEMA, "lagrange_dressed_electron_native_pilot.v0");
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.acceptedSeedPathCertificate, false);
  assert.equal(FAIL_CLOSED.claimLevel, "seed_grade_coarse_pilot_no_native_release");
});
