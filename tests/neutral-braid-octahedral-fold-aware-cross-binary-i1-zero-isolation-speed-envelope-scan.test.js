import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_ZERO_ISOLATION_SPEED_ENVELOPE_SCAN_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan,
  validateOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan({
        rootSubdivisions: 5000,
        speedSampleCount: 9,
        derivativeThetaSampleCount: 48,
        endpointPadding: 1e-5,
        machinePadding: 1e-9,
        bisectionTolerance: 1e-12,
      });
  }
  return cachedArtifact;
}

function near(actual, expected, tolerance = 5e-12) {
  assert.ok(
    Math.abs(Number(actual) - expected) <= tolerance,
    `${actual} not within ${tolerance} of ${expected}`
  );
}

test("I1.f1 zero-isolation speed-envelope scan validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan(packet),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_ZERO_ISOLATION_SPEED_ENVELOPE_SCAN_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_i1_zero_isolation_speed_envelope_scan"
  );
  assert.equal(packet.promotion_status, "priority-only");
});

test("I1.f1 zero-isolation scan imposes no fixed speed window", () => {
  const packet = artifact();

  assert.equal(
    packet.scan_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.deepEqual(packet.scan_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.scan_parameters.speed_band, undefined);
  assert.equal(packet.scan_parameters.speed_window, undefined);
  assert.equal(packet.scan_parameters.speed_min, undefined);
  assert.equal(packet.scan_parameters.speed_max, undefined);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
});

test("I1.f1 zero-isolation scan composes certified predecessors", () => {
  const packet = artifact();

  assert.equal(packet.forcing_bracket_certificate_check.valid, true);
  assert.equal(
    packet.forcing_bracket_certificate_check
      .certifies_I1_forcing_bracket_point_signs,
    true
  );
  assert.equal(
    packet.forcing_bracket_certificate_check.certifies_I1_zero_isolation,
    false
  );
  assert.equal(packet.derivative_negative_scan_check.valid, true);
  assert.equal(
    packet.derivative_negative_scan_check
      .certifies_I1_derivative_negative_speed_envelope_scan,
    true
  );
  assert.equal(
    packet.derivative_negative_scan_check.certifies_interval_derivative_enclosure,
    false
  );
  assert.equal(
    packet.derivative_negative_scan_check.derivative_scan_summary.status,
    "i1-derivative-negative-speed-envelope-scan-certified"
  );
});

test("I1.f1 root branch rows certify sampled simple roots", () => {
  const rows = artifact().root_branch_rows;

  assert.equal(rows.length, 9);
  for (const row of rows) {
    assert.equal(row.status, "i1-f1-sampled-simple-root-certified");
    assert.equal(row.source_root_count, 6);
    assert.deepEqual(row.term_root_count_signature, [1, 3, 1, 1]);
    assert.ok(Number(row.min_abs_F_delta) > 0.7);
    assert.ok(Number(row.min_multiroot_term_delta_separation) > 1.28);
    assert.equal(row.source_root_count_preserved, true);
    assert.equal(row.bracket_signs_preserved, true);
    assert.equal(row.root_inside_bracket, true);
    assert.equal(row.derivative_at_root_negative, true);
    assert.ok(Number(row.left_forcing) > 0);
    assert.ok(Number(row.right_forcing) < 0);
    assert.ok(Number(row.root_forcing_abs) <= 1e-12);
    assert.ok(Number(row.root_derivative) < 0);
  }
});

test("I1.f1 root branch summary records the sampled root envelope", () => {
  const summary = artifact().root_branch_summary;

  assert.equal(
    summary.zero_row_id,
    "I1.f1.zero-isolation.speed-envelope-scan"
  );
  assert.equal(summary.sampled_root_count, 9);
  assert.deepEqual(summary.source_root_counts, [6]);
  assert.deepEqual(summary.term_root_count_signatures, ["1,3,1,1"]);
  assert.equal(summary.source_root_count_preserved, true);
  near(summary.root_theta_envelope[0], 0.129617801662, 2e-12);
  near(summary.root_theta_envelope[1], 0.129631781031, 2e-12);
  near(summary.root_theta_span, 0.0000139793672153, 3e-13);
  near(summary.root_derivative_envelope[0], -0.0903237258617, 2e-12);
  near(summary.root_derivative_envelope[1], -0.0902959668558, 2e-12);
  assert.ok(Number(summary.max_root_forcing_abs) <= 1e-12);
  near(summary.min_abs_F_delta, 0.70663446648, 2e-12);
  near(summary.min_multiroot_term_delta_separation, 1.28378134743, 2e-12);
  assert.equal(summary.sampled_root_branch_monotone_decreasing_in_speed, true);
  assert.equal(
    summary.status,
    "i1-f1-zero-isolation-speed-envelope-scan-certified"
  );
});

test("I1.f1 zero-isolation scan keeps full interval and retention claims open", () => {
  const packet = artifact();

  assert.equal(packet.artifact_claim.composes_I1_endpoint_signs_and_derivative_scan, true);
  assert.equal(
    packet.artifact_claim.certifies_I1_f1_zero_isolation_speed_envelope_scan,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_I1_f1_root_branch_speed_envelope_scan,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_I1_f1_sampled_simple_root_branch,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_I1_f1_full_interval_zero_isolation,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_outward_rounded_interval_enclosure,
    false
  );
  assert.equal(packet.artifact_claim.certifies_interval_derivative_enclosure, false);
  assert.equal(packet.artifact_claim.certifies_I1_zero_isolation, false);
  assert.equal(packet.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(
    packet.result.theory_status,
    "source-atlas-aware-i1-f1-zero-isolation-speed-envelope-scan-certified"
  );
  assert.equal(
    packet.result.first_successor_row,
    "I1.derivative-negative.full-cell-directed-rounding-interval-enclosure-required"
  );
});

test("I1.f1 zero-isolation scan rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan({
        speedSampleCount: 2,
      }),
    /speedSampleCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan({
        derivativeThetaSampleCount: 7,
      }),
    /derivativeThetaSampleCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan({
        bisectionTolerance: 0,
      }),
    /bisectionTolerance/
  );

  const broken = structuredClone(artifact());
  broken.artifact_claim.certifies_I1_f1_full_interval_zero_isolation = true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan(
      broken
    ).join("\n"),
    /leave interval\/retention claims open/
  );
});

test("I1.f1 zero-isolation scan CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-i1-zero-isolation-")
  );
  const outPath = path.join(tmpDir, "packet.json");

  execFileSync(
    process.execPath,
    [
      script,
      "--out",
      outPath,
      "--pretty",
      "--speed-samples",
      "3",
      "--derivative-theta-samples",
      "8",
    ],
    {
      stdio: "pipe",
    }
  );
  execFileSync(process.execPath, [script, "--validate", outPath], {
    stdio: "pipe",
  });
  assert.equal(
    execFileSync(process.execPath, [script, "--schema"], {
      encoding: "utf8",
    }).trim(),
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_ZERO_ISOLATION_SPEED_ENVELOPE_SCAN_SCHEMA
  );
});
