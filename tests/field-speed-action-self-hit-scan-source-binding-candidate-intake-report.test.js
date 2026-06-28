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
} from "../scripts/nested-shell-braid/field-speed-action-self-hit-scan-source-binding-candidate-intake-report.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL(
    "../scripts/nested-shell-braid/field-speed-action-self-hit-scan-source-binding-candidate-intake-report.mjs",
    import.meta.url
  )
);
const REPO_ROOT = fileURLToPath(new URL("../", import.meta.url));

test("rank-2 candidate intake rejects the current repo candidate pool fail-closed", () => {
  const report = buildReport({ repoRoot: REPO_ROOT });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.schema, "field_speed_action_self_hit_scan_source_candidate_intake_report/v0");
  assert.equal(report.report_status, "source_row_binding_open");
  assert.equal(report.accepted_transition_source_candidate_count, 0);
  assert.equal(report.first_failure, "source_row_binding_open");
  assert.equal(report.first_candidate_failure_code, "fixture_shape_only_packet_not_source");
  assert.equal(report.first_required_source_field, "transition_source_ref");
  assert.equal(report.candidate_h_recovery_vote, "not_authorized");
  assert.equal(
    report.source_family_delta_scout.schema,
    "field_speed_action_self_hit_scan_source_family_delta_scout/v0"
  );
  assert.equal(report.source_family_delta_scout.family_count, 6);
  assert.equal(report.source_family_delta_scout.accepted_transition_source_family_count, 0);
  assert.equal(report.source_family_delta_scout.first_failure, "source_row_binding_open");
  assert.equal(
    report.source_family_delta_scout.strongest_partial_family_id,
    "torque_wake_same_row_diagnostic_family"
  );
  assert.equal(
    report.source_family_delta_scout.strongest_partial_first_failure,
    "branch_certificate_ref_missing"
  );
  assert.equal(
    report.source_family_delta_scout.exact_next_rank2_source_object.object_id,
    "non_fixture_branch_emitted_action_increment_transition_source"
  );
  assert.equal(
    report.nearest_candidate_provenance_readiness_audit.schema,
    "field_speed_action_self_hit_scan_nearest_candidate_provenance_readiness_audit/v0"
  );
  assert.equal(
    report.nearest_candidate_provenance_readiness_audit.audit_status,
    "fail_closed_no_accepted_transition_source"
  );
  assert.equal(
    report.nearest_candidate_provenance_readiness_audit.selected_family_id,
    "torque_wake_same_row_diagnostic_family"
  );
  assert.equal(
    report.nearest_candidate_provenance_readiness_audit.selected_candidate_id,
    "tri-binary-torque-wake-same-row-diagnostic"
  );
  assert.equal(
    report.nearest_candidate_provenance_readiness_audit.first_missing_required_field,
    "branch_certificate_ref"
  );
  assert.equal(
    report.nearest_candidate_provenance_readiness_audit.first_failure,
    "branch_certificate_ref_missing"
  );
  assert.deepEqual(report.nearest_candidate_provenance_readiness_audit.present_same_record_fields, [
    "active_root_ledger_hash",
    "conservation_pullback_hash",
    "negative_control_ref",
  ]);
  assert.deepEqual(report.nearest_candidate_provenance_readiness_audit.missing_or_rejected_same_record_fields, [
    "branch_certificate_ref",
    "retained_branch",
    "accepted_action_increment_row_id",
    "transition_source_ref",
  ]);
  assert.equal(report.nearest_candidate_provenance_readiness_audit.candidate_h_recovery_vote, "not_authorized");
  assert.equal(
    report.source_family_delta_scout.nearest_candidate_provenance_readiness_audit.first_missing_required_field,
    "branch_certificate_ref"
  );
  const absence =
    report.nearest_candidate_provenance_readiness_audit.source_binding_absence_record;
  const absenceField = (field) =>
    absence.field_results.find((entry) => entry.field === field);
  assert.equal(absence.schema, "field_speed_action_self_hit_scan_source_binding_absence_record/v0");
  assert.equal(absence.row_id, "torque_wake_same_row_diagnostic:index-ratio:f2");
  assert.equal(absence.first_missing_accepted_source_field, "branch_certificate_ref");
  assert.equal(absence.first_failure, "branch_certificate_ref_missing");
  assert.deepEqual(absence.sampled_active_row_ids, [
    "index-ratio:f2:active-row:inner-middle-edge-28",
    "index-ratio:f2:active-row:inner-outer-edge-17",
    "index-ratio:f2:active-row:inner-outer-edge-31",
  ]);
  assert.deepEqual(absence.present_useful_fields, [
    "sampled_same_row_id_binding",
    "active_root_ledger_hash",
    "conservation_pullback_hash",
    "negative_control_ref",
  ]);
  assert.deepEqual(absence.missing_or_rejected_fields, [
    "branch_certificate_ref",
    "retained_branch",
    "same_retained_active_row_ids",
    "accepted_branch_chart_ref",
    "moving_retained_branch_certificate_ref",
    "same_record_identity.branch_label",
    "same_record_identity.extraction_window_id",
    "same_record_identity.active_root_ledger_hash",
    "same_record_identity.accepted_branch_chart_ref",
    "same_record_identity.separator_chart_ref",
    "same_record_identity.positive_gap_record_ref",
    "same_record_identity.memory_depth_record_ref",
    "same_record_identity.active_wave_vector_gap_ref",
    "accepted_transition_source_ref",
    "action_increment_row_id",
  ]);
  assert.equal(
    absenceField("action_increment_row_id").failure_code,
    "action_increment_row_id_priority_only_not_accepted"
  );
  assert.equal(absence.authorization.accepted_transition_source, false);
  assert.equal(absence.authorization.candidate_h_recovery, false);
  assert.equal(
    absence.next_retained_active_row_evidence_object.schema,
    "torque_wake_retained_active_row_branch_certificate_evidence_object/v0"
  );
  assert.deepEqual(
    absence.next_retained_active_row_evidence_object.required_same_retained_active_row_ids,
    absence.sampled_active_row_ids
  );
  assert.deepEqual(absence.next_retained_active_row_evidence_object.rank2_follow_on_fields_after_certificate, [
    "accepted_transition_source_ref",
    "action_increment_row_id",
  ]);

  const byId = Object.fromEntries(report.candidates.map((candidate) => [candidate.id, candidate]));
  const byFamilyId = Object.fromEntries(
    report.source_family_delta_scout.families.map((family) => [family.id, family])
  );
  assert.equal(
    byId["action-increment-packet-current"].first_failure,
    "fixture_shape_only_packet_not_source"
  );
  assert.equal(
    byId["action-increment-source-contract-rank2-transition-source-attempt"].first_failure,
    "accepted_transition_source_absent_in_current_repo_pool"
  );
  assert.equal(
    byId["field-speed-action-increment-fixture-source"].first_failure,
    "accepted_non_fixture_source_missing"
  );
  assert.equal(
    byId["tri-binary-torque-wake-same-row-diagnostic"].first_failure,
    "accepted_non_fixture_source_missing"
  );
  assert.equal(
    byId["h39-aggregate-p-provider-preaggregation-construction-attempt"].first_failure,
    "accepted_non_fixture_source_missing"
  );
  assert.equal(
    byFamilyId["torque_wake_same_row_diagnostic_family"].first_failure,
    "branch_certificate_ref_missing"
  );
  assert.deepEqual(
    byFamilyId["torque_wake_same_row_diagnostic_family"].present_fields,
    [
      "action_increment_row_ref",
      "active_root_ledger_hash",
      "conservation_pullback_hash",
      "negative_control_ref",
    ]
  );
  assert.deepEqual(
    byFamilyId["torque_wake_same_row_diagnostic_family"].missing_or_rejected_fields,
    ["branch_certificate_ref", "retained_branch", "accepted_action_increment_row_id"]
  );
  assert.equal(
    byFamilyId["rank2_rank6_branch_source_join_family"].first_failure,
    "source_row_binding_open"
  );
});

