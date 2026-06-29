import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_CRITICAL_VALUE_ATLAS_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryCriticalValueAtlas,
  validateOctahedralFoldAwareCrossBinaryCriticalValueAtlas,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-critical-value-atlas.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareCrossBinaryCriticalValueAtlas({
      quadraturePanelsPerSegment: 384,
      scanSamplesPerCell: 96,
      rootSubdivisions: 5000,
    });
  }
  return cachedArtifact;
}

function near(actual, expected, tolerance = 5e-9) {
  assert.ok(
    Math.abs(Number(actual) - expected) <= tolerance,
    `${actual} not within ${tolerance} of ${expected}`
  );
}

test("fold-aware critical value atlas validates primitive-critical predecessor", () => {
  const atlas = artifact();

  assert.deepEqual(validateOctahedralFoldAwareCrossBinaryCriticalValueAtlas(atlas), []);
  assert.equal(
    atlas.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_CRITICAL_VALUE_ATLAS_SCHEMA
  );
  assert.equal(
    atlas.packet_id,
    "octahedral_fold_aware_cross_binary_critical_value_atlas"
  );
  assert.equal(atlas.promotion_status, "priority-only");
  assert.equal(atlas.source_primitive_critical_atlas_check.valid, true);
  assert.equal(atlas.source_primitive_critical_atlas_check.candidate_count, 6);
  assert.equal(
    atlas.source_primitive_critical_atlas_check.theory_status,
    "sampled-source-atlas-aware-primitive-critical-atlas-certified"
  );
});

test("fold-aware critical value atlas imposes no speed window", () => {
  const atlas = artifact();

  assert.equal(
    atlas.quadrature_parameters.speed_constraint,
    "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only"
  );
  assert.match(
    atlas.quadrature_parameters.quadrature_convention,
    /not an interval quadrature certificate/
  );
  assert.deepEqual(atlas.quadrature_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(atlas.quadrature_parameters.speed_ratio_estimate, 3.021564740248);
  assert.equal(atlas.artifact_claim.assumes_fixed_speed_window, false);
});

test("fold-aware critical value atlas emits transformed segment quadrature rows", () => {
  const atlas = artifact();
  const rows = atlas.segment_integral_rows;

  assert.equal(rows.length, 5);
  assert.deepEqual(
    rows.map((row) => row.quadrature_transform),
    [
      "regular-midpoint",
      "right-fold-square-midpoint",
      "left-fold-square-midpoint",
      "right-fold-square-midpoint",
      "left-fold-square-midpoint",
    ]
  );
  near(rows[0].integral_increment, 0.001648085483);
  near(rows[1].integral_increment, -0.121378881627);
  near(rows[2].integral_increment, 0.007428827087);
  near(rows[3].integral_increment, -0.00096721324);
  near(rows[4].integral_increment, -0.154810500203);
});

test("fold-aware critical value atlas evaluates the six candidate values", () => {
  const atlas = artifact();
  const rows = atlas.candidate_value_rows;

  assert.deepEqual(
    rows.map((row) => row.candidate_id),
    ["endpoint.0", "I1.z1", "fold.3-", "I2.z1", "fold.2+", "endpoint.Q"]
  );
  assert.deepEqual(
    rows.map((row) => row.value_role),
    [
      "quarter-left-endpoint-value",
      "sampled-M_Q-candidate",
      "fold-endpoint-limit-value",
      "regular-critical-value",
      "fold-endpoint-limit-value",
      "sampled-m_Q-candidate",
    ]
  );
  near(rows[0].primitive_value, 0);
  near(rows[1].primitive_value, 0.001648085483);
  near(rows[2].primitive_value, -0.119730796144);
  near(rows[3].primitive_value, -0.112301969057);
  near(rows[4].primitive_value, -0.113269182298);
  near(rows[5].primitive_value, -0.2680796825);
});

test("fold-aware critical value atlas derives sampled C, m_Q, and M_Q ordering", () => {
  const atlas = artifact();
  const summary = atlas.critical_value_summary;

  assert.equal(summary.status, "sampled-critical-value-ordering-derived");
  assert.equal(summary.sampled_M_Q_candidate_id, "I1.z1");
  assert.equal(summary.sampled_m_Q_candidate_id, "endpoint.Q");
  near(summary.sampled_M_Q, 0.001648085483);
  near(summary.sampled_m_Q, -0.2680796825);
  near(summary.quarter_integral_C_cross, -0.2680796825);
  near(summary.sampled_centered_average, -0.13403984125);
  near(summary.sampled_centered_excursion_radius, 0.135687926733);
  assert.deepEqual(
    summary.value_order_low_to_high.map((row) => row.candidate_id),
    ["endpoint.Q", "fold.3-", "fold.2+", "I2.z1", "endpoint.0", "I1.z1"]
  );
});

test("fold-aware critical value atlas keeps interval and retention boundaries open", () => {
  const atlas = artifact();

  assert.equal(atlas.artifact_claim.certifies_sampled_critical_value_atlas, true);
  assert.equal(
    atlas.artifact_claim.certifies_sampled_critical_value_quadrature,
    true
  );
  assert.equal(atlas.artifact_claim.certifies_sampled_candidate_minmax, true);
  assert.equal(atlas.artifact_claim.certifies_sampled_C_m_Q_M_Q_values, true);
  assert.equal(atlas.artifact_claim.certifies_C_m_Q_M_Q_interval_enclosure, false);
  assert.equal(atlas.artifact_claim.certifies_interval_quadrature_enclosure, false);
  assert.equal(atlas.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(atlas.artifact_claim.certifies_cross_binary_coarea_interval_profile, false);
  assert.equal(atlas.artifact_claim.certifies_representative_interval_profile, false);
  assert.equal(
    atlas.artifact_claim.certifies_receiver_orbit_interval_clock_length_return,
    false
  );
  assert.equal(atlas.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(atlas.result.retention, "not_retained");
  assert.equal(atlas.result.retained_branch, false);
  assert.equal(
    atlas.result.theory_status,
    "sampled-source-atlas-aware-critical-value-atlas-certified"
  );
});

test("fold-aware critical value atlas rejects invalid numerical controls", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryCriticalValueAtlas({
        quadraturePanelsPerSegment: 31,
      }),
    /quadraturePanelsPerSegment/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryCriticalValueAtlas({
        scanSamplesPerCell: 15,
      }),
    /scanSamplesPerCell/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryCriticalValueAtlas({
        rootSubdivisions: 99,
      }),
    /rootSubdivisions/
  );
});

test("fold-aware critical value atlas CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "neutral-braid-critical-values-")
  );
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL(
      "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-critical-value-atlas.mjs",
      import.meta.url
    )
  );

  execFileSync(
    process.execPath,
    [
      scriptPath,
      "--panels-per-segment",
      "384",
      "--scan-subdivisions",
      "96",
      "--subdivisions",
      "5000",
      "--out",
      artifactPath,
      "--pretty",
    ],
    { encoding: "utf8" }
  );

  const atlas = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralFoldAwareCrossBinaryCriticalValueAtlas(atlas), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], {
      encoding: "utf8",
    })
  );
  assert.equal(validation.valid, true);
  assert.equal(
    validation.result.theory_status,
    "sampled-source-atlas-aware-critical-value-atlas-certified"
  );

  const schema = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" })
  );
  assert.equal(
    schema.artifact_schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_CRITICAL_VALUE_ATLAS_SCHEMA
  );
});
