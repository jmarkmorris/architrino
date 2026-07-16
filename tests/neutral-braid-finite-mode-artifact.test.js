import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  ARTIFACT_SCHEMA,
  buildArtifact,
  orderedDistinctPairs,
  validateArtifact,
} from "../scripts/neutral-braid/finite-mode-artifact.mjs";

test("neutral braid finite-mode artifact records six neutral sites and all ordered distinct pairs", () => {
  const artifact = buildArtifact();
  const errors = validateArtifact(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, "neutral-braid-finite-mode-artifact/v1");
  assert.equal(artifact.packet_id, "neutral_braid_finite_mode_search");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.artifact_claim.emits_same_run_branch_scope, true);
  assert.equal(artifact.artifact_claim.emits_same_run_period_rows, true);
  assert.equal(artifact.artifact_claim.emits_same_run_root_support_event_rows, true);
  assert.equal(artifact.artifact_claim.emits_action_measure_row, false);
  assert.equal(artifact.artifact_claim.authorizes_rank5_retained_branch_closure, false);
  assert.equal(artifact.site_inventory.sites.length, 6);
  assert.deepEqual(artifact.site_inventory.polarity_balance, {
    positive: 3,
    negative: 3,
    q_core_units: 0,
  });
  assert.equal(artifact.branch_scope.pair_policy.ordered_distinct_pairs.length, 30);
  assert.equal(new Set(artifact.branch_scope.pair_policy.ordered_distinct_pairs.map((pair) => `${pair.receiver}->${pair.source}`)).size, 30);
  assert.equal(artifact.branch_scope.pair_policy.ordered_distinct_pairs.every((pair) => pair.receiver !== pair.source), true);
  assert.equal(artifact.branch_scope.chart_run_id, artifact.chart_run.run_id);
  assert.equal(artifact.period_rows.status, "same-run-chart-input");
  assert.equal(artifact.period_rows.chart_run_id, artifact.chart_run.run_id);
  assert.equal(artifact.period_rows.rows.length, 6);
  assert.equal(artifact.period_rows.rows.every((row) => row.chart_run_id === artifact.chart_run.run_id), true);
  assert.equal(artifact.period_rows.rows.every((row) => row.period === artifact.chart_run.common_period), true);
  assert.deepEqual(
    artifact.period_rows.rows.map((row) => row.site),
    [1, 2, 3, 4, 5, 6]
  );
  assert.equal(artifact.same_run_binding.status, "branch-scope-and-period-rows-bound");
  assert.equal(artifact.same_run_binding.non_fixture, true);
  assert.equal(artifact.root_support_event_rows.status, "same-run-open");
  assert.equal(artifact.root_support_event_rows.chart_run_id, artifact.chart_run.run_id);
  assert.deepEqual(artifact.root_support_event_rows.row_ids, [
    "all_pairs_root_ledger",
    "root_sheet_rows",
    "tail_split",
    "hollow_support",
    "support_work_rows",
    "support_event_rows",
    "period_event_rows",
    "root_fold_event_rows",
    "endpoint_event_rows",
    "source_provenance_event_rows",
  ]);
  assert.equal(artifact.root_support_event_rows.rows.length, 10);
  assert.equal(
    artifact.root_support_event_rows.rows.every((row) => row.chart_run_id === artifact.chart_run.run_id),
    true
  );
  assert.equal(artifact.root_support_event_rows.first_missing_field, "accepted_active_roots");
  assert.equal(artifact.root_support_event_rows.accepted_root_support_event_rows, null);
  assert.equal(artifact.root_support_event_rows.certifies_root_support_event_rows, false);
  assert.equal(artifact.result.search, "search_open");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
});

