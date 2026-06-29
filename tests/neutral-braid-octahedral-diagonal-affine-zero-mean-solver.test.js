import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_DIAGONAL_AFFINE_ZERO_MEAN_SOLVER_SCHEMA,
  buildOctahedralDiagonalAffineZeroMeanSolver,
  evaluateDiagonalAffineScale,
  validateOctahedralDiagonalAffineZeroMeanSolver,
} from "../scripts/neutral-braid/octahedral-diagonal-affine-zero-mean-solver.mjs";

let cachedArtifact = null;

function buildTestArtifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralDiagonalAffineZeroMeanSolver({
      phaseSamples: 37,
      ySubdivisions: 240,
      gridValues: [0.8, 1.1, 1.4, 1.7, 2, 2.3],
      zeroMeanTolerance: 1e-8,
    });
  }
  return cachedArtifact;
}

test("diagonal affine solver reproduces the unit fixed-speed mean", () => {
  const unit = evaluateDiagonalAffineScale([1, 1, 1], {
    phaseSamples: 37,
    ySubdivisions: 240,
  });

  assert.equal(unit.root_failure_count, 0);
  assert.ok(unit.receiver_vector.every((entry) => Math.abs(entry - 1.937049763942) <= 1e-11));
  assert.ok(unit.pair_deviation_abs_max <= 1e-12);
  assert.ok(unit.jacobian_abs_min > 0.7);
});

test("diagonal affine solver invalidates the old finite sampled zero-mean trace candidate", () => {
  const artifact = buildTestArtifact();

  assert.deepEqual(validateOctahedralDiagonalAffineZeroMeanSolver(artifact), []);
  assert.equal(artifact.schema, OCTAHEDRAL_DIAGONAL_AFFINE_ZERO_MEAN_SOLVER_SCHEMA);
  assert.equal(artifact.packet_id, "octahedral_diagonal_affine_zero_mean_solver");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.solve_result.status, "sampled-diagonal-zero-mean-not-found");
  assert.equal(artifact.solve_result.candidate_kind, "diagonal-nontrace-or-none");
  assert.deepEqual(artifact.solve_result.best_scales, [0.2, 0.2, 0.2]);
  assert.ok(Math.abs(artifact.solve_result.best_zero_mean_residual_norm_inf - 1.591259663301) <= 1e-9);
  assert.equal(artifact.best_row.root_failure_count, 0);
  assert.ok(artifact.best_row.jacobian_abs_min > 0.8);
  assert.equal(artifact.solve_result.resolution_stability_status, "not-run-no-zero-mean-candidate");
  assert.equal(artifact.solve_result.first_failure_status, "non-diagonal-live-variable-or-speed-support-correction-required");
  assert.equal(artifact.result.theory_status, "sampled-diagonal-affine-zero-mean-not-found");
  assert.equal(artifact.solve_result.declared_speed_window_rows_passed, false);
  assert.ok(Math.abs(artifact.solve_result.primitive_excursion_max - 29.436860981689) <= 1e-9);
  assert.ok(Math.abs(artifact.solve_result.primitive_end_abs_max - 7.956298316504) <= 1e-9);
  assert.equal(artifact.best_row.primitive.receiver_rows.length, 6);
  assert.ok(
    artifact.best_row.primitive.receiver_rows.every(
      (row) =>
        row.sampled_phase_count === 37 &&
        row.expected_phase_count === 37 &&
        row.receiver_root_failure_count === 0 &&
        row.initial_speed_interval_nonempty === false &&
        row.clock_length_initial_speed_in_interval === false
    )
  );
});

test("diagonal affine solver skips fixed-candidate validation without a zero-mean candidate", () => {
  const artifact = buildTestArtifact();

  assert.equal(artifact.fixed_candidate_validation.summary.status, "not-run-no-zero-mean-candidate");
  assert.equal(artifact.fixed_candidate_validation.summary.rerun_count, 0);
  assert.deepEqual(artifact.fixed_candidate_validation.reruns, []);
});

test("diagonal affine solver preserves the not-retained claim level", () => {
  const artifact = buildTestArtifact();

  assert.equal(artifact.artifact_claim.solves_dynamics, false);
  assert.equal(artifact.artifact_claim.certifies_root_ledger, false);
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.artifact_claim.retained_branch, false);
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.certifies_bounded_speed_live_ledger, false);
});

test("diagonal affine solver CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-diagonal-affine-zero-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-diagonal-affine-zero-mean-solver.mjs", import.meta.url)
  );

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralDiagonalAffineZeroMeanSolver(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.result.retention, "not_retained");
  assert.equal(validation.solve_result.status, "sampled-diagonal-zero-mean-not-found");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_DIAGONAL_AFFINE_ZERO_MEAN_SOLVER_SCHEMA);
});
