import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  buildReport as buildRank2SourceBindingReport,
} from "../scripts/nested-shell-braid/field-speed-action-self-hit-scan-source-binding-report.mjs";
import {
  buildReport,
  validationErrors,
} from "../scripts/nested-shell-braid/rank2-rank6-branch-source-join-report.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/nested-shell-braid/rank2-rank6-branch-source-join-report.mjs", import.meta.url)
);
const FIXTURE_PACKET_DIR = fileURLToPath(
  new URL("../scripts/nested-shell-braid/fixtures/action-increment-packet/", import.meta.url)
);
const CURRENT_RANK6_CERTIFICATE = fileURLToPath(
  new URL(
    "../scripts/nested-shell-braid/fixtures/moving-retained-branch-certificate-current-status.json",
    import.meta.url
  )
);
const CURRENT_TORQUE_WAKE_DIAGNOSTIC = fileURLToPath(
  new URL(
    "../scripts/nested-shell-braid/fixtures/torque-wake-same-row-diagnostic-priority-target.json",
    import.meta.url
  )
);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function intakeField(report, field) {
  return report.same_record_provider_intake.required_same_record_fields.find(
    (entry) => entry.field === field
  );
}

function sameStepProviderTarget(report) {
  return report.same_record_provider_intake
    .same_step_retained_torque_wake_branch_certificate_provider_target;
}

function syntheticRank2Report() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "rank2-source-join-"));
  fs.writeFileSync(
    path.join(tempDir, "action_increment_rows.csv"),
    [
      "id,branch_from,branch_to,cluster_id,delta_I_ME,status,failure_code,branch_certificate_ref,root_ledger_hash,conservation_pullback_hash",
      "candidate-row,B_1,B_2,cluster-a,1.0,accepted,,branch-certificate:join,sha256:root,sha256:conservation",
      "",
    ].join("\n")
  );
  writeJson(path.join(tempDir, "cluster_summary.json"), {
    schema: "test/v1",
    promotion_status: "non-fixture-source-candidate",
  });

  return buildRank2SourceBindingReport({
    packetDir: tempDir,
    branchRowId: "candidate-row",
    branchCertificateRef: "branch-certificate:join",
    rootLedgerHash: "sha256:root",
    conservationPullbackHash: "sha256:conservation",
    negativeControlRef: "negative-control:join",
  });
}

function syntheticRank6Certificate() {
  return {
    certificate_id: "synthetic-moving-retained-branch-join",
    promotion_status: "priority-only",
    branch_certificate_ref: "branch-certificate:join",
    source_root_ledger_ref: "sha256:root",
    active_root_ledger_hash: "sha256:root",
    same_record_identity: {
      branch_label: "q-join",
      extraction_window_id: "W-join",
      active_root_ledger_hash: "sha256:root",
      accepted_branch_chart_ref: "accepted-branch-chart:join",
      separator_chart_ref: "separator-chart:join",
      positive_gap_record_ref: "positive-gap:join",
      memory_depth_record_ref: "memory-depth:join",
      active_wave_vector_gap_ref: "active-wave-vector-gap:join",
    },
    moving_continuation_ref: "moving-continuation:join",
    root_boundary_ref: "root-boundary:join",
    deformation_generator_ref: "deformation-generator:join",
    common_speed_record_ref: "common-speed:join",
    signal_sector_refs: ["photon-gate-a:join", "gw-tt:join", "two-way:join", "nondispersion:join"],
    event_ledger_ref: "event-ledger:join",
    certificate_status: "accepted_same_branch",
  };
}

function syntheticTorqueWakeDiagnostic(overrides = {}) {
  const rows = [
    "join:active-row:inner-middle-edge-28",
    "join:active-row:inner-outer-edge-17",
    "join:active-row:inner-outer-edge-31",
  ];
  return {
    schema: "torque_wake_same_row_diagnostic/v0",
    id: "synthetic-torque-wake-same-row-join",
    source_report_ref: "scripts/angular-momentum/tri-binary-offset-family-runner.mjs#torque_wake_same_row_diagnostic",
    selected_case_id: "join:f2",
    route_root_key: "sha256:root",
    retained_branch: false,
    branch_certificate_ref: "branch-certificate:join",
    sampled_active_row_ids: rows,
    force_row_ids: rows,
    partition_row_ids: rows,
    torque_row_ids: rows,
    wake_row_ids: rows,
    action_increment_row_ref: "candidate-row",
    active_root_ledger_hash: "sha256:root",
    conservation_pullback_hash: "sha256:conservation",
    torque_integrals_ref: "torque-integrals:join",
    wake_energy_routing_ref: "wake-energy-routing:join",
    event_ledger_convention_ref: "event-ledger-convention:join",
    negative_control_ref: "negative-control:join",
    ...overrides,
  };
}

