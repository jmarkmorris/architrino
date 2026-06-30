import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  buildReport,
  validationErrors,
} from "../scripts/solver-audits/branch-provider-evidence-report.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/solver-audits/branch-provider-evidence-report.mjs", import.meta.url)
);
const CURRENT_FIXTURE = fileURLToPath(
  new URL("../scripts/solver-audits/fixtures/branch-provider-current-candidates.json", import.meta.url)
);

function consumer(report, id) {
  return report.consumer_results.find((entry) => entry.consumer_id === id);
}

function h39Candidate(manifest) {
  return manifest.candidates.find(
    (candidate) =>
      candidate.id ===
      "h39-aggregate-p-provider-preaggregation-construction-attempt"
  );
}

function h39SourceMapProviderObjectReadout(report) {
  return report.provider_object_construction_attempt.candidate_attempts.find(
    (candidate) =>
      candidate.candidate_id ===
      "h39-aggregate-p-provider-preaggregation-construction-attempt"
  ).source_contract_readout.source_provenance_refinement
    .source_map_provider_object_branch_interval_readout;
}

function h39RetainedRecordPreimageFixture(report) {
  return h39SourceMapProviderObjectReadout(report)
    .h39_receiver_normal_retained_record_preimage_fixture;
}

function h39ProducerSideProviderObjectBranchRowTarget(report) {
  return h39SourceMapProviderObjectReadout(report)
    .h39_producer_side_provider_object_branch_row_target;
}

function h39SourceMapProviderObjectBranchSplitMapProducerTarget(report) {
  return h39SourceMapProviderObjectReadout(report)
    .h39_source_map_provider_object_branch_split_map_producer_target;
}

function h39PreaggregateProviderObjectBranchRowProducerTarget(report) {
  return h39SourceMapProviderObjectReadout(report)
    .h39_preaggregate_provider_object_branch_row_producer_target;
}

