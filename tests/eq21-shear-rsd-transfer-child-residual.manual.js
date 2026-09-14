import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { shearRsdTransferEvidenceStatusForPath } from "../scripts/equation-mapping/eq21-shear-rsd-transfer-evidence.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkerPath = path.join(
  repoRoot,
  "scripts/equation-mapping/eq21-shear-rsd-transfer-child-residual.mjs",
);
const acceptedPath =
  "scripts/equation-mapping/eq21-shear-rsd-transfer-child-accepted.v1.json";
const evidencePath =
  "scripts/equation-mapping/eq21-shear-rsd-transfer-child-evidence.v1.json";
const attemptPath =
  "scripts/equation-mapping/eq21-shear-rsd-transfer-child-attempt.v1.json";
const priorityControlPath =
  "scripts/equation-mapping/eq21-shear-rsd-transfer-child-priority-source-negative-control.v1.json";

function runShearRsdChild(inputPath, extraArgs = []) {
  const output = execFileSync(
    process.execPath,
    [checkerPath, "--input", inputPath, "--summary", ...extraArgs],
    {
      cwd: repoRoot,
      encoding: "utf8",
    },
  );
  return JSON.parse(output);
}

function writeTempFixture(fixture, name) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "eq21-shear-rsd-child-"));
  const inputPath = path.join(tempDir, name);
  fs.writeFileSync(inputPath, `${JSON.stringify(fixture)}\n`);
  return inputPath;
}

function loadAcceptedFixture() {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, acceptedPath), "utf8"));
}

function setAllSourcePaths(fixture, sourcePath) {
  for (const row of Object.values(fixture.packet.rows)) {
    row.sourcePath = sourcePath;
  }
  for (const key of fixture.packet.sharedKeys) {
    key.sourcePath = sourcePath;
  }
  fixture.packet.model.shearRsdKernel.sourcePath = sourcePath;
}

test("EQ-21 shear/RSD transfer evidence is accepted", () => {
  const status = shearRsdTransferEvidenceStatusForPath(evidencePath, { repoRoot });

  assert.equal(status.accepted, true);
  assert.equal(status.reason, "accepted");
  assert.deepEqual(status.missingOrRejectedFields, []);
  assert.equal(status.thetaObsId, "theta_obs_provider_backed_no_retune_0001");
  assert.equal(
    status.growthTransferChildId,
    "eq21-growth-transfer-child-provider-backed-0001",
  );
  assert.equal(
    status.matterPowerTransferChildId,
    "eq21-matter-power-transfer-child-provider-backed-0001",
  );
  assert.equal(
    status.lensingTransferChildId,
    "eq21-lensing-transfer-child-provider-backed-0001",
  );
  assert.equal(
    status.shearRsdTransferChildId,
    "eq21-shear-rsd-transfer-child-provider-backed-0001",
  );
  assert.equal(status.model.derived.samples.length, 3);
  assert.equal(status.model.derived.shear_rsd_grid_normalized_residual, 0);
});

test("accepted EQ-21 shear/RSD child populates shear/RSD grid", () => {
  const report = runShearRsdChild(acceptedPath, ["--require-populated"]);

  assert.equal(report.summary.status, "populated");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
  assert.equal(report.summary.nextBlocker, null);
  assert.deepEqual(report.summary.missingRows, []);
  assert.deepEqual(report.summary.missingSharedKeys, []);
  assert.equal(report.summary.parentSharedObservationAccepted, true);
  assert.equal(report.summary.parentGrowthTransferAccepted, true);
  assert.equal(report.summary.parentMatterPowerTransferAccepted, true);
  assert.equal(report.summary.parentLensingTransferAccepted, true);
  assert.equal(report.summary.sourceEvidenceAccepted, true);
  assert.equal(report.summary.hiddenRetuneNumericPass, true);
  assert.equal(report.summary.modelDerivedPass, true);
  assert.equal(report.summary.shearRsdGridResidualPass, true);
  assert.equal(report.summary.noHiddenRetunePass, true);
  assert.equal(report.summary.sampleCount, 3);
  assert.equal(report.summary.shearRsdGridNormalizedResidual, 0);
});

test("EQ-21 shear/RSD attempt stays blocked at missing child row", () => {
  const report = runShearRsdChild(attemptPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_shear_rsd_transfer_child");
  assert.equal(report.rows.shear_rsd_transfer_child.reason, "row_not_accepted");
});

test("EQ-21 shear/RSD priority-source control is rejected as non-evidence", () => {
  const report = runShearRsdChild(priorityControlPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_shear_rsd_transfer_child");
  assert.equal(
    report.rows.shear_rsd_transfer_child.reason,
    "shear_rsd_coordination_source_path",
  );
  assert.equal(report.sourceEvidence.failureCount, 18);
});

test("accepted-looking EQ-21 shear/RSD rows must cite shear/RSD evidence", () => {
  const fixture = loadAcceptedFixture();
  setAllSourcePaths(
    fixture,
    "scripts/equation-mapping/eq21-matter-power-transfer-child-evidence.v1.json",
  );

  const report = runShearRsdChild(
    writeTempFixture(fixture, "wrong-source-family.json"),
  );

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_shear_rsd_transfer_child");
  assert.equal(
    report.rows.shear_rsd_transfer_child.reason,
    "shear_rsd_shear_rsd_transfer_evidence_fields_missing",
  );
});

test("EQ-21 shear/RSD child rejects hidden retune of inherited shared keys", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.sharedKeys.find((row) => row.key === "rho_A").value = 0.26;

  const report = runShearRsdChild(writeTempFixture(fixture, "hidden-retune.json"));

  assert.equal(report.summary.status, "blocked_hidden_retune");
  assert.equal(report.summary.nextBlocker, "hidden_retune_rho_A");
  assert.equal(report.summary.hiddenRetuneNumericPass, false);
  assert.equal(report.sharedKeys.mismatches[0].key, "rho_A");
});

test("EQ-21 shear/RSD child requires the accepted matter-power parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.matterPowerTransferChild.path =
    "scripts/equation-mapping/eq21-matter-power-transfer-child-attempt.v1.json";

  const report = runShearRsdChild(
    writeTempFixture(fixture, "missing-matter-parent.json"),
  );

  assert.equal(report.summary.status, "blocked_parent_matter_power_transfer_child");
  assert.match(report.summary.nextBlocker, /^parent_matter_power_transfer_/);
  assert.equal(report.summary.parentMatterPowerTransferAccepted, false);
});

test("EQ-21 shear/RSD child requires the accepted CMB-lensing parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.lensingTransferChild.path =
    "scripts/equation-mapping/eq21-lensing-transfer-child-attempt.v1.json";

  const report = runShearRsdChild(
    writeTempFixture(fixture, "missing-lensing-parent.json"),
  );

  assert.equal(report.summary.status, "blocked_parent_lensing_transfer_child");
  assert.match(report.summary.nextBlocker, /^parent_lensing_transfer_/);
  assert.equal(report.summary.parentLensingTransferAccepted, false);
});

test("EQ-21 shear/RSD child rejects derived-grid mismatches", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.model.derived.samples[0].shear_band_power = 0;

  const report = runShearRsdChild(
    writeTempFixture(fixture, "derived-mismatch.json"),
  );

  assert.equal(report.summary.status, "blocked_shear_rsd_model_derived_mismatch");
  assert.equal(
    report.summary.nextBlocker,
    "shear_rsd_model_derived_mismatch_samples.SR_L40_z1_k0p02.shear_band_power",
  );
  assert.equal(report.summary.modelDerivedPass, false);
});
