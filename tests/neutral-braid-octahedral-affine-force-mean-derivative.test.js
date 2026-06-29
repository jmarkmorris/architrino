import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_AFFINE_FORCE_MEAN_DERIVATIVE_SCHEMA,
  buildOctahedralAffineForceMeanDerivative,
  validateOctahedralAffineForceMeanDerivative,
} from "../scripts/neutral-braid/octahedral-affine-force-mean-derivative.mjs";

function buildTestArtifact() {
  return buildOctahedralAffineForceMeanDerivative({
    phaseSamples: 37,
    ySubdivisions: 240,
    finiteDifferenceEpsilon: 1e-5,
  });
}

test("octahedral affine force-mean derivative emits a six-by-nine matrix", () => {
  const artifact = buildTestArtifact();

  assert.deepEqual(validateOctahedralAffineForceMeanDerivative(artifact), []);
  assert.equal(artifact.schema, OCTAHEDRAL_AFFINE_FORCE_MEAN_DERIVATIVE_SCHEMA);
  assert.equal(artifact.packet_id, "octahedral_affine_force_mean_derivative");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.receiver_labels.length, 6);
  assert.equal(artifact.affine_columns.length, 9);
  assert.equal(artifact.affine_derivative_matrix.length, 6);
  assert.ok(artifact.affine_derivative_matrix.every((row) => row.length === 9));
  assert.equal(artifact.root_failure_count.base, 0);
  assert.equal(artifact.root_failure_count.finite_difference_total, 0);
});

test("trace affine column removes the frozen zero-mean range obstruction", () => {
  const artifact = buildTestArtifact();
  const trace = artifact.trace_direction_certificate;

  assert.equal(artifact.range_certificate.rank, 3);
  assert.equal(artifact.range_certificate.range_status, "rhs-in-range");
  assert.equal(artifact.range_certificate.solve_status, "independent-column-solve-computed");
  assert.ok(artifact.range_certificate.solution_residual_norm_2 <= 1e-8);
  assert.equal(trace.column_id, "trace_I");
  assert.ok(Math.abs(trace.alpha + 3.454064295549) <= 1e-9);
  assert.ok(trace.residual_norm_2 <= 1e-8);
  assert.equal(artifact.result.candidate_correction_direction, "candidate-affine-trace-direction-found");
  assert.equal(artifact.result.theory_status, "candidate-affine-zero-mean-range-obstruction-removed");
});

test("affine force-mean derivative preserves the not-retained claim level", () => {
  const artifact = buildTestArtifact();

  assert.equal(artifact.result.certifies_live_derivative_matrix, false);
  assert.equal(artifact.result.certifies_live_correction_direction, false);
  assert.equal(artifact.result.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.first_failure_status, "live-ledger-derivative-open");
});

test("octahedral affine force-mean derivative CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-affine-force-mean-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-affine-force-mean-derivative.mjs", import.meta.url)
  );

  execFileSync(
    process.execPath,
    [scriptPath, "--samples", "37", "--subdivisions", "240", "--fd-epsilon", "1e-5", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralAffineForceMeanDerivative(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.phase_sample_count, 37);
  assert.equal(validation.result.retention, "not_retained");
  assert.equal(validation.range_certificate.range_status, "rhs-in-range");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_AFFINE_FORCE_MEAN_DERIVATIVE_SCHEMA);
});
