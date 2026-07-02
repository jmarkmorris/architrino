import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkerPath = path.join(
  repoRoot,
  "scripts/equation-mapping/eq20-pressure-effective-lambda-residual.mjs",
);
const sourceAttemptPath =
  "scripts/equation-mapping/eq20-theta-sea-rho-ns-outer-binary-pressure-source-attempt.v1.json";
const providerBackedSlicePath =
  "scripts/equation-mapping/eq20-provider-backed-pressure-effective-lambda-slice.v1.json";

function runEq20(inputPath) {
  const output = execFileSync(
    process.execPath,
    [checkerPath, "--input", inputPath, "--summary"],
    {
      cwd: repoRoot,
      encoding: "utf8",
    },
  );
  return JSON.parse(output);
}

test("theta_sea_rho_NS source-attempt computes outer-binary pressure diagnostics while score-neutral", () => {
  const report = runEq20(sourceAttemptPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_sea_rho_NS");
  assert.equal(report.rows.theta_sea_rho_NS.reason, "row_not_accepted");
  assert.equal(report.summary.outerBinaryStrainComputed, true);
  assert.equal(report.summary.outerBinaryStrainPass, true);
  assert.equal(report.summary.releaseChannelComputed, true);
  assert.equal(report.summary.releaseChannelPass, true);
  assert.equal(report.summary.pressureProjectionComputed, true);
  assert.equal(report.summary.pressureProjectionPass, true);
  assert.equal(report.outerBinaryStrain.computedStoredEnergy, 0.008);
  assert.equal(report.releaseChannelAvailability.computedEnergyCurrent, 0.039999999999999994);
  assert.equal(report.pressureProjection.computedEffectivePressure, -0.7);
});

test("provider-backed EQ-20 slice consumes accepted theta_sea_rho_NS provider", () => {
  const report = runEq20(providerBackedSlicePath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
  assert.equal(report.summary.nextBlocker, "missing_accepted_pressure_law_row");
  assert.equal(report.rows.theta_sea_rho_NS.accepted, true);
  assert.equal(report.rows.theta_sea_rho_NS.providerEvidence.accepted, true);
  assert.equal(
    report.rows.theta_sea_rho_NS.providerEvidence.providerStatus,
    "accepted",
  );
  assert.deepEqual(report.rows.theta_sea_rho_NS.providerEvidence.missingOrRejectedFields, []);
  assert.equal(report.carrierBinding.commonCarrierId, "theta-sea-density-compression-provider-0001");
  assert.equal(report.carrierBinding.passed, true);
  assert.equal(report.summary.missingSharedKeys.includes("rho_NS"), false);
  assert.equal(report.summary.missingSharedKeys.includes("n"), false);
  assert.equal(report.summary.missingSharedKeys.includes("u_sea"), false);
  assert.equal(report.summary.outerBinaryStrainPass, true);
  assert.equal(report.summary.releaseChannelPass, true);
  assert.equal(report.summary.pressureProjectionPass, true);
  assert.equal(report.summary.hiddenRetunePass, true);
  assert.equal(report.summary.inheritedFrwBlocker, "missing_accepted_theta_cos");
});

test("EQ-20 priority-source negative control remains rejected as retained evidence", () => {
  const report = runEq20(
    "scripts/equation-mapping/eq20-pressure-effective-lambda-priority-source-negative-control.v1.json",
  );

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_sea_rho_NS");
  assert.equal(report.rows.theta_sea_rho_NS.reason, "coordination_source_path");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
});

test("accepted-looking EQ-20 theta_sea_rho_NS row must cite accepted provider object", () => {
  const fixture = JSON.parse(
    fs.readFileSync(path.join(repoRoot, sourceAttemptPath), "utf8"),
  );
  fixture.packet.rows.theta_sea_rho_NS.status = "accepted";
  fixture.packet.rows.theta_sea_rho_NS.sourcePath =
    "scripts/equation-mapping/eq20-pressure-effective-lambda-residual.mjs";

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "eq20-pressure-"));
  const inputPath = path.join(tempDir, "generic-durable-source.json");
  fs.writeFileSync(inputPath, `${JSON.stringify(fixture)}\n`);

  const report = runEq20(inputPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_sea_rho_NS");
  assert.equal(report.rows.theta_sea_rho_NS.accepted, false);
  assert.equal(
    report.rows.theta_sea_rho_NS.reason,
    "theta_sea_rho_NS_provider_source_not_parseable_json",
  );
});

test("accepted-looking EQ-20 packet must still supply outer-binary strain diagnostics", () => {
  const fixture = JSON.parse(
    fs.readFileSync(path.join(repoRoot, sourceAttemptPath), "utf8"),
  );
  const durableSourcePath =
    "scripts/equation-mapping/eq20-pressure-effective-lambda-residual.mjs";
  const providerSourcePath =
    "scripts/spacetime/noether-sea-density-compression-provider.v1.json";

  for (const row of Object.values(fixture.packet.rows)) {
    row.status = "accepted";
    row.sourcePath = durableSourcePath;
  }
  fixture.packet.rows.theta_sea_rho_NS.sourcePath = providerSourcePath;
  for (const sharedKey of fixture.packet.sharedKeys) {
    sharedKey.id = `${sharedKey.key}_accepted_test`;
    sharedKey.status = "accepted";
    sharedKey.sourcePath = durableSourcePath;
  }
  fixture.packet.frwHandoff.status = "accepted";
  fixture.packet.frwHandoff.sourcePath = durableSourcePath;
  delete fixture.packet.frwHandoff.inheritedBlocker;
  delete fixture.packet.outerBinaryStrain;

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "eq20-pressure-"));
  const inputPath = path.join(tempDir, "accepted-no-outer-binary-strain.json");
  fs.writeFileSync(inputPath, `${JSON.stringify(fixture)}\n`);

  const report = runEq20(inputPath);

  assert.equal(report.summary.status, "blocked_missing_outer_binary_strain");
  assert.equal(report.summary.nextBlocker, "missing_outer_binary_strain");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
});
