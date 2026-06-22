import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_PERIOD_RESCALED_FOLD_CHART_SCHEMA,
  buildOctahedralPeriodRescaledFoldChart,
  validateOctahedralPeriodRescaledFoldChart,
} from "../scripts/neutral-braid/octahedral-period-rescaled-fold-chart.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralPeriodRescaledFoldChart();
  }
  return cachedArtifact;
}

function nearlyEqual(actual, expected, tolerance = 1e-12) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} not within ${tolerance} of ${expected}`);
}

test("period-rescaled fold chart records the analytic cross-binary fold onset", () => {
  const chart = artifact();
  const kappaPlus = chart.continuum_fold_onsets.rows.find((row) => row.kappa === 1);
  const kappaMinus = chart.continuum_fold_onsets.rows.find((row) => row.kappa === -1);

  assert.deepEqual(validateOctahedralPeriodRescaledFoldChart(chart), []);
  assert.equal(chart.schema, OCTAHEDRAL_PERIOD_RESCALED_FOLD_CHART_SCHEMA);
  assert.equal(chart.packet_id, "octahedral_period_rescaled_fold_chart");
  assert.equal(chart.promotion_status, "priority-only");
  assert.equal(
    chart.scan_parameters.speed_constraint,
    "none; speed_ratio is a fold-chart probe, not an admissibility band"
  );
  assert.equal(chart.cross_binary_inventory.ordered_cross_binary_pair_count, 24);
  assert.deepEqual(chart.cross_binary_inventory.kappa_class_counts, { "+1": 12, "-1": 12 });
  nearlyEqual(kappaPlus.speed_ratio, 1.704939069887);
  nearlyEqual(kappaPlus.phase_delay, 1.952852903844);
  nearlyEqual(kappaPlus.theta_tilde, 0.855314555384);
  assert.ok(kappaMinus.speed_ratio > 3.61);
  assert.equal(chart.continuum_fold_onsets.global_first_kappa_class, "+1");
  nearlyEqual(chart.continuum_fold_onsets.global_simple_root_speed_ceiling, kappaPlus.speed_ratio);
});

test("period-rescaled fold chart explains the sampled v=1.75 failure as a fold-window witness", () => {
  const chart = artifact();
  const kappaPlusWindow = chart.fold_window_at_speed_ratio.rows.find((row) => row.kappa === 1);
  const witness = chart.sampled_failure_witness;

  assert.equal(kappaPlusWindow.folds.length, 2);
  nearlyEqual(kappaPlusWindow.folds[0].theta_tilde, 0.88218873128);
  nearlyEqual(kappaPlusWindow.folds[0].phase_delay, 1.660982044542);
  assert.equal(kappaPlusWindow.folds[0].fold_type, "three-root-window-entry");
  nearlyEqual(kappaPlusWindow.folds[1].theta_tilde, 0.905049660225);
  nearlyEqual(kappaPlusWindow.folds[1].phase_delay, 2.401947520184);
  assert.equal(kappaPlusWindow.folds[1].fold_type, "three-root-window-exit");
  assert.equal(witness.status, "sampled-failure-is-fold-window-witness");
  assert.equal(witness.phase_index, 47);
  assert.equal(witness.receiver_label, "1+");
  assert.equal(witness.source_label, "2+");
  assert.equal(witness.root_count, 3);
  assert.deepEqual(witness.jacobian_signs, ["positive", "negative", "positive"]);
  nearlyEqual(witness.phase_delay_roots[0], 1.294355780304);
  nearlyEqual(witness.phase_delay_roots[1], 2.304825711803);
  nearlyEqual(witness.phase_delay_roots[2], 2.485619153606);
  assert.equal(witness.inside_analytic_fold_window, true);
});

test("period-rescaled fold chart preserves non-retention and successor burden", () => {
  const chart = artifact();

  assert.equal(chart.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(chart.artifact_claim.proves_analytic_cross_binary_fold_onset, true);
  assert.equal(chart.artifact_claim.proves_sampled_failure_is_fold_window_witness, true);
  assert.equal(chart.artifact_claim.certifies_simple_root_interval_positivity, false);
  assert.equal(chart.artifact_claim.certifies_fold_aware_multiroot_period_integral, false);
  assert.equal(chart.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(chart.artifact_claim.retained_branch, false);
  assert.equal(chart.result.theory_status, "analytic-cross-binary-fold-onset-charted");
  assert.equal(chart.result.first_successor_row, "fold-aware-multiroot-period-integral-required");
  assert.equal(chart.result.retention, "not_retained");
});

test("period-rescaled fold chart CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-period-fold-chart-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-period-rescaled-fold-chart.mjs", import.meta.url)
  );

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });

  const chart = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralPeriodRescaledFoldChart(chart), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.result.theory_status, "analytic-cross-binary-fold-onset-charted");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_PERIOD_RESCALED_FOLD_CHART_SCHEMA);
});
