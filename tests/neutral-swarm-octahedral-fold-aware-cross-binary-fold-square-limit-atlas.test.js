import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FOLD_SQUARE_LIMIT_ATLAS_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas,
  validateOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-fold-square-limit-atlas.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas({
      sourceQuadraturePanelsPerSegment: 96,
      sourceAtlasSampleCount: 64,
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

function rowByKey(atlas) {
  return Object.fromEntries(
    atlas.fold_square_limit_rows.map((row) => [
      `${row.fold_candidate_id}:${row.side}`,
      row,
    ])
  );
}

test("fold-aware fold square limit atlas validates source packets", () => {
  const atlas = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas(atlas),
    []
  );
  assert.equal(
    atlas.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FOLD_SQUARE_LIMIT_ATLAS_SCHEMA
  );
  assert.equal(
    atlas.packet_id,
    "octahedral_fold_aware_cross_binary_fold_square_limit_atlas"
  );
  assert.equal(atlas.promotion_status, "priority-only");
  assert.equal(atlas.source_atlas_check.valid, true);
  assert.equal(
    atlas.source_atlas_check.theory_status,
    "cross-binary-quarter-source-fold-atlas-certified"
  );
  assert.equal(atlas.source_critical_value_atlas_check.valid, true);
  assert.equal(
    atlas.source_critical_value_atlas_check.theory_status,
    "sampled-source-atlas-aware-critical-value-atlas-certified"
  );
});

test("fold-aware fold square limit atlas imposes no speed window", () => {
  const atlas = artifact();

  assert.equal(
    atlas.square_limit_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.deepEqual(atlas.square_limit_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(atlas.square_limit_parameters.speed_ratio_estimate, 3.021564740248);
  assert.equal(atlas.artifact_claim.assumes_fixed_speed_window, false);
});

test("fold-aware fold square limit atlas states the square normal form", () => {
  const atlas = artifact();
  const rule = atlas.square_coordinate_rule;

  assert.equal(rule.left_fold_substitution, "theta=theta_f-y^2");
  assert.equal(rule.right_fold_substitution, "theta=theta_f+y^2");
  assert.equal(rule.transformed_integrand, "g_side(y)=2y f_cross(theta_f +/- y^2)");
  assert.match(rule.fold_normal_form, /alpha=-2F_theta\/F_delta_delta/);
  assert.match(rule.folded_side_limit_formula, /8 sigma B_f/);
  assert.equal(rule.status, "fold-square-coordinate-regularization-stated");
});

test("fold-aware fold square limit atlas classifies the four one-sided fold rows", () => {
  const atlas = artifact();
  const rows = rowByKey(atlas);

  assert.deepEqual(Object.keys(rows), [
    "fold.3-:left",
    "fold.3-:right",
    "fold.2+:left",
    "fold.2+:right",
  ]);
  assert.equal(rows["fold.3-:left"].side_kind, "singular-integrable-side");
  assert.equal(
    rows["fold.3-:right"].side_kind,
    "regular-side-with-zero-square-limit"
  );
  assert.equal(
    rows["fold.2+:left"].side_kind,
    "regular-side-with-zero-square-limit"
  );
  assert.equal(rows["fold.2+:right"].side_kind, "singular-integrable-side");
  assert.equal(rows["fold.3-:left"].fold_normal_form.folded_side, "left");
  assert.equal(rows["fold.2+:right"].fold_normal_form.folded_side, "right");
});

test("fold-aware fold square limit atlas computes analytic and sampled limits", () => {
  const atlas = artifact();
  const rows = rowByKey(atlas);

  near(rows["fold.3-:left"].analytic_square_limit, -0.192715477558);
  near(rows["fold.3-:left"].square_limit_estimate, -0.192627413708);
  assert.ok(rows["fold.3-:left"].analytic_comparison_abs < 0.001);
  near(rows["fold.3-:right"].analytic_square_limit, 0);
  assert.ok(Math.abs(rows["fold.3-:right"].square_limit_estimate) < 0.001);
  near(rows["fold.2+:left"].analytic_square_limit, 0);
  assert.ok(Math.abs(rows["fold.2+:left"].square_limit_estimate) < 0.001);
  near(rows["fold.2+:right"].analytic_square_limit, -0.325542989718);
  near(rows["fold.2+:right"].square_limit_estimate, -0.325659851585);
  assert.ok(rows["fold.2+:right"].analytic_comparison_abs < 0.001);
});

test("fold-aware fold square limit atlas summarizes the regularized fold sides", () => {
  const atlas = artifact();
  const summary = atlas.fold_square_limit_summary;

  assert.equal(summary.fold_endpoint_count, 2);
  assert.equal(summary.one_sided_row_count, 4);
  assert.equal(summary.singular_integrable_side_count, 2);
  assert.equal(summary.regular_zero_square_limit_side_count, 2);
  assert.deepEqual(summary.singular_integrable_sides, [
    "fold.3-:left",
    "fold.2+:right",
  ]);
  assert.deepEqual(summary.regular_zero_square_limit_sides, [
    "fold.3-:right",
    "fold.2+:left",
  ]);
  assert.equal(summary.status, "sampled-fold-square-limit-regularization-derived");
});

test("fold-aware fold square limit atlas keeps interval and retention boundaries open", () => {
  const atlas = artifact();

  assert.equal(
    atlas.artifact_claim.certifies_source_atlas_aware_fold_side_assignment,
    true
  );
  assert.equal(atlas.artifact_claim.certifies_square_coordinate_endpoint_model, true);
  assert.equal(atlas.artifact_claim.certifies_sampled_fold_square_limit_atlas, true);
  assert.equal(
    atlas.artifact_claim.certifies_sampled_one_sided_fold_square_limits,
    true
  );
  assert.equal(
    atlas.artifact_claim.certifies_sampled_finite_transformed_integrand_limits,
    true
  );
  assert.equal(atlas.artifact_claim.certifies_interval_fold_limit_enclosure, false);
  assert.equal(atlas.artifact_claim.certifies_interval_quadrature_enclosure, false);
  assert.equal(atlas.artifact_claim.certifies_C_m_Q_M_Q_interval_enclosure, false);
  assert.equal(atlas.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(atlas.artifact_claim.certifies_cross_binary_coarea_interval_profile, false);
  assert.equal(atlas.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(atlas.result.retention, "not_retained");
  assert.equal(atlas.result.retained_branch, false);
  assert.equal(
    atlas.result.theory_status,
    "sampled-source-atlas-aware-fold-square-limit-atlas-certified"
  );
});

test("fold-aware fold square limit atlas rejects invalid controls", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas({
        ySamples: [0.1, 0.2, 0.01, 0.001],
      }),
    /ySamples/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas({
        sourceAtlasSampleCount: 15,
      }),
    /sourceAtlasSampleCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas({
        rootSubdivisions: 99,
      }),
    /rootSubdivisions/
  );
});

test("fold-aware fold square limit atlas CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "neutral-swarm-fold-square-")
  );
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL(
      "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-fold-square-limit-atlas.mjs",
      import.meta.url
    )
  );

  execFileSync(
    process.execPath,
    [
      scriptPath,
      "--source-atlas-samples",
      "64",
      "--source-quadrature-panels",
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
    validateOctahedralFoldAwareCrossBinaryFoldSquareLimitAtlas(atlas),
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
    "sampled-source-atlas-aware-fold-square-limit-atlas-certified"
  );

  const schema = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" })
  );
  assert.equal(
    schema.artifact_schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FOLD_SQUARE_LIMIT_ATLAS_SCHEMA
  );
});
