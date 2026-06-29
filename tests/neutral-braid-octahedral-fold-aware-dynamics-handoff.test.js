import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_DYNAMICS_HANDOFF_SCHEMA,
  buildOctahedralFoldAwareDynamicsHandoff,
  validateOctahedralFoldAwareDynamicsHandoff,
} from "../scripts/neutral-braid/octahedral-fold-aware-dynamics-handoff.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareDynamicsHandoff();
  }
  return cachedArtifact;
}

function nearlyEqual(actual, expected, tolerance = 1e-12) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${actual} not within ${tolerance} of ${expected}`
  );
}

test("fold-aware dynamics handoff validates the open receiver-normal predecessor", () => {
  const handoff = artifact();

  assert.deepEqual(validateOctahedralFoldAwareDynamicsHandoff(handoff), []);
  assert.equal(handoff.schema, OCTAHEDRAL_FOLD_AWARE_DYNAMICS_HANDOFF_SCHEMA);
  assert.equal(handoff.packet_id, "octahedral_fold_aware_dynamics_handoff");
  assert.equal(handoff.promotion_status, "priority-only");
  assert.equal(handoff.source_certificate_check.valid, true);
  assert.equal(
    handoff.source_certificate_check.zero_status,
    "receiver-normal-zero-bracket-certificate-open"
  );
  assert.equal(handoff.representative_zero_ray_point, null);
  assert.equal(handoff.pointwise_tangential_witness, null);
});

test("fold-aware dynamics handoff requires a receiver-normal zero-bracket restart", () => {
  const handoff = artifact();
  const fixedSpeed = handoff.fixed_speed_tangent_closure_test;

  assert.equal(fixedSpeed.status, "not-run-receiver-normal-zero-bracket-open");
  assert.equal(fixedSpeed.witness_total_tangential_value, null);
  assert.equal(handoff.bounded_speed_handoff.status, "blocked-receiver-normal-zero-bracket-open");
});

test("fold-aware dynamics handoff preserves bounded-speed and retention boundaries", () => {
  const handoff = artifact();

  assert.equal(handoff.bounded_speed_handoff.status, "blocked-receiver-normal-zero-bracket-open");
  assert.equal(handoff.bounded_speed_handoff.primitive_status, "blocked-until-receiver-normal-zero-bracket-restarted");
  assert.equal(handoff.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(handoff.artifact_claim.certifies_fold_aware_period_mean_zero, false);
  assert.equal(handoff.artifact_claim.certifies_simple_zero_transversality, false);
  assert.equal(handoff.artifact_claim.rejects_fixed_speed_pointwise_tangent_closure, false);
  assert.equal(handoff.artifact_claim.identifies_bounded_speed_successor, false);
  assert.equal(handoff.artifact_claim.certifies_bounded_speed_primitive, false);
  assert.equal(handoff.artifact_claim.retained_branch, false);
  assert.equal(
    handoff.result.theory_status,
    "receiver-normal-zero-bracket-restart-required"
  );
  assert.equal(handoff.result.retention, "not_retained");
  assert.equal(handoff.result.retained_branch, false);
});

test("fold-aware dynamics handoff CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-fold-aware-dynamics-handoff-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-fold-aware-dynamics-handoff.mjs", import.meta.url)
  );

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });

  const handoff = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralFoldAwareDynamicsHandoff(handoff), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(
    validation.result.theory_status,
    "receiver-normal-zero-bracket-restart-required"
  );

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_FOLD_AWARE_DYNAMICS_HANDOFF_SCHEMA);
});
