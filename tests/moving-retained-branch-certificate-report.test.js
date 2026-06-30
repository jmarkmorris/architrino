import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  buildAcceptedBranchChartSourceScout,
  buildReport,
  sourceScoutValidationErrors,
  validationErrors,
} from "../scripts/nested-shell-braid/moving-retained-branch-certificate-report.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/nested-shell-braid/moving-retained-branch-certificate-report.mjs", import.meta.url)
);
const CURRENT_FIXTURE = fileURLToPath(
  new URL("../scripts/nested-shell-braid/fixtures/moving-retained-branch-certificate-current-status.json", import.meta.url)
);
const PROXY_FIXTURE = fileURLToPath(
  new URL("../scripts/nested-shell-braid/fixtures/moving-retained-branch-certificate-branch-chart-proxy-negative-control.json", import.meta.url)
);
const PARTIAL_SAME_RECORD_IDENTITY_SCOUT_FIXTURE = fileURLToPath(
  new URL(
    "../scripts/nested-shell-braid/fixtures/moving-retained-branch-certificate-partial-same-record-identity-scout.json",
    import.meta.url
  )
);
const ACCEPTED_BRANCH_CHART_SOURCE_SCOUT_FIXTURE = fileURLToPath(
  new URL(
    "../scripts/nested-shell-braid/fixtures/moving-retained-branch-certificate-accepted-branch-chart-source-scout.json",
    import.meta.url
  )
);

function completeSameRecordCertificate() {
  return {
    certificate_id: "synthetic-moving-retained-branch",
    branch_certificate_ref: "branch-certificate:q-test",
    same_record_identity: {
      branch_label: "q-test",
      extraction_window_id: "W-test",
      active_root_ledger_hash: "sha256:q-test-root-ledger",
      accepted_branch_chart_ref: "accepted-branch-chart:q-test",
      separator_chart_ref: "separator-chart:q-test",
      positive_gap_record_ref: "positive-gap:q-test",
      memory_depth_record_ref: "memory-depth:q-test",
      active_wave_vector_gap_ref: "active-wave-vector-gap:q-test",
    },
    moving_continuation_ref: "moving-continuation:q-test",
    root_boundary_ref: "root-boundary:q-test",
    deformation_generator_ref: "deformation-generator:q-test",
    common_speed_record_ref: "common-speed:q-test",
    signal_sector_refs: ["photon-gate-a:q-test", "gw-tt:q-test", "two-way:q-test", "nondispersion:q-test"],
    event_ledger_ref: "event-ledger:q-test",
    certificate_status: "accepted_same_branch",
  };
}

test("moving retained branch certificate report rejects current status shell", () => {
  const fixture = JSON.parse(fs.readFileSync(CURRENT_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: CURRENT_FIXTURE });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.schema, "moving_retained_branch_certificate_report/v0");
  assert.equal(report.certificate_verdict, "blocked_pending_accepted_branch_chart");
  assert.equal(report.first_failure, "blocked_pending_accepted_branch_chart");
  assert.equal(report.authorization.populates_structural_integrity_residual_vector, false);
  assert.equal(report.authorization.photon_gate_a_accepted, false);
  assert.equal(report.authorization.observer_export, false);
  assert.equal(report.missing_or_rejected_rows.includes("branch_certificate_ref"), true);
  assert.equal(report.accepted_branch_chart_intake.accepted_branch_chart, false);
  assert.equal(report.accepted_branch_chart_intake.rejects_proxy_branch_certificate_refs, true);
  assert.equal(
    report.accepted_branch_chart_intake.missing_or_rejected_fields.includes(
      "same_record_identity.accepted_branch_chart_ref"
    ),
    true
  );
});

