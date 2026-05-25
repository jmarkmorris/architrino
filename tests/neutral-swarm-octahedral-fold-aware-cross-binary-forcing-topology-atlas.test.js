import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_TOPOLOGY_ATLAS_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryForcingTopologyAtlas,
  validateOctahedralFoldAwareCrossBinaryForcingTopologyAtlas,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-forcing-topology-atlas.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareCrossBinaryForcingTopologyAtlas({
      topologySamplesPerCell: 48,
      derivativeSamplesPerCell: 8,
      sourceQuadraturePanelsPerSegment: 96,
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

function cellById(atlas) {
  return Object.fromEntries(
    atlas.regular_cell_topology_rows.map((row) => [row.cell_id, row])
  );
}

test("fold-aware forcing topology atlas validates derivative predecessor", () => {
  const atlas = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryForcingTopologyAtlas(atlas),
    []
  );
  assert.equal(
    atlas.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_TOPOLOGY_ATLAS_SCHEMA
  );
  assert.equal(
    atlas.packet_id,
    "octahedral_fold_aware_cross_binary_forcing_topology_atlas"
  );
  assert.equal(atlas.promotion_status, "priority-only");
  assert.equal(atlas.source_forcing_derivative_atlas_check.valid, true);
  assert.equal(
    atlas.source_forcing_derivative_atlas_check.theory_status,
    "sampled-source-atlas-aware-forcing-derivative-atlas-certified"
  );
  assert.equal(
    atlas.source_forcing_derivative_atlas_check
      .certifies_interval_derivative_enclosure,
    false
  );
});

test("fold-aware forcing topology atlas imposes no speed window", () => {
  const atlas = artifact();

  assert.equal(
    atlas.topology_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.deepEqual(atlas.topology_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(atlas.topology_parameters.speed_ratio_estimate, 3.021564740248);
  assert.equal(atlas.artifact_claim.assumes_fixed_speed_window, false);
});

test("fold-aware forcing topology atlas states the regular-cell topology rule", () => {
  const atlas = artifact();
  const rule = atlas.topology_rule;

  assert.equal(rule.regular_cell_forcing, "A'(u)=f_cross(u)");
  assert.equal(rule.regular_cell_curvature, "A''(u)=f'_cross(u)");
  assert.match(rule.monotone_cell_test, /implicit derivative formula/);
  assert.match(rule.cell_topology_expectation, /I1 decreasing/);
  assert.equal(rule.status, "sampled-regular-cell-forcing-topology-rule-stated");
});

test("fold-aware forcing topology atlas classifies the three sampled cells", () => {
  const atlas = artifact();
  const cells = cellById(atlas);

  assert.equal(
    cells.I1.topology_class,
    "sampled-monotone-decreasing-single-forcing-zero"
  );
  assert.deepEqual(cells.I1.forcing_signs.unique, ["+", "-"]);
  assert.deepEqual(cells.I1.derivative_signs.unique, ["-"]);
  assert.equal(cells.I1.sampled_forcing_zero_count, 1);
  assert.equal(cells.I1.sampled_derivative_zero_count, 0);

  assert.equal(cells.I2.topology_class, "sampled-single-crest-single-forcing-zero");
  assert.deepEqual(cells.I2.forcing_signs.unique, ["+", "-"]);
  assert.deepEqual(cells.I2.derivative_signs.unique, ["+", "-"]);
  assert.equal(cells.I2.sampled_forcing_zero_count, 1);
  assert.equal(cells.I2.sampled_derivative_zero_count, 1);

  assert.equal(
    cells.I3.topology_class,
    "sampled-monotone-increasing-negative-cell"
  );
  assert.deepEqual(cells.I3.forcing_signs.unique, ["-"]);
  assert.deepEqual(cells.I3.derivative_signs.unique, ["+"]);
  assert.equal(cells.I3.sampled_forcing_zero_count, 0);
  assert.equal(cells.I3.sampled_derivative_zero_count, 0);
});

test("fold-aware forcing topology atlas isolates sampled forcing and derivative zeros", () => {
  const atlas = artifact();
  const cells = cellById(atlas);

  near(cells.I1.forcing_zero_rows[0].theta, 0.129625153862);
  assert.ok(Number(cells.I1.forcing_zero_rows[0].residual_abs) < 1e-10);

  near(cells.I2.forcing_zero_rows[0].theta, 1.133431464569);
  assert.ok(Number(cells.I2.forcing_zero_rows[0].residual_abs) < 1e-10);

  near(cells.I2.derivative_zero_rows[0].theta, 1.099563891683);
  near(cells.I2.derivative_zero_rows[0].forcing_at_derivative_zero, 0.07072090472);
  assert.ok(
    Number(cells.I2.derivative_zero_rows[0].derivative_residual_abs) < 1e-9
  );
});

test("fold-aware forcing topology atlas recovers the six candidate locations", () => {
  const atlas = artifact();
  const summary = atlas.topology_summary;

  assert.equal(summary.status, "sampled-regular-cell-forcing-topology-derived");
  assert.equal(summary.sampled_regular_forcing_zero_count, 2);
  assert.equal(summary.sampled_regular_derivative_zero_count, 1);
  assert.equal(summary.primitive_candidate_count_from_topology, 6);
  assert.deepEqual(
    atlas.topology_candidate_set.candidates.map((candidate) => candidate.candidate_id),
    ["endpoint.0", "I1.z1", "fold.3-", "I2.z1", "fold.2+", "endpoint.Q"]
  );
  assert.deepEqual(
    summary.topology_classes,
    [
      "sampled-monotone-decreasing-single-forcing-zero",
      "sampled-single-crest-single-forcing-zero",
      "sampled-monotone-increasing-negative-cell",
    ]
  );
});

test("fold-aware forcing topology atlas keeps interval and retention boundaries open", () => {
  const atlas = artifact();

  assert.equal(
    atlas.artifact_claim.certifies_sampled_regular_cell_forcing_topology,
    true
  );
  assert.equal(
    atlas.artifact_claim.certifies_sampled_regular_forcing_zero_isolation,
    true
  );
  assert.equal(atlas.artifact_claim.certifies_sampled_derivative_turning_row, true);
  assert.equal(
    atlas.artifact_claim.certifies_sampled_primitive_candidate_set_from_topology,
    true
  );
  assert.equal(atlas.artifact_claim.certifies_interval_derivative_enclosure, false);
  assert.equal(atlas.artifact_claim.certifies_interval_fold_limit_enclosure, false);
  assert.equal(atlas.artifact_claim.certifies_interval_quadrature_enclosure, false);
  assert.equal(atlas.artifact_claim.certifies_C_m_Q_M_Q_interval_enclosure, false);
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
    "sampled-source-atlas-aware-forcing-topology-atlas-certified"
  );
});

test("fold-aware forcing topology atlas rejects invalid controls", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryForcingTopologyAtlas({
        topologySamplesPerCell: 15,
      }),
    /topologySamplesPerCell/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryForcingTopologyAtlas({
        derivativeSamplesPerCell: 3,
      }),
    /derivativeSamplesPerCell/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryForcingTopologyAtlas({
        rootSubdivisions: 99,
      }),
    /rootSubdivisions/
  );
});

test("fold-aware forcing topology atlas CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "neutral-swarm-forcing-topology-")
  );
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL(
      "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-forcing-topology-atlas.mjs",
      import.meta.url
    )
  );

  execFileSync(
    process.execPath,
    [
      scriptPath,
      "--topology-samples-per-cell",
      "24",
      "--derivative-samples-per-cell",
      "8",
      "--source-quadrature-panels",
      "96",
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
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryForcingTopologyAtlas(atlas),
    []
  );

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], {
      encoding: "utf8",
    })
  );
  assert.equal(validation.valid, true);
  assert.equal(
    validation.result.theory_status,
    "sampled-source-atlas-aware-forcing-topology-atlas-certified"
  );

  const schema = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" })
  );
  assert.equal(
    schema.artifact_schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_TOPOLOGY_ATLAS_SCHEMA
  );
});
