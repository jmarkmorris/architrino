import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_QUARTER_CELL_REDUCTION_SCHEMA,
  buildOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction,
  validateOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction({
        rootSubdivisions: 5000,
      });
  }
  return cachedArtifact;
}

test("source-atlas quarter-cell reduction validates predecessors", () => {
  const reduction = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction(
      reduction
    ),
    []
  );
  assert.equal(
    reduction.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_QUARTER_CELL_REDUCTION_SCHEMA
  );
  assert.equal(
    reduction.packet_id,
    "octahedral_fold_aware_cross_binary_source_atlas_quarter_cell_reduction"
  );
  assert.equal(reduction.promotion_status, "priority-only");
  assert.equal(reduction.source_atlas_check.valid, true);
  assert.equal(
    reduction.source_atlas_check.theory_status,
    "cross-binary-quarter-source-fold-atlas-certified"
  );
  assert.equal(reduction.sampled_quarter_profile_check.valid, true);
  assert.equal(
    reduction.sampled_quarter_profile_check.theory_status,
    "sampled-cross-binary-quarter-profile-positive-clock-check"
  );
});

test("source-atlas quarter-cell reduction imposes no speed window", () => {
  const reduction = artifact();

  assert.equal(
    reduction.reduction_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.deepEqual(reduction.reduction_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(reduction.reduction_parameters.speed_ratio_estimate, 3.021564740248);
  assert.match(
    reduction.sampled_quarter_profile_check.quadrature_convention,
    /not an interval enclosure/
  );
  assert.equal(reduction.artifact_claim.assumes_fixed_speed_window, false);
});

test("source-atlas quarter-cell reduction certifies fold ordering", () => {
  const reduction = artifact();
  const ordering = reduction.quarter_cell_partition.fold_ordering;

  assert.equal(ordering.ordering_certified, true);
  assert.equal(ordering.ordering_statement, "0 < theta_3minus_fold < theta_2plus_fold < H/4");
  assert.ok(ordering.theta_3minus_fold > 0);
  assert.ok(ordering.theta_3minus_fold < ordering.theta_2plus_fold);
  assert.ok(ordering.theta_2plus_fold < ordering.quarter_endpoint);
  assert.equal(ordering.theta_3minus_fold, 0.997370655243);
  assert.equal(ordering.theta_2plus_fold, 1.159039827771);
});

test("source-atlas quarter-cell reduction emits the source-atlas-aware formula targets", () => {
  const reduction = artifact();
  const formula = reduction.source_atlas_aware_formula_reduction;

  assert.equal(
    formula.status,
    "source-atlas-aware-quarter-profile-formula-reduction-certified"
  );
  assert.match(formula.root_equation, /F_\{kappa,v\}/);
  assert.match(formula.jacobian_identity, /J/);
  assert.match(formula.quarter_forcing_formula, /f_cross/);
  assert.ok(formula.interval_targets.includes("C_cross=int_0^Q f_cross(q)dq"));
  assert.ok(formula.interval_targets.includes("m_Q=min_{0<=u<=Q} A(u)"));
  assert.ok(formula.interval_targets.includes("M_Q=max_{0<=u<=Q} A(u)"));
  assert.equal(formula.certifies_formula_targets_not_intervals, true);
});

test("source-atlas quarter-cell reduction partitions the quarter into three cells", () => {
  const reduction = artifact();
  const cells = reduction.quarter_cell_partition.unified_quarter_cells;

  assert.equal(cells.length, 3);
  assert.deepEqual(
    cells.map((cell) => cell.expected_cross_root_count),
    [6, 4, 6]
  );
  assert.deepEqual(cells[0].expected_source_root_counts, {
    "2+": 1,
    "2-": 1,
    "3+": 1,
    "3-": 3,
  });
  assert.deepEqual(cells[1].expected_source_root_counts, {
    "2+": 1,
    "2-": 1,
    "3+": 1,
    "3-": 1,
  });
  assert.deepEqual(cells[2].expected_source_root_counts, {
    "2+": 3,
    "2-": 1,
    "3+": 1,
    "3-": 1,
  });
});

test("source-atlas quarter-cell reduction midpoint checks match source root counts", () => {
  const reduction = artifact();
  const midpoint = reduction.midpoint_checks;

  assert.equal(midpoint.status, "quarter-cell-midpoint-checks-passed");
  assert.equal(midpoint.max_source_root_count_mismatch, 0);
  assert.equal(midpoint.max_cross_root_count_mismatch, 0);
  assert.ok(midpoint.min_midpoint_jacobian_abs > 0);
  for (const row of midpoint.rows) {
    assert.equal(row.status, "quarter-cell-midpoint-check-passed");
    assert.deepEqual(
      row.observed_source_root_counts,
      row.expected_source_root_counts
    );
    assert.equal(row.observed_cross_root_count, row.expected_cross_root_count);
  }
});

test("source-atlas quarter-cell reduction preserves sampled reference payload", () => {
  const reduction = artifact();
  const payload =
    reduction.sampled_quarter_profile_check.sampled_reference_payload;

  assert.equal(payload.C_cross_sampled, -0.25358674815);
  assert.equal(payload.m_Q_sampled, -0.25358674815);
  assert.equal(payload.M_Q_sampled, 0.002551918775);
  assert.equal(payload.D_cross_sampled, 0.129345292849);
  assert.equal(payload.centered_speed_minimum_sampled, 2.892219447399);
  assert.equal(payload.centered_speed_maximum_sampled, 3.150910033097);
});

test("source-atlas quarter-cell reduction keeps interval and retention boundaries open", () => {
  const reduction = artifact();

  assert.equal(
    reduction.artifact_claim.certifies_source_atlas_quarter_cell_reduction,
    true
  );
  assert.equal(
    reduction.artifact_claim
      .certifies_source_atlas_aware_quarter_profile_formula_reduction,
    true
  );
  assert.equal(
    reduction.artifact_claim.certifies_source_atlas_aware_C_m_Q_M_Q_targets,
    true
  );
  assert.equal(
    reduction.artifact_claim.certifies_C_m_Q_M_Q_interval_enclosure,
    false
  );
  assert.equal(
    reduction.artifact_claim.certifies_cross_binary_coarea_interval_profile,
    false
  );
  assert.equal(
    reduction.artifact_claim.certifies_clock_length_positive_profile_from_interval_bounds,
    false
  );
  assert.equal(reduction.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(reduction.result.retention, "not_retained");
  assert.equal(reduction.result.retained_branch, false);
  assert.equal(
    reduction.result.theory_status,
    "source-atlas-aware-cross-binary-quarter-profile-formula-quarter-cell-reduction-certified"
  );
});

test("source-atlas quarter-cell reduction CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "neutral-swarm-source-atlas-cell-")
  );
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL(
      "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction.mjs",
      import.meta.url
    )
  );

  execFileSync(
    process.execPath,
    [scriptPath, "--subdivisions", "5000", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const reduction = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinarySourceAtlasQuarterCellReduction(
      reduction
    ),
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
    "source-atlas-aware-cross-binary-quarter-profile-formula-quarter-cell-reduction-certified"
  );

  const schema = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" })
  );
  assert.equal(
    schema.artifact_schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_SOURCE_ATLAS_QUARTER_CELL_REDUCTION_SCHEMA
  );
});
