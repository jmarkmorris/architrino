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

  const byId = Object.fromEntries(report.candidates.map((candidate) => [candidate.id, candidate]));
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
