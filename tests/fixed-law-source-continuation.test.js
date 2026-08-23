import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  evaluateFixedLawSourceContinuation,
  INPUT_SCHEMA,
  OUTPUT_SCHEMA,
} from "../scripts/mapping-electromagnetism/fixed-law-source-continuation.mjs";

const FIXTURE_URL = new URL(
  "../scripts/mapping-electromagnetism/fixed-law-source-continuation-candidate.v1.json",
  import.meta.url,
);

async function fixture() {
  return JSON.parse(await readFile(FIXTURE_URL, "utf8"));
}

function certifySourceAndBasins(input) {
  const commonRecordId = input.commonRecord.recordId;
  input.sourceEvidence = {
    status: "certified_retained",
    retainedBranchAccepted: true,
  };
  input.pairBasins = {
    electron: {
      status: "certified_retained",
      retainedBranchAccepted: true,
      commonRecordId,
      branchId: "electron-branch",
      conjugateBranchId: "positron-branch",
      protectedPolarityInventory: -6,
      certificateFingerprint: "electron-certificate",
    },
    positron: {
      status: "certified_retained",
      retainedBranchAccepted: true,
      commonRecordId,
      branchId: "positron-branch",
      conjugateBranchId: "electron-branch",
      protectedPolarityInventory: 6,
      certificateFingerprint: "positron-certificate",
    },
  };
}

test("candidate continuation computes weak tangent and first geometric transition", async () => {
  const input = await fixture();
  assert.equal(input.schema, INPUT_SCHEMA);

  const report = evaluateFixedLawSourceContinuation(input);
  assert.equal(report.schema, OUTPUT_SCHEMA);
  assert.equal(report.summary.status, "candidate_only_first_transition_reached");
  assert.equal(report.summary.invariantPass, true);
  assert.equal(report.summary.weakResponsePass, true);
  assert.equal(report.weakResponse.status, "weak_response_pass");
  assert.ok(report.weakResponse.maxRelativeResidual < 0.02);
  assert.ok(Math.abs(report.weakResponse.tangent[0] - 2) < 1e-14);
  assert.ok(Math.abs(report.weakResponse.tangent[1] + 0.99975) < 1e-14);
  assert.deepEqual(report.weakResponse.signedPairSteps, [0.05, 0.1]);
  assert.equal(report.summary.firstGeometricTransitionReached, true);
  assert.equal(report.summary.firstTransitionZeta, 0.7);
  assert.deepEqual(report.continuation.firstTransition.transitionKinds, [
    "inactive_root_gap_closure",
  ]);
  assert.equal(report.continuation.firstTransition.previousZeta, 0.5);
  assert.equal(report.pairGate.status, "skipped_missing_certified_conjugate_basins");
  assert.equal(report.summary.pairCaptureAttempted, false);
  assert.equal(report.summary.backreactionEvaluated, false);
  assert.equal(report.claimBoundary.scoreDecision, "no_score_change");
  assert.equal(report.claimBoundary.acceptedPhysicsClaim, false);
  assert.equal(
    report.summary.nextBlocker,
    "missing_accepted_eom_evolved_retained_source_sea_receiver_branch",
  );
});

test("amplitude-specific coefficient retuning rejects the fixed-law record", async () => {
  const input = await fixture();
  input.continuationRows[5].bindings.coefficientFingerprint =
    "amplitude-specific-coefficients";

  const report = evaluateFixedLawSourceContinuation(input);
  assert.equal(report.summary.status, "rejected_fixed_law_or_record_invariant");
  assert.equal(report.summary.invariantPass, false);
  const coefficientCheck = report.invariantChecks.find(
    (item) => item.id === "fixed_binding.coefficientFingerprint",
  );
  assert.equal(coefficientCheck.passed, false);
  assert.deepEqual(coefficientCheck.detail.mismatchRowIds, ["zeta-plus-030"]);
});

