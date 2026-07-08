import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/interior-axial-potential-gradient-diagnostic.mjs", import.meta.url)
);

function runDiagnostic(args = []) {
  const stdout = execFileSync(
    process.execPath,
    [
      SCRIPT_PATH,
      "--surface-speed-fractions",
      "0.6",
      "--time-samples",
      "24",
      "--axial-samples",
      "25",
      "--grid-rho-samples",
      "9",
      "--grid-z-samples",
      "17",
      "--candidate-spacings",
      "0.2,0.4",
      ...args,
    ],
    { encoding: "utf8" }
  );
  return JSON.parse(stdout);
}

const report = runDiagnostic();
const row = report.channelRows[0];

test("interior potential-gradient diagnostic stays fail-closed and test-charge diagnostic-only", () => {
  assert.equal(report.schema, "braid-ideal-interior-axial-potential-gradient-diagnostic.v1");
  assert.equal(report.status, "priority_only_test_charge_diagnostic");
  assert.equal(report.priorityOnly, true);
  assert.equal(report.testChargeLevel, true);
  assert.equal(report.retainedBranchClaim, false);
  assert.equal(report.acceptedEvidenceClaim, false);
  assert.equal(report.weakChannelClaim, false);
  assert.equal(report.scoreMovement, "no_score_increase");
  assert.match(report.channelProofRef, /six-point-symmetry-invariant-lemma-proof-packet\.md/);
  assert.match(report.owningStructuralSlot, /central_inventory_inside_hollow_support/);
  assert.match(report.terminology, /superposed delayed potential/);
  assert.ok(typeof report.firstBlocker === "string" && report.firstBlocker.length > 0);
  assert.ok(report.missingAcceptedFields.includes("retained_branch_certificate"));
  assert.ok(report.missingAcceptedFields.includes("central_solver_retained_history_row"));
});

test("on-axis delayed superposition is static and matches the softened analytic center gradient", () => {
  // Rigid rotation about n_hat keeps axis-point separations and source-normal
  // speeds constant, so the on-axis superposed delayed potential is exactly
  // static; the sampled residual is finite-difference noise only.
  assert.equal(row.onAxisStaticityHolds, true);
  assert.ok(row.onAxisStaticityResidual < 1e-8);
  // Center axial gradient: 6 kappa h / (R^2 + eps^2)^(3/2), h = R/sqrt(3).
  const analytic = (6 * (1 / Math.sqrt(3))) / (1 + 0.05 * 0.05) ** 1.5;
  assert.ok(
    Math.abs(row.polaritySorting.interiorAxialGradientAtCenter - analytic) < 1e-6,
    `center gradient ${row.polaritySorting.interiorAxialGradientAtCenter} vs analytic ${analytic}`
  );
});

test("leading-order polarity sorting survives the delayed computation", () => {
  assert.equal(row.polaritySorting.pushesEpsilonMinusTowardPositrinoFace, true);
  assert.equal(row.polaritySorting.pushesEpsilonPlusTowardElectrinoFace, true);
  assert.equal(row.polaritySorting.leadingOrderConclusionSurvivesDelayedComputation, true);
  assert.ok(row.polaritySorting.interiorAxialGradientMin > 0);
  assert.equal(row.channelGeometry.positrinoFaceDirection, "+n_hat");
});

test("trap analysis reports an interior minimum with positive sampled depth and iota mirror symmetry", () => {
  const trapMinus = row.trapAnalysis.epsilonMinus;
  const trapPlus = row.trapAnalysis.epsilonPlus;
  assert.equal(trapMinus.trapMinimumExists, true);
  assert.ok(trapMinus.trapDepth > 0);
  assert.ok(trapMinus.escapeLevel > trapMinus.trapMinimum.uEff);
  // epsilon_- minimum sits on the positrino-face side; iota mirrors it.
  assert.ok(trapMinus.trapMinimum.z > 0);
  assert.ok(trapPlus.trapMinimum.z < 0);
  assert.ok(Math.abs(trapMinus.trapMinimum.uEff - trapPlus.trapMinimum.uEff) < 1e-6);
});

test("accessory mutual repulsion dominates trap depth at every candidate spacing in this configuration", () => {
  const comparison = row.mechanismComparison;
  assert.ok(comparison.rows.length > 0);
  for (const comparisonRow of comparison.rows) {
    assert.equal(comparisonRow.supported, false);
    assert.ok(typeof comparisonRow.firstBlocker === "string");
  }
  assert.equal(comparison.supportedAtSomeCandidateSpacing, false);
  assert.equal(
    report.mechanismDecision,
    "ponderomotive_accessory_confinement_disfavored_origin_cluster_repulsion_objection_reinstated"
  );
  assert.equal(report.firstBlocker, "trap_depth_below_accessory_mutual_repulsion_at_all_candidate_spacings");
});

test("diagnostic rejects super-field-speed channel fractions and unknown arguments", () => {
  assert.throws(
    () =>
      execFileSync(process.execPath, [SCRIPT_PATH, "--surface-speed-fractions", "1.2"], {
        encoding: "utf8",
        stdio: "pipe",
      }),
    /must lie in \(0,1\)/
  );
  assert.throws(
    () =>
      execFileSync(process.execPath, [SCRIPT_PATH, "--not-a-flag"], {
        encoding: "utf8",
        stdio: "pipe",
      }),
    /Unknown argument/
  );
});
