import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_ROOT_FORCE_CLOSURE_WITNESS_SCHEMA,
  buildOctahedralRootForceClosureWitness,
  validateOctahedralRootForceClosureWitness,
} from "../scripts/neutral-braid/octahedral-root-force-closure-witness.mjs";

const CLOSURE_STATUS = "closed-rejected:resolved-root-rows-imply-fixed-speed-force-closure";

test("octahedral root force closure witness rejects resolved positive root rows as sufficient closure", () => {
  const artifact = buildOctahedralRootForceClosureWitness({ ySubdivisions: 720 });
  const errors = validateOctahedralRootForceClosureWitness(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, "neutral-braid-octahedral-root-force-closure-witness/v1");
  assert.equal(artifact.packet_id, "octahedral_root_force_closure_witness");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.result.closure_status, CLOSURE_STATUS);
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);

  const node = artifact.first_rejecting_node;
  assert.equal(node.node_id, "theta_0_site_1");
  assert.equal(node.receiver, 1);
  assert.equal(node.receiver_label, "1+");
  assert.equal(node.theta, 0);

  const rows = artifact.resolved_root_rows.source_rows;
  assert.equal(artifact.resolved_root_rows.source_row_count, 5);
  assert.equal(rows.length, 5);
  assert.equal(artifact.resolved_root_rows.all_source_rows_root_count_one, true);
  assert.equal(artifact.resolved_root_rows.all_source_roots_positive_delay, true);
  assert.equal(artifact.resolved_root_rows.positive_jacobian_data, true);
  for (const row of rows) {
    assert.equal(row.root_count, 1);
    assert.ok(row.y > 0);
    assert.ok(row.jacobian > 0);
    assert.equal(row.jacobian_positive, true);
  }

  const residualInterval = artifact.residual_witness.interval.residual_interval;
  assert.equal(artifact.residual_witness.interval.residual_excludes_zero, true);
  assert.ok(residualInterval[0] > 0 || residualInterval[1] < 0);
  assert.ok(residualInterval[0] < artifact.residual_witness.tangential_residual);
  assert.ok(residualInterval[1] > artifact.residual_witness.tangential_residual);
});

test("octahedral root force closure witness CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-root-force-closure-witness-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-root-force-closure-witness.mjs", import.meta.url)
  );

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], {
    encoding: "utf8",
  });

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralRootForceClosureWitness(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.source_row_count, 5);
  assert.equal(validation.closure_status, CLOSURE_STATUS);
  assert.equal(validation.retention, "not_retained");
  assert.equal(validation.first_rejecting_node.node_id, "theta_0_site_1");
  assert.ok(validation.residual_interval[0] > 0 || validation.residual_interval[1] < 0);

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_ROOT_FORCE_CLOSURE_WITNESS_SCHEMA);
});
