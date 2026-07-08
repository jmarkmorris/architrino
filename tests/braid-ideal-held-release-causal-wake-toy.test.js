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

test("angular-momentum release option metadata round-trips in kick-at-release mode", () => {
  const result = runToy([
    "--duration",
    "0.5",
    "--prehistory-mode=kick-at-release",
    "--surface-speed-fraction=0.8",
    "--spin-axis=2,2,2",
  ]);
  const release = result.configuration.angularMomentumRelease;
  const invSqrt3 = 1 / Math.sqrt(3);
  const referencePerpendicularRadius = Math.sqrt(2 / 3);

  assert.equal(result.configuration.prehistoryMode, "kick-at-release");
  assert.equal(release.prehistoryMode, "kick-at-release");
  assert.equal(release.surfaceSpeedFraction, 0.8);
  assert.equal(release.actualTangentialSpeed, 0.8);
  assert.ok(Math.abs(release.angularRate - 0.8 / referencePerpendicularRadius) < 1e-12);
  assert.deepEqual(release.spinAxisInput, [2, 2, 2]);
  for (const component of release.spinAxis) {
    assert.ok(Math.abs(component - invSqrt3) < 1e-12);
  }
  assert.ok(Math.abs(release.referencePerpendicularRadius - referencePerpendicularRadius) < 1e-12);
  assert.equal(release.rotationActive, true);
  assert.equal(release.holdHistory.representation, "static_hold_window_with_release_kick_row");
  assert.equal(release.holdHistory.rows, 3);
  assert.equal(release.releaseContinuity.intentionalReleaseKick, true);
  assert.equal(release.releaseContinuity.positionJumpMax, 0);
  assert.ok(Math.abs(release.releaseContinuity.velocityJumpMax - 0.8) < 1e-12);
  assert.ok(Math.abs(release.kinematicAngularMomentumNorm - 4 * release.angularRate) < 1e-9);
  const kinematicUnit = release.kinematicAngularMomentum.map(
    (component) => component / release.kinematicAngularMomentumNorm
  );
  for (const component of kinematicUnit) {
    assert.ok(Math.abs(component - invSqrt3) < 1e-9);
  }
  assert.match(release.kinematicAngularMomentumNote, /no physical mass/);

  const wiggle = result.trajectoryDiagnostics;
  assert.equal(wiggle.fixedPointDrift.group, "C3_x_inversion_axis_neutral_rotating");
  assert.equal(wiggle.fixedPointDrift.applicable, true);
  assert.ok(Number.isFinite(wiggle.fixedPointDrift.residualMax));
  assert.ok(Array.isArray(wiggle.radialSignSequence));
  assert.ok(Array.isArray(result.reducedRadiusDiagnostics.radialSignSequence));
  for (const diagnostics of [
    result.closureDiagnostics,
    result.trajectoryDiagnostics,
    result.reducedRadiusDiagnostics,
  ]) {
    assert.equal(diagnostics.priorityOnly, true);
    assert.equal(diagnostics.retainedBranchClaim, false);
    assert.equal(diagnostics.acceptedSameLevelBranchClaim, false);
    assert.equal(diagnostics.scoreMovement, "no_score_increase");
  }
});

test("moving-prehistory rotating hold window releases without discontinuity", () => {
  const result = runToy([
    "--duration",
    "0.5",
    "--prehistory-mode",
    "moving-prehistory",
    "--surface-speed-fraction",
    "0.5",
  ]);
  const release = result.configuration.angularMomentumRelease;

  assert.equal(release.prehistoryMode, "moving-prehistory");
  assert.equal(release.holdHistory.representation, "rigidly_rotating_hold_window_samples");
  assert.ok(release.holdHistory.rows > 2);
  assert.ok(release.holdHistory.sampleStep > 0);
  assert.equal(release.releaseContinuity.intentionalReleaseKick, false);
  assert.equal(release.releaseContinuity.positionJumpMax, 0);
  assert.equal(release.releaseContinuity.velocityJumpMax, 0);
  assert.equal(result.trajectoryDiagnostics.fixedPointDrift.group, "C3_x_inversion_axis_neutral_rotating");
  assert.ok(result.trajectoryDiagnostics.fixedPointDrift.residualMax < 1e-9);
  assert.equal(result.closureDiagnostics.retainedBranchClaim, false);
  assert.equal(result.closureDiagnostics.scoreMovement, "no_score_increase");
});

