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
} from "../scripts/nested-shell-braid/torque-wake-same-row-diagnostic-report.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/nested-shell-braid/torque-wake-same-row-diagnostic-report.mjs", import.meta.url)
);
const CURRENT_FIXTURE = fileURLToPath(
  new URL(
    "../scripts/nested-shell-braid/fixtures/torque-wake-same-row-diagnostic-priority-target.json",
    import.meta.url
  )
);

function providerField(report, field) {
  return report.branch_certificate_provider_object_target.field_results.find(
    (entry) => entry.field === field
  );
}

function sameStepProviderField(report, field) {
  return report.same_step_retained_torque_wake_branch_certificate_provider_target.field_results.find(
    (entry) => entry.field === field
  );
}

function sourceAuditField(report, field) {
  return report.branch_certificate_ref_source_availability_audit.field_results.find(
    (entry) => entry.field === field
  );
}

function missingAcceptedRef(target, field) {
  return target.missing_accepted_refs.find((entry) => entry.field === field);
}

test("torque/wake same-row diagnostic records useful rows but blocks all authorization", () => {
  const fixture = JSON.parse(fs.readFileSync(CURRENT_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: CURRENT_FIXTURE });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.schema, "torque_wake_same_row_diagnostic_report/v0");
  assert.equal(report.promotion_status, "priority-only");
  assert.equal(report.selected_case_id, "index-ratio:f2");
  assert.equal(report.same_row_id_binding, true);
  assert.equal(report.same_record_source_binding, false);
  assert.equal(report.first_failure, "branch_certificate_ref_missing");
  assert.deepEqual(report.retained_upgrade_required, {
    same_retained_active_row_ids: "blocked_pending_branch_certificate_ref",
    accepted_branch_chart: "missing",
    moving_branch_certificate: "missing",
  });
  assert.equal(
    report.retained_active_row_certificate_contract.schema,
    "same_retained_active_row_certificate_contract/v0"
  );
  assert.deepEqual(report.retained_active_row_certificate_contract.feeds, [
    "rank2.accepted_transition_source",
    "rank6.moving_retained_branch_certificate/v0",
  ]);
  assert.equal(
    report.retained_active_row_certificate_contract.first_failure,
    "branch_certificate_ref_missing_before_same_retained_active_row_ids"
  );
  assert.equal(report.retained_active_row_certificate_contract.sampled_same_row_id_binding, true);
  assert.equal(
    report.retained_active_row_certificate_contract.same_retained_active_row_id_binding,
    false
  );
  assert.equal(
    report.retained_active_row_certificate_contract.retained_authorization,
    false
  );
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.schema,
    "torque_wake_branch_certificate_ref_source_availability_audit/v0"
  );
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.retained_active_row_branch_certificate_ref_found,
    false
  );
  assert.equal(report.branch_certificate_ref_source_availability_audit.source_report_identity_binding, true);
  assert.equal(report.branch_certificate_ref_source_availability_audit.sampled_same_row_id_binding, true);
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.first_failure,
    "branch_certificate_ref_missing"
  );
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.missing_or_rejected_fields.includes(
      "branch_certificate_ref"
    ),
    true
  );
  assert.deepEqual(
    report.branch_certificate_ref_source_availability_audit.sampled_active_row_certificate_contract
      .required_same_retained_active_row_ids,
    fixture.sampled_active_row_ids
  );
  assert.deepEqual(
    report.branch_certificate_ref_source_availability_audit.sampled_active_row_certificate_contract
      .observed_same_retained_active_row_ids,
    []
  );
  assert.deepEqual(report.branch_certificate_ref_source_availability_audit.same_record_identity_required_fields, [
    "same_record_identity.branch_label",
    "same_record_identity.extraction_window_id",
    "same_record_identity.active_root_ledger_hash",
    "same_record_identity.accepted_branch_chart_ref",
    "same_record_identity.separator_chart_ref",
    "same_record_identity.positive_gap_record_ref",
    "same_record_identity.memory_depth_record_ref",
    "same_record_identity.active_wave_vector_gap_ref",
  ]);
  assert.deepEqual(report.branch_certificate_ref_source_availability_audit.reference_rejection_policy.disallowed_prefixes, [
    "priority-only:",
    "fixture:",
    "proxy:",
    "candidate:",
    "synthetic:",
    "route-only:",
    "aggregate:",
    "cross-row:",
  ]);
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.next_retained_active_row_evidence_object.schema,
    "torque_wake_retained_active_row_branch_certificate_evidence_object/v0"
  );
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.fail_closed_bridge_target.schema,
    "torque_wake_retained_active_row_branch_certificate_bridge_target/v0"
  );
  assert.deepEqual(
    report.branch_certificate_ref_source_availability_audit.fail_closed_bridge_target.retained_active_row_ids,
    fixture.sampled_active_row_ids
  );
  assert.deepEqual(
    report.branch_certificate_ref_source_availability_audit.fail_closed_bridge_target.current_hash_bindings,
    {
      active_root_ledger_hash: fixture.active_root_ledger_hash,
      conservation_pullback_hash: fixture.conservation_pullback_hash,
      negative_control_ref: fixture.negative_control_ref,
    }
  );
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.fail_closed_bridge_target.source_search_result
      .accepted_source_found,
    false
  );
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.fail_closed_bridge_target.source_search_result
      .nearest_partial_source_ref,
    "scripts/nested-shell-braid/fixtures/moving-retained-branch-certificate-partial-same-record-identity-scout.json"
  );
  assert.equal(
    missingAcceptedRef(
      report.branch_certificate_ref_source_availability_audit.fail_closed_bridge_target,
      "branch_certificate_ref"
    ).first_failure_code,
    "branch_certificate_ref_missing"
  );
  assert.equal(
    missingAcceptedRef(
      report.branch_certificate_ref_source_availability_audit.fail_closed_bridge_target,
      "same_record_identity.accepted_branch_chart_ref"
    ).nearest_partial_ref,
    "proxy:accepted-branch-chart-ref-not-issued"
  );
  assert.equal(
    missingAcceptedRef(
      report.branch_certificate_ref_source_availability_audit.fail_closed_bridge_target,
      "moving_retained_branch_certificate_ref"
    ).first_failure_code,
    "moving_retained_branch_certificate_ref_missing"
  );
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.fail_closed_bridge_target.authorization
      .moving_retained_branch_certificate,
    false
  );
  assert.equal(
    report.retained_active_row_certificate_contract.next_retained_active_row_evidence_object
      .fail_closed_bridge_target.source_search_result.accepted_source_found,
    false
  );
  assert.deepEqual(
    report.branch_certificate_ref_source_availability_audit.next_retained_active_row_evidence_object
      .required_same_retained_active_row_ids,
    fixture.sampled_active_row_ids
  );
  assert.deepEqual(
    report.branch_certificate_ref_source_availability_audit.required_retained_active_row_certificate_fields.slice(
      0,
      8
    ),
    [
      "source_report_ref",
      "selected_case_id",
      "route_root_key",
      "sampled_active_row_ids",
      "sampled_same_row_id_binding",
      "branch_certificate_ref",
      "same_retained_active_row_ids",
      "same_retained_active_row_id_binding",
    ]
  );
  assert.equal(sourceAuditField(report, "source_report_ref").status, "passed");
  assert.equal(sourceAuditField(report, "branch_certificate_ref").failure_code, "branch_certificate_ref_missing");
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.authorization.candidate_h_recovery,
    false
  );
  assert.equal(
    report.branch_certificate_provider_object_target.schema,
    "torque_wake_branch_certificate_provider_object_target/v0"
  );
  assert.equal(report.branch_certificate_provider_object_target.provider_object_ready, false);
  assert.equal(report.branch_certificate_provider_object_target.same_record_identity_present, false);
  assert.equal(
    report.branch_certificate_provider_object_target.first_failure,
    "accepted_transition_source_ref_missing"
  );
  assert.deepEqual(
    report.branch_certificate_provider_object_target.present_useful_fields,
    [
      "source_report_ref",
      "selected_case_id",
      "route_root_key",
      "sampled_active_row_ids",
      "sampled_same_row_id_binding",
      "action_increment_row_ref",
      "active_root_ledger_hash",
      "conservation_pullback_hash",
      "negative_control_ref",
    ]
  );
  assert.equal(
    report.branch_certificate_provider_object_target.missing_or_rejected_fields.includes(
      "branch_certificate_ref"
    ),
    true
  );
  assert.equal(providerField(report, "retained_branch").failure_code, "retained_branch_false_not_retained_provider");
  assert.equal(
    providerField(report, "same_retained_active_row_ids").failure_code,
    "same_retained_active_row_ids_missing"
  );
  assert.equal(
    report.branch_certificate_provider_object_target.authorization.moving_retained_branch_certificate,
    false
  );
  assert.equal(
    report.same_step_retained_torque_wake_branch_certificate_provider_target.schema,
    "same_step_retained_torque_wake_branch_certificate_provider/v0"
  );
  assert.equal(
    report.same_step_retained_torque_wake_branch_certificate_provider_target.target_status,
    "fail_closed_provider_target"
  );
  assert.equal(
    report.same_step_retained_torque_wake_branch_certificate_provider_target.required_same_step_selected_case_id,
    "index-ratio:f2"
  );
  assert.equal(
    report.same_step_retained_torque_wake_branch_certificate_provider_target.first_failure,
    "accepted_transition_source_ref_missing"
  );
  assert.equal(
    sameStepProviderField(report, "accepted_transition_source_ref").failure_code,
    "accepted_transition_source_ref_missing"
  );
  assert.equal(
    sameStepProviderField(report, "retained_branch").failure_code,
    "retained_branch_false_not_retained_provider"
  );
  assert.equal(
    sameStepProviderField(report, "same_retained_active_row_ids").failure_code,
    "same_retained_active_row_ids_missing"
  );
  assert.equal(
    report.same_step_retained_torque_wake_branch_certificate_provider_target.downstream_authorization
      .rank2_field_speed_action_self_hit_scan,
    false
  );
  assert.equal(
    report.same_step_retained_torque_wake_branch_certificate_provider_target.downstream_authorization
      .rank6_moving_retained_branch_certificate,
    false
  );
  assert.deepEqual(
    report.retained_active_row_certificate_contract.next_retained_active_row_evidence_object
      .required_same_retained_active_row_ids,
    fixture.sampled_active_row_ids
  );
  assert.equal(
    report.retained_active_row_certificate_contract.negative_control_contract.required_field,
    "negative_control_ref"
  );
  assert.equal(report.retained_branch, false);
  assert.equal(
    report.consumer_status.rank2_field_speed_action_self_hit_scan.status,
    "source_row_binding_open"
  );
  assert.equal(
    report.consumer_status.rank2_field_speed_action_self_hit_scan.candidate_h_recovery_authorized,
    false
  );
  assert.equal(
    report.consumer_status.rank6_moving_retained_branch_certificate.status,
    "blocked_pending_accepted_branch_chart"
  );
  assert.equal(
    report.consumer_status.rank6_moving_retained_branch_certificate
      .moving_retained_branch_certificate_authorized,
    false
  );
  assert.equal(
    report.consumer_status.rank5_bounded_speed_normal_reconstruction.status,
    "bounded-speed-live-ledger-open"
  );
  assert.equal(report.consumer_status.rank5_bounded_speed_normal_reconstruction.retained_branch, false);
  assert.equal(
    report.consumer_status.rank5_bounded_speed_normal_reconstruction
      .bounded_speed_live_ledger_authorized,
    false
  );
  assert.equal(report.authorization.observer_export, false);
});

