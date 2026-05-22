import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_PHASE_OFFSET_SCAN_SCHEMA,
  buildOctahedralPhaseOffsetScan,
  validateOctahedralPhaseOffsetScan,
} from "../scripts/neutral-swarm/octahedral-phase-offset-scan.mjs";

test("octahedral phase-offset scan emits a ranked sampled rigid-phase family", () => {
  const artifact = buildOctahedralPhaseOffsetScan({ grid: 5, phaseSamples: 17, ySubdivisions: 100, top: 4 });
  const errors = validateOctahedralPhaseOffsetScan(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, "neutral-swarm-octahedral-phase-offset-scan/v1");
  assert.equal(artifact.packet_id, "octahedral_phase_offset_scan");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.numerical_method.candidates_evaluated, 25);
  assert.equal(artifact.scan_summary.best_rows.length, 4);
  assert.ok(Number.isFinite(artifact.scan_summary.best.rms_tangential_residual));
  assert.ok(Number.isFinite(artifact.scan_summary.best.max_abs_tangential_residual));
  assert.equal(artifact.scan_summary.best.retention, "not_retained");
  assert.equal(artifact.result.phase_offset_scan, "sampled_completed");
  assert.equal(artifact.result.rigid_phase_family_status, "not_retained");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.master_first_failure_status, "support-complete-root-ledger-open");
});

test("octahedral phase-offset scan CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-swarm-phase-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(new URL("../scripts/neutral-swarm/octahedral-phase-offset-scan.mjs", import.meta.url));

  execFileSync(
    process.execPath,
    [scriptPath, "--grid", "5", "--samples", "17", "--subdivisions", "100", "--top", "4", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralPhaseOffsetScan(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.grid, 5);
  assert.equal(validation.candidates_evaluated, 25);
  assert.equal(validation.result.phase_offset_scan, "sampled_completed");
  assert.equal(validation.result.retention, "not_retained");
  assert.ok(Number.isFinite(validation.best.rms_tangential_residual));

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_PHASE_OFFSET_SCAN_SCHEMA);
});
