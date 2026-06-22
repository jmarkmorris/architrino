import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_MULTIROOT_PERIOD_INTEGRAL_SCHEMA,
  buildOctahedralFoldAwareMultirootPeriodIntegral,
  validateOctahedralFoldAwareMultirootPeriodIntegral,
} from "../scripts/neutral-braid/octahedral-fold-aware-multiroot-period-integral.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareMultirootPeriodIntegral();
  }
  return cachedArtifact;
}

function nearlyEqual(actual, expected, tolerance = 1e-12) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} not within ${tolerance} of ${expected}`);
}

test("fold-aware multiroot integral records cross-binary cancellation and phi coarea chart", () => {
  const integral = artifact();

  assert.deepEqual(validateOctahedralFoldAwareMultirootPeriodIntegral(integral), []);
  assert.equal(integral.schema, OCTAHEDRAL_FOLD_AWARE_MULTIROOT_PERIOD_INTEGRAL_SCHEMA);
  assert.equal(integral.packet_id, "octahedral_fold_aware_multiroot_period_integral");
  assert.equal(integral.promotion_status, "priority-only");
  assert.equal(
    integral.scan_parameters.speed_constraint,
    "none; speed ratios are positive diagnostic points, not an admissibility band"
  );
  assert.equal(
    integral.cross_binary_cancellation.status,
    "symmetry-cancelled-fold-aware-cross-binary-period-integral"
  );
  assert.equal(integral.cross_binary_cancellation.coarea_chart.status, "phi-chart-coarea-formula-derived");
  assert.equal(integral.cross_binary_cancellation.rows.length, 12);
  assert.ok(
    integral.cross_binary_cancellation.rows.every(
      (row) =>
        row.source_labels.length === 2 &&
        row.force_sign_sum === 0 &&
        row.cancellation_status === "paired-periodic-cross-binary-cancellation"
    )
  );
});

test("fold-aware multiroot integral records the partner secondary fold and zero bracket", () => {
  const integral = artifact();
  const secondaryFold = integral.partner_multiroot_reduction.secondary_fold;
  const zero = integral.zero_mean_candidate;

  nearlyEqual(secondaryFold.x, 2.798386045784);
  nearlyEqual(secondaryFold.phase_delay, 5.596772091568);
  nearlyEqual(secondaryFold.speed_ratio, 2.971693870714);
  assert.equal(zero.status, "sampled-fold-aware-multiroot-period-integral-zero-bracket-detected");
  assert.deepEqual(zero.bracket, [3.02, 3.025]);
  assert.ok(zero.bracket_values[0] < 0);
  assert.ok(zero.bracket_values[1] > 0);
  nearlyEqual(zero.speed_ratio, 3.021564740248);
  assert.equal(zero.row.root_count, 3);
  assert.ok(Math.abs(zero.row.period_integral) <= 1e-12);
  nearlyEqual(zero.row.jacobian_abs_min, 0.5043746238);
  nearlyEqual(zero.row.rows[0].phase_delay, 2.344688042275);
  nearlyEqual(zero.row.rows[1].phase_delay, 5.240881784882);
  nearlyEqual(zero.row.rows[2].phase_delay, 5.968461395446);
});

test("fold-aware multiroot integral preserves non-retention and certification boundaries", () => {
  const integral = artifact();

  assert.equal(integral.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(integral.artifact_claim.proves_cross_binary_period_cancellation_by_symmetry, true);
  assert.equal(integral.artifact_claim.reduces_fold_aware_period_integral_to_partner_roots, true);
  assert.equal(integral.artifact_claim.finds_sampled_multiroot_zero_bracket, true);
  assert.equal(integral.artifact_claim.certifies_fold_aware_multiroot_period_integral, false);
  assert.equal(integral.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(integral.artifact_claim.certifies_action_noether_event_rows, false);
  assert.equal(integral.artifact_claim.certifies_observer_export, false);
  assert.equal(integral.artifact_claim.retained_branch, false);
  assert.equal(
    integral.result.theory_status,
    "sampled-fold-aware-multiroot-period-integral-zero-bracket-detected"
  );
  assert.equal(
    integral.result.first_successor_row,
    "sign-zero-bracket-certificate-created-retention-rows-required"
  );
  assert.equal(integral.result.retention, "not_retained");
});

test("fold-aware multiroot integral CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-fold-aware-integral-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-fold-aware-multiroot-period-integral.mjs", import.meta.url)
  );

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });

  const integral = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralFoldAwareMultirootPeriodIntegral(integral), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(
    validation.result.theory_status,
    "sampled-fold-aware-multiroot-period-integral-zero-bracket-detected"
  );

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_FOLD_AWARE_MULTIROOT_PERIOD_INTEGRAL_SCHEMA);
});