test("pair capture attempt is rejected without same-record certified conjugate basins", async () => {
  const input = await fixture();
  input.pairCaptureAttempt = {
    commonRecordId: input.commonRecord.recordId,
    lawFingerprint: input.commonRecord.lawFingerprint,
    architrinoIdentityDigest: input.commonRecord.architrinoIdentityDigest,
    identityPartitionPass: true,
    netPolarityPass: true,
    sourceSeaProductBoundaryContinuationPass: true,
    ledgerResidual: 0,
  };

  const report = evaluateFixedLawSourceContinuation(input);
  assert.equal(
    report.summary.status,
    "rejected_pair_attempt_without_certified_conjugate_basins",
  );
  assert.equal(report.pairGate.eligible, false);
  assert.equal(report.pairGate.pairCaptureAttempted, false);
  assert.equal(report.pairGate.backreactionEvaluated, false);
});

test("certified same-record conjugate basins open the gate without manufacturing an attempt", async () => {
  const input = await fixture();
  certifySourceAndBasins(input);

  const report = evaluateFixedLawSourceContinuation(input);
  assert.equal(report.summary.status, "retained_first_transition_reached_pair_ready");
  assert.equal(report.pairGate.eligible, true);
  assert.equal(report.pairGate.pairCaptureAttempted, false);
  assert.equal(report.pairGate.backreactionEvaluated, false);
  assert.equal(report.summary.nextBlocker, "missing_same_record_pair_capture_attempt");
});

test("pair capture and backreaction evaluate only after the same-record gate opens", async () => {
  const input = await fixture();
  certifySourceAndBasins(input);
  input.pairCaptureAttempt = {
    commonRecordId: input.commonRecord.recordId,
    lawFingerprint: input.commonRecord.lawFingerprint,
    architrinoIdentityDigest: input.commonRecord.architrinoIdentityDigest,
    identityPartitionPass: true,
    netPolarityPass: true,
    sourceSeaProductBoundaryContinuationPass: true,
    ledgerResidual: 0,
  };

  const report = evaluateFixedLawSourceContinuation(input);
  assert.equal(
    report.summary.status,
    "retained_first_transition_and_pair_backreaction_reached",
  );
  assert.equal(report.pairGate.eligible, true);
  assert.equal(report.pairGate.pairCaptureAttempted, true);
  assert.equal(report.pairGate.backreactionEvaluated, true);
  assert.equal(report.pairGate.backreactionPass, true);
});

test("a conjugate basin certified on another record cannot open the pair gate", async () => {
  const input = await fixture();
  certifySourceAndBasins(input);
  input.pairBasins.electron.commonRecordId = "different-record";
  input.pairCaptureAttempt = {
    commonRecordId: input.commonRecord.recordId,
    lawFingerprint: input.commonRecord.lawFingerprint,
    architrinoIdentityDigest: input.commonRecord.architrinoIdentityDigest,
    identityPartitionPass: true,
    netPolarityPass: true,
    sourceSeaProductBoundaryContinuationPass: true,
    ledgerResidual: 0,
  };

  const report = evaluateFixedLawSourceContinuation(input);
  assert.equal(
    report.summary.status,
    "rejected_pair_attempt_without_certified_conjugate_basins",
  );
  assert.equal(report.pairGate.electronBasinPass, false);
  assert.equal(report.pairGate.pairCaptureAttempted, false);
  assert.equal(report.pairGate.backreactionEvaluated, false);
});

test("four weak rows do not substitute for two actual signed pairs", async () => {
  const input = await fixture();
  input.continuationRows = input.continuationRows.filter(
    (row) => row.rowId !== "zeta-minus-010",
  );
  const unmatched = structuredClone(
    input.continuationRows.find((row) => row.rowId === "zeta-plus-010"),
  );
  unmatched.rowId = "zeta-plus-0075";
  unmatched.zeta = 0.075;
  input.continuationRows.push(unmatched);

  const report = evaluateFixedLawSourceContinuation(input);
  assert.equal(report.weakResponse.passed, false);
  assert.deepEqual(report.weakResponse.signedPairSteps, [0.05]);
});

test("continuation remains blocked when no geometric transition is recorded", async () => {
  const input = await fixture();
  input.continuationRows = input.continuationRows.filter(
    (row) => row.rowId !== "zeta-plus-070-transition",
  );

  const report = evaluateFixedLawSourceContinuation(input);
  assert.equal(report.summary.status, "blocked_missing_first_geometric_transition");
  assert.equal(report.summary.firstGeometricTransitionReached, false);
  assert.equal(report.continuation.firstTransition, null);
});
