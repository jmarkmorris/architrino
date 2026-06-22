import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REMAINDER_BUDGET_SCAN_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRemainderBudgetScan,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRemainderBudgetScan,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.mjs";

const EXPECTED_STATUS =
  "sampled-theta3minus-remainder-budget-feasibility-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRemainderBudgetScan();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.mjs"
  );
}

test("theta3minus remainder-budget scan validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRemainderBudgetScan(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REMAINDER_BUDGET_SCAN_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_remainder_budget_scan"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("remainder-budget scan imposes no fixed speed band", () => {
  const packet = artifact();

  assert.equal(packet.remainder_budget_parameters.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(packet.remainder_budget_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(packet.remainder_budget_parameters.speed_band, undefined);
  assert.equal(packet.remainder_budget_parameters.speed_window, undefined);
  assert.equal(packet.remainder_budget_parameters.speed_min, undefined);
  assert.equal(packet.remainder_budget_parameters.speed_max, undefined);
});

test("sampled total residuals stay inside the certified negative-L budget", () => {
  const summary = artifact().sampled_remainder_budget_summary;

  assert.equal(
    summary.status,
    "sampled-theta3minus-remainder-budget-feasibility-certified"
  );
  assert.equal(summary.speed_row_count, 5);
  assert.equal(summary.y_sample_count_per_speed, 19);
  assert.equal(summary.total_remainder_sample_count, 95);
  assert.ok(Number(summary.certified_budget_from_negative_L_upper) > 0.192);
  assert.ok(Number(summary.max_abs_R_G) < 0.012);
  assert.ok(Number(summary.max_abs_R_D) < 0.0002);
  assert.ok(Number(summary.max_combined_budget_ratio) < 0.06);
  assert.ok(Number(summary.min_certified_budget_slack) > 0.18);
  assert.equal(summary.all_sampled_remainders_inside_certified_L_budget, true);
  assert.equal(summary.all_GD_signs_negative, true);
  assert.equal(summary.all_term_root_signatures_preserved, true);
});

test("fold-pair and regular decomposition identifies the theta3minus source roots", () => {
  const packet = artifact();
  const firstRow = packet.sampled_remainder_budget_rows[0].sample_rows[0];
  const summary = packet.sampled_remainder_budget_summary;
  const bottlenecks = packet.sampled_remainder_budget_bottlenecks;

  assert.equal(firstRow.fold_pair_term_label, "-s_{+,+}(u+Q)");
  assert.equal(firstRow.fold_pair_term_index, 1);
  assert.deepEqual(firstRow.fold_pair_root_indices.sort(), [0, 1]);
  assert.equal(firstRow.term_root_count_signature, "1,3,1,1");
  assert.ok(Number(firstRow.pair_to_regular_root_separation_margin) > 1.7);
  assert.equal(summary.reconstruction_stable, true);
  assert.equal(Number(summary.max_reconstruction_R_G_abs_error), 0);
  assert.equal(Number(summary.max_reconstruction_R_D_abs_error), 0);
  assert.ok(Number(summary.max_abs_R_G_pair) < 0.0011);
  assert.ok(Number(summary.max_abs_R_D_pair) < 0.0008);
  assert.ok(Number(summary.max_abs_R_G_regular) < 0.0101);
  assert.ok(Number(summary.max_abs_R_D_regular) < 0.0008);
  assert.equal(bottlenecks.worst_combined_row.kind, "R_G");
  assert.equal(Number(bottlenecks.worst_combined_row.y), 0.115);
});

test("collar scaling separates fold-pair and regular-root remainder burdens", () => {
  const scaling = artifact().sampled_remainder_budget_summary.collar_scaling_summary;

  assert.equal(Number(scaling.outer_collar_radius), 0.115);
  assert.ok(
    Number(scaling.fold_pair_quadratic_rows.max_abs_R_G_pair_over_y2) < 0.18
  );
  assert.ok(
    Number(scaling.fold_pair_quadratic_rows.max_abs_R_D_pair_over_y2) < 0.71
  );
  assert.ok(
    Number(scaling.fold_pair_quadratic_rows.implied_R_G_pair_bound_at_outer_radius) <
      0.0024
  );
  assert.ok(
    Number(scaling.fold_pair_quadratic_rows.implied_R_D_pair_bound_at_outer_radius) <
      0.0093
  );
  assert.ok(
    Number(scaling.regular_root_scaling_rows.max_abs_R_G_regular_over_y) < 0.089
  );
  assert.ok(
    Number(scaling.regular_root_scaling_rows.max_abs_R_D_regular_over_y3) < 0.61
  );
  assert.ok(
    Number(scaling.regular_root_scaling_rows.implied_R_G_regular_bound_at_outer_radius) <
      0.0103
  );
  assert.ok(
    Number(scaling.regular_root_scaling_rows.implied_R_D_regular_bound_at_outer_radius) <
      0.001
  );
  assert.equal(
    scaling.fold_pair_quadratic_rows.worst_R_G_pair_over_y2_row.scale,
    "y^2"
  );
  assert.equal(
    scaling.regular_root_scaling_rows.worst_R_D_regular_over_y3_row.scale,
    "y^3"
  );
});

test("remainder-budget scan keeps interval closure and retention open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_sampled_theta3minus_remainder_budget_feasibility,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_speed_dependent_fold_normal_form_remainder,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_theta_3minus_left_fold_collar_interval_radius,
    false
  );
  assert.equal(packet.artifact_claim.certifies_I1_regular_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.certifies_interval_quadrature_enclosure, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(
    packet.result.first_successor_row,
    "theta_3minus.left-fold-collar-directed-rounded-normal-form-remainder-required"
  );
});

test("remainder-budget validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRemainderBudgetScan({
        speedSamples: [3.021562, 3.021564, 3.021568],
      }),
    /speedSamples/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRemainderBudgetScan({
        ySamples: [0.1, 0.05, 0.07, 0.001],
      }),
    /ySamples/
  );

  const packet = clone(artifact());
  packet.remainder_budget_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_directed_rounded_speed_dependent_fold_normal_form_remainder =
    true;
  packet.artifact_claim.certifies_theta_3minus_left_fold_collar_interval_radius =
    true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRemainderBudgetScan(
      packet
    );

  assert.ok(errors.includes("remainder-budget parameters must not contain speed-band fields"));
  assert.ok(
    errors.includes(
      "artifact claim must keep interval remainder, collar closure, I1 closure, and retention open"
    )
  );
});

test("remainder-budget scan CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "theta3minus-remainder-"));
  const outPath = path.join(tmpDir, "artifact.json");

  execFileSync(process.execPath, [scriptPath(), "--out", outPath]);
  const validateOutput = JSON.parse(
    execFileSync(process.execPath, [scriptPath(), "--validate", outPath], {
      encoding: "utf8",
    })
  );

  assert.equal(validateOutput.valid, true);
  const packet = JSON.parse(fs.readFileSync(outPath, "utf8"));
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);

  const schemaOutput = JSON.parse(
    execFileSync(process.execPath, [scriptPath(), "--schema"], {
      encoding: "utf8",
    })
  );
  assert.equal(
    schemaOutput.artifact_schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REMAINDER_BUDGET_SCAN_SCHEMA
  );
});