test("neutral braid finite-mode artifact keeps action rows and rank-5 authorization fail-closed", () => {
  const artifact = buildArtifact();

  assert.equal(artifact.all_pairs_root_ledger.status, "all-pairs-root-ledger-open");
  assert.equal(
    artifact.all_pairs_root_ledger.bounded_speed_live_ledger_handoff.status,
    "same-run-prerequisites-open"
  );
  assert.equal(
    artifact.all_pairs_root_ledger.bounded_speed_live_ledger_handoff.first_missing_field,
    "bounded_speed_delay_brackets"
  );
  assert.equal(
    artifact.all_pairs_root_ledger.bounded_speed_live_ledger_handoff.source_ledger_reference.seed_only,
    true
  );
  assert.equal(
    artifact.all_pairs_root_ledger.bounded_speed_live_ledger_handoff.source_ledger_reference
      .promoted_as_bounded_speed_evidence,
    false
  );
  assert.equal(artifact.all_pairs_root_ledger.bounded_speed_live_ledger_handoff.clock_lift.rows.length, 6);
  assert.equal(
    artifact.all_pairs_root_ledger.bounded_speed_live_ledger_handoff.pair_policy_handoff
      .ordered_distinct_pair_count,
    30
  );
  assert.equal(
    artifact.all_pairs_root_ledger.bounded_speed_live_ledger_handoff.root_label_handoff.root_labels.length,
    30
  );
  assert.equal(
    artifact.all_pairs_root_ledger.bounded_speed_live_ledger_handoff.accepted_bounded_speed_live_ledger,
    null
  );
  assert.equal(
    artifact.all_pairs_root_ledger.bounded_speed_live_ledger_handoff.certifies_bounded_speed_live_ledger,
    false
  );
  assert.equal(artifact.all_pairs_root_ledger.active_roots.status, "same-run-prerequisites-open");
  assert.equal(artifact.all_pairs_root_ledger.active_roots.row_family, "bounded_speed_active_root_prerequisites");
  assert.equal(artifact.all_pairs_root_ledger.active_roots.first_missing_field, "bounded_speed_delay_brackets");
  assert.equal(artifact.all_pairs_root_ledger.active_roots.accepted_active_roots, null);
  assert.equal(artifact.all_pairs_root_ledger.active_roots.certifies_active_roots, false);
  assert.equal(artifact.all_pairs_root_ledger.active_roots.rows.length, 30);
  assert.equal(
    artifact.all_pairs_root_ledger.active_roots.rows.every(
      (row) =>
        row.chart_run_id === artifact.chart_run.run_id &&
        row.bounded_speed_root_equation.first_missing_field === "bounded_speed_delay_bracket" &&
        row.delay_bracket.status === "not_computed" &&
        row.delay_floor.status === "not_computed" &&
        row.jacobian.status === "not_computed" &&
        row.source_provenance.retained_source_binding === null &&
        row.source_provenance.provider_provenance === null &&
        row.fixed_speed_source_reference.allowed_as_seed === true &&
        row.fixed_speed_source_reference.promoted_as_bounded_speed_evidence === false &&
        row.accepted_active_root === null &&
        row.certifies_active_root === false
    ),
    true
  );
  assert.equal(artifact.action_measure_row.status, "absent-fail-closed");
  assert.equal(
    artifact.action_measure_row.first_missing_field_after_period_rows,
    "action_functional"
  );
  assert.equal(artifact.action_measure_row.root_support_event_rows_status, "same-run-open-not-accepted");
  assert.deepEqual(artifact.action_measure_row.missing_same_ledger_fields, [
    "action_functional",
    "accepted_root_support_event_rows",
    "retained_source_binding",
    "provider_provenance",
    "receiver_normal_branch_strength_linkage",
  ]);
  assert.equal(artifact.action_measure_row.accepted_same_ledger_action_measure_row, null);
  assert.equal(artifact.action_measure_row.certifies_action_measure_row, false);
  assert.equal(artifact.action_measure_row.authorizes_rank5_retained_branch_closure, false);
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
});