test("branch-provider evidence report rejects current fixture, toy, proxy, status-shell, and target candidates", () => {
  const fixture = JSON.parse(fs.readFileSync(CURRENT_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: CURRENT_FIXTURE });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.schema, "branch_provider_evidence_report/v0");
  assert.equal(report.provider_verdict, "same_domain_branch_provider_missing");
  assert.equal(report.first_failure, "accepted_non_fixture_source_missing");
  assert.equal(report.summary.candidate_count, 8);
  assert.equal(report.summary.provider_ready_consumer_count, 0);
  assert.equal(
    report.provider_object_construction_attempt.schema,
    "same_domain_branch_provider_object_construction_attempt/v0"
  );
  assert.equal(
    report.provider_object_construction_attempt.status,
    "same_domain_branch_provider_object_construction_blocked"
  );
  assert.equal(
    report.provider_object_construction_attempt.claim_level,
    "priority-only construction attempt, not provider acceptance"
  );
  assert.equal(
    report.provider_object_construction_attempt.first_failure,
    "accepted_non_fixture_source_missing"
  );
  assert.equal(
    report.provider_object_construction_attempt.summary.ready_candidate_count,
    0
  );
  assert.equal(
    report.provider_object_construction_attempt.summary.missing_or_rejected_field_union.includes(
      "branch_rows_ref"
    ),
    true
  );
  assert.equal(
    report.provider_object_construction_attempt.summary.missing_or_rejected_field_union.includes(
      "aggregate_erasure_negative_control_ref"
    ),
    true
  );
  assert.equal(
    report.provider_object_construction_attempt.authorization
      .provider_ready_authorized_by_this_attempt,
    false
  );
  assert.equal(
    report.provider_object_construction_attempt.authorization
      .downstream_consumer_authorization,
    false
  );
  assert.equal(report.authorization.rank2_accepted_transition_source_ready, false);
  assert.equal(report.authorization.rank4_pressure_row_provider_ready, false);
  assert.equal(report.authorization.rank5_bounded_speed_live_ledger_ready, false);
  assert.equal(report.authorization.rank6_moving_branch_provider_ready, false);
  assert.equal(report.authorization.candidate_h_recovery, false);
  assert.equal(report.authorization.structural_integrity_residual_vector, false);

  const rank2 = consumer(report, "rank2_field_speed_action_self_hit_scan");
  assert.equal(rank2.provider_ready, false);
  assert.equal(rank2.missing_or_rejected_fields.includes("branch_certificate_ref"), true);
  assert.equal(rank2.missing_or_rejected_fields.includes("conservation_pullback_hash"), true);

  const rank5 = consumer(report, "rank5_bounded_speed_normal_reconstruction");
  assert.equal(rank5.provider_ready, false);
  assert.equal(rank5.missing_or_rejected_fields.includes("branch_certificate_ref"), true);

  const a0Frontier = report.candidate_results.find(
    (candidate) => candidate.id === "pressure-row-a0-branch-source-frontier-partial"
  );
  assert.deepEqual(a0Frontier.provider_ready_for_consumers, []);
  assert.equal(
    a0Frontier.consumer_results[0].missing_or_rejected_fields.includes("branch_certificate_ref"),
    true
  );

  const torqueWake = report.candidate_results.find(
    (candidate) => candidate.id === "tri-binary-torque-wake-same-row-diagnostic"
  );
  assert.deepEqual(torqueWake.provider_ready_for_consumers, []);

  const h39ConstructionAttempt = report.candidate_results.find(
    (candidate) =>
      candidate.id ===
      "h39-aggregate-p-provider-preaggregation-construction-attempt"
  );
  assert.equal(
    h39ConstructionAttempt.provider_source_status,
    "target_only_not_accepted_source"
  );
  assert.deepEqual(h39ConstructionAttempt.provider_ready_for_consumers, []);
  assert.equal(
    h39ConstructionAttempt.consumer_results.every(
      (result) => result.provider_ready === false
    ),
    true
  );
  assert.equal(
    h39ConstructionAttempt.consumer_results.every(
      (result) => result.first_failure === "accepted_non_fixture_source_missing"
    ),
    true
  );

  const h39ConstructionAttemptDetails =
    report.provider_object_construction_attempt.candidate_attempts.find(
      (candidate) =>
        candidate.candidate_id ===
        "h39-aggregate-p-provider-preaggregation-construction-attempt"
    );
  assert.equal(
    h39ConstructionAttemptDetails.provider_source_status,
    "target_only_not_accepted_source"
  );
  assert.equal(h39ConstructionAttemptDetails.provider_object_fields_ready, false);
  assert.equal(h39ConstructionAttemptDetails.branch_materialization_ready, false);
  assert.equal(
    h39ConstructionAttemptDetails.missing_or_rejected_fields.includes(
      "branch_rows_ref"
    ),
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.missing_or_rejected_fields.includes(
      "branch_labels"
    ),
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.missing_or_rejected_fields.includes(
      "branch_weights_or_intervals"
    ),
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.missing_or_rejected_fields.includes(
      "projection_map_ref"
    ),
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.missing_or_rejected_fields.includes(
      "pushforward_operator_ref"
    ),
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.missing_or_rejected_fields.includes(
      "normalization_identity_ref"
    ),
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.missing_or_rejected_fields.includes(
      "conservation_pullback_hash"
    ),
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.missing_or_rejected_fields.includes(
      "aggregate_erasure_negative_control_ref"
    ),
    false
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout.schema,
    "branch_provider_candidate_source_contract_readout/v0"
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout.status,
    "candidate-boundary-replay-verified-source-term-provider-certification-open"
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_contract_boundary_verified,
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_contract_boundary_row_count,
    5
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_contract_boundary_check_count,
    17
  );
  assert.deepEqual(
    h39ConstructionAttemptDetails.source_contract_readout.shared_source_cell_ids,
    [
      "speed.0.first-y",
      "speed.1.first-y",
      "speed.2.first-y",
      "speed.3.first-y",
      "speed.4.first-y",
    ]
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_term_provider_probe_same_domain_contract_ready,
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_term_provider_probe_same_radius_contract_ready,
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .terminal_row_enclosure_boundary_replay_verified,
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .directed_rounded_shared_domain_provider_certified,
    false
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_term_provider_probe_rows_certify_directed_rounded_source,
    false
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_term_provider_probe_term_width_realization_closed,
    false
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement.schema,
    "branch_provider_candidate_source_provenance_refinement/v0"
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement.status,
    "candidate-source-covariance-lambda-provider-object-replay-branch-intervals-open"
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement
      .term_width_reduced_to_signed_radius_source_provenance,
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement.term_width_is_primary_blocker,
    false
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement
      .directed_rounded_source_provenance_still_open,
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement
      .source_provenance_certificate_fields_present,
    false
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement.source_provenance_emitter_materialized,
    false
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement
      .signed_radius_subinterval_emitter_primitive_materialized,
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement.source_term_producer_image_fields_projected,
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement
      .lambda_terminal_witness_branch_intervals_available,
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement
      .source_map_provider_branch_intervals_available,
    false
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement.source_provenance_emitter_target.schema,
    "branch_provider_candidate_source_provenance_emitter_target/v0"
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement.source_provenance_emitter_target.status,
    "candidate-signed-radius-subinterval-emitter-primitive-materialized-source-provenance-open"
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement.source_provenance_emitter_target
      .signed_radius_subinterval_emitter_primitive_materialized,
    true
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement.source_provenance_emitter_target
      .source_provenance_emitter_materialized,
    false
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement.source_provenance_emitter_target
      .source_provenance_emitter_certified_directed_rounded,
    false
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement.source_provenance_emitter_target
      .provider_ready_authorized_by_this_target,
    false
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement.provider_object_branch_intervals_present,
    false
  );
  const sourceMapProviderObjectReadout =
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement
      .source_map_provider_object_branch_interval_readout;
  assert.equal(
    sourceMapProviderObjectReadout.schema,
    "branch_provider_candidate_source_map_provider_object_branch_interval_readout/v0"
  );
  assert.equal(
    sourceMapProviderObjectReadout.status,
    "candidate-source-map-provider-object-branch-intervals-open"
  );
  assert.equal(sourceMapProviderObjectReadout.terminal_row_count, 15);
  assert.equal(sourceMapProviderObjectReadout.branch_row_count, 30);
  assert.equal(
    sourceMapProviderObjectReadout
      .lambda_terminal_witness_branch_intervals_available,
    true
  );
  assert.equal(
    sourceMapProviderObjectReadout.source_map_provider_branch_intervals_available,
    false
  );
  assert.equal(
    sourceMapProviderObjectReadout.provider_object_branch_intervals_present,
    false
  );
  assert.equal(
    sourceMapProviderObjectReadout.accepted_provider_object_branch_interval_count,
    0
  );
  assert.deepEqual(
    sourceMapProviderObjectReadout.rejected_candidate_source_kinds,
    [
      "lambda-terminal-witness-branch-interval",
      "aggregate-P-only-provider-row",
      "variable-owned-alpha-candidate",
      "row-local-expression-branch-feed",
    ]
  );
  assert.deepEqual(
    sourceMapProviderObjectReadout.missing_identity_kinds,
    [
      "same-domain-branch-bearing-P_b-map",
      "branch_projection_or_alpha_map",
      "pushforward_operator_ref",
      "normalization_identity_ref",
    ]
  );
  assert.equal(sourceMapProviderObjectReadout.required_terminal_row_ids.length, 15);
  assert.deepEqual(sourceMapProviderObjectReadout.required_terminal_row_ids, [
    "speed.0.first-y:h37",
    "speed.0.first-y:h36",
    "speed.0.first-y:h35",
    "speed.1.first-y:h37",
    "speed.1.first-y:h36",
    "speed.1.first-y:h35",
    "speed.2.first-y:h37",
    "speed.2.first-y:h36",
    "speed.2.first-y:h35",
    "speed.3.first-y:h37",
    "speed.3.first-y:h36",
    "speed.3.first-y:h35",
    "speed.4.first-y:h37",
    "speed.4.first-y:h36",
    "speed.4.first-y:h35",
  ]);
  assert.equal(sourceMapProviderObjectReadout.required_branch_row_ids.length, 30);
  assert.deepEqual(sourceMapProviderObjectReadout.required_branch_row_ids.slice(0, 6), [
    "speed.0.first-y:h37:P_-",
    "speed.0.first-y:h37:P_+",
    "speed.0.first-y:h36:P_-",
    "speed.0.first-y:h36:P_+",
    "speed.0.first-y:h35:P_-",
    "speed.0.first-y:h35:P_+",
  ]);
  assert.deepEqual(sourceMapProviderObjectReadout.required_branch_row_ids.slice(-4), [
    "speed.4.first-y:h36:P_-",
    "speed.4.first-y:h36:P_+",
    "speed.4.first-y:h35:P_-",
    "speed.4.first-y:h35:P_+",
  ]);
  assert.equal(
    sourceMapProviderObjectReadout.required_branch_rows[0]
      .provider_object_branch_target,
    "P_-"
  );
  assert.equal(
    sourceMapProviderObjectReadout.required_branch_rows[1]
      .provider_object_branch_target,
    "P_+"
  );
  assert.equal(
    sourceMapProviderObjectReadout.interval_class_distinction
      .lambda_terminal_witness_branch_intervals
      .admissible_as_provider_object_branch_interval,
    false
  );
  assert.equal(
    sourceMapProviderObjectReadout.interval_class_distinction
      .lambda_terminal_witness_branch_intervals.status,
    "available-comparison-witness-only"
  );
  assert.equal(
    sourceMapProviderObjectReadout.interval_class_distinction
      .source_map_provider_branch_intervals.status,
    "missing-provider-object-payload"
  );
  assert.equal(
    sourceMapProviderObjectReadout.interval_class_distinction
      .provider_object_branch_intervals.status,
    "missing-provider-object-payload"
  );
  assert.deepEqual(sourceMapProviderObjectReadout.same_record_binding_fields, [
    "same_domain_record_ref",
    "terminal_graph_cell_id",
    "terminal_h_index",
    "branch",
    "source_y_order",
    "required_xi_derivative_order",
    "source_map_provider_branch_intervals.source_map_provider_object_branch_interval",
    "provider_object_branch_intervals.provider_object_branch_interval",
    "same-domain-branch-bearing-P_b-map",
    "branch_projection_or_alpha_map",
    "pushforward_operator_ref",
    "normalization_identity_ref",
  ]);
  const branchSplitMapAvailability =
    sourceMapProviderObjectReadout
      .source_map_provider_object_branch_split_map_availability;
  assert.equal(
    branchSplitMapAvailability.schema,
    "branch_provider_candidate_source_map_provider_object_branch_split_map_availability/v0"
  );
  assert.equal(
    branchSplitMapAvailability.status,
    "source-map-provider-object-branch-split-map-source-field-not-emitted"
  );
  assert.equal(branchSplitMapAvailability.required_terminal_row_count, 15);
  assert.equal(branchSplitMapAvailability.required_branch_row_count, 30);
  assert.deepEqual(
    branchSplitMapAvailability.required_terminal_row_ids,
    sourceMapProviderObjectReadout.required_terminal_row_ids
  );
  assert.deepEqual(
    branchSplitMapAvailability.required_branch_row_ids,
    sourceMapProviderObjectReadout.required_branch_row_ids
  );
  assert.equal(
    branchSplitMapAvailability.source_field,
    "source_map_provider_object_branch_split_map_available_terminal_row_count"
  );
  assert.equal(
    branchSplitMapAvailability.source_field_emitted_by_provider_readout,
    false
  );
  assert.equal(
    branchSplitMapAvailability.observed_available_terminal_row_count,
    0
  );
  assert.equal(branchSplitMapAvailability.branch_split_map_populated, false);
  assert.equal(
    branchSplitMapAvailability.branch_split_map_count_readout.observed_count,
    0
  );
  assert.equal(
    branchSplitMapAvailability.branch_split_map_count_readout.required_count,
    15
  );
  assert.equal(
    branchSplitMapAvailability.branch_split_map_count_readout
      .emitted_by_provider_readout,
    false
  );
  assert.equal(
    branchSplitMapAvailability.branch_interval_count_readout.observed_count,
    0
  );
  assert.equal(
    branchSplitMapAvailability.branch_interval_count_readout.required_count,
    30
  );
  assert.equal(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .source_field,
    "provider_object_branch_antisymmetric_equation_available_terminal_row_count"
  );
  assert.equal(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .available_terminal_row_count,
    0
  );
  assert.equal(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .required_terminal_row_count,
    15
  );
  assert.deepEqual(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .required_terminal_row_ids,
    sourceMapProviderObjectReadout.required_terminal_row_ids
  );
  assert.deepEqual(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .required_branch_row_ids,
    sourceMapProviderObjectReadout.required_branch_row_ids
  );
  assert.deepEqual(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .available_terminal_row_ids,
    []
  );
  assert.deepEqual(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .missing_terminal_row_ids,
    sourceMapProviderObjectReadout.required_terminal_row_ids
  );
  assert.deepEqual(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .missing_terminal_rows,
    sourceMapProviderObjectReadout.required_terminal_rows
  );
  assert.deepEqual(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .available_branch_row_ids,
    []
  );
  assert.deepEqual(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .missing_branch_row_ids,
    sourceMapProviderObjectReadout.required_branch_row_ids
  );
  assert.deepEqual(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .missing_branch_rows,
    sourceMapProviderObjectReadout.required_branch_rows
  );
  assert.equal(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .missing_branch_row_count,
    30
  );
  assert.equal(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .exact_missing_terminal_rows_known,
    true
  );
  assert.equal(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .exact_missing_branch_rows_known,
    true
  );
  assert.equal(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .missing_terminal_row_count,
    15
  );
  assert.equal(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .emitted_by_provider_readout,
    true
  );
  assert.equal(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .emitted_surface,
    "terminal-expression-level-source-map-provider-object-branch-antisymmetric-equation-extractor"
  );
  assert.equal(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .emitted_field,
    "provider_object_branch_antisymmetric_equation_available_terminal_row_count"
  );
  assert.equal(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .all_required_terminal_rows_available,
    false
  );
  assert.equal(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout
      .all_required_terminal_rows_missing,
    true
  );
  assert.equal(
    branchSplitMapAvailability.branch_antisymmetric_equation_readout.complete,
    false
  );
  assert.equal(
    branchSplitMapAvailability.explicit_provider_object_branch_row_readout
      .observed_count,
    0
  );
  assert.equal(
    branchSplitMapAvailability.branch_attributed_source_term_readout
      .observed_count,
    0
  );
  assert.equal(
    branchSplitMapAvailability.first_missing_source_field,
    "source_map_provider_object_branch_split_map_available_terminal_row_count"
  );
  assert.equal(
    branchSplitMapAvailability
      .next_missing_source_field_after_branch_split_map_count,
    "provider_object_branch_antisymmetric_equation_available_terminal_row_count"
  );
  assert.equal(
    branchSplitMapAvailability
      .next_missing_source_surface_after_branch_split_map_count,
    "terminal-expression-level-source-map-provider-object-branch-antisymmetric-equation-extractor"
  );
  assert.equal(
    branchSplitMapAvailability.smallest_next_evidence_object,
    "same-domain provider-object branch antisymmetric equation A_P=P_- - P_+ or explicit expression-level P_- / P_+ branch rows on all 15 terminal rows"
  );
  assert.equal(
    branchSplitMapAvailability.provider_object_branch_intervals_present,
    false
  );
  assert.equal(
    branchSplitMapAvailability.provider_ready_authorized_by_this_availability,
    false
  );
  assert.equal(branchSplitMapAvailability.downstream_consumer_authorization, false);
  const sourceFieldAudit =
    sourceMapProviderObjectReadout.source_field_availability_audit;
  assert.equal(
    sourceFieldAudit.schema,
    "branch_provider_candidate_source_map_provider_object_branch_interval_source_field_availability_audit/v0"
  );
  assert.equal(
    sourceFieldAudit.status,
    "source-map-provider-object-branch-interval-source-fields-incomplete"
  );
  assert.equal(sourceFieldAudit.required_terminal_row_count, 15);
  assert.equal(sourceFieldAudit.required_branch_row_count, 30);
  assert.equal(sourceFieldAudit.inspected_h39_diagnostic_field_refs.length, 5);
  assert.deepEqual(
    sourceFieldAudit.inspected_h39_diagnostic_field_refs.map(
      (entry) => entry.surface
    ),
    [
      "terminal-expression-level-source-map-provider-object-branch-producer",
      "terminal-expression-level-source-map-provider-object-branch-antisymmetric-equation-extractor",
      "terminal-expression-level-source-map-provider-object-branch-split-map-underdetermination",
      "terminal-row-provider-object-replay",
      "terminal-source-covariance-provider-object-branch-residual-extractor",
    ]
  );
  const sourceFieldsByKey = Object.fromEntries(
    sourceFieldAudit.source_fields.map((field) => [field.key, field])
  );
  assert.equal(
    sourceFieldAudit.first_missing_source_field,
    "source_map_provider_object_branch_split_map_available_terminal_row_count"
  );
  assert.equal(
    sourceFieldAudit.first_missing_identity_family,
    "same-domain-branch-bearing-P_b-map"
  );
  assert.equal(
    sourceFieldAudit.first_missing_provider_field,
    "source_map_provider_object_branch_split_map_available_terminal_row_count"
  );
  assert.equal(
    sourceFieldsByKey.branch_split_map.field,
    "source_map_provider_object_branch_split_map_available_terminal_row_count"
  );
  assert.equal(sourceFieldsByKey.branch_split_map.observed_count, 0);
  assert.equal(sourceFieldsByKey.branch_split_map.required_count, 15);
  assert.equal(sourceFieldsByKey.branch_split_map.complete, false);
  assert.equal(
    sourceFieldsByKey.branch_antisymmetric_equation.field,
    "provider_object_branch_antisymmetric_equation_available_terminal_row_count"
  );
  assert.equal(sourceFieldsByKey.branch_antisymmetric_equation.observed_count, 0);
  assert.equal(sourceFieldsByKey.branch_antisymmetric_equation.required_count, 15);
  assert.equal(
    sourceFieldsByKey.branch_antisymmetric_equation.emitted_by_provider_readout,
    true
  );
  assert.equal(sourceFieldsByKey.branch_antisymmetric_equation.complete, false);
  assert.equal(sourceFieldsByKey.candidate_intervals.observed_count, 0);
  assert.equal(
    sourceFieldsByKey.candidate_intervals.emitted_by_provider_readout,
    false
  );
  assert.equal(sourceFieldsByKey.admissible_intervals.observed_count, 0);
  assert.equal(sourceFieldsByKey.actual_intervals.observed_count, 0);
  assert.equal(sourceFieldsByKey.actual_intervals.required_count, 30);
  assert.equal(
    sourceFieldsByKey.source_map_provider_branch_intervals_payload.present,
    false
  );
  assert.equal(
    sourceFieldsByKey.provider_object_branch_intervals_payload.present,
    false
  );
  assert.deepEqual(
    sourceFieldAudit.identity_families.map((identity) => [
      identity.identity_kind,
      identity.present,
      identity.complete,
    ]),
    [
      ["same-domain-branch-bearing-P_b-map", false, false],
      ["branch_projection_or_alpha_map", false, false],
      ["pushforward_operator_ref", false, false],
      ["normalization_identity_ref", false, false],
    ]
  );
  assert.equal(sourceFieldAudit.provider_ready_authorized_by_this_audit, false);
  assert.equal(sourceFieldAudit.downstream_consumer_authorization, false);
  const producerSideBranchRowEvidenceTarget =
    sourceMapProviderObjectReadout
      .producer_side_same_domain_branch_row_evidence_target;
  assert.equal(
    producerSideBranchRowEvidenceTarget.schema,
    "branch_provider_candidate_producer_side_same_domain_branch_row_evidence_target/v0"
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.claim_level,
    "priority-only target, not provider acceptance"
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.status,
    "producer-side-same-domain-branch-row-evidence-missing"
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.target_kind,
    "same-domain-expression-level-source-map-provider-object-branch-row-evidence"
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.missing_producer_object_kind,
    "same-domain-expression-level-provider-object-branch-antisymmetric-equation-or-explicit-branch-rows"
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.required_producer_object,
    "same-domain provider-object branch antisymmetric equation A_P=P_- - P_+ or explicit expression-level P_- / P_+ branch rows on all 15 terminal rows"
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.producer_object_formula,
    "A_P=P_- - P_+; u_P=A_P/2"
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.producer_source_surface,
    "terminal-expression-level-source-map-provider-object-branch-antisymmetric-equation-extractor"
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.producer_source_field,
    "provider_object_branch_antisymmetric_equation_available_terminal_row_count"
  );
  assert.deepEqual(
    producerSideBranchRowEvidenceTarget.required_terminal_row_ids,
    sourceMapProviderObjectReadout.required_terminal_row_ids
  );
  assert.deepEqual(
    producerSideBranchRowEvidenceTarget.required_branch_row_ids,
    sourceMapProviderObjectReadout.required_branch_row_ids
  );
  assert.deepEqual(
    producerSideBranchRowEvidenceTarget.current_missing_terminal_row_ids,
    sourceMapProviderObjectReadout.required_terminal_row_ids
  );
  assert.deepEqual(
    producerSideBranchRowEvidenceTarget.current_missing_branch_row_ids,
    sourceMapProviderObjectReadout.required_branch_row_ids
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.current_available_terminal_row_count,
    0
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.current_missing_terminal_row_count,
    15
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.current_missing_branch_row_count,
    30
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.current_source_counts
      .provider_object_branch_antisymmetric_equation_available_terminal_row_count,
    0
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.current_source_counts
      .explicit_provider_object_branch_row_count,
    0
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.current_source_counts
      .source_term_provider_branch_attributed_term_row_count,
    0
  );
  assert.deepEqual(
    producerSideBranchRowEvidenceTarget.same_domain_identity_fields,
    sourceMapProviderObjectReadout.same_record_binding_fields
  );
  assert.deepEqual(
    producerSideBranchRowEvidenceTarget.required_identity_kinds,
    [
      "same-domain-branch-bearing-P_b-map",
      "branch_projection_or_alpha_map",
      "pushforward_operator_ref",
      "normalization_identity_ref",
    ]
  );
  assert.deepEqual(
    producerSideBranchRowEvidenceTarget.required_interval_payloads,
    [
      "source_map_provider_branch_intervals",
      "provider_object_branch_intervals",
    ]
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.first_missing_provider_field,
    "source_map_provider_object_branch_split_map_available_terminal_row_count"
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.negative_control.ref,
    "aggregate-P-provider-probe-born-aggregate-only"
  );
  assert.deepEqual(
    producerSideBranchRowEvidenceTarget.negative_control
      .rejected_candidate_source_kinds,
    [
      "lambda-terminal-witness-branch-interval",
      "aggregate-P-only-provider-row",
      "variable-owned-alpha-candidate",
      "row-local-expression-branch-feed",
    ]
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.negative_control
      .aggregate_p_only_rejected,
    true
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.negative_control
      .lambda_terminal_witness_only_rejected,
    true
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.negative_control
      .branch_attributed_source_terms_without_provider_object_rejected,
    true
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget
      .provider_ready_authorized_by_this_target,
    false
  );
  assert.equal(
    producerSideBranchRowEvidenceTarget.downstream_consumer_authorization,
    false
  );
  assert.equal(
    sourceMapProviderObjectReadout.positive_evidence_target.schema,
    "branch_provider_candidate_source_map_provider_object_branch_interval_target/v0"
  );
  assert.equal(
    sourceMapProviderObjectReadout.positive_evidence_target.claim_level,
    "priority-only target, not provider acceptance"
  );
  assert.equal(
    sourceMapProviderObjectReadout.positive_evidence_target
      .required_terminal_row_count,
    15
  );
  assert.equal(
    sourceMapProviderObjectReadout.positive_evidence_target
      .required_branch_row_count,
    30
  );
  assert.deepEqual(
    sourceMapProviderObjectReadout.positive_evidence_target
      .required_identity_kinds,
    [
      "same-domain-branch-bearing-P_b-map",
      "branch_projection_or_alpha_map",
      "pushforward_operator_ref",
      "normalization_identity_ref",
    ]
  );
  assert.deepEqual(
    sourceMapProviderObjectReadout.positive_evidence_target
      .required_interval_payloads,
    [
      "source_map_provider_branch_intervals",
      "provider_object_branch_intervals",
    ]
  );
  assert.equal(
    sourceMapProviderObjectReadout.positive_evidence_target
      .accepted_provider_object_branch_interval_count_required,
    30
  );
  assert.equal(
    sourceMapProviderObjectReadout.positive_evidence_target
      .same_record_binding_required,
    true
  );
  assert.deepEqual(
    sourceMapProviderObjectReadout.positive_evidence_target
      .required_terminal_row_ids,
    sourceMapProviderObjectReadout.required_terminal_row_ids
  );
  assert.deepEqual(
    sourceMapProviderObjectReadout.positive_evidence_target
      .required_branch_row_ids,
    sourceMapProviderObjectReadout.required_branch_row_ids
  );
  assert.deepEqual(
    sourceMapProviderObjectReadout.positive_evidence_target
      .required_same_record_binding_fields,
    sourceMapProviderObjectReadout.same_record_binding_fields
  );
  assert.equal(
    sourceMapProviderObjectReadout.positive_evidence_target
      .lambda_terminal_witness_branch_intervals_are_provider_object_intervals,
    false
  );
  assert.equal(
    sourceMapProviderObjectReadout.positive_evidence_target
      .provider_ready_authorized_by_this_target,
    false
  );
  assert.equal(
    sourceMapProviderObjectReadout.positive_evidence_target
      .downstream_consumer_authorization,
    false
  );
  assert.equal(
    sourceMapProviderObjectReadout.provider_ready_authorized_by_this_readout,
    false
  );
  assert.equal(
    sourceMapProviderObjectReadout.downstream_consumer_authorization,
    false
  );
  const retainedRecordPreimageFixture =
    sourceMapProviderObjectReadout
      .h39_receiver_normal_retained_record_preimage_fixture;
  assert.equal(
    retainedRecordPreimageFixture.schema,
    "h39-receiver-normal-retained-record-preimage-fixture/v0"
  );
  assert.equal(
    retainedRecordPreimageFixture.claim_level,
    "priority-only executable fixture, not provider acceptance"
  );
  assert.equal(
    retainedRecordPreimageFixture.status,
    "h39-receiver-normal-retained-record-preimage-fixture-fail-closed"
  );
  assert.equal(
    retainedRecordPreimageFixture.target_row_schema,
    "h39-receiver-normal-retained-record-preimage-row/v0"
  );
  assert.equal(
    retainedRecordPreimageFixture.receiver_normal_artifact_ref,
    "receiver-normal-retained-branch-family-first-derivative/v0"
  );
  assert.deepEqual(
    retainedRecordPreimageFixture.required_preimage_fields,
    [
      "accepted_provider_object_branch_row_ref",
      "retained_causal_root_record_ref",
      "branch_family_checksum",
      "receiver_normal_fields",
      "receiver_normal_derivative_fields",
      "geometry_derivative_fields",
    ]
  );
  assert.deepEqual(
    retainedRecordPreimageFixture.required_terminal_row_ids,
    sourceMapProviderObjectReadout.required_terminal_row_ids
  );
  assert.deepEqual(
    retainedRecordPreimageFixture.required_branch_row_ids,
    sourceMapProviderObjectReadout.required_branch_row_ids
  );
  assert.equal(retainedRecordPreimageFixture.row_count, 7);
  assert.equal(retainedRecordPreimageFixture.fixture_rows.length, 7);
  assert.equal(
    retainedRecordPreimageFixture.provider_ready_authorized_by_this_fixture,
    false
  );
  assert.equal(
    retainedRecordPreimageFixture.downstream_consumer_authorization,
    false
  );
  assert.equal(
    retainedRecordPreimageFixture.retained_branch_claim_authorized_by_this_fixture,
    false
  );
  assert.deepEqual(
    retainedRecordPreimageFixture.negative_control.rejected_provider_candidate_kinds,
    [
      "aggregate-P-only-provider-row",
      "lambda-terminal-witness-branch-interval",
      "variable-owned-alpha-candidate",
      "row-local-expression-branch-feed",
      "term-pushforward-candidate-row",
      "primitive-vector-replay",
      "hybrid-prefix-cauchy-diagnostic",
      "coefficient-series-source-map-residual-provider-candidate",
      "source-map-residual-provider-candidate",
      "provider-fit-diagnostic",
      "signed-radius-target",
      "fourth-jet-or-Taylor-derivative-row",
    ]
  );
  assert.equal(
    retainedRecordPreimageFixture.negative_control
      .fourth_jet_or_taylor_rows_rejected_as_receiver_normal_derivative_evidence,
    true
  );
  const producerSideProviderObjectBranchRowTarget =
    sourceMapProviderObjectReadout
      .h39_producer_side_provider_object_branch_row_target;
  assert.equal(
    producerSideProviderObjectBranchRowTarget.schema,
    "h39-producer-side-provider-object-branch-row-target/v0"
  );
  assert.equal(
    producerSideProviderObjectBranchRowTarget.claim_level,
    "priority-only executable target, not provider acceptance"
  );
  assert.equal(
    producerSideProviderObjectBranchRowTarget.status,
    "h39-producer-side-provider-object-branch-row-target-fail-closed"
  );
  assert.equal(
    producerSideProviderObjectBranchRowTarget.provider_ready_authorized_by_this_target,
    false
  );
  assert.equal(
    producerSideProviderObjectBranchRowTarget.retained_record_preimage_authorized_by_this_target,
    false
  );
  assert.deepEqual(
    producerSideProviderObjectBranchRowTarget.required_terminal_row_ids,
    sourceMapProviderObjectReadout.required_terminal_row_ids
  );
  assert.deepEqual(
    producerSideProviderObjectBranchRowTarget.required_branch_row_ids,
    sourceMapProviderObjectReadout.required_branch_row_ids
  );
  assert.deepEqual(
    producerSideProviderObjectBranchRowTarget.required_producer_fields,
    [
      "same_domain_record_ref",
      "terminal_row_id",
      "branch_label",
      "producer_object_formula",
      "source_map_provider_branch_intervals",
      "provider_object_branch_intervals",
      "same-domain-branch-bearing-P_b-map",
      "branch_projection_or_alpha_map",
      "pushforward_operator_ref",
      "normalization_identity_ref",
    ]
  );
  const splitMapProducerTarget =
    sourceMapProviderObjectReadout
      .h39_source_map_provider_object_branch_split_map_producer_target;
  assert.equal(
    splitMapProducerTarget.schema,
    "h39-source-map-provider-object-branch-split-map-producer-target/v0"
  );
  assert.equal(
    splitMapProducerTarget.status,
    "h39-source-map-provider-object-branch-split-map-producer-target-fail-closed"
  );
  assert.equal(splitMapProducerTarget.provider_ready_authorized_by_this_target, false);
  assert.equal(
    splitMapProducerTarget.producer_side_branch_row_authorized_by_this_target,
    false
  );
  assert.deepEqual(
    splitMapProducerTarget.required_terminal_row_ids,
    sourceMapProviderObjectReadout.required_terminal_row_ids
  );
  assert.deepEqual(
    splitMapProducerTarget.required_branch_row_ids,
    sourceMapProviderObjectReadout.required_branch_row_ids
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement.latest_candidate_boundary,
    "terminal-source-covariance-lambda-provider-object-replay-audit-provider-branch-intervals-open"
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement.current_blocker_classification,
    "same-domain-source-map-provider-object-branch-intervals-needed"
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement.current_primary_missing_object_kind,
    "source-map-provider-object-branch-intervals"
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement.next_evidence_object,
    "same-domain source-map provider-object branch intervals on every terminal row"
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .source_provenance_refinement
      .provider_ready_authorized_by_this_refinement,
    false
  );
  assert.deepEqual(
    h39ConstructionAttemptDetails.source_contract_readout
      .open_provider_certification_blocker_kinds,
    [
      "source_term_provider_directed_source_certification_open",
      "source_term_provider_term_width_realization_open",
    ]
  );
  assert.equal(
    h39ConstructionAttemptDetails.source_contract_readout
      .provider_ready_authorized_by_this_readout,
    false
  );

  const h39Readouts =
    report.provider_object_construction_attempt.consumer_construction_attempt_readouts.filter(
      (readout) =>
        readout.candidate_id ===
        "h39-aggregate-p-provider-preaggregation-construction-attempt"
    );
  assert.equal(h39Readouts.length, 4);
  assert.deepEqual(
    h39Readouts.map((readout) => readout.consumer_id).sort(),
    [
      "rank2_field_speed_action_self_hit_scan",
      "rank4_pressure_row_branch_intake",
      "rank5_bounded_speed_normal_reconstruction",
      "rank6_moving_retained_branch_certificate",
    ]
  );
  assert.deepEqual(
    h39Readouts.map((readout) => readout.rank).sort((a, b) => a - b),
    [2, 4, 5, 6]
  );
  assert.equal(
    h39Readouts.every((readout) => readout.construction_attempt_ready === false),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) => readout.provider_ready_authorized_by_this_attempt === false
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) => readout.downstream_consumer_authorization === false
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) => readout.first_failure === "accepted_non_fixture_source_missing"
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.aggregate_erasure_negative_control_ref ===
        "aggregate-P-provider-probe-born-aggregate-only"
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.schema ===
        "branch_provider_candidate_source_contract_readout/v0"
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.status ===
        "candidate-boundary-replay-verified-source-term-provider-certification-open"
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_contract_boundary_verified === true
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout
          ?.directed_rounded_shared_domain_provider_certified === false
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout
          ?.provider_ready_authorized_by_this_readout === false
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_provenance_refinement
          ?.term_width_reduced_to_signed_radius_source_provenance === true
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_provenance_refinement
          ?.source_provenance_emitter_target?.schema ===
        "branch_provider_candidate_source_provenance_emitter_target/v0"
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_provenance_refinement
          ?.source_provenance_emitter_target
          ?.signed_radius_subinterval_emitter_primitive_materialized === true
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_provenance_refinement
          ?.source_provenance_emitter_target
          ?.source_provenance_emitter_materialized === false
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_provenance_refinement
          ?.source_provenance_emitter_target
          ?.provider_ready_authorized_by_this_target === false
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_provenance_refinement
          ?.directed_rounded_source_provenance_still_open === true
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_provenance_refinement
          ?.source_provenance_emitter_materialized === false
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_provenance_refinement
          ?.signed_radius_subinterval_emitter_primitive_materialized === true
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_provenance_refinement
          ?.source_term_producer_image_fields_projected === true
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_provenance_refinement
          ?.lambda_terminal_witness_branch_intervals_available === true
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_provenance_refinement
          ?.source_map_provider_branch_intervals_available === false
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_provenance_refinement
          ?.current_primary_missing_object_kind ===
        "source-map-provider-object-branch-intervals"
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_provenance_refinement
          ?.source_map_provider_object_branch_interval_readout
          ?.source_map_provider_object_branch_split_map_availability
          ?.provider_ready_authorized_by_this_availability === false
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_provenance_refinement
          ?.source_map_provider_object_branch_interval_readout
          ?.source_map_provider_object_branch_split_map_availability
          ?.next_missing_source_field_after_branch_split_map_count ===
        "provider_object_branch_antisymmetric_equation_available_terminal_row_count"
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) => {
        const equationReadout =
          readout.source_contract_readout?.source_provenance_refinement
            ?.source_map_provider_object_branch_interval_readout
            ?.source_map_provider_object_branch_split_map_availability
            ?.branch_antisymmetric_equation_readout;
        return (
          equationReadout?.emitted_by_provider_readout === true &&
          equationReadout?.available_terminal_row_count === 0 &&
          equationReadout?.missing_terminal_row_count === 15 &&
          equationReadout?.missing_branch_row_count === 30 &&
          equationReadout?.exact_missing_terminal_rows_known === true &&
          equationReadout?.exact_missing_branch_rows_known === true &&
          Array.isArray(equationReadout?.missing_terminal_row_ids) &&
          equationReadout.missing_terminal_row_ids.length === 15 &&
          Array.isArray(equationReadout?.missing_branch_row_ids) &&
          equationReadout.missing_branch_row_ids.length === 30 &&
          equationReadout?.all_required_terminal_rows_missing === true &&
          equationReadout?.complete === false
        );
      }
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_provenance_refinement
          ?.source_map_provider_object_branch_interval_readout
          ?.positive_evidence_target
          ?.accepted_provider_object_branch_interval_count_required === 30
    ),
    true
  );
  assert.equal(
    h39Readouts.every(
      (readout) =>
        readout.source_contract_readout?.source_provenance_refinement
          ?.provider_ready_authorized_by_this_refinement === false
    ),
    true
  );
  assert.equal(
    h39Readouts.every((readout) =>
      readout.missing_construction_fields.includes("branch_certificate_ref")
    ),
    true
  );
  assert.equal(
    h39Readouts.every((readout) =>
      readout.missing_construction_fields.includes(
        "active_root_or_live_ledger_identity"
      )
    ),
    true
  );
  assert.equal(
    h39Readouts.every((readout) =>
      readout.missing_construction_fields.includes("branch_rows_ref")
    ),
    true
  );
  assert.equal(
    h39Readouts.every((readout) =>
      readout.missing_construction_fields.includes("projection_map_ref")
    ),
    true
  );
  assert.equal(
    h39Readouts.every((readout) =>
      readout.missing_construction_fields.includes("pushforward_operator_ref")
    ),
    true
  );
  assert.equal(
    h39Readouts.every((readout) =>
      readout.missing_construction_fields.includes("normalization_identity_ref")
    ),
    true
  );
  assert.deepEqual(
    h39Readouts
      .filter((readout) => readout.consumer_id !== "rank2_field_speed_action_self_hit_scan")
      .flatMap((readout) => readout.consumer_specific_missing_fields),
    []
  );
  assert.deepEqual(
    h39Readouts.find(
      (readout) => readout.consumer_id === "rank2_field_speed_action_self_hit_scan"
    ).consumer_specific_missing_fields,
    ["conservation_pullback_hash"]
  );
});

