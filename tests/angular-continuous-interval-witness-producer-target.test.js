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

test("active-domain extension producer schema rejects local row-set proxies", () => {
  const schema = JSON.parse(
    execFileSync(
      process.execPath,
      [scriptPath, "--schema", "active-domain-extension-row-set-producer-target"],
      { encoding: "utf8" }
    )
  );

  assert.equal(
    schema.schema,
    "aaa-tri-binary-active-domain-extension-global-row-set-identity-producer-target.schema.v1"
  );
  assert.equal(
    schema.targetObjectId,
    "same_route_root_key_global_retained_row_set_identity_provider"
  );
  assert.equal(
    schema.firstProducerObject,
    "prove_active_domain_extension_for_both_inactive_gaps"
  );
  assert.equal(schema.eventRootKey, 2856731379702547500);
  assert.equal(schema.retainedBranchClaim, false);
  assert.deepEqual(schema.requiredFieldIds, [
    "active_domain_gap_count",
    "bounded_interior_gap_fill_rule",
    "prior_only_endpoint_gap_rule",
    "next_only_endpoint_gap_rule",
    "point_contact_identity_rule",
    "same_record_binding",
  ]);
  assert.deepEqual(schema.sameRecordBindingRequirements, [
    "event_root_key_2856731379702547500",
    "same_route_root_key_retained_row_set",
    "all_layer_pair_chronological_replay_identity",
    "active_domain_extension_fill_rule",
    "global_retained_row_set_identity_provider",
  ]);
  assert.deepEqual(
    schema.negativeControls.map((control) => control.id),
    [
      "endpoint_provider_route_only_rows_not_global_row_set_identity",
      "hinge_point_replay_not_global_row_set_identity",
      "route_authorized_point_events_not_global_row_set_identity",
      "target_derived_affine_fits_not_global_row_set_identity",
      "sampled_dense_support_not_global_row_set_identity",
      "phase_cancellation_rows_not_global_row_set_identity",
      "aggregate_rows_not_global_row_set_identity",
      "cross_row_bundles_not_global_row_set_identity",
    ]
  );
});

test("accepted nonlocal transport global row-set producer schema stays fail closed", () => {
  const schema = JSON.parse(
    execFileSync(
      process.execPath,
      [
        scriptPath,
        "--schema",
        "accepted-nonlocal-transport-global-row-set-producer-target",
      ],
      { encoding: "utf8" }
    )
  );

  assert.equal(
    schema.schema,
    "aaa-tri-binary-accepted-nonlocal-transport-global-row-set-producer-target.schema.v1"
  );
  assert.equal(
    schema.targetObjectId,
    "accepted_nonlocal_transport_same_route_root_key_global_retained_row_set_identity_row"
  );
  assert.equal(
    schema.firstProducerObject,
    "prove_active_domain_extension_for_both_inactive_gaps"
  );
  assert.equal(
    schema.parentRoute,
    "same_route_root_key_global_retained_row_set_identity_provider"
  );
  assert.equal(schema.eventRootKey, 2856731379702547500);
  assert.equal(schema.retainedBranchClaim, false);
  assert.deepEqual(schema.requiredFieldIds, [
    "route_root_key_2856731379702547500",
    "same_route_root_key_global_retained_row_set_identity",
    "all_layer_pair_chronological_replay_identity",
    "active_domain_extension_status_for_both_inactive_gaps",
    "accepted_nonlocal_transport_law",
    "retained_source_binding",
    "payload_transport_binding",
    "energy_transport_binding",
    "positive_width_or_full_point_event_domain_coverage",
    "selected_direct_absence_source_rows_if_used",
  ]);
  assert.deepEqual(schema.sameRecordBindingRequirements, [
    "one_retained_record",
    "one_route_root_key",
    "one_global_retained_row_set_identity",
    "one_active_domain_extension_status",
    "one_accepted_nonlocal_transport_law",
    "one_retained_source_binding",
    "one_payload_energy_transport_binding",
  ]);
  assert.equal(
    schema.firstBlockingProducerField,
    "active_domain_extension_status_for_both_inactive_gaps"
  );
  assert.deepEqual(schema.downstreamUnauthorizedUntilAccepted, [
    "continuous_interval_witness_row",
    "derive_presence_measure_source_from_signed_transition_balance",
    "acceptedNonlocalTransportLawPass",
    "retainedBranchClaim",
  ]);
  assert.deepEqual(
    schema.negativeControls.map((control) => control.id),
    [
      "endpoint_provider_route_only_rows_not_accepted_nonlocal_transport",
      "hinge_point_replay_not_accepted_nonlocal_transport",
      "route_authorized_point_events_not_accepted_nonlocal_transport",
      "target_derived_affine_fits_not_accepted_nonlocal_transport",
      "sampled_dense_support_not_accepted_nonlocal_transport",
      "phase_cancellation_rows_not_accepted_nonlocal_transport",
      "aggregate_rows_not_accepted_nonlocal_transport",
      "cross_row_bundles_not_accepted_nonlocal_transport",
      "current_proxy_rows_not_accepted_nonlocal_transport",
      "generated_decoys_not_accepted_nonlocal_transport",
      "tautological_unit_density_width_identity_not_accepted_nonlocal_transport",
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
