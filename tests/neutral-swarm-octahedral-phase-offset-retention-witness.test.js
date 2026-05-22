import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_PHASE_OFFSET_RETENTION_WITNESS_SCHEMA,
  buildOctahedralPhaseOffsetRetentionWitness,
  validateOctahedralPhaseOffsetRetentionWitness,
} from "../scripts/neutral-swarm/octahedral-phase-offset-retention-witness.mjs";

const CLOSURE_STATUS = "closed-rejected:sampled-phase-offset-improvement-implies-retention";

test("octahedral phase-offset retention witness rejects the sampled-improvement overread", () => {
  const artifact = buildOctahedralPhaseOffsetRetentionWitness({
    grid: 5,
    phaseSamples: 17,
    ySubdivisions: 100,
    top: 4,
  });
  const errors = validateOctahedralPhaseOffsetRetentionWitness(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, "neutral-swarm-octahedral-phase-offset-retention-witness/v1");
  assert.equal(artifact.packet_id, "octahedral_phase_offset_retention_witness");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.deepEqual(artifact.options, {
    grid: 5,
    samples: 17,
    subdivisions: 100,
    top: 4,
  });
  assert.ok(artifact.deterministic_scan.zero_offset);
  assert.ok(artifact.deterministic_scan.best);
  assert.ok(Number.isFinite(artifact.deterministic_scan.rms_improvement_over_zero_offset));
  assert.ok(artifact.deterministic_scan.rms_improvement_over_zero_offset >= 0);
  assert.equal(artifact.deterministic_scan.best.retention, "not_retained");
  assert.ok(Number.isFinite(artifact.deterministic_scan.best.max_abs_tangential_residual));
  assert.ok(artifact.deterministic_scan.best.max_abs_tangential_residual > 0);
  assert.equal(artifact.result.closure_status, CLOSURE_STATUS);
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.best_row_retention, "not_retained");
});

test("octahedral phase-offset retention witness CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-swarm-phase-retention-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-swarm/octahedral-phase-offset-retention-witness.mjs", import.meta.url)
  );

  execFileSync(
    process.execPath,
    [scriptPath, "--grid", "5", "--samples", "17", "--subdivisions", "100", "--top", "4", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralPhaseOffsetRetentionWitness(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.deepEqual(validation.options, {
    grid: 5,
    samples: 17,
    subdivisions: 100,
    top: 4,
  });
  assert.equal(validation.closure_status, CLOSURE_STATUS);
  assert.equal(validation.retention, "not_retained");
  assert.equal(validation.best.retention, "not_retained");
  assert.ok(Number.isFinite(validation.best.max_abs_tangential_residual));
  assert.ok(validation.best.max_abs_tangential_residual > 0);
  assert.ok(Number.isFinite(validation.rms_improvement_over_zero_offset));
  assert.ok(validation.rms_improvement_over_zero_offset >= 0);

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_PHASE_OFFSET_RETENTION_WITNESS_SCHEMA);
  assert.equal(schema.closure_status, CLOSURE_STATUS);
});
