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
  assert.equal(
    schema.producerStepSchema,
    "aaa-tri-binary-active-domain-extension-prove-both-inactive-gaps-producer-step.v1"
  );
  assert.equal(
    schema.producerStepId,
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
  assert.deepEqual(schema.producerStepRequiredFieldIds, [
    "active_domain_gap_count",
    "both_inactive_no_transition_gap_rows",
    "point_contact_identity_rule",
    "same_record_binding",
    "first_unresolved_active_domain_extension_field",
  ]);
  assert.equal(
    schema.firstUnresolvedActiveDomainExtensionField,
    "active_domain_extension_status_for_both_inactive_gaps"
  );
  assert.deepEqual(schema.sameRecordBindingRequirements, [
    "event_root_key_2856731379702547500",
    "same_route_root_key_retained_row_set",
    "all_layer_pair_chronological_replay_identity",
    "active_domain_extension_fill_rule",
    "global_retained_row_set_identity_provider",
  ]);
  assert.deepEqual(schema.downstreamUnauthorizedUntilAccepted, [
    "retained_active_row_branch_certificate_ref",
    "accepted_same_record_branch_chart",
    "moving_retained_branch_certificate",
    "accepted_transition_source",
    "retained_branch_closure",
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

test("existing angular report exposes active-domain extension producer step fail closed", (t) => {
  if (!fs.existsSync(reportPath)) {
    t.skip("local v76 angular report fixture is not present");
    return;
  }

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const producerStep =
    report.retainedEventDomainFork?.retainedRowSetIdentityObstructionTarget
      ?.globalRetainedRowSetIdentityLiftTarget
      ?.activeDomainExtensionProducerTarget
      ?.activeDomainExtensionProducerStep;
  if (producerStep == null) {
    t.skip("local v76 angular report fixture predates the producer step");
    return;
  }

  assert.equal(
    producerStep.schema,
    "aaa-tri-binary-active-domain-extension-prove-both-inactive-gaps-producer-step.v1"
  );
  assert.equal(
    producerStep.producerStepId,
    "prove_active_domain_extension_for_both_inactive_gaps"
  );
  assert.equal(producerStep.routeRootKey, 2856731379702547500);
  assert.equal(producerStep.retainedBranchClaim, false);
  assert.equal(producerStep.emitsBranchCertificateRef, false);
  assert.equal(producerStep.emitsAcceptedBranchChart, false);
  assert.equal(producerStep.emitsMovingRetainedBranchCertificate, false);
  assert.equal(producerStep.emitsAcceptedTransitionSource, false);
  assert.equal(producerStep.emitsRetainedBranchClosure, false);
  assert.equal(
    producerStep.firstUnresolvedActiveDomainExtensionField,
    "active_domain_extension_status_for_both_inactive_gaps"
  );
  assert.ok(producerStep.activeDomainGapCount > 0);
  assert.ok(producerStep.bothInactiveNoTransitionGapRowCount > 0);
  assert.ok(
    producerStep.bothInactiveNoTransitionGapRows.every(
      (row) =>
        row.producerStepId ===
          "prove_active_domain_extension_for_both_inactive_gaps" &&
        row.acceptedGapRowPass === false
    )
  );
  assert.deepEqual(producerStep.downstreamUnauthorizedUntilAccepted, [
    "retained_active_row_branch_certificate_ref",
    "accepted_same_record_branch_chart",
    "moving_retained_branch_certificate",
    "accepted_transition_source",
    "retained_branch_closure",
  ]);
  assert.deepEqual(
    producerStep.negativeControls.map((control) => control.id),
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

test("event-root absence-bridge fill-law producer schema stays fail closed", () => {
  const schema = JSON.parse(
    execFileSync(
      process.execPath,
      [
        scriptPath,
        "--schema",
        "event-root-absence-bridge-fill-law-producer-target",
      ],
      { encoding: "utf8" }
    )
  );

  assert.equal(
    schema.schema,
    "aaa-tri-binary-event-root-absence-bridge-fill-law-producer-target.schema.v1"
  );
  assert.equal(
    schema.parentSourceBoundary,
    "nonlocal_event_root_bracket_fill_rule_source_boundary"
  );
  assert.equal(schema.targetObjectId, "event_root_absence_bridge_fill_law");
  assert.equal(
    schema.producerStepSchema,
    "aaa-tri-binary-event-root-absence-bridge-fill-law-producer-step.v1"
  );
  assert.equal(
    schema.producerStepId,
    "derive_event_root_absence_bridge_fill_law"
  );
  assert.equal(schema.eventRootKey, 2856731379702547500);
  assert.equal(schema.retainedBranchClaim, false);
  assert.deepEqual(schema.requiredFieldIds, [
    "bounded_gap_row_count",
    "same_event_root_endpoint_boundaries",
    "affine_bracket_geometry",
    "event_root_identity_conservation_on_affine_bracket_interval",
    "accepted_nonlocal_event_root_bracket_transport_law",
  ]);
  assert.equal(
    schema.firstUnresolvedField,
    "event_root_identity_conservation_on_affine_bracket_interval"
  );
  assert.equal(
    schema.firstUnresolvedProducer,
    "derive_event_root_absence_bridge_fill_law"
  );
  assert.deepEqual(schema.downstreamUnauthorizedUntilAccepted, [
    "retained_active_row_branch_certificate_ref",
    "accepted_same_record_branch_chart",
    "moving_retained_branch_certificate",
    "accepted_transition_source",
    "retained_branch_closure",
    "global_retained_row_set_identity",
  ]);
  assert.deepEqual(
    schema.negativeControls.map((control) => control.id),
    [
      "endpoint_only_gap_boundaries_not_absence_bridge_fill_law",
      "affine_bracket_geometry_without_identity_conservation_not_absence_bridge_fill_law",
      "sampled_dense_support_not_absence_bridge_fill_law",
      "phase_cancellation_rows_not_absence_bridge_fill_law",
      "aggregate_rows_not_absence_bridge_fill_law",
      "target_only_rows_not_absence_bridge_fill_law",
      "route_only_rows_not_absence_bridge_fill_law",
      "cross_row_bundles_not_absence_bridge_fill_law",
    ]
  );
});

test("active-domain two-sheet global-binding producer schema stays fail closed", () => {
  const schema = JSON.parse(
    execFileSync(
      process.execPath,
      [
        scriptPath,
        "--schema",
        "active-domain-extension-two-sheet-global-binding-producer-target",
      ],
      { encoding: "utf8" }
    )
  );

  assert.equal(
    schema.schema,
    "aaa-tri-binary-active-domain-extension-two-sheet-global-binding-producer-target.schema.v1"
  );
  assert.equal(
    schema.parentProducerStepId,
    "derive_event_root_absence_bridge_fill_law"
  );
  assert.equal(
    schema.targetObjectId,
    "active_domain_extension_required_before_two_sheet_global_binding"
  );
  assert.equal(
    schema.producerStepSchema,
    "aaa-tri-binary-active-domain-extension-two-sheet-global-binding-producer-step.v1"
  );
  assert.equal(
    schema.producerStepId,
    "active_domain_extension_required_before_two_sheet_global_binding"
  );
  assert.equal(schema.eventRootKey, 2856731379702547500);
  assert.equal(schema.retainedBranchClaim, false);
  assert.deepEqual(schema.requiredFieldIds, [
    "source_binding_two_sheet_dependency_rows",
    "same_route_root_key_2856731379702547500",
    "bounded_gap_row_family",
    "endpoint_bracket_evidence",
    "affine_bracket_evidence",
    "active_domain_extension_status_for_both_inactive_gaps",
    "event_root_identity_conservation_on_affine_bracket_interval",
    "accepted_nonlocal_event_root_bracket_transport_law",
    "same_record_binding",
  ]);
  assert.equal(
    schema.firstUnresolvedField,
    "active_domain_extension_status_for_both_inactive_gaps"
  );
  assert.equal(
    schema.firstInternalBlocker,
    "active_domain_extension_required_before_source_binding_two_sheet_global_binding"
  );
  assert.deepEqual(schema.sameRecordBindingRequirements, [
    "one_retained_record",
    "one_route_root_key",
    "one_event_root_key",
    "one_source_binding_two_sheet_dependency_row_family",
    "one_active_domain_extension_status",
    "one_identity_conservation_status",
    "one_accepted_nonlocal_transport_status",
  ]);
  assert.deepEqual(schema.downstreamUnauthorizedUntilAccepted, [
    "retained_active_row_branch_certificate_ref",
    "accepted_same_record_branch_chart",
    "moving_retained_branch_certificate",
    "accepted_transition_source",
    "retained_branch_closure",
    "global_retained_row_set_identity",
    "accepted_nonlocal_transport",
    "event_root_identity_conservation",
  ]);
  assert.deepEqual(
    schema.negativeControls.map((control) => control.id),
    [
      "endpoint_only_gaps_not_two_sheet_global_binding",
      "affine_geometry_without_identity_conservation_not_two_sheet_global_binding",
      "sampled_dense_support_not_two_sheet_global_binding",
      "phase_cancellation_rows_not_two_sheet_global_binding",
      "aggregate_rows_not_two_sheet_global_binding",
      "target_only_rows_not_two_sheet_global_binding",
      "route_only_rows_not_two_sheet_global_binding",
      "cross_row_bundles_not_two_sheet_global_binding",
      "one_sheet_or_cross_root_joins_not_two_sheet_global_binding",
    ]
  );
});

test("selected active-domain bounded-gap fill evidence schema keeps row split fail closed", () => {
  const schema = JSON.parse(
    execFileSync(
      process.execPath,
      [
        scriptPath,
        "--schema",
        "selected-active-domain-bounded-gap-fill-evidence-producer-target",
      ],
      { encoding: "utf8" }
    )
  );

  assert.equal(
    schema.schema,
    "aaa-tri-binary-selected-active-domain-bounded-gap-fill-evidence-producer-target.schema.v1"
  );
  assert.equal(
    schema.parentProducerStepId,
    "active_domain_extension_required_before_two_sheet_global_binding"
  );
  assert.equal(
    schema.targetObjectId,
    "selected_active_domain_bounded_gap_fill_evidence"
  );
  assert.equal(
    schema.producerStepSchema,
    "aaa-tri-binary-selected-active-domain-bounded-gap-fill-evidence-producer-step.v1"
  );
  assert.equal(
    schema.producerStepId,
    "classify_selected_active_domain_bounded_gap_fill_evidence"
  );
  assert.equal(schema.eventRootKey, 2856731379702547500);
  assert.equal(schema.retainedBranchClaim, false);
  assert.deepEqual(schema.requiredFieldIds, [
    "five_selected_active_domain_bounded_gap_rows",
    "direct_support_row_split",
    "direct_absence_row_split",
    "endpoint_bracket_fields",
    "affine_bracket_fields",
    "selected_partial_support_retained_row_set_binding",
    "selected_direct_absence_bounded_gap_fill_law",
    "same_record_binding",
  ]);
  assert.deepEqual(schema.expectedSelectedRowIds, [
    "inner->middle:28:right",
    "inner->outer:11:left",
    "inner->outer:17:right",
    "inner->outer:31:right",
    "inner->outer:81:right",
  ]);
  assert.deepEqual(schema.directSupportRowIds, [
    "inner->middle:28:right",
    "inner->outer:17:right",
  ]);
  assert.deepEqual(schema.directAbsenceRowIds, [
    "inner->outer:11:left",
    "inner->outer:31:right",
    "inner->outer:81:right",
  ]);
  assert.equal(
    schema.firstMissingField,
    "selected_partial_support_retained_row_set_binding"
  );
  assert.equal(
    schema.firstDirectAbsenceMissingField,
    "selected_direct_absence_bounded_gap_fill_law"
  );
  assert.deepEqual(schema.sameRecordBindingRequirements, [
    "one_retained_record",
    "one_route_root_key",
    "one_event_root_key",
    "five_selected_active_domain_bounded_gap_rows",
    "one_direct_support_retained_row_set_binding_status",
    "one_direct_absence_bounded_gap_fill_law_status",
  ]);
  assert.deepEqual(schema.downstreamUnauthorizedUntilAccepted, [
    "retained_active_row_branch_certificate_ref",
    "accepted_same_record_branch_chart",
    "moving_retained_branch_certificate",
    "accepted_transition_source",
    "retained_branch_closure",
    "global_retained_row_set_identity",
    "accepted_nonlocal_transport",
    "event_root_identity_conservation",
  ]);
  assert.deepEqual(
    schema.negativeControls.map((control) => control.id),
    [
      "endpoint_only_rows_not_selected_bounded_gap_fill_evidence",
      "affine_geometry_alone_not_selected_bounded_gap_fill_evidence",
      "one_sheet_or_cross_root_joins_not_selected_bounded_gap_fill_evidence",
      "sampled_support_not_selected_bounded_gap_fill_evidence",
      "phase_cancellation_rows_not_selected_bounded_gap_fill_evidence",
      "aggregate_rows_not_selected_bounded_gap_fill_evidence",
      "target_only_rows_not_selected_bounded_gap_fill_evidence",
      "route_only_rows_not_selected_bounded_gap_fill_evidence",
      "cross_row_bundles_not_selected_bounded_gap_fill_evidence",
      "current_proxy_branch_charts_not_selected_bounded_gap_fill_evidence",
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
