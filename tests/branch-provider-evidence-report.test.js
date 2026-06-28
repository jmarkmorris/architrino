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

  const validation = JSON.parse(
    execFileSync(process.execPath, [SCRIPT_PATH, "--validate", reportPath, "--pretty"], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.provider_verdict, "same_domain_branch_provider_missing");
});
