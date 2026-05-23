import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_AFFINE_EXPOSURE_PROBE_SCHEMA,
  buildOctahedralAffineExposureProbe,
  validateOctahedralAffineExposureProbe,
} from "../scripts/neutral-swarm/octahedral-affine-exposure-probe.mjs";

const EXPECTED_ZETA_DELTA_Z = -0.000680152657812;

function findColumn(artifact, id) {
  return artifact.affine_decomposition.columns.find((column) => column.id === id);
}

test("octahedral affine exposure probe emits the fixed-ledger matrix", () => {
  const artifact = buildOctahedralAffineExposureProbe({ phaseSamples: 37, ySubdivisions: 240 });
  const errors = validateOctahedralAffineExposureProbe(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, OCTAHEDRAL_AFFINE_EXPOSURE_PROBE_SCHEMA);
  assert.equal(artifact.packet_id, "octahedral_affine_exposure_probe");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.numerical_method.ordered_pair_count, 30);
  assert.equal(artifact.numerical_method.expected_row_count, 1110);
  assert.equal(artifact.numerical_method.resolved_row_count, 1110);
  assert.equal(artifact.numerical_method.failed_node_count, 0);
  assert.equal(artifact.affine_decomposition.columns.length, 9);
  assert.equal(
    artifact.affine_decomposition.columns.filter((column) => column.kind === "symmetric-trace-free").length,
    5
  );
  assert.equal(
    artifact.affine_decomposition.columns.filter((column) => column.kind === "rotation-gauge-covariant").length,
    3
  );
  assert.equal(artifact.result.theory_status, "octahedral-affine-exposure-probe-matrix-closed");
  assert.equal(artifact.result.retention, "not_retained");
});

test("octahedral affine trace column reproduces the axial zeta coefficient", () => {
  const artifact = buildOctahedralAffineExposureProbe({ phaseSamples: 37, ySubdivisions: 240 });
  const traceColumn = findColumn(artifact, "trace_I");
  const zeta = artifact.affine_decomposition.trace_column_summary.zeta_delta_Z_estimate;

  assert.ok(Math.abs(zeta - EXPECTED_ZETA_DELTA_Z) < 1e-10);
  assert.ok(Math.abs(traceColumn.matrix[0][0]) < 1e-12);
  assert.ok(Math.abs(traceColumn.matrix[1][1]) < 1e-12);
  assert.ok(Math.abs(traceColumn.matrix[2][2]) < 1e-12);
  assert.ok(Math.abs(traceColumn.matrix[0][1] - EXPECTED_ZETA_DELTA_Z / 3) < 1e-10);
  assert.ok(Math.abs(traceColumn.matrix[0][2] - EXPECTED_ZETA_DELTA_Z / 3) < 1e-10);
  assert.ok(Math.abs(traceColumn.matrix[1][2] - EXPECTED_ZETA_DELTA_Z / 3) < 1e-10);
});

test("octahedral affine exposure probe CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-swarm-affine-exposure-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-swarm/octahedral-affine-exposure-probe.mjs", import.meta.url)
  );

  execFileSync(
    process.execPath,
    [scriptPath, "--samples", "37", "--subdivisions", "240", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralAffineExposureProbe(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.phase_sample_count, 37);
  assert.equal(validation.result.theory_status, "octahedral-affine-exposure-probe-matrix-closed");
  assert.equal(validation.result.retention, "not_retained");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_AFFINE_EXPOSURE_PROBE_SCHEMA);
});
