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
const pressureProjectionReportPath =
  "scripts/equation-mapping/eq20-delta-p-eff-pressure-projection-report.v1.json";
const pressureProjectionReportRows = [
  "pressure_law_row",
  "sea_pressure_row",
  "sea_tension_row",
  "relaxation_memory_row",
  "effective_density_row",
  "effective_pressure_row",
  "effective_coupling_row",
  "effective_lambda_row",
  "frw_handoff",
  "source_provenance",
  "no_hidden_retune_witness",
];

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

test("provider-backed EQ-20 slice consumes accepted density provider and retained delta_P_eff report", () => {
  const report = runEq20(providerBackedSlicePath);

  assert.equal(report.summary.status, "populated");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
  assert.equal(report.summary.nextBlocker, null);
  assert.deepEqual(report.summary.missingRows, []);
  assert.deepEqual(report.summary.missingSharedKeys, []);
  assert.equal(report.rows.theta_sea_rho_NS.accepted, true);
  assert.equal(report.rows.theta_sea_rho_NS.providerEvidence.accepted, true);
  assert.equal(
    report.rows.theta_sea_rho_NS.providerEvidence.providerStatus,
    "accepted",
  );
  assert.deepEqual(report.rows.theta_sea_rho_NS.providerEvidence.missingOrRejectedFields, []);
  assert.equal(report.rows.pressure_law_row.accepted, true);
  assert.equal(report.rows.pressure_law_row.pressureProjectionEvidence.accepted, true);
  assert.equal(
    report.rows.pressure_law_row.pressureProjectionEvidence.commonCarrierId,
    "theta-sea-density-compression-provider-0001",
  );
  assert.deepEqual(
    report.rows.pressure_law_row.pressureProjectionEvidence.missingOrRejectedFields,
    [],
  );
  assert.equal(report.carrierBinding.commonCarrierId, "theta-sea-density-compression-provider-0001");
  assert.equal(report.carrierBinding.passed, true);
  assert.equal(report.summary.missingSharedKeys.includes("rho_NS"), false);
  assert.equal(report.summary.missingSharedKeys.includes("n"), false);
  assert.equal(report.summary.missingSharedKeys.includes("u_sea"), false);
  assert.equal(report.summary.outerBinaryStrainPass, true);
  assert.equal(report.summary.releaseChannelPass, true);
  assert.equal(report.summary.pressureProjectionPass, true);
  assert.equal(report.summary.hiddenRetunePass, true);
  assert.equal(report.summary.inheritedFrwBlocker, null);
  assert.equal(report.frwHandoff.rowReason, "accepted");
  assert.equal(report.summary.frwHandoffAccepted, true);
  assert.equal(report.summary.frwHandoffPass, true);
  assert.equal(report.frwHandoff.handoffEvidence.accepted, true);
  assert.equal(report.frwHandoff.thetaCosId, "theta_cos_FRW_handoff_0001");
  assert.equal(report.frwHandoff.thetaCosIdMatches, true);
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

test("accepted-looking EQ-20 pressure row must cite retained delta_P_eff pressure report", () => {
  const fixture = JSON.parse(
    fs.readFileSync(path.join(repoRoot, providerBackedSlicePath), "utf8"),
  );
  fixture.packet.rows.pressure_law_row.sourcePath =
    "scripts/equation-mapping/eq20-pressure-effective-lambda-residual.mjs";

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "eq20-pressure-"));
  const inputPath = path.join(tempDir, "generic-pressure-source.json");
  fs.writeFileSync(inputPath, `${JSON.stringify(fixture)}\n`);

  const report = runEq20(inputPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_pressure_law_row");
  assert.equal(report.rows.pressure_law_row.accepted, false);
  assert.equal(
    report.rows.pressure_law_row.reason,
    "eq20_delta_P_eff_pressure_projection_source_not_parseable_json",
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
  const commonCarrierId = "theta-sea-density-compression-provider-0001";

  fixture.packet.commonCarrierId = commonCarrierId;
  for (const [rowId, row] of Object.entries(fixture.packet.rows)) {
    row.status = "accepted";
    row.carrierId = commonCarrierId;
    row.sourcePath = durableSourcePath;
    if (pressureProjectionReportRows.includes(rowId)) {
      row.sourcePath = pressureProjectionReportPath;
    }
  }
  fixture.packet.rows.theta_sea_rho_NS.sourcePath = providerSourcePath;
  for (const sharedKey of fixture.packet.sharedKeys) {
    sharedKey.id = `${sharedKey.key}_accepted_test`;
    sharedKey.status = "accepted";
    sharedKey.sourcePath = durableSourcePath;
  }
  fixture.packet.frwHandoff.status = "accepted";
  fixture.packet.frwHandoff.sourcePath = pressureProjectionReportPath;
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