test("rank-2 candidate intake can recognize a complete non-fixture packet surface", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "rank2-source-candidate-"));
  fs.writeFileSync(
    path.join(tempDir, "action_increment_rows.csv"),
    [
      "id,branch_from,branch_to,cluster_id,delta_I_ME,status,failure_code,branch_certificate_ref,root_ledger_hash,conservation_pullback_hash,negative_control_ref",
      "source-row,B_1,B_2,cluster-a,1.0,accepted,,branch-certificate:source,sha256:root,sha256:conservation,negative-control:source",
      "",
    ].join("\n")
  );
  fs.writeFileSync(
    path.join(tempDir, "cluster_summary.json"),
    `${JSON.stringify({
      schema: "test/v1",
      promotion_status: "accepted_transition_source",
      negative_control_ref: "negative-control:source",
    })}\n`
  );

  const report = buildReport({ repoRoot: "/", candidatePaths: [tempDir] });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.report_status, "candidate_surface_ready_for_source_binding");
  assert.equal(report.accepted_transition_source_candidate_count, 1);
  assert.equal(report.first_failure, null);
  assert.equal(report.first_required_source_field, null);
  assert.equal(report.source_family_delta_scout.accepted_transition_source_family_count, 1);
  assert.equal(report.source_family_delta_scout.first_failure, null);
  assert.equal(report.source_family_delta_scout.exact_next_rank2_source_object, null);
  assert.equal(report.nearest_candidate_provenance_readiness_audit, null);
  assert.equal(report.source_family_delta_scout.nearest_candidate_provenance_readiness_audit, null);
  assert.equal(report.candidates[0].verdict, "accepted_transition_source_candidate");
  assert.equal(report.candidates[0].candidate_h_recovery_vote, "not_authorized");
});

test("rank-2 candidate intake CLI emits and validates the current pool report", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "rank2-source-candidate-cli-"));
  const reportPath = path.join(tempDir, "report.json");

  execFileSync(process.execPath, [SCRIPT_PATH, "--out", reportPath, "--pretty"], {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });
  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.equal(report.report_status, "source_row_binding_open");
  assert.equal(report.accepted_transition_source_candidate_count, 0);

  const validation = JSON.parse(
    execFileSync(process.execPath, [SCRIPT_PATH, "--validate", reportPath, "--pretty"], {
      cwd: REPO_ROOT,
      encoding: "utf8",
    })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.report_status, "source_row_binding_open");
});