test("default stationary-held-release run is unchanged by the angular-momentum options", () => {
  const defaultResult = runToy(["--duration", "1"]);
  const explicitResult = runToy([
    "--duration",
    "1",
    "--prehistory-mode",
    "stationary-held-release",
    "--surface-speed-fraction",
    "0",
    "--spin-axis",
    "1,1,1",
  ]);

  assert.equal(defaultResult.configuration.prehistoryMode, "stationary-held-release");
  assert.equal(defaultResult.configuration.angularMomentumRelease.surfaceSpeedFraction, 0);
  assert.equal(defaultResult.configuration.angularMomentumRelease.rotationActive, false);
  assert.deepEqual(defaultResult.configuration.angularMomentumRelease.kinematicAngularMomentum, [0, 0, 0]);
  assert.equal(
    defaultResult.configuration.angularMomentumRelease.holdHistory.representation,
    "stationary_two_row_hold_window"
  );
  assert.deepEqual(defaultResult.finalMetrics, explicitResult.finalMetrics);
  assert.deepEqual(defaultResult.frames, explicitResult.frames);
  assert.deepEqual(
    defaultResult.trajectoryDiagnostics.radialTurnRows,
    explicitResult.trajectoryDiagnostics.radialTurnRows
  );
  assert.deepEqual(defaultResult.events, explicitResult.events);
  assert.deepEqual(defaultResult.modelNotes, explicitResult.modelNotes);
});

test("default run carries no sea-shell fields when the sea flag is absent", () => {
  const result = runToy(["--duration", "1"]);
  assert.equal(result.configuration.fccSeaShell, undefined);
  assert.equal(result.seaShellDiagnostics, undefined);
  assert.ok(!result.modelNotes.some((note) => note.includes("Sea-screened")));
});

test("fcc sea shell reproduces the computed wake-sum release projection and turns the outward release sub-field", () => {
  const result = runToy([
    "--fcc-sea-spacing",
    "4.25",
    "--prehistory-mode",
    "moving-prehistory",
    "--surface-speed-fraction",
    "0.95",
  ]);
  const sea = result.seaShellDiagnostics;
  assert.ok(sea, "sea-shell diagnostics must be present when the sea flag is active");
  // Release-instant cross-check against the computed dipole wake-sum row
  // sh_0_sea_dipole_wake_sum_source:2f3aad5e6cced01f at a_fcc = 4.25.
  assert.ok(
    Math.abs(sea.releaseSeaRadialProjection - -0.28334178890311773) < 1e-9,
    `release sea radial projection must match the computed wake-sum row, got ${sea.releaseSeaRadialProjection}`
  );
  assert.equal(sea.seaStats.missingHeldWindowRoots, 0, "declared held window must cover every sea root");
  assert.ok(sea.escapeCertificateEnvelopeCaveat.includes("partner sources only"));
  assert.equal(result.configuration.fccSeaShell.sourceCount, 72);
  assert.equal(
    result.configuration.fccSeaShell.wakeSumSourceRowRef,
    "sh_0_sea_dipole_wake_sum_source:2f3aad5e6cced01f"
  );
  // The isolated vt095 moving-prehistory row is outward-only; with the sea shell
  // active the outward release must show a return turn before the first recorded
  // field-speed crossing.
  const crossingTime = result.events.firstFieldSpeedCrossing?.time ?? Infinity;
  const returnTurn = result.trajectoryDiagnostics.radialTurnRows.find(
    (turn) => turn.turnKind === "expansion_to_compression"
  );
  assert.ok(returnTurn, "sea-screened vt095 must show an expansion_to_compression return turn");
  assert.ok(
    returnTurn.time < crossingTime,
    `return turn (${returnTurn.time}) must precede the field-speed crossing (${crossingTime})`
  );
  // Fail-closed discipline unchanged.
  assert.equal(result.trajectoryDiagnostics.retainedBranchClaim, false);
  assert.equal(result.trajectoryDiagnostics.scoreMovement, "no_score_increase");
});

