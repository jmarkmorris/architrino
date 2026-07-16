import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  TARGET_OBJECT_ID,
  buildBranchChartSourceTarget,
  validationErrors,
} from "../scripts/mass-map/a0-branch-chart-source-target.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/mass-map/a0-branch-chart-source-target.mjs", import.meta.url)
);

test("A0 branch-chart source target emits missing source object boundary", () => {
  const report = buildBranchChartSourceTarget();

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.object_id, TARGET_OBJECT_ID);
  assert.equal(report.claim_level, "fail-closed branch-chart source target, not accepted continuation evidence");
  assert.equal(report.source_candidate_available, false);
  assert.equal(report.accepted_continuation_authorized, false);
  assert.equal(report.corrected_rerun_authorized, false);
  assert.equal(report.retained_pressure_row_provider_authorized, false);
  assert.equal(report.receiver_normal_branch_strength_authorized, false);
  assert.equal(report.first_failure, "branch_chart_source_record_missing");
  assert.equal(report.first_missing_field, "source_kind");
  assert.equal(report.missing_or_rejected_fields_by_group.source_record.includes("source_kind"), true);
  assert.equal(report.missing_or_rejected_fields_by_group.finite_delay_sector_rows.length, 0);
  assert.equal(report.missing_or_rejected_fields_by_group.separator_fold_event_rows.length, 0);
});

test("A0 branch-chart source target rejects fixture and diagnostic shortcut provenance", () => {
  const report = buildBranchChartSourceTarget(
    completeFiniteDelaySectorCandidate({
      source_ref: "scripts/mass-map/fixtures/a0-branch-chart-source.json",
      diagnostic_only: true,
      notes:
        "diagnostic sampled only aggregate source-normal denominator toy empirical benchmark only generated decoy cross-row bundle",
    })
  );

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.source_candidate_available, false);
  assert.deepEqual(report.missing_or_rejected_fields, ["source_ref"]);
  assert.equal(report.rejected_source_family_codes.includes("fixture_ref"), true);
  assert.equal(report.rejected_source_family_codes.includes("diagnostic_row"), true);
  assert.equal(report.rejected_source_family_codes.includes("sampled_only_row"), true);
  assert.equal(report.rejected_source_family_codes.includes("aggregate_row"), true);
  assert.equal(report.rejected_source_family_codes.includes("source_normal_denominator_machinery"), true);
  assert.equal(report.rejected_source_family_codes.includes("toy_or_empirical_row"), true);
  assert.equal(report.rejected_source_family_codes.includes("benchmark_only_row"), true);
  assert.equal(report.rejected_source_family_codes.includes("generated_decoy"), true);
  assert.equal(report.rejected_source_family_codes.includes("cross_row_bundle"), true);
});

test("A0 branch-chart source target accepts complete finite delay-sector fields without authorizing continuation", () => {
  const report = buildBranchChartSourceTarget(completeFiniteDelaySectorCandidate());

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.source_candidate_available, true);
  assert.equal(report.first_missing_field, null);
  assert.equal(report.accepted_continuation_authorized, false);
  assert.equal(report.corrected_rerun_authorized, false);
  assert.equal(report.retained_pressure_row_provider_authorized, false);
});

test("A0 branch-chart source target accepts complete separator/fold-event fields without authorizing continuation", () => {
  const report = buildBranchChartSourceTarget(completeSeparatorFoldEventCandidate());

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.source_candidate_available, true);
  assert.equal(report.first_missing_field, null);
  assert.equal(report.accepted_continuation_authorized, false);
  assert.equal(report.corrected_rerun_authorized, false);
  assert.equal(report.retained_pressure_row_provider_authorized, false);
});

test("A0 branch-chart source target reports held-out residual as first route blocker after provenance", () => {
  const report = buildBranchChartSourceTarget(
    completeFiniteDelaySectorCandidate({
      held_out_residual_ledger: {
        ...completeFiniteDelaySectorCandidate().held_out_residual_ledger,
        max_held_out_relative_residual: 1.0408163198841647,
        residuals_below_tolerance: false,
      },
    })
  );

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.source_candidate_available, false);
  assert.equal(report.first_missing_field, "held_out_residual_ledger.max_held_out_relative_residual");
  assert.equal(
    report.missing_or_rejected_fields_by_group.held_out_residual_ledger.includes(
      "held_out_residual_ledger.residuals_below_tolerance"
    ),
    true
  );
});