test("rank2/rank6 branch-source join report records current fixtures as fail-closed", () => {
  const rank2Report = buildRank2SourceBindingReport({
    packetDir: FIXTURE_PACKET_DIR,
    branchRowId: "fixture-B12-B13-a",
  });
  const report = buildReport({
    rank2SourceBindingReport: rank2Report,
    rank6CertificateCandidate: readJson(CURRENT_RANK6_CERTIFICATE),
    torqueWakeDiagnosticCandidate: readJson(CURRENT_TORQUE_WAKE_DIAGNOSTIC),
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.schema, "rank2_rank6_branch_source_join_report/v0");
  assert.equal(report.promotion_status, "priority-only");
  assert.equal(report.same_branch_source_join, false);
  assert.equal(report.first_failure, "source_row_binding_open");
  assert.equal(report.subjects.rank2_field_speed_action_self_hit_scan.source_verdict, "diagnostic_rejected_endpoint_source");
  assert.equal(
    report.subjects.rank6_moving_retained_branch_certificate.certificate_verdict,
    "blocked_pending_accepted_branch_chart"
  );
  assert.equal(report.subjects.torque_wake_same_row_diagnostic.same_row_id_binding, true);
  assert.equal(report.authorization.bounded_speed_live_ledger, false);
  assert.equal(report.authorization.candidate_h_recovery, false);
  assert.equal(report.authorization.moving_retained_branch_certificate, false);
  assert.equal(report.authorization.photon_gate_a, false);
  assert.equal(report.authorization.lorentz_rows, false);
  assert.equal(report.authorization.observer_export, false);
  assert.equal(report.same_record_provider_intake.schema, "rank2_rank6_same_record_provider_intake/v0");
  assert.equal(report.same_record_provider_intake.provider_status, "same_record_provider_blocked");
  assert.equal(report.same_record_provider_intake.first_failure, "source_row_binding_open");
  assert.equal(intakeField(report, "accepted_transition_source").failure_code, "source_row_binding_open");
  assert.equal(
    intakeField(report, "moving_retained_branch_certificate/v0").failure_code,
    "blocked_pending_accepted_branch_chart"
  );
  assert.equal(
    intakeField(report, "common_active_root_ledger_identity").failure_code,
    "common_active_root_ledger_identity_missing"
  );
  assert.equal(
    intakeField(report, "common_conservation_pullback_hash").failure_code,
    "common_conservation_pullback_hash_missing"
  );
  assert.equal(
    intakeField(report, "common_negative_control_ref").failure_code,
    "common_negative_control_ref_missing"
  );
  assert.equal(report.same_record_provider_intake.negative_controls.status, "armed_no_mismatch_seen");
  assert.equal(
    sameStepProviderTarget(report).schema,
    "same_step_retained_torque_wake_branch_certificate_provider/v0"
  );
  assert.equal(sameStepProviderTarget(report).target_status, "fail_closed_provider_target");
  assert.equal(
    sameStepProviderTarget(report).required_same_step_selected_case_id,
    "index-ratio:f2"
  );
  assert.equal(sameStepProviderTarget(report).first_failure, "accepted_transition_source_ref_missing");
  assert.equal(
    sameStepProviderTarget(report).downstream_authorization.rank2_field_speed_action_self_hit_scan,
    false
  );
  assert.equal(
    sameStepProviderTarget(report).downstream_authorization.rank6_moving_retained_branch_certificate,
    false
  );
  assert.equal(
    report.same_record_provider_intake.negative_controls.rejects_cross_report_or_synthetic_mismatch,
    true
  );
  assert.equal(report.same_record_provider_intake.authorization.bounded_speed_live_ledger, false);
  assert.equal(report.same_record_provider_intake.authorization.photon_gate_a, false);
  assert.equal(report.same_record_provider_intake.authorization.lorentz_rows, false);
  assert.deepEqual(
    report.same_record_provider_intake.downstream_missing_or_not_authorized_fields.map((entry) => entry.field),
    ["bounded_speed_live_ledger", "Photon Gate A", "Lorentz rows", "observer_export"]
  );
  assert.equal(
    report.same_record_provider_intake.blocking_missing_or_rejected_fields.includes(
      "rank2.non_fixture_transition_source"
    ),
    true
  );
  assert.equal(
    report.same_record_provider_intake.blocking_missing_or_rejected_fields.includes(
      "rank6.accepted_branch_chart"
    ),
    true
  );
  assert.equal(
    report.same_record_provider_intake.blocking_missing_or_rejected_fields.includes(
      "rank6.moving_retained_branch_certificate/v0"
    ),
    true
  );
});

test("rank2/rank6 branch-source join can identify a synthetic same-source candidate without authorization", () => {
  const report = buildReport({
    rank2SourceBindingReport: syntheticRank2Report(),
    rank6CertificateCandidate: syntheticRank6Certificate(),
    torqueWakeDiagnosticCandidate: syntheticTorqueWakeDiagnostic(),
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.join_verdict, "branch_source_join_candidate");
  assert.equal(report.first_failure, null);
  assert.equal(report.same_branch_source_join, true);
  assert.equal(report.join_rows.every((entry) => entry.status === "passed"), true);
  assert.equal(report.same_record_provider_intake.provider_status, "same_record_provider_candidate");
  assert.equal(sameStepProviderTarget(report).provider_ready, false);
  assert.equal(sameStepProviderTarget(report).first_failure, "accepted_transition_source_ref_missing");
  assert.deepEqual(report.same_record_provider_intake.blocking_missing_or_rejected_fields, []);
  assert.equal(
    report.same_record_provider_intake.required_same_record_fields.every(
      (entry) => entry.status === "passed"
    ),
    true
  );
  assert.equal(report.same_record_provider_intake.negative_controls.status, "armed_no_mismatch_seen");
  assert.equal(report.authorization.candidate_h_recovery, false);
  assert.equal(report.authorization.moving_retained_branch_certificate, false);
  assert.equal(report.authorization.bounded_speed_live_ledger, false);
  assert.equal(report.authorization.observer_export, false);
});

test("rank2/rank6 branch-source join rejects cross-report conservation mismatches", () => {
  const report = buildReport({
    rank2SourceBindingReport: syntheticRank2Report(),
    rank6CertificateCandidate: syntheticRank6Certificate(),
    torqueWakeDiagnosticCandidate: syntheticTorqueWakeDiagnostic({
      conservation_pullback_hash: "sha256:other-conservation",
    }),
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.same_branch_source_join, false);
  assert.equal(report.first_failure, "common_conservation_pullback_hash_mismatch");
  assert.equal(report.same_record_provider_intake.provider_status, "same_record_provider_blocked");
  assert.equal(report.same_record_provider_intake.negative_controls.status, "passed_rejected_mismatch");
  assert.deepEqual(
    report.same_record_provider_intake.negative_controls.rejected_mismatch_rows.map((entry) => entry.row),
    ["common_conservation_pullback_hash"]
  );
  assert.equal(report.authorization.candidate_h_recovery, false);
});

test("rank2/rank6 branch-source join rejects synthetic negative-control mismatches", () => {
  const report = buildReport({
    rank2SourceBindingReport: syntheticRank2Report(),
    rank6CertificateCandidate: syntheticRank6Certificate(),
    torqueWakeDiagnosticCandidate: syntheticTorqueWakeDiagnostic({
      negative_control_ref: "negative-control:synthetic-mismatch",
    }),
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.same_branch_source_join, false);
  assert.equal(report.first_failure, "common_negative_control_ref_mismatch");
  assert.equal(
    intakeField(report, "common_negative_control_ref").failure_code,
    "common_negative_control_ref_mismatch"
  );
  assert.equal(report.same_record_provider_intake.negative_controls.status, "passed_rejected_mismatch");
  assert.deepEqual(
    report.same_record_provider_intake.negative_controls.rejected_mismatch_rows.map((entry) => entry.row),
    ["common_negative_control_ref"]
  );
  assert.equal(report.authorization.candidate_h_recovery, false);
  assert.equal(report.authorization.moving_retained_branch_certificate, false);
});

test("rank2/rank6 branch-source join CLI emits and validates current fixture report", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "rank2-rank6-source-join-cli-"));
  const rank2ReportPath = path.join(tempDir, "rank2-report.json");
  const joinReportPath = path.join(tempDir, "join-report.json");
  writeJson(
    rank2ReportPath,
    buildRank2SourceBindingReport({
      packetDir: FIXTURE_PACKET_DIR,
      branchRowId: "fixture-B12-B13-a",
    })
  );

  execFileSync(
    process.execPath,
    [
      SCRIPT_PATH,
      "--rank2-report",
      rank2ReportPath,
      "--rank6-certificate",
      CURRENT_RANK6_CERTIFICATE,
      "--torque-wake-diagnostic",
      CURRENT_TORQUE_WAKE_DIAGNOSTIC,
      "--out",
      joinReportPath,
      "--pretty",
    ],
    { encoding: "utf8" }
  );

  const report = readJson(joinReportPath);
  assert.equal(report.first_failure, "source_row_binding_open");
  assert.equal(report.same_record_provider_intake.provider_status, "same_record_provider_blocked");
  assert.equal(report.authorization.observer_export, false);

  const validation = JSON.parse(
    execFileSync(process.execPath, [SCRIPT_PATH, "--validate", joinReportPath, "--pretty"], {
      encoding: "utf8",
    })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.first_failure, "source_row_binding_open");
});
