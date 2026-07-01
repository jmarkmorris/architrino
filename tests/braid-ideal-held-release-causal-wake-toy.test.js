import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/held-release-causal-wake-toy.mjs", import.meta.url)
);

function runToy(args = []) {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "braid-ideal-held-release-"));
  execFileSync(
    process.execPath,
    [
      SCRIPT_PATH,
      "--duration",
      "3",
      "--dt",
      "0.004",
      "--sample-every",
      "25",
      "--out",
      outputDir,
      ...args,
    ],
    { encoding: "utf8" }
  );
  return JSON.parse(fs.readFileSync(path.join(outputDir, "result.json"), "utf8"));
}

test("face-opposite held-release emits a fail-closed wiggle window diagnostic", () => {
  const result = runToy();
  const wiggle = result.trajectoryDiagnostics;

  assert.equal(wiggle.schema, "braid-ideal-held-release-wiggle-window-diagnostic.v1");
  assert.equal(wiggle.status, "single_compression_escape_with_field_speed_crossing");
  assert.equal(wiggle.priorityOnly, true);
  assert.equal(wiggle.retainedBranchClaim, false);
  assert.equal(wiggle.acceptedSameLevelBranchClaim, false);
  assert.equal(wiggle.scoreMovement, "no_score_increase");
  assert.equal(wiggle.checks.symmetryWindowPass, true);
  assert.equal(wiggle.checks.rootCoveragePass, true);
  assert.equal(wiggle.checks.fieldSpeedPass, false);
  assert.equal(wiggle.checks.compressionToExpansionTurnObserved, true);
  assert.equal(wiggle.checks.postFirstExpansionReturnObserved, false);
  assert.equal(wiggle.radialTurnRows.length, 1);
  assert.equal(wiggle.radialTurnRows[0].turnKind, "compression_to_expansion");
  assert.equal(wiggle.firstWiggleBlocker, "field_speed_crossing_before_retained_solver_promotion");
  assert.equal(
    result.reducedRadiusDiagnostics.firstReducedRadiusBlocker,
    "field_speed_crossing_before_reduced_radius_equation"
  );
  assert.equal(
    result.closureDiagnostics.firstClosureBlocker,
    "field_speed_crossing_before_retained_solver_promotion"
  );
  assert.equal(result.closureDiagnostics.checks.wiggleWindowPass, false);
  assert.ok(wiggle.extrema.minRadiusMean.value < result.finalMetrics.radiusMean);
});

test("high field-speed face-opposite run preserves symmetry but lacks a return turn", () => {
  const result = runToy(["--field-speed", "6"]);
  const wiggle = result.trajectoryDiagnostics;

  assert.equal(wiggle.status, "single_compression_then_escape");
  assert.equal(wiggle.checks.symmetryWindowPass, true);
  assert.equal(wiggle.checks.rootCoveragePass, true);
  assert.equal(wiggle.checks.fieldSpeedPass, true);
  assert.equal(wiggle.checks.compressionToExpansionTurnObserved, true);
  assert.equal(wiggle.checks.postFirstExpansionReturnObserved, false);
  assert.equal(wiggle.radialTurnRows.length, 1);
  assert.equal(wiggle.firstWiggleBlocker, "post_first_pass_return_turn_absent");
  assert.equal(result.reducedRadiusDiagnostics.schema, "braid-ideal-reduced-radius-equation-diagnostic.v1");
  assert.equal(result.reducedRadiusDiagnostics.status, "post_turn_inward_radial_acceleration_absent");
  assert.equal(result.reducedRadiusDiagnostics.checks.postFirstExpansionInwardAccelerationObserved, false);
  assert.equal(result.reducedRadiusDiagnostics.postFirstExpansionSummary.inwardRows, 0);
  assert.ok(result.reducedRadiusDiagnostics.postFirstExpansionSummary.outwardRows > 0);
  assert.equal(
    result.reducedRadiusDiagnostics.firstReducedRadiusBlocker,
    "post_turn_inward_radial_acceleration_absent"
  );
  assert.equal(
    result.closureDiagnostics.firstClosureBlocker,
    "post_first_pass_inward_radial_acceleration_absent"
  );
  assert.equal(result.closureDiagnostics.checks.reducedRadiusEquationPass, false);
});

test("high field-speed same-source self-hit probe fails closed before branch promotion", () => {
  const result = runToy(["--field-speed", "6", "--include-self-hits"]);
  const wiggle = result.trajectoryDiagnostics;

  assert.equal(result.configuration.includeSelfHits, true);
  assert.equal(result.configuration.selfHitMinDelay, 0.004);
  assert.equal(result.rootStats.selfHitRoots, 0);
  assert.equal(result.rootStats.missingSelfHitRoots, result.rootStats.selfHitDirectedPairs);
  assert.equal(wiggle.checks.symmetryWindowPass, true);
  assert.equal(wiggle.checks.rootCoveragePass, true);
  assert.equal(wiggle.checks.fieldSpeedPass, true);
  assert.equal(wiggle.checks.selfHitProbePass, false);
  assert.equal(wiggle.status, "same_source_self_hit_rows_absent_in_toy_probe");
  assert.equal(wiggle.firstWiggleBlocker, "same_source_self_hit_rows_absent_in_toy_probe");
  assert.equal(
    result.reducedRadiusDiagnostics.firstReducedRadiusBlocker,
    "same_source_self_hit_rows_absent_in_toy_probe"
  );
  assert.equal(
    result.closureDiagnostics.firstClosureBlocker,
    "same_source_self_hit_rows_absent_in_toy_probe"
  );
  assert.equal(result.closureDiagnostics.selfHitProbe.authority, "priority_only_toy_probe_not_accepted_evidence");
});

test("axial-paired control loses the same-level symmetry window", () => {
  const result = runToy(["--preset", "axial-paired"]);
  const wiggle = result.trajectoryDiagnostics;

  assert.equal(result.closureDiagnostics.status, "same_level_support_lost_in_toy_control");
  assert.equal(wiggle.status, "same_level_window_lost");
  assert.equal(wiggle.checks.symmetryWindowPass, false);
  assert.equal(wiggle.checks.compressionToExpansionTurnObserved, true);
  assert.equal(wiggle.firstWiggleBlocker, "same_level_window_symmetry_lost");
  assert.equal(result.reducedRadiusDiagnostics.status, "same_level_window_lost_before_reduced_radius_equation");
  assert.equal(result.reducedRadiusDiagnostics.firstReducedRadiusBlocker, "same_level_window_symmetry_lost");
  assert.equal(
    result.closureDiagnostics.firstClosureBlocker,
    "common_sphere_antipodal_symmetry_not_preserved"
  );
  assert.equal(result.closureDiagnostics.checks.wiggleWindowPass, false);
  assert.ok(wiggle.windowResiduals.radiusStdMax > 1);
  assert.ok(wiggle.windowResiduals.pairOppositionMax > 1);
});
