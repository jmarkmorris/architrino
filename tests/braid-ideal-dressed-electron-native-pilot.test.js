import test from "node:test";
import assert from "node:assert/strict";
import {
  buildDressedElectron, dressedSupportLedger, dressedAxialPump, dressedTiltShift,
  dressedEMChannel, dressedElectronPilot, bareRegressionWitness, searchAxialScale,
  DRESSED_ELECTRON_ANSATZ, FAIL_CLOSED, SCHEMA,
} from "../scripts/braid-ideal/dressed-electron-native-pilot.mjs";
import { supportRatios } from "../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs";

// jh14 / Section 88 -- the native dressed electron (V5 scaffold + 6 epsilon_-
// axial layer, 12 architrinos, net -1e). Seed-grade coarse pilot. These tests
// pin the regression (dropping the payload recovers the bare scaffold exactly),
// the bare-value cross-checks, and the honest dressed verdict.

test("inventory: 12-architrino dressed seed, net charge -1e", () => {
  const d = buildDressedElectron({});
  assert.equal(d.sites.length, 12, "6 scaffold + 6 axial electrinos");
  assert.equal(d.payloadIdx.length, 6, "six-site axial layer");
  assert.equal(d.netCharge, -6, "3+ 3- scaffold (0) + 6 electrinos (-6) = -6 epsilon = -1e");
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
  const bare = supportRatios({ geo: DRESSED_ELECTRON_ANSATZ.geo });
  for (const L of ["I", "M", "O"]) {
    assert.equal(dropped.ratios[L], bare.ratios[L], `layer ${L}`);
  }
});

test("bare cross-check: the axial-pump proxy reproduces the +0.424 self-torque", () => {
  const pump = dressedAxialPump({ heights: [0.8, 1.3, 1.8], scale: 1.0 });
  assert.ok(Math.abs(pump.bareScaffoldZTorque - 0.424) < 0.01, `bare z-torque ${pump.bareScaffoldZTorque}`);
});

test("bare cross-check: the tilt gate reproduces the Section 86 flutter Re lambda ~ +0.199", () => {
  const t = dressedTiltShift({});
  assert.equal(t.bareFlutter, true);
  assert.ok(Math.abs(t.bareMaxGrowthRate - 0.199) < 0.01, `Re lambda ${t.bareMaxGrowthRate}`);
});

test("gate A: the spin axis is a cycle-averaged lateral-calm line", () => {
  const s = dressedSupportLedger({ scale: 2.0 });
  assert.equal(s.lateralCalmLine, true, "cycle-mean transverse force on-axis ~ 0");
  assert.ok(s.maxTransverseResidual < 1e-4, `max transverse ${s.maxTransverseResidual}`);
});

test("gate B: the charged payload cancels part of (does not add to) the bare pump", () => {
  const pump = dressedAxialPump({ scale: 2.0 });
  assert.equal(pump.verdict, "cancels");
  assert.ok(pump.payloadContribution < 0, `payload contribution ${pump.payloadContribution}`);
  assert.ok(Math.abs(pump.payloadOwnZTorque) === 0, "on-axis payload carries no direct z-torque");
});

test("gate C: on-axis payload carries no spin and only damps the flutter (inherits the no-go)", () => {
  const t = dressedTiltShift({ scale: 2.0 });
  assert.equal(t.payloadSpinAngularMomentum, 0, "on-axis -> J_pay = 0, gyroscopic sector untouched");
  assert.equal(t.payloadTiltStiffness, 0, "rides the calm line -> K_pay ~ 0");
  assert.ok(t.estDressedMaxGrowthRate > 0, "estimate stays positive -> not dissolved");
  assert.equal(t.verdict, "damped_not_dissolved");
});

test("gate D: payload opens a -1e monopole EM channel; symmetric column has zero dipole", () => {
  const em = dressedEMChannel({ scale: 2.0 });
  assert.equal(em.netChargeInE, -1);
  assert.equal(em.bareCoreNetCharge, 0, "neutral scaffold has no monopole channel");
  assert.equal(em.monopoleChannelOpen, true);
  assert.equal(em.payloadAxialDipoleZ, 0, "symmetric +/- column -> zero axial dipole");
  assert.ok(em.payloadAxialQuadrupoleZZ !== 0, "leading payload moment is quadrupole");
});

test("pilot: fail-closed, seed grade, and the honest inherits-the-no-go verdict", () => {
  const p = dressedElectronPilot({ scale: 2.0 });
  assert.equal(p.schema, SCHEMA);
  assert.equal(p.retainedBranchClaim, false);
  assert.equal(p.claimLevel, FAIL_CLOSED.claimLevel);
  assert.equal(p.honestSummary.dressedSuppliesOwnCharge, true);
  assert.equal(p.honestSummary.inheritsBareFlutterNoGo, true);
});

test("scan: axial-scale locator runs and reports the lateral-calm line at every scale", () => {
  const scan = searchAxialScale({ scales: [1.6, 2.0, 2.6] });
  assert.ok(scan.scan.length === 3);
  assert.ok(scan.scan.every((r) => r.lateralCalmLine === true));
  assert.ok(typeof scan.bestScale === "number");
});
