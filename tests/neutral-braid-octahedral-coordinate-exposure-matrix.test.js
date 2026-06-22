import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_COORDINATE_EXPOSURE_MATRIX_SCHEMA,
  buildOctahedralCoordinateExposureMatrix,
  validateOctahedralCoordinateExposureMatrix,
} from "../scripts/neutral-braid/octahedral-coordinate-exposure-matrix.mjs";

function buildTestArtifact() {
  return buildOctahedralCoordinateExposureMatrix({
    phaseSamples: 37,
    ySubdivisions: 240,
    finiteDifferenceEpsilon: 1e-5,
  });
}

test("octahedral coordinate exposure matrix emits all affine branch-coordinate columns", () => {
  const artifact = buildTestArtifact();
  const errors = validateOctahedralCoordinateExposureMatrix(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, OCTAHEDRAL_COORDINATE_EXPOSURE_MATRIX_SCHEMA);
  assert.equal(artifact.packet_id, "octahedral_coordinate_exposure_matrix");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.numerical_method.ordered_pair_count, 30);
  assert.equal(artifact.numerical_method.expected_row_count, 1110);
  assert.equal(artifact.numerical_method.resolved_row_count, 1110);
  assert.equal(artifact.numerical_method.failed_node_count, 0);
  assert.equal(artifact.coordinate_decomposition.columns.length, 9);
  assert.equal(
    artifact.coordinate_decomposition.columns.filter((column) => column.kind === "symmetric-trace-free").length,
    5
  );
  assert.equal(
    artifact.coordinate_decomposition.columns.filter((column) => column.kind === "rotation-gauge-covariant").length,
    3
  );
  assert.equal(artifact.result.theory_status, "octahedral-coordinate-exposure-matrix-closed-for-rigid-affine-chart");
  assert.equal(artifact.result.retention, "not_retained");
});

test("octahedral coordinate exposure matrix matches central finite differences", () => {
  const artifact = buildTestArtifact();

  assert.equal(artifact.coordinate_decomposition.finite_difference_checks.length, 9);
  for (const check of artifact.coordinate_decomposition.finite_difference_checks) {
    assert.equal(check.failed_node_count, 0);
    assert.equal(check.resolved_row_count, check.expected_row_count);
    assert.ok(check.max_abs_error <= 1e-8);
    assert.ok(check.frobenius_error <= 3e-8);
  }
  assert.equal(artifact.result.finite_difference_validation, "passed");
});

test("octahedral coordinate exposure matrix differs from fixed-ledger trace probe", () => {
  const artifact = buildTestArtifact();
  const traceColumn = artifact.coordinate_decomposition.columns.find((column) => column.id === "trace_I");

  assert.ok(traceColumn.matrix[0][1] > 0.04);
  assert.ok(traceColumn.delta_jacobian_max_abs > 0.9);
  assert.equal(artifact.result.first_failure_status, "rigid-octahedral-force-action-event-retention-rejected");
});

test("octahedral coordinate exposure matrix CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-coordinate-exposure-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-coordinate-exposure-matrix.mjs", import.meta.url)
  );

  execFileSync(
    process.execPath,
    [scriptPath, "--samples", "37", "--subdivisions", "240", "--fd-epsilon", "1e-5", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralCoordinateExposureMatrix(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.phase_sample_count, 37);
  assert.equal(validation.result.finite_difference_validation, "passed");
  assert.equal(validation.result.retention, "not_retained");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_COORDINATE_EXPOSURE_MATRIX_SCHEMA);
});