test("moving retained branch certificate report rejects proxy branch chart refs", () => {
  const fixture = JSON.parse(fs.readFileSync(PROXY_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: PROXY_FIXTURE });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.certificate_verdict, "blocked_pending_accepted_branch_chart");
  assert.equal(report.first_failure, "blocked_pending_accepted_branch_chart");
  assert.equal(report.authorization.populates_structural_integrity_residual_vector, false);
  assert.equal(report.accepted_branch_chart_intake.branch_certificate_ref_present, true);
  assert.equal(report.accepted_branch_chart_intake.branch_certificate_ref_proxy, true);
  assert.equal(report.accepted_branch_chart_intake.accepted_branch_chart, false);
  assert.equal(report.accepted_branch_chart_intake.rejects_proxy_branch_certificate_refs, true);
  assert.equal(
    report.accepted_branch_chart_intake.first_missing_or_rejected_field_code,
    "branch_certificate_ref_proxy_not_accepted"
  );
  assert.deepEqual(
    report.accepted_branch_chart_intake.missing_or_rejected_fields,
    [
      "same_record_identity.branch_label",
      "same_record_identity.extraction_window_id",
      "same_record_identity.active_root_ledger_hash",
      "same_record_identity.accepted_branch_chart_ref",
      "same_record_identity.separator_chart_ref",
      "same_record_identity.positive_gap_record_ref",
      "same_record_identity.memory_depth_record_ref",
      "same_record_identity.active_wave_vector_gap_ref",
    ]
  );
  assert.deepEqual(
    report.accepted_branch_chart_intake.missing_or_rejected_field_codes,
    [
      "same_record_identity_branch_label_missing",
      "same_record_identity_extraction_window_id_missing",
      "same_record_identity_active_root_ledger_hash_missing",
      "same_record_identity_accepted_branch_chart_ref_missing",
      "same_record_identity_separator_chart_ref_missing",
      "same_record_identity_positive_gap_record_ref_missing",
      "same_record_identity_memory_depth_record_ref_missing",
      "same_record_identity_active_wave_vector_gap_ref_missing",
    ]
  );
});

test("moving retained branch certificate report rejects partial proxy same-record identity scouts", () => {
  const fixture = JSON.parse(fs.readFileSync(PARTIAL_SAME_RECORD_IDENTITY_SCOUT_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: PARTIAL_SAME_RECORD_IDENTITY_SCOUT_FIXTURE });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.certificate_verdict, "blocked_pending_accepted_branch_chart");
  assert.equal(report.first_failure, "blocked_pending_accepted_branch_chart");
  assert.equal(report.authorization.populates_structural_integrity_residual_vector, false);
  assert.equal(report.authorization.photon_gate_a_accepted, false);
  assert.equal(report.authorization.observer_export, false);
  assert.equal(report.accepted_branch_chart_intake.branch_certificate_ref_present, true);
  assert.equal(report.accepted_branch_chart_intake.branch_certificate_ref_proxy, false);
  assert.equal(report.accepted_branch_chart_intake.accepted_branch_chart, false);
  assert.equal(
    report.accepted_branch_chart_intake.first_missing_or_rejected_field_code,
    "same_record_identity_accepted_branch_chart_ref_proxy_not_accepted"
  );
  assert.deepEqual(
    report.accepted_branch_chart_intake.missing_or_rejected_fields,
    [
      "same_record_identity.accepted_branch_chart_ref",
      "same_record_identity.separator_chart_ref",
      "same_record_identity.positive_gap_record_ref",
      "same_record_identity.memory_depth_record_ref",
      "same_record_identity.active_wave_vector_gap_ref",
    ]
  );
  assert.deepEqual(
    report.accepted_branch_chart_intake.missing_or_rejected_field_codes,
    [
      "same_record_identity_accepted_branch_chart_ref_proxy_not_accepted",
      "same_record_identity_separator_chart_ref_missing",
      "same_record_identity_positive_gap_record_ref_missing",
      "same_record_identity_memory_depth_record_ref_missing",
      "same_record_identity_active_wave_vector_gap_ref_missing",
    ]
  );
});

