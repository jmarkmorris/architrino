import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_CRITERION_SCHEMA,
  buildOctahedralFoldAwareClockLengthCriterion,
  evaluateClockLengthCriterion,
  validateOctahedralFoldAwareClockLengthCriterion,
} from "../scripts/neutral-braid/octahedral-fold-aware-clock-length-criterion.mjs";

function nearlyEqual(actual, expected, tolerance = 1e-12) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${actual} not within ${tolerance} of ${expected}`
  );
}

test("fold-aware clock length criterion states symbolic offset and positivity rows", () => {
  const artifact = buildOctahedralFoldAwareClockLengthCriterion();
  const criterion = artifact.symbolic_clock_length_criterion;

  assert.deepEqual(validateOctahedralFoldAwareClockLengthCriterion(artifact), []);
  assert.equal(artifact.schema, OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_CRITERION_SCHEMA);
  assert.equal(artifact.packet_id, "octahedral_fold_aware_clock_length_criterion");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.source_speed_primitive_check.valid, true);
  assert.equal(
    artifact.source_speed_primitive_check.theory_status,
    "conditional-center-time-speed-primitive-existence-clock-length-open"
  );
  assert.equal(artifact.source_speed_primitive_check.assumes_fixed_speed_window, false);
  assert.equal(artifact.convention_bridge.center_time_pullback, "d nu_i / du = Gamma_B^nu f_i(u)");
  assert.equal(criterion.clock_offset, "nu_i0_clock=L_i/H-A_bar");
  assert.equal(criterion.corrected_speed_interval, "[L_i/H-A_bar+A_min, L_i/H-A_bar+A_max]");
  assert.equal(criterion.positivity_condition, "L_i/H > A_bar-A_min");
  assert.match(criterion.declared_window_condition, /nu_-\+A_bar-A_min/);
  assert.equal(criterion.status, "symbolic-clock-length-offset-criterion-certified");
});

test("fold-aware clock length criterion evaluates supplied profile summaries", () => {
  const row = evaluateClockLengthCriterion({
    period: 10,
    targetLength: 20,
    excursionMinimum: -0.4,
    excursionAverage: 0.2,
    excursionMaximum: 0.8,
    speedWindow: [1, 3],
  });

  nearlyEqual(row.average_required_speed, 2);
  nearlyEqual(row.clock_initial_speed, 1.8);
  nearlyEqual(row.corrected_speed_interval[0], 1.4);
  nearlyEqual(row.corrected_speed_interval[1], 2.6);
  nearlyEqual(row.positivity_margin, 1.4);
  assert.equal(row.positivity_status, "positive-clock-length-speed-profile-certified-for-supplied-summary");
  assert.equal(row.declared_window.status, "declared-speed-window-clock-length-criterion-passed");
  nearlyEqual(row.declared_window.feasible_average_speed_interval[0], 1.6);
  nearlyEqual(row.declared_window.feasible_average_speed_interval[1], 2.4);
});

test("fold-aware clock length criterion records failures without imposing a speed window", () => {
  const artifact = buildOctahedralFoldAwareClockLengthCriterion({
    profileSummary: {
      period: 10,
      targetLength: 2,
      excursionMinimum: -0.5,
      excursionAverage: 0.2,
      excursionMaximum: 0.7,
    },
  });
  const row = artifact.supplied_profile_summary;

  assert.deepEqual(validateOctahedralFoldAwareClockLengthCriterion(artifact), []);
  assert.equal(row.positivity_status, "positive-clock-length-speed-profile-failed-for-supplied-summary");
  assert.equal(row.declared_window, null);
  assert.equal(artifact.branch_chart_requirements.assumes_fixed_speed_window, false);
  assert.equal(artifact.branch_chart_requirements.declared_speed_window, null);
  assert.equal(artifact.branch_chart_requirements.declared_speed_window_is_optional, true);
  assert.equal(artifact.branch_chart_requirements.branch_declared_speed_window_required_for_band_test, true);
  assert.equal(artifact.artifact_claim.certifies_clock_length_criterion, true);
  assert.equal(artifact.artifact_claim.certifies_clock_length_return, false);
  assert.equal(artifact.artifact_claim.certifies_live_branch_clock_length_return, false);
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
});

test("fold-aware clock length criterion rejects imposed default speed windows", () => {
  const artifact = buildOctahedralFoldAwareClockLengthCriterion();
  artifact.branch_chart_requirements.declared_speed_window = [0.5, 1.5];

  assert.match(
    validateOctahedralFoldAwareClockLengthCriterion(artifact).join("; "),
    /must not impose a fixed speed window/
  );
});

test("fold-aware clock length criterion CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-fold-aware-clock-length-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-fold-aware-clock-length-criterion.mjs", import.meta.url)
  );

  execFileSync(
    process.execPath,
    [scriptPath, "--profile", "10,20,-0.4,0.2,0.8", "--speed-window", "1,3", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralFoldAwareClockLengthCriterion(artifact), []);
  assert.equal(
    artifact.supplied_profile_summary.positivity_status,
    "positive-clock-length-speed-profile-certified-for-supplied-summary"
  );

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(
    validation.result.theory_status,
    "fold-aware-clock-length-criterion-derived-clock-return-open"
  );

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_CRITERION_SCHEMA);
});