test("branch-provider evidence report keeps a partial producer-side branch-row object fail-closed", () => {
  const fixture = JSON.parse(fs.readFileSync(CURRENT_FIXTURE, "utf8"));
  const h39 = h39Candidate(fixture);
  const extractor =
    h39.source_contract_readout.source_provenance_refinement
      .terminal_expression_level_source_map_provider_object_branch_antisymmetric_equation_extractor;
  const terminalRowIds =
    extractor.provider_object_branch_antisymmetric_equation_missing_terminal_row_ids;
  const branchRowIds =
    extractor.provider_object_branch_antisymmetric_equation_missing_branch_row_ids;
  const missingTerminalRowIds = terminalRowIds.slice(-1);
  const missingBranchRowIds = branchRowIds.slice(-2);

  extractor.provider_object_branch_antisymmetric_equation_available_terminal_row_count = 14;
  extractor.provider_object_branch_antisymmetric_equation_missing_terminal_row_count = 1;
  extractor.provider_object_branch_antisymmetric_equation_available_terminal_row_ids =
    terminalRowIds.slice(0, -1);
  extractor.provider_object_branch_antisymmetric_equation_missing_terminal_row_ids =
    missingTerminalRowIds;
  extractor.provider_object_branch_antisymmetric_equation_available_branch_row_ids =
    branchRowIds.slice(0, -2);
  extractor.provider_object_branch_antisymmetric_equation_missing_branch_row_ids =
    missingBranchRowIds;
  extractor.explicit_provider_object_branch_row_count = 28;
  extractor.all_provider_object_branch_antisymmetric_equations_missing = false;

  const report = buildReport(fixture, { sourceRef: CURRENT_FIXTURE });
  const readout = h39SourceMapProviderObjectReadout(report);
  const branchSplitMapAvailability =
    readout.source_map_provider_object_branch_split_map_availability;
  const equationReadout =
    branchSplitMapAvailability.branch_antisymmetric_equation_readout;
  const producerSideTarget =
    readout.producer_side_same_domain_branch_row_evidence_target;

  assert.equal(report.provider_verdict, "same_domain_branch_provider_missing");
  assert.equal(report.summary.provider_ready_consumer_count, 0);
  assert.equal(
    report.provider_object_construction_attempt.summary.ready_candidate_count,
    0
  );
  assert.equal(report.authorization.rank2_accepted_transition_source_ready, false);
  assert.equal(report.authorization.rank4_pressure_row_provider_ready, false);
  assert.equal(report.authorization.rank5_bounded_speed_live_ledger_ready, false);
  assert.equal(report.authorization.rank6_moving_branch_provider_ready, false);
  assert.equal(branchSplitMapAvailability.branch_split_map_populated, false);
  assert.equal(equationReadout.available_terminal_row_count, 14);
  assert.equal(equationReadout.missing_terminal_row_count, 1);
  assert.deepEqual(equationReadout.missing_terminal_row_ids, missingTerminalRowIds);
  assert.deepEqual(equationReadout.missing_branch_row_ids, missingBranchRowIds);
  assert.equal(equationReadout.missing_branch_row_count, 2);
  assert.equal(equationReadout.all_required_terminal_rows_available, false);
  assert.equal(equationReadout.complete, false);
  assert.equal(
    branchSplitMapAvailability.explicit_provider_object_branch_row_readout
      .observed_count,
    28
  );
  assert.equal(producerSideTarget.status, "producer-side-same-domain-branch-row-evidence-missing");
  assert.equal(producerSideTarget.current_available_terminal_row_count, 14);
  assert.equal(producerSideTarget.current_missing_terminal_row_count, 1);
  assert.deepEqual(
    producerSideTarget.current_missing_terminal_row_ids,
    missingTerminalRowIds
  );
  assert.deepEqual(
    producerSideTarget.current_missing_branch_row_ids,
    missingBranchRowIds
  );
  assert.equal(producerSideTarget.current_missing_branch_row_count, 2);
  assert.equal(
    producerSideTarget.required_producer_object,
    "same-domain provider-object branch antisymmetric equation A_P=P_- - P_+ or explicit expression-level P_- / P_+ branch rows on all 15 terminal rows"
  );
  assert.equal(
    producerSideTarget.negative_control.ref,
    "aggregate-P-provider-probe-born-aggregate-only"
  );
  assert.equal(
    producerSideTarget.provider_ready_authorized_by_this_target,
    false
  );
  assert.equal(producerSideTarget.downstream_consumer_authorization, false);
  const retainedRecordPreimageFixture = h39RetainedRecordPreimageFixture(report);
  const currentAbsenceRow = retainedRecordPreimageFixture.fixture_rows.find(
    (row) => row.row_id === "current_h39_absence"
  );
  assert.equal(
    retainedRecordPreimageFixture.status,
    "h39-receiver-normal-retained-record-preimage-fixture-fail-closed"
  );
  assert.equal(
    currentAbsenceRow.available_provider_object_terminal_row_count,
    14
  );
  assert.equal(currentAbsenceRow.explicit_provider_object_branch_row_count, 28);
  assert.deepEqual(currentAbsenceRow.missing_terminal_row_ids, missingTerminalRowIds);
  assert.deepEqual(currentAbsenceRow.missing_branch_row_ids, missingBranchRowIds);
  assert.equal(currentAbsenceRow.status, "h39-provider-object-branch-row-missing");
  assert.equal(
    currentAbsenceRow.provider_ready_authorized_by_this_row,
    false
  );
  assert.equal(currentAbsenceRow.downstream_consumer_authorization, false);
  const producerSideProviderObjectBranchRowTarget =
    h39ProducerSideProviderObjectBranchRowTarget(report);
  const currentProducerAbsence =
    producerSideProviderObjectBranchRowTarget.target_rows.find(
      (row) => row.row_id === "current_h39_producer_absence"
    );
  assert.equal(
    producerSideProviderObjectBranchRowTarget.status,
    "h39-producer-side-provider-object-branch-row-target-fail-closed"
  );
  assert.equal(
    currentProducerAbsence.available_provider_object_terminal_row_count,
    14
  );
  assert.equal(
    currentProducerAbsence.explicit_provider_object_branch_row_count,
    28
  );
  assert.deepEqual(
    currentProducerAbsence.missing_terminal_row_ids,
    missingTerminalRowIds
  );
  assert.deepEqual(
    currentProducerAbsence.missing_branch_row_ids,
    missingBranchRowIds
  );
  const splitMapProducerTarget =
    h39SourceMapProviderObjectBranchSplitMapProducerTarget(report);
  const currentSplitMapAbsence = splitMapProducerTarget.target_rows.find(
    (row) => row.row_id === "current_h39_split_map_source_field_absent"
  );
  assert.equal(
    splitMapProducerTarget.status,
    "h39-source-map-provider-object-branch-split-map-producer-target-fail-closed"
  );
  assert.equal(
    currentSplitMapAbsence
      .source_map_provider_object_branch_split_map_available_terminal_row_count,
    0
  );
  assert.equal(
    currentSplitMapAbsence
      .provider_object_branch_antisymmetric_equation_available_terminal_row_count,
    14
  );
  assert.equal(
    currentSplitMapAbsence.explicit_provider_object_branch_row_count,
    28
  );
  assert.deepEqual(
    currentSplitMapAbsence.missing_terminal_row_ids,
    missingTerminalRowIds
  );
  assert.deepEqual(
    currentSplitMapAbsence.missing_branch_row_ids,
    missingBranchRowIds
  );
});