test("accepted branch-chart source scout enumerates current candidates fail-closed", () => {
  const fixture = JSON.parse(fs.readFileSync(ACCEPTED_BRANCH_CHART_SOURCE_SCOUT_FIXTURE, "utf8"));
  const report = buildAcceptedBranchChartSourceScout(fixture, {
    sourceRef: ACCEPTED_BRANCH_CHART_SOURCE_SCOUT_FIXTURE,
  });

  assert.deepEqual(sourceScoutValidationErrors(report), []);
  assert.equal(
    report.schema,
    "moving_retained_branch_certificate_accepted_branch_chart_source_scout/v0"
  );
  assert.equal(report.candidate_count, 9);
  assert.equal(report.accepted_count, 0);
  assert.deepEqual(report.accepted_candidate_ids, []);
  assert.equal(report.first_failure, "accepted_same_record_branch_chart_absent");
  assert.equal(report.first_rejection_code, "branch_certificate_ref_missing");
  assert.equal(report.authorization.accepted_branch_chart_source_ready, false);
  assert.equal(report.authorization.moving_retained_branch_certificate, false);
  assert.equal(report.authorization.structural_integrity_residual_vector, false);
  assert.equal(report.authorization.photon_gate_a, false);
  assert.equal(report.authorization.observer_export, false);
  assert.equal(
    report.nearest_candidate_readiness.schema,
    "moving_retained_branch_certificate_nearest_branch_chart_source_readiness/v0"
  );
  assert.equal(
    report.nearest_candidate_readiness.selected_candidate_id,
    "partial-same-record-identity-scout-fixture"
  );
  assert.equal(report.nearest_candidate_readiness.present_non_proxy_required_field_count, 4);
  assert.deepEqual(report.nearest_candidate_readiness.present_non_proxy_required_fields, [
    "branch_certificate_ref",
    "same_record_identity.branch_label",
    "same_record_identity.extraction_window_id",
    "same_record_identity.active_root_ledger_hash",
  ]);
  assert.equal(
    report.nearest_candidate_readiness.first_missing_or_rejected_field,
    "same_record_identity.accepted_branch_chart_ref"
  );
  assert.equal(
    report.nearest_candidate_readiness.first_missing_or_rejected_field_code,
    "same_record_identity_accepted_branch_chart_ref_proxy_not_accepted"
  );
  assert.equal(
    report.nearest_candidate_readiness.source_status_rejection_code,
    "routing_evidence_only_not_accepted_branch_chart_source"
  );
  assert.equal(report.nearest_candidate_readiness.authorization.moving_retained_branch_certificate, false);

  const refPathAudit = report.branch_chart_and_moving_certificate_ref_path_audit;
  assert.equal(
    refPathAudit.schema,
    "moving_retained_branch_certificate_branch_chart_and_moving_certificate_ref_path_audit/v0"
  );
  assert.equal(refPathAudit.selected_candidate_id, "partial-same-record-identity-scout-fixture");
  assert.deepEqual(refPathAudit.selected_same_record_identity, {
    branch_label: "q:index-ratio:f2",
    extraction_window_id: "W:index-ratio:f2:sampled-active-row-window",
    active_root_ledger_hash: "route-root-key:2856731379702547500",
  });
  assert.deepEqual(refPathAudit.reference_rejection_policy.disallowed_prefixes, [
    "priority-only:",
    "fixture:",
    "proxy:",
    "candidate:",
    "synthetic:",
  ]);
  assert.deepEqual(refPathAudit.missing_or_rejected_ref_fields, [
    "same_record_identity.accepted_branch_chart_ref",
    "moving_retained_branch_certificate_ref",
    "branch_certificate_ref",
  ]);
  assert.deepEqual(refPathAudit.missing_or_rejected_ref_codes, [
    "same_record_identity_accepted_branch_chart_ref_proxy_not_accepted",
    "moving_retained_branch_certificate_ref_missing",
    "branch_certificate_ref_candidate_not_accepted",
  ]);
  assert.equal(
    refPathAudit.first_failure,
    "same_record_identity_accepted_branch_chart_ref_proxy_not_accepted"
  );
  assert.deepEqual(refPathAudit.exact_blocking_refs, {
    branch_certificate_ref: "candidate:branch-chart-ref-with-partial-same-record-identity",
    same_record_identity_accepted_branch_chart_ref: "proxy:accepted-branch-chart-ref-not-issued",
    moving_retained_branch_certificate_ref: null,
  });
  assert.equal(refPathAudit.accepted_ref_path_available, false);
  assert.equal(refPathAudit.authorization.moving_retained_branch_certificate, false);

  const qIndexRatioF2Intake = report.same_record_accepted_branch_chart_intake_for_q_index_ratio_f2;
  assert.equal(
    qIndexRatioF2Intake.schema,
    "same_record_accepted_branch_chart_intake_for_q_index_ratio_f2/v0"
  );
  assert.deepEqual(qIndexRatioF2Intake.same_record_binding, {
    branch_label: "q:index-ratio:f2",
    extraction_window_id: "W:index-ratio:f2:sampled-active-row-window",
    active_root_ledger_hash: "route-root-key:2856731379702547500",
  });
  assert.equal(qIndexRatioF2Intake.selected_candidate_id, "partial-same-record-identity-scout-fixture");
  assert.equal(qIndexRatioF2Intake.accepted_same_record_branch_chart, false);
  assert.equal(
    qIndexRatioF2Intake.first_failure,
    "same_record_identity_accepted_branch_chart_ref_proxy_not_accepted"
  );
  assert.deepEqual(qIndexRatioF2Intake.present_non_proxy_required_fields, [
    "branch_certificate_ref",
    "same_record_identity.branch_label",
    "same_record_identity.extraction_window_id",
    "same_record_identity.active_root_ledger_hash",
  ]);
  assert.deepEqual(qIndexRatioF2Intake.missing_or_rejected_fields, [
    "same_record_identity.accepted_branch_chart_ref",
    "same_record_identity.separator_chart_ref",
    "same_record_identity.positive_gap_record_ref",
    "same_record_identity.memory_depth_record_ref",
    "same_record_identity.active_wave_vector_gap_ref",
  ]);
  assert.deepEqual(qIndexRatioF2Intake.exact_blocking_refs, {
    branch_certificate_ref: "candidate:branch-chart-ref-with-partial-same-record-identity",
    same_record_identity_accepted_branch_chart_ref: "proxy:accepted-branch-chart-ref-not-issued",
    moving_retained_branch_certificate_ref: null,
  });
  assert.equal(
    qIndexRatioF2Intake.accepted_branch_chart_source_target.schema,
    "same_record_accepted_branch_chart_intake_for_q_index_ratio_f2/v0"
  );
  assert.equal(
    qIndexRatioF2Intake.accepted_branch_chart_source_target.target_status,
    "source_target_blocked"
  );
  assert.equal(
    qIndexRatioF2Intake.accepted_branch_chart_source_target.selected_candidate_id,
    "partial-same-record-identity-scout-fixture"
  );
  assert.equal(
    qIndexRatioF2Intake.accepted_branch_chart_source_target.required_source_status,
    "accepted_same_record_branch_chart"
  );
  assert.deepEqual(
    qIndexRatioF2Intake.accepted_branch_chart_source_target.same_record_binding_required,
    {
      branch_label: "q:index-ratio:f2",
      extraction_window_id: "W:index-ratio:f2:sampled-active-row-window",
      active_root_ledger_hash: "route-root-key:2856731379702547500",
      required_fields_must_live_on_one_branch_row: true,
      cross_row_join_authorized: false,
    }
  );
  assert.deepEqual(
    qIndexRatioF2Intake.accepted_branch_chart_source_target.rejected_branch_chart_evidence_sources,
    [
      "proxy refs",
      "fixture refs",
      "candidate refs",
      "synthetic refs",
      "sampled-only rows",
      "aggregate rows",
      "cross-row bundles",
      "source scouts",
    ]
  );
  assert.equal(
    qIndexRatioF2Intake.accepted_branch_chart_source_target.first_missing_or_rejected_field,
    "same_record_identity.accepted_branch_chart_ref"
  );
  assert.equal(
    qIndexRatioF2Intake.accepted_branch_chart_source_target.first_missing_or_rejected_field_code,
    "same_record_identity_accepted_branch_chart_ref_proxy_not_accepted"
  );
  assert.deepEqual(
    qIndexRatioF2Intake.accepted_branch_chart_source_target.missing_or_rejected_fields,
    qIndexRatioF2Intake.missing_or_rejected_fields
  );
  assert.equal(
    qIndexRatioF2Intake.accepted_branch_chart_source_target.field_readouts.length,
    9
  );
  assert.equal(
    qIndexRatioF2Intake.accepted_branch_chart_source_target.field_readouts.find(
      (field) => field.path === "same_record_identity.accepted_branch_chart_ref"
    ).failure_code,
    "same_record_identity_accepted_branch_chart_ref_proxy_not_accepted"
  );
  assert.deepEqual(
    qIndexRatioF2Intake.accepted_branch_chart_source_target.exact_blocking_refs,
    qIndexRatioF2Intake.exact_blocking_refs
  );
  assert.equal(
    qIndexRatioF2Intake.accepted_branch_chart_source_target.authorization
      .moving_retained_branch_certificate,
    false
  );
  assert.deepEqual(qIndexRatioF2Intake.selected_candidate_producer_target, {
    schema: "same_record_accepted_branch_chart_intake_for_q_index_ratio_f2/v0",
    target_status: "target_only_not_accepted_source",
    first_missing_field: "same_record_identity.accepted_branch_chart_ref",
    first_missing_field_code: "same_record_identity_accepted_branch_chart_ref_proxy_not_accepted",
    required_same_record_fields: [
      "branch_certificate_ref",
      "same_record_identity.branch_label",
      "same_record_identity.extraction_window_id",
      "same_record_identity.active_root_ledger_hash",
      "same_record_identity.accepted_branch_chart_ref",
      "same_record_identity.separator_chart_ref",
      "same_record_identity.positive_gap_record_ref",
      "same_record_identity.memory_depth_record_ref",
      "same_record_identity.active_wave_vector_gap_ref",
    ],
    authorization: {
      moving_retained_branch_certificate: false,
      structural_integrity_residual_vector: false,
      photon_gate_a: false,
      lorentz_rows: false,
      observer_export: false,
    },
  });
  assert.equal(qIndexRatioF2Intake.required_next_object.object, "accepted_same_record_branch_chart");
  assert.equal(qIndexRatioF2Intake.required_next_object.first_required_field, "same_record_identity.accepted_branch_chart_ref");
  assert.equal(qIndexRatioF2Intake.authorization.moving_retained_branch_certificate, false);
  assert.equal(qIndexRatioF2Intake.authorization.structural_integrity_residual_vector, false);
  assert.equal(qIndexRatioF2Intake.authorization.photon_gate_a, false);
  assert.equal(qIndexRatioF2Intake.authorization.lorentz_rows, false);
  assert.equal(qIndexRatioF2Intake.authorization.observer_export, false);

  const partialScout = report.candidate_results.find(
    (candidate) => candidate.id === "partial-same-record-identity-scout-fixture"
  );
  assert.equal(
    partialScout.first_rejection_code,
    "same_record_identity_accepted_branch_chart_ref_proxy_not_accepted"
  );
  assert.equal(partialScout.source_status_accepted, false);
  assert.equal(
    partialScout.source_status_rejection_code,
    "routing_evidence_only_not_accepted_branch_chart_source"
  );

  const tier0 = report.candidate_results.find(
    (candidate) => candidate.id === "a0-tier0-branch-search-continuation-ready-row"
  );
  assert.equal(tier0.first_rejection_code, "branch_certificate_ref_missing");
  assert.equal(
    tier0.source_status_rejection_code,
    "tier0_continuation_ready_not_accepted_history_not_accepted_branch_chart_source"
  );

  const h39 = report.candidate_results.find(
    (candidate) => candidate.id === "branch-provider-h39-aggregate-p-construction-attempt"
  );
  assert.equal(h39.first_rejection_code, "branch_certificate_ref_missing");
  assert.equal(
    h39.source_status_rejection_code,
    "target_only_not_accepted_source_not_accepted_branch_chart_source"
  );
});

