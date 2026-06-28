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
});

test("moving retained branch certificate report accepts a complete same-record synthetic certificate", () => {
  const report = buildReport({
    certificate_id: "synthetic-moving-retained-branch",
    branch_certificate_ref: "branch-certificate:q-test",
    moving_continuation_ref: "moving-continuation:q-test",
    root_boundary_ref: "root-boundary:q-test",
    deformation_generator_ref: "deformation-generator:q-test",
    common_speed_record_ref: "common-speed:q-test",
    signal_sector_refs: ["photon-gate-a:q-test", "gw-tt:q-test", "two-way:q-test", "nondispersion:q-test"],
    event_ledger_ref: "event-ledger:q-test",
    certificate_status: "accepted_same_branch"
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.certificate_verdict, "accepted_same_branch");
  assert.equal(report.first_failure, null);
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