test("branch-provider evidence report emits the H39 preaggregate branch-row producer target fail-closed", () => {
  const fixture = JSON.parse(fs.readFileSync(CURRENT_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: CURRENT_FIXTURE });
  const target = h39PreaggregateProviderObjectBranchRowProducerTarget(report);
  const rowsById = Object.fromEntries(
    target.target_rows.map((row) => [row.row_id, row])
  );

  assert.deepEqual(validationErrors(report), []);
  assert.equal(
    target.schema,
    "h39-preaggregate-provider-object-branch-row-producer-target/v0"
  );
  assert.equal(
    target.status,
    "h39-preaggregate-provider-object-branch-row-producer-target-fail-closed"
  );
  assert.equal(target.row_count, 8);
  assert.equal(target.provider_ready_authorized_by_this_target, false);
  assert.equal(target.downstream_consumer_authorization, false);
  assert.equal(target.producer_side_branch_row_authorized_by_this_target, false);
  assert.equal(target.retained_record_preimage_authorized_by_this_target, false);
  assert.equal(
    target.expected_pre_aggregate_payload_source.expected_producer,
    "buildH39RequestedY44TerminalAggregatePProviderPreaggregationBranchBearingAuditCandidate"
  );
  assert.equal(
    target.expected_pre_aggregate_payload_source.expected_preaggregate_position,
    "before P=sum_j S_j is emitted by the source-map provider construction"
  );
  assert.equal(
    target.precise_missing_pre_aggregate_row_family.row_family,
    "source_term_provider_probe_rows[].source_term_residual_rows[] with same-domain branch-bearing provider-object payload before P=sum_j S_j"
  );
  assert.deepEqual(target.required_producer_fields, [
    "same_domain_record_ref",
    "terminal_row_id",
    "terminal_graph_cell_id",
    "terminal_h_index",
    "source_y_order",
    "required_xi_derivative_order",
    "branch_label",
    "provider_object_branch_target",
    "producer_object_formula",
    "provider_object_branch_moment_target",
    "source_term_branch_interval",
    "source_map_provider_branch_intervals",
    "provider_object_branch_intervals",
    "source_map_provider_object_branch_split_map",
    "provider_object_branch_projection_map",
    "branch_projection_or_alpha_map",
    "same-domain-branch-bearing-P_b-map",
    "pushforward_operator_ref",
    "normalization_identity_ref",
    "same_domain_pushforward_operator_identity",
    "same_domain_pushforward_normalization_identity",
    "accepted_source_status",
  ]);
  assert.deepEqual(target.downstream_blocked_fields, [
    "accepted_provider_object_branch_row_ref",
    "retained_causal_root_record_ref",
    "branch_family_checksum",
    "receiver_normal_fields",
    "receiver_normal_derivative_fields",
    "geometry_derivative_fields",
  ]);
  assert.deepEqual(target.rejected_candidate_source_kinds, [
    "fourth-jet-or-Taylor-derivative-row",
    "quotient-source-denominator-machinery",
    "aggregate-P-only-provider-row",
    "sampled-row",
    "diagnostic-only-row",
    "fixture-only-row",
    "current-proxy-row",
    "cross-row-bundle",
    "lambda-terminal-witness-branch-interval",
    "variable-owned-alpha-candidate",
    "row-local-expression-branch-feed",
    "source-map-residual-provider-candidate",
  ]);

  assert.equal(
    rowsById.current_preaggregate_branch_payload_absent.status,
    "h39-preaggregate-provider-object-branch-labels-missing"
  );
  assert.equal(
    rowsById.current_preaggregate_branch_payload_absent.first_missing_producer_field,
    "branch_label"
  );
  assert.equal(
    rowsById.current_preaggregate_branch_payload_absent
      .preaggregate_provider_object_branch_payload_row_count,
    0
  );
  assert.equal(
    rowsById.current_preaggregate_branch_payload_absent.missing_branch_row_ids.length,
    30
  );
  assert.equal(
    rowsById.branch_labels_without_terminal_identity.first_missing_producer_field,
    "terminal_row_id"
  );
  assert.equal(
    rowsById.terminal_identity_without_branch_formula.first_missing_producer_field,
    "producer_object_formula"
  );
  assert.equal(
    rowsById.branch_formula_without_interval_payloads.first_missing_producer_field,
    "source_term_branch_interval"
  );
  assert.equal(
    rowsById.interval_payloads_without_projection_payloads
      .first_missing_producer_field,
    "source_map_provider_object_branch_split_map"
  );
  assert.equal(
    rowsById.projection_payloads_without_pushforward_normalization
      .first_missing_producer_field,
    "pushforward_operator_ref"
  );
  assert.equal(
    rowsById.identity_payloads_without_accepted_source_status
      .first_missing_producer_field,
    "accepted_source_status"
  );
  assert.equal(
    rowsById.preaggregate_branch_row_review_candidate.status,
    "h39-preaggregate-provider-object-branch-row-review-required"
  );
  assert.equal(
    rowsById.preaggregate_branch_row_review_candidate.accepted_source_status_present,
    true
  );
  assert.equal(
    rowsById.preaggregate_branch_row_review_candidate
      .provider_ready_authorized_by_this_row,
    false
  );
  assert.equal(
    rowsById.preaggregate_branch_row_review_candidate
      .retained_record_preimage_authorized_by_this_row,
    false
  );
  assert.equal(target.negative_control.aggregate_p_only_rejected, true);
  assert.equal(target.negative_control.fourth_jet_or_taylor_rows_rejected, true);
  assert.equal(
    target.negative_control.quotient_source_denominator_machinery_rejected,
    true
  );
  assert.equal(target.negative_control.sampled_rows_rejected, true);
  assert.equal(target.negative_control.diagnostic_only_rows_rejected, true);
  assert.equal(target.negative_control.fixture_only_rows_rejected, true);
  assert.equal(target.negative_control.current_proxy_rows_rejected, true);
  assert.equal(target.negative_control.cross_row_bundles_rejected, true);
  assert.equal(
    target.negative_control.provider_ready_authorized_by_negative_control,
    false
  );
});

