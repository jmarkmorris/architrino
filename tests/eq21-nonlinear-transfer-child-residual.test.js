import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { nonlinearTransferEvidenceStatusForPath } from "../scripts/equation-mapping/eq21-nonlinear-transfer-evidence.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkerPath = path.join(
  repoRoot,
  "scripts/equation-mapping/eq21-nonlinear-transfer-child-residual.mjs",
);
const acceptedPath =
  "scripts/equation-mapping/eq21-nonlinear-transfer-child-accepted.v1.json";
const evidencePath =
  "scripts/equation-mapping/eq21-nonlinear-transfer-child-evidence.v1.json";
const attemptPath =
  "scripts/equation-mapping/eq21-nonlinear-transfer-child-attempt.v1.json";
const priorityControlPath =
  "scripts/equation-mapping/eq21-nonlinear-transfer-child-priority-source-negative-control.v1.json";

function runNonlinearChild(inputPath, extraArgs = []) {
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
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "eq21-nonlinear-child-"));
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
  fixture.packet.model.nonlinearTransfer.sourcePath = sourcePath;
}

test("EQ-21 nonlinear transfer evidence is accepted", () => {
  const status = nonlinearTransferEvidenceStatusForPath(evidencePath, { repoRoot });

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
  assert.equal(
    status.haloClusterTransferChildId,
    "eq21-halo-cluster-transfer-child-provider-backed-0001",
  );
  assert.equal(
    status.nonlinearTransferChildId,
    "eq21-nonlinear-transfer-child-provider-backed-0001",
  );
  assert.equal(status.model.derived.samples.length, 3);
  assert.equal(status.model.derived.nonlinear_order, 1);
  assert.ok(status.model.derived.nonlinear_grid_normalized_residual <= 1e-12);
});

test("accepted EQ-21 nonlinear child populates nonlinear grid", () => {
  const report = runNonlinearChild(acceptedPath, ["--require-populated"]);

  assert.equal(report.summary.status, "populated");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
  assert.equal(report.summary.nextBlocker, null);
  assert.deepEqual(report.summary.missingRows, []);
  assert.deepEqual(report.summary.missingSharedKeys, []);
  assert.equal(report.summary.parentSharedObservationAccepted, true);
  assert.equal(report.summary.parentGrowthTransferAccepted, true);
  assert.equal(report.summary.parentMatterPowerTransferAccepted, true);
  assert.equal(report.summary.parentLensingTransferAccepted, true);
  assert.equal(report.summary.parentShearRsdTransferAccepted, true);
  assert.equal(report.summary.parentHaloClusterTransferAccepted, true);
  assert.equal(report.summary.sourceEvidenceAccepted, true);
  assert.equal(report.summary.hiddenRetuneNumericPass, true);
  assert.equal(report.summary.modelDerivedPass, true);
  assert.equal(report.summary.nonlinearGridResidualPass, true);
  assert.equal(report.summary.noHiddenRetunePass, true);
  assert.equal(report.summary.sampleCount, 3);
  assert.ok(report.summary.nonlinearGridNormalizedResidual <= 1e-12);
});

test("EQ-21 nonlinear attempt stays blocked at missing child row", () => {
  const report = runNonlinearChild(attemptPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_nonlinear_transfer_child");
  assert.equal(report.rows.nonlinear_transfer_child.reason, "row_not_accepted");
});

test("EQ-21 nonlinear priority-source control is rejected as non-evidence", () => {
  const report = runNonlinearChild(priorityControlPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_nonlinear_transfer_child");
  assert.equal(
    report.rows.nonlinear_transfer_child.reason,
    "nonlinear_coordination_source_path",
  );
  assert.equal(report.sourceEvidence.failureCount, 20);
});

test("accepted-looking EQ-21 nonlinear rows must cite nonlinear evidence", () => {
  const fixture = loadAcceptedFixture();
  setAllSourcePaths(
    fixture,
    "scripts/equation-mapping/eq21-matter-power-transfer-child-evidence.v1.json",
  );

  const report = runNonlinearChild(
    writeTempFixture(fixture, "wrong-source-family.json"),
  );

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_nonlinear_transfer_child");
  assert.equal(
    report.rows.nonlinear_transfer_child.reason,
    "nonlinear_nonlinear_transfer_evidence_fields_missing",
  );
});

test("EQ-21 nonlinear child rejects hidden retune of inherited shared keys", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.sharedKeys.find((row) => row.key === "rho_A").value = 0.26;

  const report = runNonlinearChild(writeTempFixture(fixture, "hidden-retune.json"));

  assert.equal(report.summary.status, "blocked_hidden_retune");
  assert.equal(report.summary.nextBlocker, "hidden_retune_rho_A");
  assert.equal(report.summary.hiddenRetuneNumericPass, false);
  assert.equal(report.sharedKeys.mismatches[0].key, "rho_A");
});

test("EQ-21 nonlinear child requires the accepted shared-observation parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.sharedObservation.path =
    "scripts/equation-mapping/shared-observation-residual-attempt.v1.json";

  const report = runNonlinearChild(
    writeTempFixture(fixture, "missing-shared-observation-parent.json"),
  );

  assert.equal(report.summary.status, "blocked_parent_shared_observation");
  assert.match(report.summary.nextBlocker, /^parent_shared_observation_/);
  assert.equal(report.summary.parentSharedObservationAccepted, false);
});

