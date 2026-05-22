import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FORCE_RESIDUAL_SCHEMA,
  buildOctahedralForceResidual,
  validateOctahedralForceResidual,
} from "../scripts/neutral-swarm/octahedral-force-residual.mjs";

test("octahedral force residual rejects the rigid zero-offset fixed-speed row", () => {
  const artifact = buildOctahedralForceResidual({ phaseSamples: 37, ySubdivisions: 240 });
  const errors = validateOctahedralForceResidual(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, "neutral-swarm-octahedral-force-residual/v1");
  assert.equal(artifact.packet_id, "octahedral_force_residual_diagnostic");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.site_inventory.sites.length, 6);
  assert.equal(artifact.branch_scope.pair_policy.cardinality, 30);
  assert.equal(artifact.sampled_root_dependency.status, "certified-root-ledger-dependency-passed");
  assert.equal(artifact.sampled_root_dependency.failed_root_node_count, 0);
  assert.equal(artifact.force_residual.status, "sampled-tangential-residual-failed");
  assert.ok(artifact.force_residual.sampled_summary.max_abs_tangential_residual > 2);
  assert.ok(artifact.force_residual.sampled_summary.rms_tangential_residual > 1);
  assert.equal(artifact.result.force_residual_diagnostic, "sampled_failed");
  assert.equal(artifact.result.rigid_carrier_status, "rejected_by_sampled_tangential_residual");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.master_first_failure_status, "closed-rejected:rigid-octahedral-fixed-speed-neutral-row");
});

test("octahedral force-residual CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-swarm-force-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(new URL("../scripts/neutral-swarm/octahedral-force-residual.mjs", import.meta.url));

  execFileSync(
    process.execPath,
    [scriptPath, "--samples", "37", "--subdivisions", "240", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralForceResidual(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.phase_sample_count, 37);
  assert.equal(validation.result.force_residual_diagnostic, "sampled_failed");
  assert.equal(validation.result.retention, "not_retained");
  assert.ok(validation.summary.max_abs_tangential_residual > 2);

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_FORCE_RESIDUAL_SCHEMA);
});
