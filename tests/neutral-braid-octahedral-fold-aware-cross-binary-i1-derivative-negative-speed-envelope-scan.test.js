import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_DERIVATIVE_NEGATIVE_SPEED_ENVELOPE_SCAN_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryI1DerivativeNegativeSpeedEnvelopeScan,
  validateOctahedralFoldAwareCrossBinaryI1DerivativeNegativeSpeedEnvelopeScan,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-derivative-negative-speed-envelope-scan.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryI1DerivativeNegativeSpeedEnvelopeScan({
        rootSubdivisions: 5000,
        thetaSampleCount: 48,
        speedSampleCount: 9,
        endpointPadding: 1e-5,
        machinePadding: 1e-9,
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

test("I1 derivative negative speed-envelope scan validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryI1DerivativeNegativeSpeedEnvelopeScan(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_DERIVATIVE_NEGATIVE_SPEED_ENVELOPE_SCAN_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_i1_derivative_negative_speed_envelope_scan"
  );
  assert.equal(packet.promotion_status, "priority-only");
});

test("I1 derivative scan imposes no fixed speed window", () => {
  const packet = artifact();

  assert.equal(
    packet.scan_parameters.speed_constraint,
    "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only"
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

test("I1 derivative scan covers the compact regular I1 core", () => {
  const params = artifact().scan_parameters;

  assert.equal(params.target_row_id, "I1.derivative-negative.full-cell");
  assert.equal(params.theta_sample_count, 48);
  assert.equal(params.speed_sample_count, 9);
  assert.equal(params.root_subdivisions, 5000);
  assert.equal(params.endpoint_padding, 1e-5);
  near(params.i1_cell_interval[0], 0);
  near(params.i1_cell_interval[1], 0.997370655243);
  near(params.compact_scan_interval[0], 0.00001);
  near(params.compact_scan_interval[1], 0.997360655243);
});

test("I1 derivative scan keeps six roots and a negative derivative envelope", () => {
  const summary = artifact().derivative_scan_summary;

  assert.equal(
    summary.scan_row_id,
    "I1.derivative-negative.full-cell.speed-envelope-scan"
  );
  assert.equal(summary.target_row_id, "I1.derivative-negative.full-cell");
  assert.equal(summary.sampled_point_count, 432);
  assert.equal(summary.source_root_count_expected, 6);
  assert.deepEqual(summary.source_root_counts, [6]);
  assert.equal(summary.source_root_count_preserved, true);
  near(summary.raw_derivative_minimum, -45.5042121895, 1e-9);
  near(summary.raw_derivative_maximum, -0.0199795715084, 1e-12);
  assert.ok(Number(summary.derivative_envelope[1]) < 0);
  assert.ok(Number(summary.signed_derivative_clearance) > 0.0199);
  assert.equal(
    summary.status,
    "i1-derivative-negative-speed-envelope-scan-certified"
  );
  near(summary.weakest_sample.speed_ratio, 3.02157);
  near(summary.weakest_sample.theta, 0.197402317184, 1e-12);
});

test("I1 derivative speed slices are negative with six roots", () => {
  const packet = artifact();

  assert.equal(packet.derivative_speed_slice_rows.length, 9);
  for (const row of packet.derivative_speed_slice_rows) {
    assert.equal(row.theta_sample_count, 48);
    assert.deepEqual(row.source_root_counts, [6]);
    assert.equal(row.source_root_count_preserved, true);
    assert.equal(row.status, "speed-slice-derivative-negative-certified");
    assert.ok(Number(row.raw_derivative_maximum) < 0);
    assert.ok(Number(row.signed_derivative_margin_at_max) > 0);
  }
});

test("I1 derivative scan keeps interval and retention claims open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_I1_derivative_negative_speed_envelope_scan,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_source_root_count_six_on_I1_scan,
    true
  );
  assert.equal(
    packet.artifact_claim.advances_I1_derivative_negative_full_cell,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_outward_rounded_interval_enclosure,
    false
  );
  assert.equal(
    packet.artifact_claim
      .certifies_I1_derivative_negative_full_cell_interval_enclosure,
    false
  );
  assert.equal(packet.artifact_claim.certifies_interval_derivative_enclosure, false);
  assert.equal(packet.artifact_claim.certifies_I1_zero_isolation, false);
  assert.equal(packet.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(
    packet.result.theory_status,
    "source-atlas-aware-i1-derivative-negative-speed-envelope-scan-certified"
  );
  assert.equal(
    packet.result.first_successor_row,
    "I1.derivative-negative.full-cell-directed-rounding-interval-enclosure-required"
  );
});

test("I1 derivative scan rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1DerivativeNegativeSpeedEnvelopeScan({
        thetaSampleCount: 7,
      }),
    /thetaSampleCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1DerivativeNegativeSpeedEnvelopeScan({
        speedSampleCount: 2,
      }),
    /speedSampleCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1DerivativeNegativeSpeedEnvelopeScan({
        endpointPadding: 0,
      }),
    /endpointPadding/
  );

  const broken = structuredClone(artifact());
  broken.artifact_claim.certifies_interval_derivative_enclosure = true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1DerivativeNegativeSpeedEnvelopeScan(
      broken
    ).join("\n"),
    /leave interval\/retention claims open/
  );
});

test("I1 derivative scan CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-derivative-negative-speed-envelope-scan.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-i1-derivative-scan-")
  );
  const outPath = path.join(tmpDir, "packet.json");

  execFileSync(
    process.execPath,
    [
      script,
      "--out",
      outPath,
      "--pretty",
      "--theta-samples",
      "8",
      "--speed-samples",
      "3",
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_DERIVATIVE_NEGATIVE_SPEED_ENVELOPE_SCAN_SCHEMA
  );
});