test("torque/wake same-row diagnostic rejects row-id mismatches even with branch-looking fields", () => {
  const fixture = JSON.parse(fs.readFileSync(CURRENT_FIXTURE, "utf8"));
  const report = buildReport({
    ...fixture,
    branch_certificate_ref: "branch-certificate:synthetic",
    wake_row_ids: ["index-ratio:f2:active-row:wrong-row"],
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.same_row_id_binding, false);
  assert.equal(report.same_record_source_binding, false);
  assert.equal(report.first_failure, "same_row_id_mismatch");
  assert.equal(
    report.retained_active_row_certificate_contract.first_failure,
    "sampled_same_row_id_mismatch"
  );
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.first_failure,
    "sampled_same_row_id_binding_missing"
  );
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.retained_active_row_branch_certificate_ref_found,
    false
  );
  assert.equal(
    report.branch_certificate_provider_object_target.first_failure,
    "sampled_same_row_id_binding_missing"
  );
  assert.equal(report.authorization.candidate_h_recovery, false);
  assert.equal(report.authorization.moving_retained_branch_certificate, false);
});

test("torque/wake same-row diagnostic stays non-authorizing when all binding fields are synthetic", () => {
  const fixture = JSON.parse(fs.readFileSync(CURRENT_FIXTURE, "utf8"));
  const report = buildReport({
    ...fixture,
    branch_certificate_ref: "branch-certificate:synthetic",
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.same_row_id_binding, true);
  assert.equal(report.same_record_source_binding, true);
  assert.equal(report.first_failure, "diagnostic_only_not_authorization_source");
  assert.equal(
    report.retained_active_row_certificate_contract.first_failure,
    "same_retained_active_row_ids_missing"
  );
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.first_failure,
    "branch_certificate_ref_synthetic_not_accepted"
  );
  assert.equal(
    sourceAuditField(report, "branch_certificate_ref").failure_code,
    "branch_certificate_ref_synthetic_not_accepted"
  );
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.retained_active_row_branch_certificate_ref_found,
    false
  );
  assert.equal(
    providerField(report, "branch_certificate_ref").failure_code,
    "branch_certificate_ref_synthetic_not_accepted"
  );
  assert.equal(
    report.branch_certificate_provider_object_target.first_failure,
    "accepted_transition_source_ref_missing"
  );
  assert.equal(
    report.retained_active_row_certificate_contract.same_retained_active_row_ids_status,
    "missing"
  );
  assert.equal(report.consumer_status.rank2_field_speed_action_self_hit_scan.status, "source_row_binding_open");
  assert.equal(
    report.consumer_status.rank6_moving_retained_branch_certificate.status,
    "blocked_pending_accepted_branch_chart"
  );
  assert.equal(report.authorization.candidate_h_recovery, false);
  assert.equal(report.authorization.bounded_speed_live_ledger, false);
});