test("EQ-21 nonlinear child requires the accepted growth parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.growthTransferChild.path =
    "scripts/equation-mapping/eq21-growth-transfer-child-attempt.v1.json";

  const report = runNonlinearChild(
    writeTempFixture(fixture, "missing-growth-parent.json"),
  );

  assert.equal(report.summary.status, "blocked_parent_growth_transfer_child");
  assert.match(report.summary.nextBlocker, /^parent_growth_transfer_/);
  assert.equal(report.summary.parentGrowthTransferAccepted, false);
});

test("EQ-21 nonlinear child requires the accepted matter-power parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.matterPowerTransferChild.path =
    "scripts/equation-mapping/eq21-matter-power-transfer-child-attempt.v1.json";

  const report = runNonlinearChild(
    writeTempFixture(fixture, "missing-matter-parent.json"),
  );

  assert.equal(report.summary.status, "blocked_parent_matter_power_transfer_child");
  assert.match(report.summary.nextBlocker, /^parent_matter_power_transfer_/);
  assert.equal(report.summary.parentMatterPowerTransferAccepted, false);
});

test("EQ-21 nonlinear child requires the accepted CMB-lensing parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.lensingTransferChild.path =
    "scripts/equation-mapping/eq21-lensing-transfer-child-attempt.v1.json";

  const report = runNonlinearChild(
    writeTempFixture(fixture, "missing-lensing-parent.json"),
  );

  assert.equal(report.summary.status, "blocked_parent_lensing_transfer_child");
  assert.match(report.summary.nextBlocker, /^parent_lensing_transfer_/);
  assert.equal(report.summary.parentLensingTransferAccepted, false);
});

test("EQ-21 nonlinear child requires the accepted shear/RSD parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.shearRsdTransferChild.path =
    "scripts/equation-mapping/eq21-shear-rsd-transfer-child-attempt.v1.json";

  const report = runNonlinearChild(
    writeTempFixture(fixture, "missing-shear-rsd-parent.json"),
  );

  assert.equal(report.summary.status, "blocked_parent_shear_rsd_transfer_child");
  assert.match(report.summary.nextBlocker, /^parent_shear_rsd_transfer_/);
  assert.equal(report.summary.parentShearRsdTransferAccepted, false);
});

test("EQ-21 nonlinear child requires the accepted halo/cluster parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.haloClusterTransferChild.path =
    "scripts/equation-mapping/eq21-halo-cluster-transfer-child-attempt.v1.json";

  const report = runNonlinearChild(
    writeTempFixture(fixture, "missing-halo-cluster-parent.json"),
  );

  assert.equal(report.summary.status, "blocked_parent_halo_cluster_transfer_child");
  assert.match(report.summary.nextBlocker, /^parent_halo_cluster_transfer_/);
  assert.equal(report.summary.parentHaloClusterTransferAccepted, false);
});

test("EQ-21 nonlinear child rejects derived-grid mismatches", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.model.derived.samples[0].P_nonlinear = 0;

  const report = runNonlinearChild(
    writeTempFixture(fixture, "derived-mismatch.json"),
  );

  assert.equal(report.summary.status, "blocked_nonlinear_model_derived_mismatch");
  assert.equal(
    report.summary.nextBlocker,
    "nonlinear_model_derived_mismatch_samples.NL_L40_z1_k0p02.P_nonlinear",
  );
  assert.equal(report.summary.modelDerivedPass, false);
});

test("EQ-21 nonlinear child requires declared halo/cluster samples to exist", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.model.samples[0].haloClusterSampleId = "HC_missing";

  const report = runNonlinearChild(
    writeTempFixture(fixture, "missing-halo-cluster-sample.json"),
  );

  assert.equal(report.summary.status, "blocked_nonlinear_model_not_computed");
  assert.equal(report.summary.nextBlocker, "model.samples.halo_cluster_sample_exists");
});

test("EQ-21 nonlinear child requires shear/RSD links to match halo/cluster parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.model.samples[0].shearRsdSampleId = "SR_L200_z1_k0p1";

  const report = runNonlinearChild(
    writeTempFixture(fixture, "wrong-shear-rsd-parent-link.json"),
  );

  assert.equal(report.summary.status, "blocked_nonlinear_model_not_computed");
  assert.equal(
    report.summary.nextBlocker,
    "model.samples.shear_rsd_halo_cluster_parent_match",
  );
});

test("EQ-21 nonlinear child requires lensing links to match halo/cluster parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.model.samples[0].lensingSampleId = "L200_z1_k0p1";

  const report = runNonlinearChild(
    writeTempFixture(fixture, "wrong-lensing-parent-link.json"),
  );

  assert.equal(report.summary.status, "blocked_nonlinear_model_not_computed");
  assert.equal(
    report.summary.nextBlocker,
    "model.samples.lensing_halo_cluster_parent_match",
  );
});

test("EQ-21 nonlinear child requires matter links to match halo/cluster parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.model.samples[0].matterSampleId = "k0p1_z1";

  const report = runNonlinearChild(
    writeTempFixture(fixture, "wrong-matter-parent-link.json"),
  );

  assert.equal(report.summary.status, "blocked_nonlinear_model_not_computed");
  assert.equal(
    report.summary.nextBlocker,
    "model.samples.matter_halo_cluster_parent_match",
  );
});
