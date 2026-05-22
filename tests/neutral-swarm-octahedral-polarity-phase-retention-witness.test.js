import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_POLARITY_PHASE_RETENTION_WITNESS_SCHEMA,
  buildOctahedralPolarityPhaseRetentionWitness,
  validateOctahedralPolarityPhaseRetentionWitness,
} from "../scripts/neutral-swarm/octahedral-polarity-phase-retention-witness.mjs";

const CLOSURE_STATUS = "closed-rejected:polarity-phase-improvement-implies-retention";

function closeTo(actual, expected, tolerance = 1e-12) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected} by more than ${tolerance}`);
}

test("octahedral polarity-phase retention witness rejects best-row improvement as retention", () => {
  const artifact = buildOctahedralPolarityPhaseRetentionWitness();
  const errors = validateOctahedralPolarityPhaseRetentionWitness(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, "neutral-swarm-octahedral-polarity-phase-retention-witness/v1");
  assert.equal(artifact.packet_id, "octahedral_polarity_phase_retention_witness");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.result.closure_status, CLOSURE_STATUS);
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.reason, "nonzero max tangential residual and required rows open");

  const row = artifact.consumed_best_row;
  assert.equal(row.polarity_row, "+---++");
  assert.equal(row.polarity_tex, "$+---++$");
  closeTo(row.phi2, 0.006683);
  closeTo(row.phi3, 3.148086);
  closeTo(row.tangential_rms, 0.829635);
  closeTo(row.tangential_max, 1.787420);
  closeTo(row.J_min, 0.727176);
  closeTo(row.d_min_over_R, 0.996664);
  assert.equal(row.root_count, "5-5");
  assert.equal(row.root_count_tex, "$5$-$5$");
  assert.equal(row.source_literals.tangential_max, "$1.787420$");
  assert.equal(row.retention, "not_retained");

  assert.equal(artifact.retention_requirements.status, "not_satisfied");
  assert.ok(artifact.retention_requirements.open_required_row_count > 0);
  assert.ok(
    artifact.retention_requirements.required_rows.some(
      (requiredRow) =>
        requiredRow.row === "tangential force balance" &&
        requiredRow.status === "failed" &&
        requiredRow.diagnostic === "nonzero max tangential residual" &&
        requiredRow.value === row.tangential_max
    )
  );
  assert.equal(artifact.result.nonzero_max_tangential_residual, true);
  assert.equal(artifact.result.required_rows_open, true);
});

test("octahedral polarity-phase retention witness CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-swarm-polarity-phase-retention-witness-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-swarm/octahedral-polarity-phase-retention-witness.mjs", import.meta.url)
  );

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], {
    encoding: "utf8",
  });

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralPolarityPhaseRetentionWitness(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.closure_status, CLOSURE_STATUS);
  assert.equal(validation.retention, "not_retained");
  assert.equal(validation.reason, "nonzero max tangential residual and required rows open");
  assert.equal(validation.best_row.polarity_row, "+---++");
  closeTo(validation.best_row.phi2, 0.006683);
  closeTo(validation.best_row.phi3, 3.148086);
  closeTo(validation.best_row.tangential_rms, 0.829635);
  closeTo(validation.best_row.tangential_max, 1.787420);
  closeTo(validation.best_row.J_min, 0.727176);
  closeTo(validation.best_row.d_min_over_R, 0.996664);
  assert.equal(validation.best_row.root_count, "5-5");
  assert.equal(validation.best_row.source_literals.tangential_max, "$1.787420$");
  assert.ok(validation.open_required_row_count > 0);

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_POLARITY_PHASE_RETENTION_WITNESS_SCHEMA);
  assert.equal(schema.closure_status, CLOSURE_STATUS);
});