test("moving retained branch certificate report accepts a complete same-record synthetic certificate", () => {
  const report = buildReport(completeSameRecordCertificate());

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.certificate_verdict, "accepted_same_branch");
  assert.equal(report.first_failure, null);
  assert.equal(report.accepted_branch_chart_intake.accepted_branch_chart, true);
  assert.deepEqual(report.accepted_branch_chart_intake.missing_or_rejected_fields, []);
  assert.equal(report.authorization.populates_structural_integrity_residual_vector, true);
  assert.equal(report.authorization.photon_gate_a_accepted, false);
});

test("moving retained branch certificate CLI emits and validates current fixture report", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "moving-retained-branch-"));
  const reportPath = path.join(tempDir, "report.json");

  execFileSync(
    process.execPath,
    [SCRIPT_PATH, "--input", CURRENT_FIXTURE, "--out", reportPath, "--pretty"],
    { encoding: "utf8" }
  );

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.equal(report.certificate_verdict, "blocked_pending_accepted_branch_chart");
  assert.equal(report.authorization.observer_export, false);

  const validation = JSON.parse(
    execFileSync(process.execPath, [SCRIPT_PATH, "--validate", reportPath, "--pretty"], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.certificate_verdict, "blocked_pending_accepted_branch_chart");
});

test("moving retained branch certificate CLI emits and validates accepted branch-chart source scout", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "branch-chart-source-scout-"));
  const reportPath = path.join(tempDir, "report.json");

  execFileSync(
    process.execPath,
    [SCRIPT_PATH, "--source-scout", ACCEPTED_BRANCH_CHART_SOURCE_SCOUT_FIXTURE, "--out", reportPath, "--pretty"],
    { encoding: "utf8" }
  );

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.equal(report.candidate_count, 9);
  assert.equal(report.accepted_count, 0);
  assert.equal(report.first_failure, "accepted_same_record_branch_chart_absent");
  assert.equal(report.authorization.moving_retained_branch_certificate, false);

  const validation = JSON.parse(
    execFileSync(process.execPath, [SCRIPT_PATH, "--validate-source-scout", reportPath, "--pretty"], {
      encoding: "utf8",
    })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.candidate_count, 9);
  assert.equal(validation.accepted_count, 0);
  assert.equal(validation.first_failure, "accepted_same_record_branch_chart_absent");
  assert.equal(report.nearest_candidate_readiness.selected_candidate_id, "partial-same-record-identity-scout-fixture");
  assert.equal(
    report.branch_chart_and_moving_certificate_ref_path_audit.first_failure,
    "same_record_identity_accepted_branch_chart_ref_proxy_not_accepted"
  );
  assert.equal(
    report.branch_chart_and_moving_certificate_ref_path_audit.exact_blocking_refs
      .same_record_identity_accepted_branch_chart_ref,
    "proxy:accepted-branch-chart-ref-not-issued"
  );
  assert.equal(
    report.branch_chart_and_moving_certificate_ref_path_audit.exact_blocking_refs
      .moving_retained_branch_certificate_ref,
    null
  );
});
