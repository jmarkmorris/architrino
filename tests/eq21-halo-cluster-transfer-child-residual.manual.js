import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { haloClusterTransferEvidenceStatusForPath } from "../scripts/equation-mapping/eq21-halo-cluster-transfer-evidence.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkerPath = path.join(
  repoRoot,
  "scripts/equation-mapping/eq21-halo-cluster-transfer-child-residual.mjs",
);
const acceptedPath =
  "scripts/equation-mapping/eq21-halo-cluster-transfer-child-accepted.v1.json";
const evidencePath =
  "scripts/equation-mapping/eq21-halo-cluster-transfer-child-evidence.v1.json";
const attemptPath =
  "scripts/equation-mapping/eq21-halo-cluster-transfer-child-attempt.v1.json";
const priorityControlPath =
  "scripts/equation-mapping/eq21-halo-cluster-transfer-child-priority-source-negative-control.v1.json";

function runHaloClusterChild(inputPath, extraArgs = []) {
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
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "eq21-halo-cluster-child-"));
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
  fixture.packet.model.haloClusterInversion.sourcePath = sourcePath;
}

test("EQ-21 halo/cluster transfer evidence is accepted", () => {
  const status = haloClusterTransferEvidenceStatusForPath(evidencePath, { repoRoot });

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
  assert.equal(status.model.derived.samples.length, 3);
  assert.ok(status.model.derived.halo_cluster_grid_normalized_residual <= 1e-12);
});

test("accepted EQ-21 halo/cluster child populates halo/cluster grid", () => {
  const report = runHaloClusterChild(acceptedPath, ["--require-populated"]);

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
  assert.equal(report.summary.sourceEvidenceAccepted, true);
  assert.equal(report.summary.hiddenRetuneNumericPass, true);
  assert.equal(report.summary.modelDerivedPass, true);
  assert.equal(report.summary.haloClusterGridResidualPass, true);
  assert.equal(report.summary.noHiddenRetunePass, true);
  assert.equal(report.summary.sampleCount, 3);
  assert.ok(report.summary.haloClusterGridNormalizedResidual <= 1e-12);
});

test("EQ-21 halo/cluster attempt stays blocked at missing child row", () => {
  const report = runHaloClusterChild(attemptPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_halo_cluster_transfer_child");
  assert.equal(report.rows.halo_cluster_transfer_child.reason, "row_not_accepted");
});

test("EQ-21 halo/cluster priority-source control is rejected as non-evidence", () => {
  const report = runHaloClusterChild(priorityControlPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_halo_cluster_transfer_child");
  assert.equal(
    report.rows.halo_cluster_transfer_child.reason,
    "halo_cluster_coordination_source_path",
  );
  assert.equal(report.sourceEvidence.failureCount, 19);
});

test("accepted-looking EQ-21 halo/cluster rows must cite halo/cluster evidence", () => {
  const fixture = loadAcceptedFixture();
  setAllSourcePaths(
    fixture,
    "scripts/equation-mapping/eq21-matter-power-transfer-child-evidence.v1.json",
  );

  const report = runHaloClusterChild(
    writeTempFixture(fixture, "wrong-source-family.json"),
  );

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_halo_cluster_transfer_child");
  assert.equal(
    report.rows.halo_cluster_transfer_child.reason,
    "halo_cluster_halo_cluster_transfer_evidence_fields_missing",
  );
});

test("EQ-21 halo/cluster child rejects hidden retune of inherited shared keys", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.sharedKeys.find((row) => row.key === "rho_A").value = 0.26;

  const report = runHaloClusterChild(writeTempFixture(fixture, "hidden-retune.json"));

  assert.equal(report.summary.status, "blocked_hidden_retune");
  assert.equal(report.summary.nextBlocker, "hidden_retune_rho_A");
  assert.equal(report.summary.hiddenRetuneNumericPass, false);
  assert.equal(report.sharedKeys.mismatches[0].key, "rho_A");
});

test("EQ-21 halo/cluster child requires the accepted shared-observation parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.sharedObservation.path =
    "scripts/equation-mapping/shared-observation-residual-attempt.v1.json";

  const report = runHaloClusterChild(
    writeTempFixture(fixture, "missing-shared-observation-parent.json"),
  );

  assert.equal(report.summary.status, "blocked_parent_shared_observation");
  assert.match(report.summary.nextBlocker, /^parent_shared_observation_/);
  assert.equal(report.summary.parentSharedObservationAccepted, false);
});

