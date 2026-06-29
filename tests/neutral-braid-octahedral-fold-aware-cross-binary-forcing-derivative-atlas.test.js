import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_DERIVATIVE_ATLAS_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas,
  validateOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas({
      samplesPerCell: 8,
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

function rowByCandidate(atlas) {
  return Object.fromEntries(
    atlas.regular_critical_derivative_rows.map((row) => [
      row.candidate_id,
      row,
    ])
  );
}

test("fold-aware forcing derivative atlas validates source packets", () => {
  const atlas = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas(atlas),
    []
  );
  assert.equal(
    atlas.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_DERIVATIVE_ATLAS_SCHEMA
  );
  assert.equal(
    atlas.packet_id,
    "octahedral_fold_aware_cross_binary_forcing_derivative_atlas"
  );
  assert.equal(atlas.promotion_status, "priority-only");
  assert.equal(atlas.source_critical_value_atlas_check.valid, true);
  assert.equal(
    atlas.source_critical_value_atlas_check.theory_status,
    "sampled-source-atlas-aware-critical-value-atlas-certified"
  );
  assert.equal(atlas.source_fold_square_limit_atlas_check.valid, true);
  assert.equal(
    atlas.source_fold_square_limit_atlas_check.theory_status,
    "sampled-source-atlas-aware-fold-square-limit-atlas-certified"
  );
});

test("fold-aware forcing derivative atlas imposes no speed window", () => {
  const atlas = artifact();

  assert.equal(
    atlas.derivative_parameters.speed_constraint,
    "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only"
  );
  assert.deepEqual(atlas.derivative_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(atlas.derivative_parameters.speed_ratio_estimate, 3.021564740248);
  assert.equal(atlas.artifact_claim.assumes_fixed_speed_window, false);
});

test("fold-aware forcing derivative atlas states the implicit derivative formula", () => {
  const atlas = artifact();
  const formula = atlas.source_derivative_equation;

  assert.match(formula.root_equation, /F_\{kappa,v\}/);
  assert.match(formula.root_derivative, /-2 cos\(phi\)\/F_delta/);
  assert.match(formula.source_scalar, /delta\^2 \|F_delta\|/);
  assert.match(formula.source_derivative, /implicit root branch/);
  assert.match(formula.cross_binary_derivative, /f'_cross/);
  assert.equal(
    formula.status,
    "source-atlas-aware-implicit-derivative-formula-stated"
  );
});

test("fold-aware forcing derivative atlas matches the witness on regular samples", () => {
  const atlas = artifact();
  const summary = atlas.derivative_summary;

  assert.equal(summary.sampled_regular_interior_node_count, 24);
  assert.equal(summary.regular_critical_count, 2);
  assert.ok(Number(summary.max_formula_witness_abs) < 1e-10);
  assert.ok(
    Number(summary.max_derivative_finite_difference_residual_abs) < 1e-5
  );
  assert.deepEqual(
    [...new Set(atlas.formula_comparison_rows.map((row) => row.cell_id))],
    ["I1", "I2", "I3"]
  );
  assert.ok(
    atlas.formula_comparison_rows.every(
      (row) => row.source_formula_root_count === row.expected_source_root_count
    )
  );
});

test("fold-aware forcing derivative atlas classifies regular critical roots as nondegenerate", () => {
  const atlas = artifact();
  const rows = rowByCandidate(atlas);

  near(rows["I1.z1"].theta, 0.129625153956);
  near(rows["I1.z1"].formula_derivative, -0.090309125625);
  near(rows["I1.z1"].finite_difference_derivative, -0.090309127618, 1e-8);
  assert.equal(rows["I1.z1"].derivative_sign, "-");
  assert.equal(rows["I1.z1"].nondegenerate_regular_zero, true);
  assert.equal(
    rows["I1.z1"].primitive_extremum_class,
    "nondegenerate-local-maximum-of-A"
  );

  near(rows["I2.z1"].theta, 1.13343146457);
  near(rows["I2.z1"].formula_derivative, -4.176455139963);
  near(rows["I2.z1"].finite_difference_derivative, -4.176454792812, 1e-6);
  assert.equal(rows["I2.z1"].derivative_sign, "-");
  assert.equal(rows["I2.z1"].nondegenerate_regular_zero, true);
  assert.equal(
    rows["I2.z1"].primitive_extremum_class,
    "nondegenerate-local-maximum-of-A"
  );
  assert.equal(
    atlas.derivative_summary.regular_critical_nondegeneracy_status,
    "sampled-regular-critical-nondegeneracy-derived"
  );
});

test("fold-aware forcing derivative atlas keeps interval and retention boundaries open", () => {
  const atlas = artifact();

  assert.equal(
    atlas.artifact_claim.certifies_source_atlas_aware_derivative_formula,
    true
  );
  assert.equal(
    atlas.artifact_claim.certifies_formula_witness_agreement_on_regular_samples,
    true
  );
  assert.equal(
    atlas.artifact_claim.certifies_sampled_regular_critical_nondegeneracy,
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
    "sampled-source-atlas-aware-forcing-derivative-atlas-certified"
  );
});

test("fold-aware forcing derivative atlas rejects invalid controls", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas({
        samplesPerCell: 3,
      }),
    /samplesPerCell/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas({
        finiteDifferenceStep: 0,
      }),
    /finiteDifferenceStep/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas({
        sourceQuadraturePanelsPerSegment: 31,
      }),
    /sourceQuadraturePanelsPerSegment/
  );
});

test("fold-aware forcing derivative atlas CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "neutral-braid-forcing-derivative-")
  );
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL(
      "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs",
      import.meta.url
    )
  );

  execFileSync(
    process.execPath,
    [
      scriptPath,
      "--samples-per-cell",
      "4",
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
    validateOctahedralFoldAwareCrossBinaryForcingDerivativeAtlas(atlas),
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
    "sampled-source-atlas-aware-forcing-derivative-atlas-certified"
  );

  const schema = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" })
  );
  assert.equal(
    schema.artifact_schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_DERIVATIVE_ATLAS_SCHEMA
  );
});
