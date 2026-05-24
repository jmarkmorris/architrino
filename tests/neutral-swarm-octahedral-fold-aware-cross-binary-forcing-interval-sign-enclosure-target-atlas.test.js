import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_INTERVAL_SIGN_ENCLOSURE_TARGET_ATLAS_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas,
  validateOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas({
        topologySamplesPerCell: 48,
        derivativeSamplesPerCell: 8,
        sourceAtlasSampleCount: 64,
        sourceQuadraturePanelsPerSegment: 96,
        valueQuadraturePanelsPerSegment: 384,
        scanSamplesPerCell: 96,
        rootSubdivisions: 5000,
        targetMarginFactor: 0.5,
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

function targetRow(rows, rowId) {
  const row = rows.find((entry) => entry.target_id === rowId);
  assert.ok(row, `missing target row ${rowId}`);
  return row;
}

test("fold-aware forcing interval sign target atlas validates predecessors", () => {
  const atlas = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas(
      atlas
    ),
    []
  );
  assert.equal(
    atlas.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_INTERVAL_SIGN_ENCLOSURE_TARGET_ATLAS_SCHEMA
  );
  assert.equal(
    atlas.packet_id,
    "octahedral_fold_aware_cross_binary_forcing_interval_sign_enclosure_target_atlas"
  );
  assert.equal(atlas.promotion_status, "priority-only");
  assert.equal(atlas.source_margin_atlas_check.valid, true);
  assert.equal(atlas.source_fold_square_limit_atlas_check.valid, true);
  assert.equal(
    atlas.source_margin_atlas_check.certifies_interval_critical_exhaustion,
    false
  );
  assert.equal(
    atlas.source_fold_square_limit_atlas_check.certifies_interval_fold_limit_enclosure,
    false
  );
});

test("fold-aware forcing interval sign target atlas imposes no speed window", () => {
  const atlas = artifact();

  assert.equal(
    atlas.enclosure_target_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.equal(atlas.enclosure_target_parameters.speed_band, undefined);
  assert.equal(atlas.enclosure_target_parameters.speed_window, undefined);
  assert.deepEqual(atlas.enclosure_target_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(atlas.artifact_claim.assumes_fixed_speed_window, false);
});

test("fold-aware forcing interval sign target atlas emits named target rows", () => {
  const atlas = artifact();

  assert.equal(atlas.point_sign_enclosure_target_rows.length, 13);
  assert.deepEqual(
    atlas.zero_isolation_target_rows.map((row) => row.target_id),
    ["I1.f1", "I2.d1", "I2.f1"]
  );
  assert.deepEqual(
    atlas.regular_subcell_sign_target_rows.map((row) => row.target_id),
    [
      "I1.derivative-negative.full-cell",
      "I2.derivative-positive.before-turn",
      "I2.derivative-negative.after-turn",
      "I3.derivative-positive.full-cell",
      "I3.forcing-negative.full-cell",
    ]
  );
  assert.equal(atlas.theta_order_target_rows.length, 4);
  assert.equal(atlas.value_budget_import_rows.length, 1);
});

test("fold-aware forcing interval sign target atlas preserves the bottleneck radius", () => {
  const summary = artifact().target_budget_summary;

  near(summary.global_sampled_closure_bottleneck, 0.000472358401387);
  assert.equal(
    summary.global_sampled_closure_bottleneck_row_id,
    "I1.forcing-bracket"
  );
  near(summary.first_outward_rounded_radius_target, 0.000236179200694);
  near(summary.minimum_value_ordering_budget, 0.0004836066205);
  assert.equal(summary.target_margin_factor, 0.5);
  assert.equal(summary.target_status, "interval-sign-enclosure-targets-staged");
});

test("fold-aware forcing interval sign target atlas stages fold-collar sign transport", () => {
  const rows = artifact().fold_collar_sign_transport_target_rows;

  assert.equal(rows.length, 2);
  const left = targetRow(rows, "fold.3-.left-fold-collar");
  const right = targetRow(rows, "fold.2+.right-fold-collar");
  near(left.analytic_square_limit, -0.192715477558, 5e-9);
  assert.equal(left.square_limit_sign, "-");
  assert.equal(left.forcing_sign_for_small_y, "-");
  assert.equal(left.derivative_sign_for_small_y, "-");
  assert.match(left.asymptotic_rule, /f'_theta~L\/\(4y\^3\)/);
  near(right.analytic_square_limit, -0.325542989718, 5e-9);
  assert.equal(right.square_limit_sign, "-");
  assert.equal(right.forcing_sign_for_small_y, "-");
  assert.equal(right.derivative_sign_for_small_y, "+");
  assert.match(right.asymptotic_rule, /f'_theta~-L\/\(4y\^3\)/);
});

test("fold-aware forcing interval sign target atlas keeps interval closure open", () => {
  const atlas = artifact();

  assert.equal(atlas.artifact_claim.emits_interval_sign_enclosure_targets, true);
  assert.equal(
    atlas.artifact_claim.stages_fold_collar_square_coordinate_sign_targets,
    true
  );
  assert.equal(atlas.artifact_claim.proves_fold_collar_sign_transport_formula, true);
  assert.equal(atlas.artifact_claim.certifies_interval_sign_topology, false);
  assert.equal(atlas.artifact_claim.certifies_interval_derivative_enclosure, false);
  assert.equal(atlas.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(atlas.artifact_claim.certifies_interval_quadrature_enclosure, false);
  assert.equal(atlas.artifact_claim.retained_branch, false);
  assert.equal(atlas.result.retention, "not_retained");
  assert.equal(
    atlas.result.theory_status,
    "source-atlas-aware-forcing-interval-sign-enclosure-target-atlas-staged"
  );
});

test("fold-aware forcing interval sign target atlas rejects invalid controls", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas({
        targetMarginFactor: 1.1,
      }),
    /targetMarginFactor/
  );
  const broken = structuredClone(artifact());
  broken.target_budget_summary.global_sampled_closure_bottleneck_row_id =
    "value.full-order";
  assert.match(
    validateOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas(
      broken
    ).join("\n"),
    /I1 forcing-bracket bottleneck/
  );
});

test("fold-aware forcing interval sign target atlas CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-forcing-interval-target-")
  );
  const outPath = path.join(tmpDir, "target-atlas.json");

  execFileSync(process.execPath, [script, "--out", outPath, "--pretty"], {
    stdio: "pipe",
  });
  execFileSync(process.execPath, [script, "--validate", outPath], {
    stdio: "pipe",
  });
  assert.equal(
    execFileSync(process.execPath, [script, "--schema"], {
      encoding: "utf8",
    }).trim(),
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_INTERVAL_SIGN_ENCLOSURE_TARGET_ATLAS_SCHEMA
  );
});
