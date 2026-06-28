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