test("torque/wake branch-certificate audit rejects proxy and synthetic same-record refs", () => {
  const fixture = JSON.parse(fs.readFileSync(CURRENT_FIXTURE, "utf8"));
  const rows = fixture.sampled_active_row_ids;
  const report = buildReport({
    ...fixture,
    retained_branch: false,
    branch_certificate_ref: "accepted-branch-certificate:index-ratio:f2",
    same_retained_active_row_ids: rows,
    accepted_branch_chart_ref: "proxy:accepted-branch-chart-ref-not-issued",
    moving_retained_branch_certificate_ref: "synthetic:moving-certificate:index-ratio:f2",
    same_record_identity: {
      branch_label: "branch:index-ratio:f2",
      extraction_window_id: "window:index-ratio:f2",
      active_root_ledger_hash: fixture.active_root_ledger_hash,
      accepted_branch_chart_ref: "proxy:accepted-branch-chart-ref-not-issued",
      separator_chart_ref: "candidate:separator-chart:index-ratio:f2",
      positive_gap_record_ref: "synthetic:positive-gap:index-ratio:f2",
      memory_depth_record_ref: "fixture:memory-depth:index-ratio:f2",
      active_wave_vector_gap_ref: "priority-only:active-wave-vector-gap:index-ratio:f2",
    },
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.retained_active_row_branch_certificate_ref_found,
    false
  );
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.first_failure,
    "retained_branch_false_not_retained_source"
  );
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.sampled_active_row_certificate_contract
      .same_retained_active_row_id_binding,
    true
  );
  assert.equal(sourceAuditField(report, "branch_certificate_ref").status, "passed");
  assert.equal(
    sourceAuditField(report, "accepted_branch_chart_ref").failure_code,
    "accepted_branch_chart_ref_proxy_not_accepted"
  );
  assert.equal(
    sourceAuditField(report, "moving_retained_branch_certificate_ref").failure_code,
    "moving_retained_branch_certificate_ref_synthetic_not_accepted"
  );
  assert.equal(
    sourceAuditField(report, "same_record_identity.accepted_branch_chart_ref").failure_code,
    "same_record_identity_accepted_branch_chart_ref_proxy_not_accepted"
  );
  assert.equal(
    sourceAuditField(report, "same_record_identity.positive_gap_record_ref").failure_code,
    "same_record_identity_positive_gap_record_ref_synthetic_not_accepted"
  );
  assert.equal(
    sourceAuditField(report, "same_record_identity.memory_depth_record_ref").failure_code,
    "same_record_identity_memory_depth_record_ref_fixture_not_accepted"
  );
  assert.equal(
    sourceAuditField(report, "same_record_identity.active_wave_vector_gap_ref").failure_code,
    "same_record_identity_active_wave_vector_gap_ref_priority_only_not_accepted"
  );
  assert.equal(report.authorization.candidate_h_recovery, false);
  assert.equal(report.authorization.moving_retained_branch_certificate, false);
});

