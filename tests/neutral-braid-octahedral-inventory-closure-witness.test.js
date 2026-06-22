import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_INVENTORY_CLOSURE_WITNESS_SCHEMA,
  buildOctahedralInventoryClosureWitness,
  validateOctahedralInventoryClosureWitness,
} from "../scripts/neutral-braid/octahedral-inventory-closure-witness.mjs";

test("octahedral inventory closure witness rejects inventory bias as sufficient fixed-speed closure", () => {
  const artifact = buildOctahedralInventoryClosureWitness({ ySubdivisions: 720 });
  const errors = validateOctahedralInventoryClosureWitness(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, "neutral-braid-octahedral-inventory-closure-witness/v1");
  assert.equal(artifact.packet_id, "octahedral_inventory_closure_witness");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.branch_scope.pair_policy.cardinality, 30);
  assert.equal(artifact.result.closure_status, "closed-rejected:inventory-bias-implies-force-closure");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);

  assert.equal(artifact.site_inventory.row_count, 6);
  assert.equal(artifact.site_inventory.all_rows_neutral_3_attr_2_rep, true);
  assert.equal(new Set(artifact.site_inventory.rows.map((row) => row.receiver)).size, 6);
  for (const row of artifact.site_inventory.rows) {
    assert.equal(row.source_site_count, 5);
    assert.equal(row.N_attr, 3);
    assert.equal(row.N_rep, 2);
    assert.equal(row.inventory_bias, 1);
    assert.equal(row.inventory_pattern, "3-attractive/2-repulsive");
    assert.equal(row.attractive_sources.length, 3);
    assert.equal(row.repulsive_sources.length, 2);
    assert.equal(row.source_rows.length, 5);
  }

  const residual = artifact.fixed_speed_residual_witness;
  assert.equal(residual.receiver, 1);
  assert.equal(residual.receiver_label, "1+");
  assert.equal(residual.theta, 0);
  assert.equal(residual.witness_node_id, "theta_0_site_1");
  assert.equal(residual.residual_excludes_zero, true);
  assert.ok(residual.residual_interval[0] > 0);
  assert.ok(residual.residual_interval[1] > residual.residual_interval[0]);
  assert.ok(
    residual.residual_interval[0] < residual.tangential_residual &&
      residual.residual_interval[1] > residual.tangential_residual
  );
});

test("octahedral inventory closure witness CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-inventory-closure-witness-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-inventory-closure-witness.mjs", import.meta.url)
  );

  execFileSync(process.execPath, [scriptPath, "--subdivisions", "720", "--out", artifactPath, "--pretty"], {
    encoding: "utf8",
  });

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralInventoryClosureWitness(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.inventory_row_count, 6);
  assert.equal(validation.closure_status, "closed-rejected:inventory-bias-implies-force-closure");
  assert.equal(validation.retention, "not_retained");
  assert.equal(validation.first_rejecting_residual.residual_excludes_zero, true);

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_INVENTORY_CLOSURE_WITNESS_SCHEMA);
});