test("A0 branch-chart source target CLI emits and validates fail-closed report", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-branch-chart-source-target-"));
  const reportPath = path.join(tempDir, "report.json");

  execFileSync(process.execPath, [SCRIPT_PATH, "--out", reportPath, "--pretty"], { encoding: "utf8" });

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.equal(report.source_candidate_available, false);
  assert.equal(report.first_missing_field, "source_kind");

  const validation = JSON.parse(
    execFileSync(process.execPath, [SCRIPT_PATH, "--validate", reportPath, "--pretty"], {
      encoding: "utf8",
    })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.first_failure, "branch_chart_source_record_missing");
  assert.equal(validation.first_missing_field, "source_kind");
});

function baseCandidate(overrides = {}) {
  return {
    provider_source_status: "accepted_non_fixture_source",
    source_ref: "reports/a0-tier1/branch-chart-source-row.json",
    accepted_status: true,
    branch_certificate_ref: "branch-certificate:a0-tier1-branch-chart-row",
    same_domain_record_ref: "a0-tier1-branch-chart-row",
    branch_chart_source_record_id: "a0-branch-chart-source-row-1",
    branch_chart_source_provenance: {
      source_declared_before_fit: true,
      z_lambda_star_ref: "z_lambda_star:a0-branch-chart-row",
      branch_chart_source_record_id: "a0-branch-chart-source-row-1",
    },
    retained_source_binding: {
      retained_record_id: "retained:a0-branch-chart-row",
      source_record_id: "source:a0-branch-chart-row",
      source_artifact_hash: "sha256:a0-branch-chart-row",
      causal_root_replay_ref: "causal-root-replay:a0-branch-chart-row",
    },
    held_out_residual_ledger: {
      status: "pass",
      tolerance: 0.02,
      max_held_out_relative_residual: 0.01,
      residuals_below_tolerance: true,
      held_out_bucket_scheme: "even_odd_and_blocked_bucket_holdout",
      fit_sample_count: 16,
      holdout_sample_count: 16,
      overdetermined: true,
      feature_rank: 3,
    },
    root_ledger_refinement_status: {
      status: "pass",
      root_ledger_stable_under_refinement: true,
      raw_row_rerun_authorizing: true,
    },
    sample_count_fields: {
      observation_bucket_count: 32,
      source_row_count: 64,
      higher_than_baseline_16: true,
    },
    benchmark_exclusion: {
      benchmark_inputs_excluded: true,
      excluded_source_families: [
        "fixture_ref",
        "proxy_ref",
        "diagnostic_row",
        "sampled_only_row",
        "aggregate_row",
        "source_normal_denominator_machinery",
        "toy_or_empirical_row",
        "benchmark_only_row",
        "generated_decoy",
        "cross_row_bundle",
      ],
    },
    ...overrides,
  };
}

function completeFiniteDelaySectorCandidate(overrides = {}) {
  return baseCandidate({
    source_kind: "higher_sample_count_finite_delay_sector",
    finite_delay_sector_rows: [
      {
        sector_id: "delay-sector:I-M:1",
        root_key: "I+|M-|inter_layer|active",
        t: 0.25,
        delay: 0.03125,
        J: 1.25,
        theta: 0.5,
        D_tau: 0.01,
        D_J: -0.02,
        receiver: "I+",
        source: "M-",
      },
    ],
    ...overrides,
  });
}

function completeSeparatorFoldEventCandidate(overrides = {}) {
  return baseCandidate({
    source_kind: "separator_fold_event",
    separator_fold_event_rows: [
      {
        event_id: "separator-fold-event:1",
        event_type: "fold_event",
        t: 0.5,
        pre_event_active_root_identity: "root-before",
        post_event_active_root_identity: "root-after",
        z_lambda_star_coordinate: "z_lambda_star:separator-fold-event:1",
      },
    ],
    root_phase_speed_closure_fields: {
      root_closure_pass: true,
      phase_closure_pass: true,
      speed_ordering_pass: true,
    },
    ...overrides,
  });
}