test("torque/wake branch-certificate provider target rejects reference-complete rows without retained status", () => {
  const fixture = JSON.parse(fs.readFileSync(CURRENT_FIXTURE, "utf8"));
  const rows = fixture.sampled_active_row_ids;
  const report = buildReport({
    ...fixture,
    retained_branch: false,
    accepted_transition_source_ref: "accepted-transition-source:index-ratio:f2",
    action_increment_row_id: "action-row:index-ratio:f2",
    branch_certificate_ref: "accepted-branch-certificate:index-ratio:f2",
    same_retained_active_row_ids: rows,
    same_record_identity: {
      branch_label: "branch:index-ratio:f2",
      extraction_window_id: "window:index-ratio:f2",
      active_root_ledger_hash: fixture.active_root_ledger_hash,
      accepted_branch_chart_ref: "accepted-branch-chart:index-ratio:f2",
      separator_chart_ref: "separator-chart:index-ratio:f2",
      positive_gap_record_ref: "positive-gap:index-ratio:f2",
      memory_depth_record_ref: "memory-depth:index-ratio:f2",
      active_wave_vector_gap_ref: "active-wave-vector-gap:index-ratio:f2",
    },
    accepted_branch_chart_ref: "accepted-branch-chart:index-ratio:f2",
    moving_retained_branch_certificate_ref: "moving-retained-branch-certificate:index-ratio:f2",
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.branch_certificate_provider_object_target.provider_object_ready, false);
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.retained_active_row_branch_certificate_ref_found,
    false
  );
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.first_failure,
    "retained_branch_false_not_retained_source"
  );
  assert.equal(
    report.branch_certificate_provider_object_target.first_failure,
    "retained_branch_false_not_retained_provider"
  );
  assert.equal(
    report.same_step_retained_torque_wake_branch_certificate_provider_target.first_failure,
    "retained_branch_false_not_retained_provider"
  );
  assert.deepEqual(report.branch_certificate_provider_object_target.missing_or_rejected_fields, [
    "retained_branch",
  ]);
  assert.deepEqual(
    report.same_step_retained_torque_wake_branch_certificate_provider_target.missing_or_rejected_fields,
    ["retained_branch"]
  );
  assert.equal(
    report.retained_active_row_certificate_contract.same_retained_active_row_id_binding,
    true
  );
  assert.equal(report.authorization.candidate_h_recovery, false);
  assert.equal(report.authorization.moving_retained_branch_certificate, false);
  assert.equal(
    report.branch_certificate_provider_object_target.authorization.accepted_transition_source,
    false
  );
  assert.equal(report.branch_certificate_provider_object_target.authorization.retained_branch, false);
});

test("torque/wake same-row diagnostic CLI emits and validates current fixture report", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "torque-wake-same-row-"));
  const reportPath = path.join(tempDir, "report.json");

  execFileSync(
    process.execPath,
    [SCRIPT_PATH, "--input", CURRENT_FIXTURE, "--out", reportPath, "--pretty"],
    { encoding: "utf8" }
  );

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.equal(report.diagnostic_verdict, "branch_certificate_ref_missing");
  assert.equal(report.same_row_id_binding, true);
  assert.equal(
    report.branch_certificate_ref_source_availability_audit.first_failure,
    "branch_certificate_ref_missing"
  );
  assert.equal(
    report.branch_certificate_provider_object_target.first_failure,
    "accepted_transition_source_ref_missing"
  );
  assert.equal(report.authorization.observer_export, false);

  const validation = JSON.parse(
    execFileSync(process.execPath, [SCRIPT_PATH, "--validate", reportPath, "--pretty"], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.first_failure, "branch_certificate_ref_missing");
});