test("sea-screened self-hit probe opens same-source roots exactly at the field-speed hinge", () => {
  const result = runToy([
    "--fcc-sea-spacing",
    "4.25",
    "--include-self-hits",
    "--prehistory-mode",
    "moving-prehistory",
    "--surface-speed-fraction",
    "0.95",
  ]);
  // Sub-field trajectories admit no same-source roots, so the sea-screened
  // return turn is self-hit-robust by construction and the first self root
  // must coincide with the first recorded field-speed crossing (the hinge).
  const firstSelfHit = result.events.firstSelfHitRoot;
  const crossing = result.events.firstFieldSpeedCrossing;
  assert.ok(firstSelfHit, "self-hit roots must open once the run crosses field speed");
  assert.equal(firstSelfHit.time, crossing.time, "first self root must sit at the hinge");
  const returnTurn = result.trajectoryDiagnostics.radialTurnRows.find(
    (turn) => turn.turnKind === "expansion_to_compression"
  );
  assert.ok(returnTurn && returnTurn.time < crossing.time, "sub-field return turn survives self-hit enablement");
  // The naive self-hit kernel ejects rather than absorbs: fail-closed discipline
  // and the self-hit probe authority label must be preserved.
  assert.ok(result.rootStats.selfHitRoots > 0);
  assert.equal(result.trajectoryDiagnostics.retainedBranchClaim, false);
  assert.equal(result.trajectoryDiagnostics.scoreMovement, "no_score_increase");
  assert.equal(
    result.closureDiagnostics.selfHitProbe.authority,
    "priority_only_toy_probe_not_accepted_evidence"
  );
});

test("fcc sea spacing below the shell overlap floor is rejected fail-closed", () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "braid-ideal-held-release-sea-reject-"));
  assert.throws(
    () =>
      execFileSync(process.execPath, [SCRIPT_PATH, "--fcc-sea-spacing", "2", "--out", outputDir], {
        encoding: "utf8",
        stdio: "pipe",
      }),
    /fcc-sea-spacing must be >=/
  );
});

test("stationary-held-release rejects a nonzero surface-speed fraction", () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "braid-ideal-held-release-reject-"));
  assert.throws(
    () =>
      execFileSync(
        process.execPath,
        [SCRIPT_PATH, "--surface-speed-fraction", "0.5", "--out", outputDir],
        { encoding: "utf8", stdio: "pipe" }
      ),
    /surface-speed-fraction > 0 requires/
  );
});

test("face-opposite group-velocity baseline separates center drift from same-level loss", () => {
  const result = runToy([
    "--field-speed",
    "1",
    "--coupling",
    "0.0277777777777778",
    "--duration",
    "18",
    "--dt",
    "0.024",
    "--group-velocity",
    "0.0166666666666667,0.0166666666666667,0.0166666666666667",
  ]);
  const wiggle = result.trajectoryDiagnostics;

  assert.deepEqual(result.configuration.groupVelocity, [
    0.0166666666666667,
    0.0166666666666667,
    0.0166666666666667,
  ]);
  assert.equal(result.configuration.fieldSpeed, 1);
  assert.equal(result.closureDiagnostics.status, "same_level_support_lost_in_translating_toy_window");
  assert.equal(result.closureDiagnostics.checks.centerResidualPass, true);
  assert.equal(wiggle.checks.centerWindowPass, true);
  assert.equal(wiggle.checks.rootCoveragePass, true);
  assert.equal(wiggle.checks.fieldSpeedPass, true);
  assert.equal(wiggle.status, "same_level_window_lost");
  assert.equal(result.closureDiagnostics.firstClosureBlocker, "common_sphere_antipodal_symmetry_not_preserved");
  assert.ok(result.finalMetrics.centerDriftResidual > 0);
  assert.ok(result.finalMetrics.radiusStd > 0);
  assert.ok(result.finalMetrics.pairOppositionMax > 0);
  assert.equal(result.closureDiagnostics.retainedBranchClaim, false);
  assert.equal(result.closureDiagnostics.scoreMovement, "no_score_increase");
});