test("branch-provider evidence report emits the H39 split-map producer target fail-closed", () => {
  const fixture = JSON.parse(fs.readFileSync(CURRENT_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: CURRENT_FIXTURE });
  const target = h39SourceMapProviderObjectBranchSplitMapProducerTarget(report);
  const rowsById = Object.fromEntries(
    target.target_rows.map((row) => [row.row_id, row])
  );

  assert.deepEqual(validationErrors(report), []);
  assert.equal(
    target.schema,
    "h39-source-map-provider-object-branch-split-map-producer-target/v0"
  );
  assert.equal(
    target.status,
    "h39-source-map-provider-object-branch-split-map-producer-target-fail-closed"
  );
  assert.equal(target.row_count, 6);
  assert.equal(target.provider_ready_authorized_by_this_target, false);
  assert.equal(target.downstream_consumer_authorization, false);
  assert.equal(target.producer_side_branch_row_authorized_by_this_target, false);
  const sourceAbsenceBoundary = target.source_absence_boundary;
  assert.equal(
    sourceAbsenceBoundary.schema,
    "h39-source-map-provider-object-branch-split-map-source-absence-boundary/v0"
  );
  assert.equal(
    sourceAbsenceBoundary.status,
    "h39-source-map-provider-object-branch-split-map-source-absence-fail-closed"
  );
  assert.equal(
    sourceAbsenceBoundary.first_missing_producer_field,
    "source_map_provider_object_branch_split_map_available_terminal_row_count"
  );
  assert.equal(
    sourceAbsenceBoundary.precise_missing_pre_aggregate_row_family.row_family,
    "source_term_provider_probe_rows[].source_term_residual_rows[] with same-domain branch-bearing provider-object payload before P=sum_j S_j"
  );
  assert.equal(
    sourceAbsenceBoundary.precise_missing_pre_aggregate_row_family
      .raw_source_cell_row_count_required,
    5
  );
  assert.equal(
    sourceAbsenceBoundary.precise_missing_pre_aggregate_row_family
      .terminal_row_count_required,
    15
  );
  assert.equal(
    sourceAbsenceBoundary.precise_missing_pre_aggregate_row_family
      .terminal_feed_row_count_required,
    45
  );
  assert.deepEqual(
    sourceAbsenceBoundary.precise_missing_pre_aggregate_row_family
      .missing_payload_fields,
    [
      "branch_label",
      "source_term_branch_projection_coefficient",
      "source_term_branch_interval",
      "source_map_provider_object_branch_split_map",
      "provider_object_branch_projection_map",
      "same_domain_pushforward_operator_identity",
      "same_domain_pushforward_normalization_identity",
    ]
  );
  assert.equal(
    sourceAbsenceBoundary.expected_pre_aggregate_payload_source
      .expected_source_file,
    "scripts/neutral-braid/theta3minus-fold-pair-first-y-gd-h39-recurrence-refined-subcover-diagnostic.mjs"
  );
  assert.equal(
    sourceAbsenceBoundary.expected_pre_aggregate_payload_source
      .expected_producer,
    "buildH39RequestedY44TerminalAggregatePProviderPreaggregationBranchBearingAuditCandidate"
  );
  assert.equal(
    sourceAbsenceBoundary.expected_pre_aggregate_payload_source
      .expected_input_row_family,
    "source_map_residual_shared_stream_five_node_source_term_provider_probe.source_term_provider_probe_rows[].source_term_residual_rows[]"
  );
  assert.equal(
    sourceAbsenceBoundary.expected_pre_aggregate_payload_source
      .current_source_status,
    "aggregate-P-provider-probe-born-aggregate-only"
  );
  assert.equal(
    sourceAbsenceBoundary.expected_pre_aggregate_payload_source
      .current_source_authorizes_provider_object_p_b,
    false
  );
  assert.deepEqual(
    sourceAbsenceBoundary.missing_pushforward_normalization_identity_fields,
    [
      "same_domain_pushforward_operator_identity",
      "same_domain_pushforward_normalization_identity",
      "provider_object_pb_pushforward_operator_identity_available",
      "same_domain_pushforward_operator_identity_available_terminal_row_count",
      "same_domain_pushforward_normalization_identity_available_terminal_row_count",
      "pushforward_operator_ref",
      "normalization_identity_ref",
    ]
  );
  assert.deepEqual(sourceAbsenceBoundary.blocked_provider_object_p_b_fields, [
    "source_map_provider_object_branch_split_map",
    "provider_object_branch_projection_map",
    "same-domain-branch-bearing-P_b-map",
    "P_- provider_object_branch_interval",
    "P_+ provider_object_branch_interval",
    "provider_object_branch_sum_identity",
    "provider_object_A_P_materialization",
    "terminal_row_provider_object_replay_certification",
  ]);
  assert.deepEqual(sourceAbsenceBoundary.required_branch_identity_fields, [
    "same_domain_record_ref",
    "terminal_graph_cell_id",
    "terminal_h_index",
    "source_y_order",
    "required_xi_derivative_order",
    "source_term",
    "branch_label",
    "provider_object_branch_target",
    "provider_object_branch_moment_target",
    "source_map_provider_branch_intervals",
    "provider_object_branch_intervals",
    "same-domain-branch-bearing-P_b-map",
    "branch_projection_coefficients_or_alpha_map",
    "pushforward_operator_ref",
    "normalization_identity_ref",
  ]);
  assert.equal(
    sourceAbsenceBoundary.retained_causal_root_binding_requirement.required,
    true
  );
  assert.equal(
    sourceAbsenceBoundary.retained_causal_root_binding_requirement.binding_field,
    "retained_causal_root_record_ref"
  );
  assert.equal(
    sourceAbsenceBoundary.retained_causal_root_binding_requirement
      .required_after_provider_object_branch_rows,
    true
  );
  assert.equal(
    sourceAbsenceBoundary
      .observed_source_map_provider_object_branch_split_map_available_terminal_row_count,
    0
  );
  assert.equal(
    sourceAbsenceBoundary
      .observed_provider_object_branch_antisymmetric_equation_available_terminal_row_count,
    0
  );
  assert.equal(
    sourceAbsenceBoundary.observed_explicit_provider_object_branch_row_count,
    0
  );
  assert.equal(sourceAbsenceBoundary.aggregate_p_too_late, true);
  assert.equal(
    sourceAbsenceBoundary.aggregate_erasure_negative_control_ref,
    "aggregate-P-provider-probe-born-aggregate-only"
  );
  assert.equal(sourceAbsenceBoundary.accepted_producer_source_absent, true);
  assert.equal(
    sourceAbsenceBoundary.provider_ready_authorized_by_this_boundary,
    false
  );
  assert.equal(
    sourceAbsenceBoundary.producer_side_branch_row_authorized_by_this_boundary,
    false
  );
  assert.deepEqual(
    sourceAbsenceBoundary.downstream_blocked_fields,
    [
      "provider_object_branch_antisymmetric_equation_available_terminal_row_count",
      "explicit_provider_object_branch_row_count",
      "source_map_provider_branch_intervals",
      "provider_object_branch_intervals",
      "same-domain-branch-bearing-P_b-map",
      "branch_projection_coefficients_or_alpha_map",
      "pushforward_operator_ref",
      "normalization_identity_ref",
      "aggregate_erasure_negative_control_ref",
    ]
  );
  assert.equal(sourceAbsenceBoundary.searched_candidate_source_count, 8);
  assert.deepEqual(
    sourceAbsenceBoundary.searched_candidate_sources.map(
      (candidateSource) => candidateSource.candidate_ref
    ),
    [
      "h39-aggregate-p-provider-preaggregation-construction-attempt",
      "buildH39RequestedY44TerminalExpressionLevelSourceMapProviderObjectBranchProducerCandidate",
      "buildH39RequestedY44TerminalExpressionLevelSourceMapProviderObjectBranchSplitMapUnderdeterminationCandidate",
      "buildH39RequestedY44TerminalExpressionLevelSourceMapProviderObjectBranchAntisymmetricEquationExtractorCandidate",
      "buildH39RequestedY44TerminalProviderObjectPbPushforwardOperatorAuditCandidate",
      "buildH39RequestedY44TerminalAggregatePProviderPreaggregationBranchBearingAuditCandidate",
      "H39/H38 source-covariance closure sprint wrap-up",
      "H39 shared-domain coefficient-series engine packet",
    ]
  );
  assert.deepEqual(
    new Set(
      sourceAbsenceBoundary.searched_candidate_sources.map(
        (candidateSource) => candidateSource.accepted_producer_source
      )
    ),
    new Set([false])
  );
  assert.equal(
    sourceAbsenceBoundary.inspected_h39_diagnostic_surfaces.length,
    5
  );
  assert.deepEqual(
    sourceAbsenceBoundary.inspected_h39_diagnostic_surfaces.map(
      (surface) => surface.provider_authorizing_surface
    ),
    [false, false, false, false, false]
  );
  assert.deepEqual(target.required_producer_fields, [
    "source_map_provider_object_branch_split_map_available_terminal_row_count",
    "provider_object_branch_antisymmetric_equation_available_terminal_row_count",
    "explicit_provider_object_branch_row_count",
    "source_map_provider_branch_intervals",
    "provider_object_branch_intervals",
    "same-domain-branch-bearing-P_b-map",
    "branch_projection_coefficients_or_alpha_map",
    "pushforward_operator_ref",
    "normalization_identity_ref",
    "aggregate_erasure_negative_control_ref",
  ]);

  assert.equal(
    rowsById.current_h39_split_map_source_field_absent.status,
    "h39-source-map-provider-object-branch-split-map-source-field-missing"
  );
  assert.equal(
    rowsById.current_h39_split_map_source_field_absent.first_missing_producer_field,
    "source_map_provider_object_branch_split_map_available_terminal_row_count"
  );
  assert.equal(
    rowsById.current_h39_split_map_source_field_absent
      .source_map_provider_object_branch_split_map_available_terminal_row_count,
    0
  );
  assert.equal(
    rowsById.current_h39_split_map_source_field_absent
      .provider_object_branch_antisymmetric_equation_available_terminal_row_count,
    0
  );
  assert.equal(
    rowsById.current_h39_split_map_source_field_absent
      .explicit_provider_object_branch_row_count,
    0
  );
  assert.equal(
    rowsById.current_h39_split_map_source_field_absent.missing_terminal_row_ids.length,
    15
  );
  assert.equal(
    rowsById.current_h39_split_map_source_field_absent.missing_branch_row_ids.length,
    30
  );

  assert.equal(
    rowsById.split_map_count_without_branch_rows.status,
    "h39-source-map-provider-object-branch-row-payloads-missing"
  );
  assert.equal(
    rowsById.split_map_count_without_branch_rows.split_map_terminal_rows_present,
    true
  );
  assert.equal(
    rowsById.split_map_count_without_branch_rows
      .antisymmetric_equation_terminal_rows_present,
    false
  );
  assert.equal(
    rowsById.split_map_count_without_branch_rows.explicit_branch_rows_present,
    false
  );
  assert.equal(
    rowsById.split_map_count_without_branch_rows.first_missing_producer_field,
    "provider_object_branch_antisymmetric_equation_available_terminal_row_count"
  );

  assert.equal(
    rowsById.branch_rows_without_interval_payloads.status,
    "h39-source-map-provider-object-branch-interval-payloads-missing"
  );
  assert.equal(
    rowsById.branch_rows_without_interval_payloads.explicit_branch_rows_present,
    true
  );
  assert.equal(
    rowsById.branch_rows_without_interval_payloads.interval_payloads_present,
    false
  );
  assert.equal(
    rowsById.branch_rows_without_interval_payloads.first_missing_producer_field,
    "source_map_provider_branch_intervals"
  );

  assert.equal(
    rowsById.interval_payloads_without_identity_payloads.status,
    "h39-source-map-provider-object-branch-identity-payloads-missing"
  );
  assert.equal(
    rowsById.interval_payloads_without_identity_payloads.interval_payloads_present,
    true
  );
  assert.equal(
    rowsById.interval_payloads_without_identity_payloads.identity_payloads_present,
    false
  );
  assert.equal(
    rowsById.interval_payloads_without_identity_payloads.first_missing_producer_field,
    "same-domain-branch-bearing-P_b-map"
  );

  assert.equal(
    rowsById.identity_payloads_without_aggregate_erasure_negative_control.status,
    "h39-source-map-provider-object-aggregate-erasure-negative-control-missing"
  );
  assert.equal(
    rowsById.identity_payloads_without_aggregate_erasure_negative_control
      .identity_payloads_present,
    true
  );
  assert.equal(
    rowsById.identity_payloads_without_aggregate_erasure_negative_control
      .aggregate_erasure_negative_control_present,
    false
  );
  assert.equal(
    rowsById.identity_payloads_without_aggregate_erasure_negative_control
      .first_missing_producer_field,
    "aggregate_erasure_negative_control_ref"
  );

  assert.equal(
    rowsById.split_map_producer_review_candidate.status,
    "h39-source-map-provider-object-branch-split-map-producer-review-required"
  );
  assert.equal(
    rowsById.split_map_producer_review_candidate.split_map_terminal_rows_present,
    true
  );
  assert.equal(
    rowsById.split_map_producer_review_candidate
      .antisymmetric_equation_terminal_rows_present,
    true
  );
  assert.equal(
    rowsById.split_map_producer_review_candidate.explicit_branch_rows_present,
    true
  );
  assert.equal(rowsById.split_map_producer_review_candidate.interval_payloads_present, true);
  assert.equal(rowsById.split_map_producer_review_candidate.identity_payloads_present, true);
  assert.equal(
    rowsById.split_map_producer_review_candidate
      .aggregate_erasure_negative_control_present,
    true
  );
  assert.equal(
    rowsById.split_map_producer_review_candidate
      .producer_side_branch_row_authorized_by_this_row,
    false
  );
});

