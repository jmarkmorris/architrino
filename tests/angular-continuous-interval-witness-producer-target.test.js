import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(
  new URL(
    "../scripts/angular-momentum/tri-binary-offset-family-runner.mjs",
    import.meta.url
  )
);

test("continuous interval witness producer schema names required retained fields", () => {
  const schema = JSON.parse(
    execFileSync(
      process.execPath,
      [scriptPath, "--schema", "continuous-interval-witness-producer-target"],
      { encoding: "utf8" }
    )
  );

  assert.equal(
    schema.schema,
    "aaa-tri-binary-continuous-interval-witness-row-producer-target.schema.v1"
  );
  assert.equal(schema.targetObjectId, "continuous_interval_witness_row");
  assert.equal(schema.eventRootKey, 2856731379702547500);
  assert.equal(schema.retainedBranchClaim, false);
  assert.deepEqual(schema.requiredFieldIds, [
    "bounded_gap_row_id",
    "pair_key",
    "edge_index",
    "side",
    "prior_event_root_boundary_distance",
    "next_event_root_boundary_distance",
    "affine_bracket_span",
    "inactive_interval",
    "positive_width_interval_witness",
    "endpoint_sign_or_derivative_monotonic_bound",
    "root_sheet_enclosure",
    "nonzero_jacobian_margin",
    "lattice_alignment",
    "retained_source_binding",
    "accepted_nonlocal_transport_law",
    "event_root_key",
    "same_route_root_key_row_set_identity",
  ]);
  assert.deepEqual(
    schema.negativeControls.map((control) => control.id),
    [
      "sampled_dense_support_not_accepted_interval_witness",
      "competitor_bearing_partial_support_not_accepted_interval_witness",
    ]
  );
});

const reportPath = path.resolve(
  ".tmp/angular-momentum-spin/frequency-candidate-current-report-v76.json"
);

test("existing angular report keeps sampled partial support fail-closed", (t) => {
  if (!fs.existsSync(reportPath)) {
    t.skip("local v76 angular report fixture is not present");
    return;
  }

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const partialAudit =
    report.retainedEventDomainFork.retainedRowSetIdentityObstructionTarget
      .globalRetainedRowSetIdentityLiftTarget.activeDomainExtensionFillRuleTarget
      .eventRootBoundedInteriorGapFillRuleTarget.bracketLatticeCandidateTarget
      .transportLawTarget.affineLatticeLawTarget.identityConservationTarget
      .interiorAbsenceBridgeFillRuleTarget.directInteriorPresenceProbeTarget
      .threePointDirectInteriorReplayAudit.partialSupportIntervalWitnessAudit;
  const intervalProof = partialAudit.intervalProofFieldAudit;

  assert.equal(report.retainedBranchClaim, false);
  assert.equal(
    partialAudit.status,
    "event_root_affine_bracket_non_midpoint_partial_support_dense_subinterval_witness_missing"
  );
  assert.equal(partialAudit.acceptedPartialSupportIntervalWitnessRowCount, 0);
  assert.equal(intervalProof.acceptedIntervalProofFieldRowCount, 0);
  assert.equal(intervalProof.retainedRowSetBindingProofRowCount, 0);
  assert.equal(
    intervalProof.firstIntervalProofFieldBlocker,
    "active_domain_extension_required_before_two_sheet_global_binding"
  );
  assert.ok(
    intervalProof.rows.every(
      (row) =>
        row.sampledRootSheetEnclosureCandidatePass === true &&
        row.sampledDerivativeSignMarginCandidatePass === true &&
        row.acceptedIntervalProofFieldRowPass === false &&
        row.retainedRowSetBindingProofPass === false &&
        row.competitorRootKeys.includes("7589410474480280000")
    )
  );
});
