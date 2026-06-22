import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_SPEED_PRIMITIVE_EXISTENCE_SCHEMA,
  buildOctahedralFoldAwareSpeedPrimitiveExistence,
  validateOctahedralFoldAwareSpeedPrimitiveExistence,
} from "../scripts/neutral-braid/octahedral-fold-aware-speed-primitive-existence.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareSpeedPrimitiveExistence();
  }
  return cachedArtifact;
}

function nearlyEqual(actual, expected, tolerance = 1e-12) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${actual} not within ${tolerance} of ${expected}`
  );
}

test("fold-aware speed primitive existence validates source handoff", () => {
  const primitive = artifact();

  assert.deepEqual(validateOctahedralFoldAwareSpeedPrimitiveExistence(primitive), []);
  assert.equal(primitive.schema, OCTAHEDRAL_FOLD_AWARE_SPEED_PRIMITIVE_EXISTENCE_SCHEMA);
  assert.equal(primitive.packet_id, "octahedral_fold_aware_speed_primitive_existence");
  assert.equal(primitive.promotion_status, "priority-only");
  assert.equal(primitive.source_handoff_check.valid, true);
  assert.equal(primitive.source_handoff_check.certifies_fold_aware_period_mean_zero, true);
  assert.equal(primitive.source_handoff_check.rejects_fixed_speed_pointwise_tangent_closure, true);
  nearlyEqual(primitive.zero_ray_context.speed_ratio, 3.021564740248);
  assert.equal(primitive.zero_ray_context.speed_constraint, "none; speed ratio is the projective zero-ray parameter");
});

test("fold-aware speed primitive existence uses center-time primitive equation", () => {
  const primitive = artifact();
  const lemma = primitive.center_time_speed_primitive_lemma;

  assert.equal(lemma.tangent_equation, "nu_i nu_i' = Gamma_B^nu f_i(u)");
  assert.equal(lemma.arclength_prime_convention, "nu_i' is d nu_i / d lambda_i");
  assert.equal(lemma.center_time_pullback, "d nu_i / du = Gamma_B^nu f_i(u)");
  assert.equal(lemma.periodic_return, "A_i(H)=A_i(0)=0");
  assert.match(lemma.positivity_condition, /nu_i0\+A_i/);
  assert.equal(lemma.status, "conditional-center-time-speed-primitive-existence-lemma");
});

test("fold-aware speed primitive existence keeps clock length and retention open", () => {
  const primitive = artifact();

  assert.equal(primitive.clock_length_row.status, "clock-length-return-open");
  assert.equal(primitive.branch_chart_requirements.assumes_fixed_speed_window, false);
  assert.equal(primitive.branch_chart_requirements.requires_coarea_or_branch_chart_for_folds, true);
  assert.equal(primitive.branch_chart_requirements.dropped_root_theta_ledger_allowed, false);
  assert.equal(primitive.branch_chart_requirements.certifies_clock_length_return, false);
  assert.equal(primitive.branch_chart_requirements.certifies_bounded_speed_live_ledger, false);
  assert.equal(primitive.branch_chart_requirements.retained_branch, false);
  assert.equal(primitive.artifact_claim.certifies_live_speed_primitive, false);
  assert.equal(primitive.result.retention, "not_retained");
  assert.equal(primitive.result.retained_branch, false);
});

test("fold-aware speed primitive existence CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-fold-aware-speed-primitive-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-fold-aware-speed-primitive-existence.mjs", import.meta.url)
  );

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });

  const primitive = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralFoldAwareSpeedPrimitiveExistence(primitive), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(
    validation.result.theory_status,
    "conditional-center-time-speed-primitive-existence-clock-length-open"
  );

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_FOLD_AWARE_SPEED_PRIMITIVE_EXISTENCE_SCHEMA);
});