test("branch-provider evidence report emits the H39 producer-side branch-row target fail-closed", () => {
  const fixture = JSON.parse(fs.readFileSync(CURRENT_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: CURRENT_FIXTURE });
  const target = h39ProducerSideProviderObjectBranchRowTarget(report);
  const rowsById = Object.fromEntries(
    target.target_rows.map((row) => [row.row_id, row])
  );

  assert.deepEqual(validationErrors(report), []);
  assert.equal(
    target.schema,
    "h39-producer-side-provider-object-branch-row-target/v0"
  );
  assert.equal(
    target.status,
    "h39-producer-side-provider-object-branch-row-target-fail-closed"
  );
  assert.equal(target.row_count, 5);
  assert.equal(target.provider_ready_authorized_by_this_target, false);
  assert.equal(target.downstream_consumer_authorization, false);
  assert.equal(target.retained_record_preimage_authorized_by_this_target, false);
  assert.equal(
    target.source_field_blocker,
    "source_map_provider_object_branch_split_map_available_terminal_row_count"
  );

  assert.equal(
    rowsById.current_h39_producer_absence.status,
    "h39-producer-side-provider-object-branch-rows-missing"
  );
  assert.equal(
    rowsById.current_h39_producer_absence.first_missing_producer_field,
    "provider_object_branch_antisymmetric_equation_available_terminal_row_count"
  );
  assert.equal(
    rowsById.current_h39_producer_absence.available_provider_object_terminal_row_count,
    0
  );
  assert.equal(
    rowsById.current_h39_producer_absence.explicit_provider_object_branch_row_count,
    0
  );
  assert.equal(rowsById.current_h39_producer_absence.missing_terminal_row_ids.length, 15);
  assert.equal(rowsById.current_h39_producer_absence.missing_branch_row_ids.length, 30);

  assert.equal(
    rowsById.partial_producer_side_branch_rows.status,
    "h39-producer-side-provider-object-branch-rows-missing"
  );
  assert.equal(
    rowsById.partial_producer_side_branch_rows.available_provider_object_terminal_row_count,
    14
  );
  assert.equal(
    rowsById.partial_producer_side_branch_rows.explicit_provider_object_branch_row_count,
    28
  );
  assert.deepEqual(
    rowsById.partial_producer_side_branch_rows.missing_terminal_row_ids,
    ["speed.4.first-y:h35"]
  );
  assert.deepEqual(
    rowsById.partial_producer_side_branch_rows.missing_branch_row_ids,
    ["speed.4.first-y:h35:P_-", "speed.4.first-y:h35:P_+"]
  );

  assert.equal(
    rowsById.complete_branch_rows_missing_interval_payloads.status,
    "h39-producer-side-provider-object-branch-interval-payloads-missing"
  );
  assert.equal(
    rowsById.complete_branch_rows_missing_interval_payloads.all_terminal_rows_present,
    true
  );
  assert.equal(
    rowsById.complete_branch_rows_missing_interval_payloads.all_branch_rows_present,
    true
  );
  assert.equal(
    rowsById.complete_branch_rows_missing_interval_payloads.interval_payloads_present,
    false
  );
  assert.equal(
    rowsById.complete_branch_rows_missing_interval_payloads.first_missing_producer_field,
    "source_map_provider_branch_intervals"
  );

  assert.equal(
    rowsById.complete_branch_rows_missing_identity_payloads.status,
    "h39-producer-side-provider-object-branch-identity-payloads-missing"
  );
  assert.equal(
    rowsById.complete_branch_rows_missing_identity_payloads.interval_payloads_present,
    true
  );
  assert.equal(
    rowsById.complete_branch_rows_missing_identity_payloads.identity_payloads_present,
    false
  );
  assert.equal(
    rowsById.complete_branch_rows_missing_identity_payloads.first_missing_producer_field,
    "same-domain-branch-bearing-P_b-map"
  );

  assert.equal(
    rowsById.producer_side_branch_row_review_candidate.status,
    "h39-producer-side-provider-object-branch-row-review-required"
  );
  assert.equal(
    rowsById.producer_side_branch_row_review_candidate.all_terminal_rows_present,
    true
  );
  assert.equal(
    rowsById.producer_side_branch_row_review_candidate.all_branch_rows_present,
    true
  );
  assert.equal(
    rowsById.producer_side_branch_row_review_candidate.interval_payloads_present,
    true
  );
  assert.equal(
    rowsById.producer_side_branch_row_review_candidate.identity_payloads_present,
    true
  );
  assert.equal(
    rowsById.producer_side_branch_row_review_candidate.same_record_binding_verified,
    true
  );
  assert.equal(
    rowsById.producer_side_branch_row_review_candidate.accepted_provider_object_branch_row_ref,
    "h39-producer-side-provider-object-branch-rows:review-candidate"
  );
  assert.equal(
    rowsById.producer_side_branch_row_review_candidate.provider_ready_authorized_by_this_row,
    false
  );
  assert.equal(
    rowsById.producer_side_branch_row_review_candidate.retained_record_preimage_authorized_by_this_row,
    false
  );
});

