import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_PERIOD_RESCALED_TRACE_SCAN_SCHEMA,
  buildOctahedralPeriodRescaledTraceScan,
  evaluatePeriodRescaledTraceSpeed,
  validateOctahedralPeriodRescaledTraceScan,
} from "../scripts/neutral-swarm/octahedral-period-rescaled-trace-scan.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralPeriodRescaledTraceScan();
  }
  return cachedArtifact;
}

test("period-rescaled trace scan records positive simple-root rows and a root-ledger boundary", () => {
  const scan = artifact();

  assert.deepEqual(validateOctahedralPeriodRescaledTraceScan(scan), []);
  assert.equal(scan.schema, OCTAHEDRAL_PERIOD_RESCALED_TRACE_SCAN_SCHEMA);
  assert.equal(scan.packet_id, "octahedral_period_rescaled_trace_scan");
  assert.equal(scan.promotion_status, "priority-only");
  assert.equal(
    scan.sampled_scan.summary.sampled_status,
    "sampled-simple-root-trace-positive-root-ledger-boundary-detected"
  );
  assert.equal(
    scan.result.theory_status,
    "sampled-simple-root-trace-positive-root-ledger-boundary-detected"
  );
  assert.equal(scan.scan_parameters.speed_constraint, "none; speed_ratios are positive scan points, not an admissibility band");
  assert.ok(scan.sampled_scan.summary.simple_root_row_count > 0);
  assert.ok(scan.sampled_scan.summary.root_ledger_failure_row_count > 0);
  assert.ok(scan.sampled_scan.summary.root_failure_count > 0);
  assert.ok(scan.sampled_scan.summary.min_receiver_integral > 0.78);
  assert.ok(scan.sampled_scan.summary.max_receiver_integral > 1.56);
  assert.ok(scan.sampled_scan.summary.min_jacobian_abs > 0.08);
  assert.ok(scan.sampled_scan.summary.max_cross_abs > 0.19);
  assert.equal(scan.sampled_scan.rows.length, 13);
  assert.ok(scan.sampled_scan.summary.max_simple_root_speed_ratio >= 1.7);
  assert.equal(scan.sampled_scan.summary.first_root_ledger_failure.speed_ratio, 1.75);
  assert.ok(
    scan.sampled_scan.rows
      .filter((row) => row.root_failure_count === 0)
      .every(
      (row) =>
        row.row_status === "sampled-period-rescaled-trace-positive-mean" &&
        row.receiver_sample_counts.every((count) => count === 73)
    )
  );
  assert.ok(
    scan.sampled_scan.rows
      .filter((row) => row.root_failure_count > 0)
      .every((row) => row.row_status === "sampled-period-rescaled-trace-root-ledger-failed")
  );
});

test("period-rescaled trace scan records the analytic antipodal partner positivity row", () => {
  const scan = artifact();
  const vOne = scan.analytic_partner_positive_row.rows.find((row) => row.speed_ratio === 1);

  assert.equal(
    scan.analytic_partner_positive_row.status,
    "partner-subrow-positive-for-sampled-positive-speed-ratios"
  );
  assert.ok(scan.analytic_partner_positive_row.minimum_partner_period_integral > 0.93);
  assert.ok(scan.analytic_partner_positive_row.rows.every((row) => row.positive));
  assert.ok(Math.abs(vOne.phase_delay_root - 1.478170266431) <= 1e-12);
  assert.ok(Math.abs(vOne.partner_period_integral - 1.15740669293) <= 1e-12);
});

test("period-rescaled trace scan preserves the scale law at fixed speed ratio", () => {
  const rowScaleOne = evaluatePeriodRescaledTraceSpeed(1, {
    traceScale: 1,
    phaseSamples: 37,
    ySubdivisions: 240,
  });
  const rowScaleTwo = evaluatePeriodRescaledTraceSpeed(1, {
    traceScale: 2,
    phaseSamples: 37,
    ySubdivisions: 240,
  });

  assert.equal(rowScaleOne.root_failure_count, 0);
  assert.equal(rowScaleTwo.root_failure_count, 0);
  assert.ok(Math.abs(rowScaleTwo.min_receiver_integral - 0.5 * rowScaleOne.min_receiver_integral) <= 1e-10);
  assert.equal(rowScaleTwo.row_status, "sampled-period-rescaled-trace-positive-mean");
});

test("period-rescaled trace scan preserves non-retention and successor boundary", () => {
  const scan = artifact();

  assert.equal(scan.artifact_claim.scans_uniform_period_rescaling, true);
  assert.equal(scan.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(scan.artifact_claim.proves_partner_subrow_positive_for_sampled_positive_speed_ratios, true);
  assert.equal(scan.artifact_claim.proves_cross_binary_cancellation_analytically, false);
  assert.equal(scan.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(scan.artifact_claim.retained_branch, false);
  assert.equal(scan.result.first_successor_row, "multi-root-or-live-bounded-speed-branch-chart-required");
  assert.equal(scan.result.retention, "not_retained");
});

test("period-rescaled trace scan CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-swarm-period-rescaled-trace-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-swarm/octahedral-period-rescaled-trace-scan.mjs", import.meta.url)
  );

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });

  const scan = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralPeriodRescaledTraceScan(scan), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(
    validation.result.theory_status,
    "sampled-simple-root-trace-positive-root-ledger-boundary-detected"
  );

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_PERIOD_RESCALED_TRACE_SCAN_SCHEMA);
});
