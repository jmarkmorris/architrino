import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_SCHEMA,
  buildOctahedralFoldAwareCrossBinarySourceAtlas,
  validateOctahedralFoldAwareCrossBinarySourceAtlas,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-source-atlas.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareCrossBinarySourceAtlas({
      sampleCount: 64,
      rootSubdivisions: 5000,
    });
  }
  return cachedArtifact;
}

function sourceRow(label) {
  return artifact().source_class_rows.find((row) => row.source_label === label);
}

test("fold-aware cross-binary source atlas validates scope and predecessor", () => {
  const atlas = artifact();

  assert.deepEqual(validateOctahedralFoldAwareCrossBinarySourceAtlas(atlas), []);
  assert.equal(atlas.schema, OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_SCHEMA);
  assert.equal(atlas.packet_id, "octahedral_fold_aware_cross_binary_source_atlas");
  assert.equal(atlas.promotion_status, "priority-only");
  assert.equal(atlas.source_quarter_profile_check.valid, true);
  assert.equal(atlas.atlas_parameters.receiver_label, "1+");
  assert.equal(atlas.atlas_parameters.theta_domain, "[0,H/4)");
});

test("fold-aware cross-binary source atlas imposes no fixed speed window", () => {
  const atlas = artifact();

  assert.equal(
    atlas.atlas_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.equal(atlas.atlas_parameters.speed_ratio_estimate, 3.021564740248);
  assert.deepEqual(atlas.atlas_parameters.speed_ratio_enclosure, [3.02156, 3.02157]);
  assert.equal(atlas.artifact_claim.assumes_fixed_speed_window, false);
});

test("fold-aware cross-binary source atlas covers exactly four source rows", () => {
  const rows = artifact().source_class_rows;

  assert.deepEqual(
    rows.map((row) => row.source_label),
    ["2+", "2-", "3+", "3-"]
  );
  assert.equal(sourceRow("2+").kappa, 1);
  assert.equal(sourceRow("2+").theta_tilde_shift, "0");
  assert.equal(sourceRow("2-").kappa, -1);
  assert.equal(sourceRow("2-").theta_tilde_shift, "H/4");
  assert.equal(sourceRow("3+").kappa, -1);
  assert.equal(sourceRow("3+").theta_tilde_shift, "0");
  assert.equal(sourceRow("3-").kappa, 1);
  assert.equal(sourceRow("3-").theta_tilde_shift, "H/4");
});

test("fold-aware cross-binary source atlas records source root-count regimes", () => {
  assert.deepEqual(sourceRow("2+").sampled_root_counts, [1, 3]);
  assert.deepEqual(sourceRow("3-").sampled_root_counts, [1, 3]);
  assert.deepEqual(sourceRow("2-").sampled_root_counts, [1]);
  assert.deepEqual(sourceRow("3+").sampled_root_counts, [1]);
});

test("fold-aware cross-binary source atlas solves the kappa fold endpoints", () => {
  const atlas = artifact();
  const folds = atlas.kappa_fold_atlas.kappa_positive_fold_endpoints;

  assert.equal(atlas.kappa_fold_atlas.status, "kappa-plus-only-fold-atlas-certified");
  assert.equal(folds.length, 2);
  assert.equal(atlas.kappa_fold_atlas.kappa_negative_fold_endpoints.length, 0);
  assert.ok(Math.abs(folds[0].theta_tilde - 1.159039827771) < 1e-9);
  assert.ok(Math.abs(folds[1].theta_tilde - 2.568166982038) < 1e-9);
  assert.ok(Math.abs(sourceRow("2+").quarter_cell_rows[1].boundary_fold_theta - 1.159039827771) < 1e-9);
  assert.ok(Math.abs(sourceRow("3-").quarter_cell_rows[0].boundary_fold_theta - 0.997370655243) < 1e-9);
});

test("fold-aware cross-binary source atlas checks source-pair quarter antisymmetry", () => {
  const atlas = artifact();

  assert.equal(atlas.source_pair_symmetry.status, "source-pair-quarter-antisymmetry-check-passed");
  assert.deepEqual(atlas.source_pair_symmetry.pairings, [
    "2+(u)+3-(u+H/4)=0",
    "2-(u)+3+(u+H/4)=0",
  ]);
  assert.ok(atlas.source_pair_symmetry.max_quarter_pair_antisymmetry_residual <= 1e-10);
  assert.equal(
    atlas.source_pair_symmetry.root_level_transport.status,
    "root-level-source-pair-transport-check-passed"
  );
  assert.equal(atlas.source_pair_symmetry.root_level_transport.max_root_count_mismatch, 0);
  assert.ok(atlas.source_pair_symmetry.root_level_transport.max_delay_residual <= 1e-10);
  assert.ok(atlas.source_pair_symmetry.root_level_transport.max_jacobian_residual <= 1e-10);
  assert.ok(
    atlas.source_pair_symmetry.root_level_transport.max_root_tangential_pair_sum_residual <=
      1e-10
  );
});

test("fold-aware cross-binary source atlas reduces to two canonical kappa rows", () => {
  const atlas = artifact();
  const reduction = atlas.canonical_source_class_reduction;

  assert.equal(reduction.source_rows_before, 4);
  assert.equal(reduction.canonical_rows_after, 2);
  assert.equal(reduction.rejects_one_canonical_row, true);
  assert.equal(reduction.status, "two-canonical-kappa-source-classes-certified");
  assert.deepEqual(
    reduction.canonical_rows.map((row) => [row.canonical_source_label, row.kappa, row.transports_to]),
    [
      ["2+", 1, "3-"],
      ["3+", -1, "2-"],
    ]
  );
});

test("fold-aware cross-binary source atlas verifies fold cell adjacency without retention", () => {
  const atlas = artifact();

  assert.equal(atlas.fold_cell_adjacency_checks.length, 4);
  for (const row of atlas.fold_cell_adjacency_checks) {
    assert.equal(row.status, "fold-cell-adjacency-check-passed");
  }
  assert.equal(atlas.artifact_claim.certifies_cross_binary_source_fold_atlas, true);
  assert.equal(atlas.artifact_claim.certifies_two_canonical_kappa_source_classes, true);
  assert.equal(atlas.artifact_claim.certifies_cross_binary_coarea_interval_profile, false);
  assert.equal(atlas.artifact_claim.certifies_representative_interval_profile, false);
  assert.equal(atlas.artifact_claim.certifies_receiver_orbit_interval_clock_length_return, false);
  assert.equal(atlas.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(atlas.result.retention, "not_retained");
  assert.equal(atlas.result.retained_branch, false);
});

test("fold-aware cross-binary source atlas CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-swarm-cross-source-atlas-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL(
      "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-source-atlas.mjs",
      import.meta.url
    )
  );

  execFileSync(
    process.execPath,
    [scriptPath, "--samples", "64", "--subdivisions", "5000", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const atlas = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralFoldAwareCrossBinarySourceAtlas(atlas), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], {
      encoding: "utf8",
    })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.result.theory_status, "cross-binary-quarter-source-fold-atlas-certified");

  const schema = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" })
  );
  assert.equal(schema.artifact_schema, OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_SCHEMA);
});
