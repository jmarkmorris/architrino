import assert from "node:assert/strict";
import test from "node:test";

import {
  CONTRA_ROTATING_CROSS_COUPLING_SCHEMA,
  contraRotatingCrossCouplingCompletion,
} from "../scripts/braid-ideal/contra-rotating-pro-anti-cross-coupling.mjs";

let cached;
function report() { return cached ??= contraRotatingCrossCouplingCompletion(); }

test("§93 regression removes the partner back to +0.424 and Re lambda 0.19886 and preserves §92 anchors", () => {
  const r = report();
  assert.equal(r.schema, CONTRA_ROTATING_CROSS_COUPLING_SCHEMA);
  assert.equal(r.regression.removingPartnerRecoversSingleBraid, true);
  assert.ok(Math.abs(r.regression.section92.freePairGrowth - 0.19885688497216406) < 1e-12);
  assert.ok(Math.abs(r.regression.section92.hardLockGrowth - 0.19629953398461314) < 1e-12);
});

test("§93 cross rows are produced on the production root path for both directions", () => {
  const r = report();
  assert.equal(r.sharedRecord.centralSolverTouched, false);
  assert.match(r.sharedRecord.staticRows, /production roots/);
  assert.match(r.sharedRecord.rateRows, /production roots/);
  assert.ok(r.selectedCell.rootCount > 0);
  assert.equal(r.selectedCell.forceByBraid.length, 2);
  assert.equal(r.selectedCell.torqueByBraid.length, 2);
});

test("§93 phase and axial lock verdict is measured rather than imposed", () => {
  const r = report();
  assert.equal(r.geometryScan.rowCount, 96);
  assert.equal(r.phaseAndAxialLock.jacobian.length, 2);
  assert.equal(typeof r.gates.pairLocks, "boolean");
  assert.equal(r.gates.nativeRetainedHistoryReleaseAuthorized, r.gates.gatesClose);
});

test("§93 joint pencil consumes measured static and rate cross blocks and reports the complete quotient lead", () => {
  const r = report();
  assert.equal(r.measuredCrossBlocks.stiffnessTorqueBlock.length, 12);
  assert.equal(r.measuredCrossBlocks.rateTorqueBlock.length, 12);
  assert.ok(r.measuredCrossBlocks.stiffnessTorqueBlock.every((row) => row.length === 12));
  assert.ok(r.measuredCrossBlocks.rateTorqueBlock.every((row) => row.length === 12));
  assert.ok(Number.isFinite(r.jointSpectrum.leadingRe));
  assert.ok(Number.isFinite(r.jointSpectrum.shiftFromSingle));
});

test("§93 remains fail-closed unless lock, pump, and spectrum all close", () => {
  const r = report();
  assert.equal(r.gates.gatesClose, r.gates.pairLocks && r.gates.pumpCloses && r.gates.spectrumCloses);
  assert.equal(r.geometryScan.anyCoarseCellClosesPump, false);
  assert.equal(r.geometryScan.anyCoarseCellClosesForceRows, false);
  assert.equal(r.gates.pairLocks, false);
  assert.equal(r.gates.pumpCloses, false);
  assert.equal(r.gates.spectrumCloses, false);
  assert.equal(r.gates.nativeRetainedHistoryReleaseAuthorized, false);
  assert.equal(r.decision, "measured_cross_pair_fails_native_lock_no_release");
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
});
