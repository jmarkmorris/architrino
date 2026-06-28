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
    same_retained_active_row_ids: "missing",
    accepted_branch_chart: "missing",
    moving_branch_certificate: "missing",
  });
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
  assert.equal(report.consumer_status.rank2_field_speed_action_self_hit_scan.status, "source_row_binding_open");
  assert.equal(
    report.consumer_status.rank6_moving_retained_branch_certificate.status,
    "blocked_pending_accepted_branch_chart"
  );
  assert.equal(report.authorization.candidate_h_recovery, false);
  assert.equal(report.authorization.bounded_speed_live_ledger, false);
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
  assert.equal(report.authorization.observer_export, false);

  const validation = JSON.parse(
    execFileSync(process.execPath, [SCRIPT_PATH, "--validate", reportPath, "--pretty"], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.first_failure, "branch_certificate_ref_missing");
});
