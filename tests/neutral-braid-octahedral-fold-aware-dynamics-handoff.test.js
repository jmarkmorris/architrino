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

test("fold-aware dynamics handoff validates source certificate and keeps speed unconstrained", () => {
  const handoff = artifact();

  assert.deepEqual(validateOctahedralFoldAwareDynamicsHandoff(handoff), []);
  assert.equal(handoff.schema, OCTAHEDRAL_FOLD_AWARE_DYNAMICS_HANDOFF_SCHEMA);
  assert.equal(handoff.packet_id, "octahedral_fold_aware_dynamics_handoff");
  assert.equal(handoff.promotion_status, "priority-only");
  assert.equal(handoff.source_certificate_check.valid, true);
  assert.equal(
    handoff.source_certificate_check.zero_status,
    "sign-certified-fold-aware-multiroot-period-integral-zero-bracket"
  );
  assert.equal(
    handoff.representative_zero_ray_point.speed_constraint,
    "none; representative h=1 point on the projective zero ray"
  );
  nearlyEqual(handoff.representative_zero_ray_point.speed_ratio, 3.021564740248);
  nearlyEqual(handoff.representative_zero_ray_point.path_speed, 3.021564740248);
});

test("fold-aware dynamics handoff rejects fixed-speed pointwise tangent closure", () => {
  const handoff = artifact();
  const witness = handoff.pointwise_tangential_witness;
  const fixedSpeed = handoff.fixed_speed_tangent_closure_test;

  assert.equal(witness.receiver_label, "1+");
  nearlyEqual(witness.theta, 0.785398163397);
  assert.equal(witness.active_root_count, 9);
  assert.equal(witness.partner_root_count, 3);
  assert.equal(witness.cross_root_count, 6);
  assert.ok(witness.jacobian_abs_min > 0.5);
  nearlyEqual(witness.total_tangential_value, -0.168424847206);
  nearlyEqual(witness.cross_tangential_value, -0.168424847206);
  assert.ok(Math.abs(witness.partner_tangential_value) < 1e-12);
  assert.equal(fixedSpeed.status, "fixed-speed-pointwise-tangent-closure-rejected");
  nearlyEqual(fixedSpeed.witness_total_tangential_value, -0.168424847206);
});

test("fold-aware dynamics handoff preserves bounded-speed and retention boundaries", () => {
  const handoff = artifact();

  assert.equal(handoff.bounded_speed_handoff.status, "bounded-speed-primitive-handoff-open");
  assert.equal(handoff.bounded_speed_handoff.primitive_status, "period-mean-compatible-ordinary-primitive-not-certified");
  assert.equal(handoff.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(handoff.artifact_claim.certifies_fold_aware_period_mean_zero, true);
  assert.equal(handoff.artifact_claim.certifies_simple_zero_transversality, true);
  assert.equal(handoff.artifact_claim.rejects_fixed_speed_pointwise_tangent_closure, true);
  assert.equal(handoff.artifact_claim.identifies_bounded_speed_successor, true);
  assert.equal(handoff.artifact_claim.certifies_bounded_speed_primitive, false);
  assert.equal(handoff.artifact_claim.retained_branch, false);
  assert.equal(
    handoff.result.theory_status,
    "fixed-speed-pointwise-tangent-obstructed-bounded-speed-primitive-handoff"
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
    "fixed-speed-pointwise-tangent-obstructed-bounded-speed-primitive-handoff"
  );

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_FOLD_AWARE_DYNAMICS_HANDOFF_SCHEMA);
});
