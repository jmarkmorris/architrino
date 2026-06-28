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
} from "../scripts/nested-shell-braid/field-speed-action-self-hit-scan-source-binding-report.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/nested-shell-braid/field-speed-action-self-hit-scan-source-binding-report.mjs", import.meta.url)
);
const FIXTURE_PACKET_DIR = fileURLToPath(
  new URL("../scripts/nested-shell-braid/fixtures/action-increment-packet/", import.meta.url)
);

test("field-speed source-binding report rejects fixture-only action-increment rows", () => {
  const report = buildReport({
    packetDir: FIXTURE_PACKET_DIR,
    branchRowId: "fixture-B12-B13-a",
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.schema, "field_speed_action_self_hit_scan_source_binding_report/v0");
  assert.equal(report.branch_row_id, "fixture-B12-B13-a");
  assert.equal(report.action_row_status, "accepted");
  assert.equal(report.packet_promotion_status, "fixture-shape-only");
  assert.equal(report.fixture_shape_only, true);
  assert.equal(report.source_verdict, "diagnostic_rejected_endpoint_source");
  assert.equal(report.first_failure, "source_row_binding_open");
  assert.equal(report.candidate_h_recovery_vote, "not_authorized");
  assert.equal(report.missing_or_rejected_fields.includes("non_fixture_transition_source"), true);
  assert.equal(report.action_row_hash.startsWith("sha256:"), true);
});

test("field-speed source-binding report can accept a non-fixture same-record source", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "field-speed-source-binding-"));
  fs.writeFileSync(
    path.join(tempDir, "action_increment_rows.csv"),
    [
      "id,branch_from,branch_to,cluster_id,delta_I_ME,status,failure_code,branch_certificate_ref,root_ledger_hash,conservation_pullback_hash",
      "candidate-row,B_1,B_2,cluster-a,1.0,accepted,,branch-certificate:test,sha256:root,sha256:conservation",
      "",
    ].join("\n")
  );
  fs.writeFileSync(
    path.join(tempDir, "cluster_summary.json"),
    `${JSON.stringify({ schema: "test/v1", promotion_status: "non-fixture-source-candidate" })}\n`
  );

  const report = buildReport({
    packetDir: tempDir,
    branchRowId: "candidate-row",
    branchCertificateRef: "branch-certificate:test",
    rootLedgerHash: "sha256:root",
    conservationPullbackHash: "sha256:conservation",
    negativeControlRef: "negative-control:test",
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.source_verdict, "accepted_transition_source");
  assert.equal(report.same_record_binding, true);
  assert.equal(report.action_row_branch_certificate_ref, "branch-certificate:test");
  assert.equal(report.action_row_root_ledger_hash, "sha256:root");
  assert.equal(report.action_row_conservation_pullback_hash, "sha256:conservation");
  assert.equal(report.first_failure, null);
  assert.equal(report.candidate_h_recovery_vote, "authorized_not_computed");
});

test("field-speed source-binding report rejects sideband hashes that do not bind to the action row", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "field-speed-source-binding-mismatch-"));
  fs.writeFileSync(
    path.join(tempDir, "action_increment_rows.csv"),
    [
      "id,branch_from,branch_to,cluster_id,delta_I_ME,status,failure_code,branch_certificate_ref,root_ledger_hash,conservation_pullback_hash",
      "candidate-row,B_1,B_2,cluster-a,1.0,accepted,,branch-certificate:test,sha256:row-root,sha256:row-conservation",
      "",
    ].join("\n")
  );
  fs.writeFileSync(
    path.join(tempDir, "cluster_summary.json"),
    `${JSON.stringify({ schema: "test/v1", promotion_status: "non-fixture-source-candidate" })}\n`
  );

  const report = buildReport({
    packetDir: tempDir,
    branchRowId: "candidate-row",
    branchCertificateRef: "branch-certificate:test",
    rootLedgerHash: "sha256:other-root",
    conservationPullbackHash: "sha256:other-conservation",
    negativeControlRef: "negative-control:test",
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.source_verdict, "diagnostic_rejected_endpoint_source");
  assert.equal(report.same_record_binding, false);
  assert.equal(report.candidate_h_recovery_vote, "not_authorized");
  assert.equal(report.missing_or_rejected_fields.includes("root_ledger_hash_mismatch"), true);
  assert.equal(
    report.missing_or_rejected_fields.includes("conservation_pullback_hash_mismatch"),
    true
  );
});

test("field-speed source-binding CLI emits and validates fixture report", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "field-speed-source-binding-cli-"));
  const reportPath = path.join(tempDir, "report.json");

  execFileSync(
    process.execPath,
    [
      SCRIPT_PATH,
      "--packet-dir",
      FIXTURE_PACKET_DIR,
      "--branch-row-id",
      "fixture-B12-B13-a",
      "--out",
      reportPath,
      "--pretty",
    ],
    { encoding: "utf8" }
  );

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.equal(report.source_verdict, "diagnostic_rejected_endpoint_source");
  assert.equal(report.candidate_h_recovery_vote, "not_authorized");

  const validation = JSON.parse(
    execFileSync(process.execPath, [SCRIPT_PATH, "--validate", reportPath, "--pretty"], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.source_verdict, "diagnostic_rejected_endpoint_source");
});
