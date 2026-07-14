import assert from "node:assert/strict";
import test from "node:test";

import {
  DRESSED_CONTRA_ROTATING_ELECTRON_SCHEMA,
  dressedContraRotatingElectronCompletion,
} from "../scripts/braid-ideal/dressed-contra-rotating-electron.mjs";

let cached;
function report() { return cached ??= dressedContraRotatingElectronCompletion(); }

test("§95 composes the §93 pair and six-electrino pocket on production-root records", () => {
  const r = report();
  assert.equal(r.schema, DRESSED_CONTRA_ROTATING_ELECTRON_SCHEMA);
  assert.equal(r.object.scaffoldArchitrinoCount, 12);
  assert.equal(r.object.payloadArchitrinoCount, 6);
  assert.equal(r.sharedRecord.composedOnOneForceTorqueRecord, true);
  assert.equal(r.sharedRecord.centralSolverTouched, false);
  assert.match(r.sharedRecord.payloadStaticRows, /production roots/);
  assert.match(r.sharedRecord.payloadRateRows, /production roots/);
});

test("§95 relaxes both declared pocket ansätze and finds no stable retained payload equilibrium", () => {
  const r = report();
  assert.deepEqual(r.payloadEquilibria.map((row) => row.kind), ["spinless_column", "co_rotating_pocket"]);
  assert.deepEqual(r.payloadEquilibria.map((row) => row.classification), ["column", "exposed_shielded_triad_split"]);
  assert.ok(r.payloadEquilibria.every((row) => row.productionRecord.rootCount > 0));
  assert.ok(r.payloadEquilibria.every((row) => row.stable === false));
  assert.equal(r.gates.payloadEquilibriumStable, false);
  assert.equal(r.gates.firstFailedGate, "payload_equilibrium");
});

test("§95 payload does not turn the §93 saddle into a stable lock and spoils the sunk pump", () => {
  const r = report();
  assert.ok(r.dressedLock.bareEigen.some((row) => row.re > 12));
  assert.ok(r.dressedLock.eigen.some((row) => row.re > 0));
  assert.equal(r.dressedLock.restoring, false);
  assert.equal(r.gates.pairLocks, false);
  assert.ok(r.pumpWithPayload.residual > 0.02);
  assert.equal(r.gates.pumpCloses, false);
});

test("§95 certified joint spectrum softens but does not close the flutter", () => {
  const r = report();
  assert.ok(r.jointSpectrumWithPayload.rawLeadingPencilResidual > r.jointSpectrumWithPayload.rootResidualTolerance);
  assert.ok(r.jointSpectrumWithPayload.leadingRe > 0);
  assert.ok(r.jointSpectrumWithPayload.leadingRe < r.jointSpectrumWithPayload.bareLeadingRe);
  assert.equal(r.gates.spectrumCloses, false);
});

test("§95 reads out -1e and the co-rotating payload orbital moment", () => {
  const r = report();
  assert.equal(r.observables.netChargeUnitsEpsilon, -6);
  assert.equal(r.observables.netChargeInE, -1);
  assert.ok(Math.abs(r.observables.magneticMomentZ) > 0);
  assert.ok(Math.abs(r.observables.orbitalGFactorAnalog - 1) < 1e-12);
});

test("§95 controls recover §93 without payload and delegate the single-dressed object to §89", () => {
  const r = report();
  assert.equal(r.regressions.removingPayloadRecoversSection93Exactly, true);
  assert.equal(r.regressions.removingTrailingBraidDelegatesExactlyToSection89, true);
  assert.equal(r.regressions.section89.netChargeInE, -1);
  assert.equal(r.gates.nativeRetainedHistoryReleaseAuthorized, false);
  assert.equal(r.decision, "dressed_pair_fails_seed_gate_no_release");
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
});
