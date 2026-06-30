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
  assert.equal(artifact.result.search, "search_open");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
});

test("neutral braid finite-mode artifact keeps action rows and rank-5 authorization fail-closed", () => {
  const artifact = buildArtifact();

  assert.equal(artifact.all_pairs_root_ledger.status, "all-pairs-root-ledger-open");
  assert.equal(artifact.action_measure_row.status, "absent-fail-closed");
  assert.equal(
    artifact.action_measure_row.first_missing_field_after_period_rows,
    "action_functional"
  );
  assert.deepEqual(artifact.action_measure_row.missing_same_ledger_fields, [
    "action_functional",
    "root_support_event_rows",
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

test("neutral braid finite-mode artifact rejects fixture fixed-speed proxy and cross-row action evidence", () => {
  const artifact = buildArtifact();

  assert.equal(artifact.chart_run.fixture, false);
  assert.equal(artifact.branch_scope.fixture, false);
  assert.equal(artifact.period_rows.fixture, false);
  assert.equal(artifact.period_rows.rows.every((row) => row.fixture === false), true);
  assert.equal(artifact.same_run_binding.rejects_fixed_speed_off_ledger_provenance, true);
  assert.equal(artifact.same_run_binding.rejects_proxy_rows, true);
  assert.equal(artifact.same_run_binding.rejects_cross_row_bundles, true);
  assert.deepEqual(artifact.action_measure_row.rejected_evidence_kinds, [
    "fixture-row",
    "fixed-speed-off-ledger-provenance",
    "proxy-row",
    "cross-row-bundle",
    "branch-scope-free-summary",
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
  assert.equal(validation.result.search, "search_open");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, ARTIFACT_SCHEMA.artifact_schema);
});