test("branch-provider evidence report emits the H39 retained-record preimage fixture fail-closed", () => {
  const fixture = JSON.parse(fs.readFileSync(CURRENT_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: CURRENT_FIXTURE });
  const preimageFixture = h39RetainedRecordPreimageFixture(report);
  const rowsById = Object.fromEntries(
    preimageFixture.fixture_rows.map((row) => [row.row_id, row])
  );

  assert.deepEqual(validationErrors(report), []);
  assert.equal(
    preimageFixture.schema,
    "h39-receiver-normal-retained-record-preimage-fixture/v0"
  );
  assert.equal(
    preimageFixture.status,
    "h39-receiver-normal-retained-record-preimage-fixture-fail-closed"
  );
  assert.equal(preimageFixture.row_count, 7);
  assert.equal(preimageFixture.provider_ready_authorized_by_this_fixture, false);
  assert.equal(preimageFixture.downstream_consumer_authorization, false);
  assert.equal(
    preimageFixture.retained_branch_claim_authorized_by_this_fixture,
    false
  );

  assert.equal(
    rowsById.current_h39_absence.status,
    "h39-provider-object-branch-row-missing"
  );
  assert.equal(
    rowsById.current_h39_absence.first_missing_preimage_field,
    "accepted_provider_object_branch_row_ref"
  );
  assert.equal(
    rowsById.current_h39_absence.available_provider_object_terminal_row_count,
    0
  );
  assert.equal(rowsById.current_h39_absence.explicit_provider_object_branch_row_count, 0);
  assert.equal(
    rowsById.current_h39_absence.accepted_provider_object_branch_interval_count,
    0
  );
  assert.equal(rowsById.current_h39_absence.missing_branch_row_ids.length, 30);
  assert.equal(
    rowsById.current_h39_absence.provider_ready_authorized_by_this_row,
    false
  );

  assert.equal(
    rowsById.source_map_residual_provider_only.status,
    "h39-coefficient-series-provider-candidate-not-retained-record-preimage"
  );
  assert.equal(
    rowsById.source_map_residual_provider_only.provider_row_source_kind,
    "directed-rounded-same-domain-h38-source-map-residual-provider"
  );
  assert.equal(
    rowsById.source_map_residual_provider_only
      .accepted_provider_object_branch_row_present,
    false
  );

  assert.equal(
    rowsById.partial_provider_object_branch_row.status,
    "h39-provider-object-branch-row-missing"
  );
  assert.equal(
    rowsById.partial_provider_object_branch_row
      .available_provider_object_terminal_row_count,
    14
  );
  assert.equal(
    rowsById.partial_provider_object_branch_row
      .explicit_provider_object_branch_row_count,
    28
  );
  assert.deepEqual(
    rowsById.partial_provider_object_branch_row.missing_terminal_row_ids,
    ["speed.4.first-y:h35"]
  );
  assert.deepEqual(
    rowsById.partial_provider_object_branch_row.missing_branch_row_ids,
    ["speed.4.first-y:h35:P_-", "speed.4.first-y:h35:P_+"]
  );

  assert.equal(
    rowsById.accepted_provider_object_unbound.status,
    "h39-provider-object-retained-record-unbound"
  );
  assert.equal(
    rowsById.accepted_provider_object_unbound
      .accepted_provider_object_branch_row_present,
    true
  );
  assert.equal(
    rowsById.accepted_provider_object_unbound.retained_causal_root_record_bound,
    false
  );

  assert.equal(
    rowsById.retained_record_missing_receiver_normal_derivative.status,
    "h39-receiver-normal-derivative-fields-missing"
  );
  assert.equal(
    rowsById.retained_record_missing_receiver_normal_derivative
      .receiver_normal_fields_present,
    true
  );
  assert.equal(
    rowsById.retained_record_missing_receiver_normal_derivative
      .receiver_normal_derivative_fields_present,
    false
  );

  assert.equal(
    rowsById.fourth_jet_taylor_derivative_only.status,
    "h39-provider-candidate-consumed-as-retained-record"
  );
  assert.equal(
    rowsById.fourth_jet_taylor_derivative_only.rejected_provider_candidate_kind,
    "fourth-jet-or-Taylor-derivative-row"
  );
  assert.equal(
    rowsById.fourth_jet_taylor_derivative_only
      .receiver_normal_derivative_fields_present,
    false
  );

  assert.equal(
    rowsById.preimage_review_candidate.status,
    "h39-receiver-normal-retained-record-preimage-review-required"
  );
  assert.equal(
    rowsById.preimage_review_candidate
      .accepted_provider_object_branch_row_present,
    true
  );
  assert.equal(
    rowsById.preimage_review_candidate.retained_causal_root_record_bound,
    true
  );
  assert.equal(rowsById.preimage_review_candidate.branch_family_checksum_bound, true);
  assert.equal(rowsById.preimage_review_candidate.receiver_normal_fields_present, true);
  assert.equal(
    rowsById.preimage_review_candidate.receiver_normal_derivative_fields_present,
    true
  );
  assert.equal(rowsById.preimage_review_candidate.geometry_derivative_fields_present, true);
  assert.equal(rowsById.preimage_review_candidate.same_record_identity_verified, true);
  assert.equal(
    rowsById.preimage_review_candidate.provider_ready_authorized_by_this_row,
    false
  );
  assert.equal(rowsById.preimage_review_candidate.downstream_consumer_authorization, false);
  assert.equal(
    rowsById.preimage_review_candidate.retained_branch_claim_authorized_by_this_row,
    false
  );
});

