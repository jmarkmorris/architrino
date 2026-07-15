import assert from "node:assert/strict";
import test from "node:test";

import {
  MOVING_PHASE_MATCHED_STACKED_RINGS_SCHEMA,
  movingPhaseMatchedStackedRingsBraid,
} from "../scripts/braid-ideal/moving-phase-matched-stacked-rings-braid.mjs";

let cached;
function report() { return cached ??= movingPhaseMatchedStackedRingsBraid(); }

test("§96 uses production causal roots and leaves the central solver untouched", () => {
  const r = report();
  assert.equal(r.schema, MOVING_PHASE_MATCHED_STACKED_RINGS_SCHEMA);
  assert.match(r.sharedRecord.staticRows, /production roots/);
  assert.match(r.sharedRecord.rateRows, /production roots/);
  assert.equal(r.sharedRecord.centralSolverTouched, false);
  assert.ok(r.phaseMatch.rows.every((row) => row.rootCount > 0));
});

test("§96 verifies the Mach phase-match on the selected delayed roots", () => {
  const r = report();
  assert.equal(r.phaseMatch.transverseOnly, true);
  assert.ok(r.phaseMatch.rows.every((row) => Math.abs(row.machRatio - r.search.selectedGeometry.u) < 1e-12));
  assert.ok(r.phaseMatch.rows.every((row) => row.transverseOnly));
  assert.ok(r.phaseMatch.rows.every((row) => Math.abs(row.selectedAxialTorqueGeometry) < 1e-10));
});

test("§96 records the force-balance failure and retires the zero-tilt spectrum", () => {
  const r = report();
  assert.equal(r.binding.residual.length, 3);
  assert.ok(Number.isFinite(r.binding.relativeClosureResidual));
  assert.ok(Number.isFinite(r.pump.netSecularAxialTorque));
  assert.ok(Number.isFinite(r.stability.leadingRe));
  assert.equal(r.phase1.closes, r.phase1.bindingCloses && r.phase1.pumpFree && r.phase1.flutterFree);
  assert.equal(r.recoveryAdjudication.forceBalancePreconditionPasses, false);
  assert.equal(r.recoveryAdjudication.stabilityClaimStatus, "retired_void_non_equilibrium");
});

test("§96 velocity sweep exposes spacing growth and the declared controls", () => {
  const r = report();
  assert.ok(r.velocitySweep.every((row) => row.axialGaps.every((gap, i) => Math.abs(gap - row.u * row.transverseWakeDistances[i]) < 1e-12)));
  assert.equal(r.controls.atRestRecoversNestedLimit, true);
  assert.ok(r.controls.singleFlatBinaryRootCount > 0);
  assert.equal(r.controls.singleFlatBinaryHasFiniteRadialSupport, true);
  assert.match(r.lorentzTension, /does not reproduce Lorentz axial contraction/);
});

test("§96 remains fail-closed and preserves the non-bind gate after stability retirement", () => {
  const r = report();
  assert.equal(r.releaseGate.nativeRetainedHistoryReleaseAuthorized, false);
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
  assert.equal(r.search.rowCount, 288);
  assert.equal(r.phase1.bindingCloses, false);
  assert.ok(r.binding.relativeClosureResidual > 0.03);
  assert.equal(r.phase1.pumpFree, false);
  assert.ok(Math.abs(r.pump.netSecularAxialTorque) > 0.02);
  assert.equal(r.phase1.flutterFree, false);
  assert.ok(r.stability.leadingRe > 0);
  assert.ok(r.stability.unstableComplexCount > 0);
  assert.equal(r.phase1.firstFailedGate, "single_stack_binding");
  assert.equal(r.phase2.gated, true);
  assert.equal(r.decision, "single_stack_fails_seed_gate_no_pair_run_no_release");
});
