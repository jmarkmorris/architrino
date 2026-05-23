import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_PRIMITIVE_CRITICAL_ATLAS_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryPrimitiveCriticalAtlas,
  validateOctahedralFoldAwareCrossBinaryPrimitiveCriticalAtlas,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-primitive-critical-atlas.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareCrossBinaryPrimitiveCriticalAtlas({
      scanSamplesPerCell: 96,
      rootSubdivisions: 5000,
    });
  }
  return cachedArtifact;
}

test("fold-aware primitive critical atlas validates source quarter-cell reduction", () => {
  const atlas = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryPrimitiveCriticalAtlas(atlas),
    []
  );
  assert.equal(
    atlas.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_PRIMITIVE_CRITICAL_ATLAS_SCHEMA
  );
  assert.equal(
    atlas.packet_id,
    "octahedral_fold_aware_cross_binary_primitive_critical_atlas"
  );
  assert.equal(atlas.promotion_status, "priority-only");
  assert.equal(atlas.source_quarter_cell_reduction_check.valid, true);
  assert.equal(
    atlas.source_quarter_cell_reduction_check.theory_status,
    "source-atlas-aware-cross-binary-quarter-profile-formula-quarter-cell-reduction-certified"
  );
  assert.equal(atlas.source_quarter_cell_reduction_check.formula_targets_certified, true);
});

test("fold-aware primitive critical atlas imposes no speed window", () => {
  const atlas = artifact();

  assert.equal(
    atlas.atlas_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.deepEqual(atlas.atlas_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(atlas.atlas_parameters.speed_ratio_estimate, 3.021564740248);
  assert.equal(atlas.artifact_claim.assumes_fixed_speed_window, false);
});

test("fold-aware primitive critical atlas states the primitive critical rule", () => {
  const atlas = artifact();

  assert.equal(
    atlas.primitive_critical_equation.critical_equation,
    "A'(u)=f_cross(u)=0 on regular open cells"
  );
  assert.match(
    atlas.primitive_critical_equation.fold_endpoint_rule,
    /fold endpoint limits/
  );
  assert.equal(
    atlas.primitive_critical_equation.status,
    "primitive-critical-candidate-rule-stated"
  );
});

test("fold-aware primitive critical atlas finds sampled critical counts by cell", () => {
  const atlas = artifact();
  const rows = atlas.cell_critical_rows;

  assert.deepEqual(
    rows.map((row) => row.sampled_critical_count),
    [1, 1, 0]
  );
  assert.equal(rows[0].critical_rows[0].theta, 0.129625153956);
  assert.equal(rows[0].critical_rows[0].sign_transition, "+ to -");
  assert.equal(rows[0].critical_rows[0].primitive_role, "local-maximum-candidate");
  assert.equal(rows[1].critical_rows[0].theta, 1.13343146457);
  assert.equal(rows[1].critical_rows[0].sign_transition, "+ to -");
  assert.equal(rows[1].critical_rows[0].primitive_role, "local-maximum-candidate");
  assert.equal(rows[2].critical_rows.length, 0);
  assert.equal(rows[2].left_probe_sign, "-");
  assert.equal(rows[2].right_probe_sign, "-");
});

test("fold-aware primitive critical atlas classifies fold endpoint turns", () => {
  const atlas = artifact();

  const threeMinus = atlas.fold_turn_rows.find((row) => row.source_label === "3-");
  const twoPlus = atlas.fold_turn_rows.find((row) => row.source_label === "2+");
  assert.equal(threeMinus.theta, 0.997370655243);
  assert.equal(threeMinus.sign_transition, "- to +");
  assert.equal(threeMinus.primitive_role, "fold-local-minimum-candidate");
  assert.equal(twoPlus.theta, 1.159039827771);
  assert.equal(twoPlus.sign_transition, "- to -");
  assert.equal(twoPlus.primitive_role, "fold-endpoint-limit-without-extremum-turn");
});

test("fold-aware primitive critical atlas emits the six-point extrema candidate set", () => {
  const atlas = artifact();
  const candidateSet = atlas.primitive_extrema_candidate_set;

  assert.equal(candidateSet.status, "sampled-primitive-critical-candidate-set-derived");
  assert.equal(candidateSet.candidate_count, 6);
  assert.equal(candidateSet.interior_forcing_zero_count, 2);
  assert.equal(candidateSet.fold_endpoint_candidate_count, 2);
  assert.equal(candidateSet.quarter_endpoint_candidate_count, 2);
  assert.deepEqual(candidateSet.theta_order, [
    0,
    0.129625153956,
    0.997370655243,
    1.13343146457,
    1.159039827771,
    1.570796326795,
  ]);
});

test("fold-aware primitive critical atlas keeps interval and retention boundaries open", () => {
  const atlas = artifact();

  assert.equal(atlas.artifact_claim.certifies_sampled_primitive_critical_atlas, true);
  assert.equal(atlas.artifact_claim.certifies_sampled_interior_critical_counts, true);
  assert.equal(atlas.artifact_claim.certifies_fold_endpoint_turn_classification, true);
  assert.equal(atlas.artifact_claim.certifies_C_m_Q_M_Q_interval_enclosure, false);
  assert.equal(atlas.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(atlas.artifact_claim.certifies_cross_binary_coarea_interval_profile, false);
  assert.equal(atlas.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(atlas.result.retention, "not_retained");
  assert.equal(atlas.result.retained_branch, false);
  assert.equal(
    atlas.result.theory_status,
    "sampled-source-atlas-aware-primitive-critical-atlas-certified"
  );
});

test("fold-aware primitive critical atlas CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "neutral-swarm-critical-atlas-")
  );
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL(
      "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-primitive-critical-atlas.mjs",
      import.meta.url
    )
  );

  execFileSync(
    process.execPath,
    [
      scriptPath,
      "--samples-per-cell",
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
    validateOctahedralFoldAwareCrossBinaryPrimitiveCriticalAtlas(atlas),
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
    "sampled-source-atlas-aware-primitive-critical-atlas-certified"
  );

  const schema = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" })
  );
  assert.equal(
    schema.artifact_schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_PRIMITIVE_CRITICAL_ATLAS_SCHEMA
  );
});