test("branch-provider evidence report can accept a complete non-fixture provider per consumer", () => {
  const report = buildReport({
    schema: "branch_provider_evidence_candidates/v0",
    report_id: "synthetic-provider-manifest",
    candidates: [
      {
        id: "synthetic-rank2-provider",
        provider_source_status: "accepted_non_fixture_source",
        feeds: ["rank2_field_speed_action_self_hit_scan"],
        same_domain_record_ref: "source-record:rank2",
        branch_certificate_ref: "branch-certificate:rank2",
        active_root_or_live_ledger_identity: "root-ledger:rank2",
        conservation_pullback_hash: "sha256:conservation",
        branch_local_projection_or_normalization_identity: "projection:rank2"
      },
      {
        id: "synthetic-rank5-provider",
        provider_source_status: "accepted_non_fixture_source",
        feeds: ["rank5_bounded_speed_normal_reconstruction"],
        same_domain_record_ref: "source-record:rank5",
        branch_certificate_ref: "branch-certificate:rank5",
        active_root_or_live_ledger_identity: "bounded-speed-live-ledger:rank5",
        branch_local_projection_or_normalization_identity: "normalization:rank5"
      }
    ]
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.provider_verdict, "provider_ready_for_one_or_more_consumers");
  assert.equal(report.first_failure, null);
  assert.equal(report.authorization.rank2_accepted_transition_source_ready, true);
  assert.equal(report.authorization.rank5_bounded_speed_live_ledger_ready, true);
  assert.equal(report.authorization.rank6_moving_branch_provider_ready, false);
  assert.equal(report.authorization.candidate_h_recovery, false);
  assert.equal(report.authorization.retained_branch_claim, false);
  assert.equal(report.summary.provider_ready_consumer_count, 2);
  assert.equal(
    report.provider_object_construction_attempt.status,
    "same_domain_branch_provider_object_construction_blocked"
  );
  assert.equal(
    report.provider_object_construction_attempt.authorization
      .provider_ready_authorized_by_this_attempt,
    false
  );
});

test("branch-provider evidence CLI emits and validates current fixture report", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "branch-provider-evidence-"));
  const reportPath = path.join(tempDir, "report.json");

  execFileSync(
    process.execPath,
    [SCRIPT_PATH, "--input", CURRENT_FIXTURE, "--out", reportPath, "--pretty"],
    { encoding: "utf8" }
  );

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.equal(report.provider_verdict, "same_domain_branch_provider_missing");
  assert.equal(report.authorization.rank2_accepted_transition_source_ready, false);
  assert.equal(
    report.provider_object_construction_attempt.status,
    "same_domain_branch_provider_object_construction_blocked"
  );
  const h39ReportTarget = h39ProducerSideProviderObjectBranchRowTarget(report);
  assert.equal(
    h39ReportTarget.status,
    "h39-producer-side-provider-object-branch-row-target-fail-closed"
  );
  assert.equal(h39ReportTarget.provider_ready_authorized_by_this_target, false);
  assert.equal(
    h39ReportTarget.retained_record_preimage_authorized_by_this_target,
    false
  );
  const h39SplitMapTarget =
    h39SourceMapProviderObjectBranchSplitMapProducerTarget(report);
  assert.equal(
    h39SplitMapTarget.status,
    "h39-source-map-provider-object-branch-split-map-producer-target-fail-closed"
  );
  assert.equal(h39SplitMapTarget.provider_ready_authorized_by_this_target, false);
  assert.equal(
    h39SplitMapTarget.producer_side_branch_row_authorized_by_this_target,
    false
  );

  const validation = JSON.parse(
    execFileSync(process.execPath, [SCRIPT_PATH, "--validate", reportPath, "--pretty"], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.provider_verdict, "same_domain_branch_provider_missing");
});