test("EQ-21 halo/cluster child requires the accepted growth parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.growthTransferChild.path =
    "scripts/equation-mapping/eq21-growth-transfer-child-attempt.v1.json";

  const report = runHaloClusterChild(
    writeTempFixture(fixture, "missing-growth-parent.json"),
  );

  assert.equal(report.summary.status, "blocked_parent_growth_transfer_child");
  assert.match(report.summary.nextBlocker, /^parent_growth_transfer_/);
  assert.equal(report.summary.parentGrowthTransferAccepted, false);
});

test("EQ-21 halo/cluster child requires the accepted matter-power parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.matterPowerTransferChild.path =
    "scripts/equation-mapping/eq21-matter-power-transfer-child-attempt.v1.json";

  const report = runHaloClusterChild(
    writeTempFixture(fixture, "missing-matter-parent.json"),
  );

  assert.equal(report.summary.status, "blocked_parent_matter_power_transfer_child");
  assert.match(report.summary.nextBlocker, /^parent_matter_power_transfer_/);
  assert.equal(report.summary.parentMatterPowerTransferAccepted, false);
});

test("EQ-21 halo/cluster child requires the accepted CMB-lensing parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.lensingTransferChild.path =
    "scripts/equation-mapping/eq21-lensing-transfer-child-attempt.v1.json";

  const report = runHaloClusterChild(
    writeTempFixture(fixture, "missing-lensing-parent.json"),
  );

  assert.equal(report.summary.status, "blocked_parent_lensing_transfer_child");
  assert.match(report.summary.nextBlocker, /^parent_lensing_transfer_/);
  assert.equal(report.summary.parentLensingTransferAccepted, false);
});

test("EQ-21 halo/cluster child requires the accepted shear/RSD parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.shearRsdTransferChild.path =
    "scripts/equation-mapping/eq21-shear-rsd-transfer-child-attempt.v1.json";

  const report = runHaloClusterChild(
    writeTempFixture(fixture, "missing-shear-rsd-parent.json"),
  );

  assert.equal(report.summary.status, "blocked_parent_shear_rsd_transfer_child");
  assert.match(report.summary.nextBlocker, /^parent_shear_rsd_transfer_/);
  assert.equal(report.summary.parentShearRsdTransferAccepted, false);
});

test("EQ-21 halo/cluster child rejects derived-grid mismatches", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.model.derived.samples[0].P_lensing = 0;

  const report = runHaloClusterChild(
    writeTempFixture(fixture, "derived-mismatch.json"),
  );

  assert.equal(report.summary.status, "blocked_halo_cluster_model_derived_mismatch");
  assert.equal(
    report.summary.nextBlocker,
    "halo_cluster_model_derived_mismatch_samples.HC_L40_z1_k0p02.P_lensing",
  );
  assert.equal(report.summary.modelDerivedPass, false);
});

test("EQ-21 halo/cluster child requires declared shear/RSD samples to exist", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.model.samples[0].shearRsdSampleId = "SR_missing";

  const report = runHaloClusterChild(
    writeTempFixture(fixture, "missing-shear-rsd-sample.json"),
  );

  assert.equal(report.summary.status, "blocked_halo_cluster_model_not_computed");
  assert.equal(report.summary.nextBlocker, "model.samples.shear_rsd_sample_exists");
});

test("EQ-21 halo/cluster child requires lensing links to match shear/RSD parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.model.samples[0].lensingSampleId = "L200_z1_k0p1";

  const report = runHaloClusterChild(
    writeTempFixture(fixture, "wrong-lensing-parent-link.json"),
  );

  assert.equal(report.summary.status, "blocked_halo_cluster_model_not_computed");
  assert.equal(report.summary.nextBlocker, "model.samples.lensing_shear_rsd_parent_match");
});

test("EQ-21 halo/cluster child requires matter links to match lensing parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.model.samples[0].matterSampleId = "k0p1_z1";

  const report = runHaloClusterChild(
    writeTempFixture(fixture, "wrong-matter-parent-link.json"),
  );

  assert.equal(report.summary.status, "blocked_halo_cluster_model_not_computed");
  assert.equal(report.summary.nextBlocker, "model.samples.matter_lensing_parent_match");
});