test("neutral braid finite-mode artifact records fail-closed native replay source boundary", () => {
  const artifact = buildArtifact();
  const boundary = artifact.same_run_native_replay_source_boundary;
  const handoffBoundary = artifact.all_pairs_root_ledger.bounded_speed_live_ledger_handoff
    .native_replay_source_boundary;

  assert.equal(boundary.schema, "neutral-braid-same-run-native-replay-source-boundary/v1");
  assert.equal(boundary.status, "fail_closed_missing_source_producing_input");
  assert.equal(boundary.row_family, "same_run_finite_mode_path_clock_source_boundary");
  assert.equal(boundary.chart_run_id, artifact.chart_run.run_id);
  assert.equal(boundary.expected_consumer_row_family, "bounded_speed_active_root_prerequisites");
  assert.equal(boundary.expected_consumer_row_count, 30);
  assert.equal(boundary.expected_bindings.length, 30);
  assert.equal(
    boundary.expected_bindings.every((row) => row.chart_run_id === artifact.chart_run.run_id),
    true
  );
  assert.equal(
    boundary.expected_bindings.every((binding) =>
      artifact.all_pairs_root_ledger.active_roots.rows.some(
        (row) =>
          row.row_id === binding.active_root_prerequisite_row_id &&
          row.root_label === binding.root_label &&
          row.receiver === binding.receiver &&
          row.source === binding.source
      )
    ),
    true
  );
  assert.deepEqual(boundary.missing_source_fields, [
    "source_path_segment",
    "receiver_path_segment",
    "receiver_clock_map_values",
    "source_clock_map_values",
    "receiver_inverse_clock_map_values",
    "source_inverse_clock_map_values",
    "hitTime",
    "signalSpeed",
    "rootTolerance",
    "source_provenance",
  ]);
  assert.equal(boundary.first_missing_source_producing_input, "finite_mode_curve_path_segment_rows");
  assert.equal(boundary.first_missing_field, "source_path_segment");
  assert.equal(boundary.source_object_request_status, "source_acquisition_blocked_internal_producer_owner");
  assert.equal(
    boundary.source_object_request.schema,
    "bounded-speed-factor-finite-mode-curve-path-clock-map-source-object-request/v1"
  );
  assert.equal(
    boundary.source_object_request.expected_source_object,
    "bounded-speed-factor-finite-mode-solver-artifact-with-curve-path-clock-map-rows"
  );
  assert.equal(boundary.source_object_request.requested_row_family, "finite_mode_curve_path_segment_rows");
  assert.equal(boundary.source_object_request.first_missing_field, "source_path_segment");
  assert.equal(boundary.source_object_request.expected_row_count, 30);
  assert.equal(boundary.source_object_request.rows.length, 30);
  assert.equal(
    boundary.source_object_request.rows.every((row) => row.chart_run_id === artifact.chart_run.run_id),
    true
  );
  assert.equal(
    boundary.source_object_request.rows.every((row) => row.row_family === "finite_mode_curve_path_segment_rows"),
    true
  );
  assert.deepEqual(boundary.source_object_request.missing_per_row_fields, boundary.missing_source_fields);
  assert.equal(
    boundary.source_object_request.rows.every(
      (row) =>
        row.source_path_segment === null &&
        row.receiver_path_segment === null &&
        row.receiver_clock_map_values === null &&
        row.source_clock_map_values === null &&
        row.receiver_inverse_clock_map_values === null &&
        row.source_inverse_clock_map_values === null &&
        row.hitTime === null &&
        row.signalSpeed === null &&
        row.rootTolerance === null &&
        row.source_provenance.retained_source_binding === null &&
        row.source_provenance.provider_provenance === null &&
        row.emits_request_grade_native_replay_source_row === false &&
        row.accepted_same_run_source_row === null
    ),
    true
  );
  assert.deepEqual(boundary.source_object_request.authorization, {
    accepted_same_run_native_replay_source_rows: false,
    bounded_speed_delay_brackets: false,
    accepted_active_roots: false,
    bounded_speed_live_ledger: false,
    same_ledger_action_measure_row: false,
  });
  assert.deepEqual(boundary.emitted_request_grade_rows, []);
  assert.equal(boundary.accepted_same_run_native_replay_source_rows, null);
  assert.equal(boundary.certifies_native_causal_root_replay, false);
  assert.equal(boundary.certifies_bounded_speed_delay_brackets, false);
  assert.equal(boundary.certifies_active_roots, false);
  assert.equal(boundary.retained_source_binding, null);
  assert.equal(boundary.provider_provenance, null);
  assert.equal(boundary.rejected_evidence_kinds.includes("synthetic-path-segment"), true);
  assert.equal(boundary.rejected_evidence_kinds.includes("fixed-speed-octahedral-diagnostic"), true);
  assert.equal(boundary.rejected_evidence_kinds.includes("t3-unresolved-root-segment-row"), true);
  assert.equal(boundary.rejected_evidence_kinds.includes("photon-app-path-row"), true);
  assert.equal(handoffBoundary.status, boundary.status);
  assert.equal(handoffBoundary.row_family, boundary.row_family);
  assert.equal(handoffBoundary.expected_consumer_row_count, 30);
  assert.equal(handoffBoundary.emitted_request_grade_row_count, 0);
});

