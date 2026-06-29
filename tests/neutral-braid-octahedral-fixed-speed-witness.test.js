import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FIXED_SPEED_WITNESS_SCHEMA,
  buildOctahedralFixedSpeedWitness,
  validateOctahedralFixedSpeedWitness,
} from "../scripts/neutral-braid/octahedral-fixed-speed-witness.mjs";

function closeTo(actual, expected, tolerance = 1e-9) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected} by more than ${tolerance}`);
}

test("octahedral fixed-speed witness captures the receiver 1+ theta=0 residual", () => {
  const artifact = buildOctahedralFixedSpeedWitness({ ySubdivisions: 720 });
  const errors = validateOctahedralFixedSpeedWitness(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, "neutral-braid-octahedral-fixed-speed-witness/v1");
  assert.equal(artifact.packet_id, "octahedral_fixed_speed_witness");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.branch_scope.pair_policy.cardinality, 30);
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.fixed_speed_witness_diagnostic, "certified_failed");
  assert.equal(artifact.result.rigid_carrier_status, "rejected_by_interval_tangential_residual_witness");

  const witness = artifact.witness_set.witness_nodes.find((node) => node.node_id === "theta_0_site_1");
  assert.ok(witness);
  assert.equal(witness.receiver, 1);
  assert.equal(witness.receiver_label, "1+");
  assert.equal(witness.theta, 0);
  assert.equal(witness.source_row_count, 5);
  assert.equal(witness.all_ordered_sources_resolved, true);
  assert.equal(witness.positive_jacobian_data, true);
  assert.equal(witness.residual_class, "nonzero_tangential_residual");
  closeTo(witness.tangential_residual, 0.198022200895, 1e-9);

  const rows = new Map(witness.source_rows.map((row) => [row.source, row]));
  assert.equal(rows.size, 5);
  for (const row of rows.values()) {
    assert.equal(row.root_count, 1);
    assert.equal(row.jacobian_positive, true);
    assert.ok(row.jacobian > 0);
  }

  closeTo(rows.get(2).y, 1.47817026643, 1e-9);
  closeTo(rows.get(2).jacobian, 1.673612029183, 1e-9);
  closeTo(rows.get(2).tangential_contribution, 0.308291044947, 1e-9);

  closeTo(rows.get(3).y, Math.SQRT2, 1e-9);
  closeTo(rows.get(3).jacobian, 1, 1e-12);
  closeTo(rows.get(3).tangential_contribution, -0.06121403101, 1e-9);

  closeTo(rows.get(4).y, Math.SQRT2, 1e-9);
  closeTo(rows.get(4).jacobian, 1, 1e-12);
  closeTo(rows.get(4).tangential_contribution, -0.049054813042, 1e-9);

  closeTo(rows.get(5).tangential_contribution, 0, 1e-12);
  closeTo(rows.get(6).tangential_contribution, 0, 1e-12);

  assert.equal(
    artifact.interval_certificate.status,
    "fixed-speed-tangential-no-go-certified-for-witness-node"
  );
  assert.equal(artifact.interval_certificate.residual_excludes_zero, true);
  assert.ok(artifact.interval_certificate.residual_interval[0] > 0);
  assert.ok(artifact.interval_certificate.residual_interval[1] > artifact.interval_certificate.residual_interval[0]);
  assert.ok(
    artifact.interval_certificate.residual_interval[0] < witness.tangential_residual &&
      artifact.interval_certificate.residual_interval[1] > witness.tangential_residual
  );
});

test("octahedral fixed-speed witness CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-fixed-speed-witness-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-fixed-speed-witness.mjs", import.meta.url)
  );

  execFileSync(process.execPath, [scriptPath, "--subdivisions", "720", "--out", artifactPath, "--pretty"], {
    encoding: "utf8",
  });

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralFixedSpeedWitness(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.deterministic_node_count, 3);
  assert.equal(validation.result.fixed_speed_witness_diagnostic, "certified_failed");
  assert.equal(validation.result.retention, "not_retained");
  assert.equal(validation.first_rejecting_node.node_id, "theta_0_site_1");
  assert.equal(validation.interval_certificate.residual_excludes_zero, true);

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_FIXED_SPEED_WITNESS_SCHEMA);
});