test("neutral braid finite-mode artifact rejects fixture fixed-speed proxy and cross-row action evidence", () => {
  const artifact = buildArtifact();

  assert.equal(artifact.chart_run.fixture, false);
  assert.equal(artifact.branch_scope.fixture, false);
  assert.equal(artifact.period_rows.fixture, false);
  assert.equal(artifact.period_rows.rows.every((row) => row.fixture === false), true);
  assert.equal(artifact.root_support_event_rows.fixture, false);
  assert.equal(artifact.root_support_event_rows.off_ledger, false);
  assert.equal(artifact.root_support_event_rows.sampled_diagnostic, false);
  assert.equal(artifact.root_support_event_rows.source_normal_row, false);
  assert.equal(artifact.root_support_event_rows.generated_decoy, false);
  assert.equal(artifact.root_support_event_rows.cross_row_bundle, false);
  assert.equal(artifact.root_support_event_rows.target_only, false);
  assert.equal(artifact.same_run_binding.rejects_fixed_speed_off_ledger_provenance, true);
  assert.equal(artifact.same_run_binding.rejects_proxy_rows, true);
  assert.equal(artifact.same_run_binding.rejects_cross_row_bundles, true);
  assert.deepEqual(artifact.action_measure_row.rejected_evidence_kinds, [
    "fixture-row",
    "fixed-speed-off-ledger-provenance",
    "sampled-diagnostic",
    "source-normal-row",
    "generated-decoy",
    "proxy-row",
    "cross-row-bundle",
    "branch-scope-free-summary",
    "target-only-row",
  ]);
});

test("neutral braid finite-mode ordered-pair helper is deterministic", () => {
  assert.deepEqual(
    orderedDistinctPairs().slice(0, 6),
    [
      { receiver: 1, source: 2, force_sign: 1, source_relation: "repulsive" },
      { receiver: 1, source: 3, force_sign: 1, source_relation: "repulsive" },
      { receiver: 1, source: 4, force_sign: -1, source_relation: "attractive" },
      { receiver: 1, source: 5, force_sign: -1, source_relation: "attractive" },
      { receiver: 1, source: 6, force_sign: -1, source_relation: "attractive" },
      { receiver: 2, source: 1, force_sign: 1, source_relation: "repulsive" },
    ]
  );
});

test("neutral braid finite-mode CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-artifact-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(new URL("../scripts/neutral-braid/finite-mode-artifact.mjs", import.meta.url));

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateArtifact(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.pair_count, 30);
  assert.equal(validation.period_row_count, 6);
  assert.equal(validation.root_support_event_row_count, 10);
  assert.equal(validation.result.search, "search_open");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, ARTIFACT_SCHEMA.artifact_schema);
});
