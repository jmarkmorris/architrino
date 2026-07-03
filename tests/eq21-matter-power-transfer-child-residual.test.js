import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { matterPowerTransferEvidenceStatusForPath } from "../scripts/equation-mapping/eq21-matter-power-transfer-evidence.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkerPath = path.join(
  repoRoot,
  "scripts/equation-mapping/eq21-matter-power-transfer-child-residual.mjs",
);
const acceptedPath =
  "scripts/equation-mapping/eq21-matter-power-transfer-child-accepted.v1.json";
const evidencePath =
  "scripts/equation-mapping/eq21-matter-power-transfer-child-evidence.v1.json";
const attemptPath =
  "scripts/equation-mapping/eq21-matter-power-transfer-child-attempt.v1.json";
const priorityControlPath =
  "scripts/equation-mapping/eq21-matter-power-transfer-child-priority-source-negative-control.v1.json";

function runMatterPowerChild(inputPath, extraArgs = []) {
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
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "eq21-matter-power-child-"));
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
  fixture.packet.model.sigma8Seed.sourcePath = sourcePath;
  fixture.packet.model.seedSpectrum.sourcePath = sourcePath;
  fixture.packet.model.transferKernel.sourcePath = sourcePath;
}

test("EQ-21 matter-power transfer evidence is accepted", () => {
  const status = matterPowerTransferEvidenceStatusForPath(evidencePath, { repoRoot });

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
  assert.equal(status.model.derived.samples.length, 6);
  assert.equal(status.model.derived.matter_power_grid_normalized_residual, 0);
});

test("accepted EQ-21 matter-power child populates P(k,z)", () => {
  const report = runMatterPowerChild(acceptedPath, ["--require-populated"]);

  assert.equal(report.summary.status, "populated");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
  assert.equal(report.summary.nextBlocker, null);
  assert.deepEqual(report.summary.missingRows, []);
  assert.deepEqual(report.summary.missingSharedKeys, []);
  assert.equal(report.summary.parentSharedObservationAccepted, true);
  assert.equal(report.summary.parentGrowthTransferAccepted, true);
  assert.equal(report.summary.sourceEvidenceAccepted, true);
  assert.equal(report.summary.hiddenRetuneNumericPass, true);
  assert.equal(report.summary.modelDerivedPass, true);
  assert.equal(report.summary.matterPowerGridResidualPass, true);
  assert.equal(report.summary.noHiddenRetunePass, true);
  assert.equal(report.summary.sampleCount, 6);
  assert.equal(report.summary.matterPowerGridNormalizedResidual, 0);
});

test("EQ-21 matter-power attempt stays blocked at missing child row", () => {
  const report = runMatterPowerChild(attemptPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_matter_power_transfer_child");
  assert.equal(report.rows.matter_power_transfer_child.reason, "row_not_accepted");
});

test("EQ-21 matter-power priority-source control is rejected as non-evidence", () => {
  const report = runMatterPowerChild(priorityControlPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_matter_power_transfer_child");
  assert.equal(
    report.rows.matter_power_transfer_child.reason,
    "matter_power_coordination_source_path",
  );
  assert.equal(report.sourceEvidence.failureCount, 19);
});

test("accepted-looking EQ-21 matter-power rows must cite matter-power evidence", () => {
  const fixture = loadAcceptedFixture();
  setAllSourcePaths(
    fixture,
    "scripts/equation-mapping/eq21-growth-transfer-child-evidence.v1.json",
  );

  const report = runMatterPowerChild(
    writeTempFixture(fixture, "wrong-source-family.json"),
  );

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_matter_power_transfer_child");
  assert.equal(
    report.rows.matter_power_transfer_child.reason,
    "matter_power_matter_power_transfer_evidence_fields_missing",
  );
});

test("EQ-21 matter-power child rejects hidden retune of inherited shared keys", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.sharedKeys.find((row) => row.key === "rho_A").value = 0.26;

  const report = runMatterPowerChild(writeTempFixture(fixture, "hidden-retune.json"));

  assert.equal(report.summary.status, "blocked_hidden_retune");
  assert.equal(report.summary.nextBlocker, "hidden_retune_rho_A");
  assert.equal(report.summary.hiddenRetuneNumericPass, false);
  assert.equal(report.sharedKeys.mismatches[0].key, "rho_A");
});

test("EQ-21 matter-power child requires the accepted f-sigma8 parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.growthTransferChild.path =
    "scripts/equation-mapping/eq21-growth-transfer-child-attempt.v1.json";

  const report = runMatterPowerChild(
    writeTempFixture(fixture, "missing-growth-parent.json"),
  );

  assert.equal(report.summary.status, "blocked_parent_growth_transfer_child");
  assert.match(report.summary.nextBlocker, /^parent_growth_transfer_/);
  assert.equal(report.summary.parentGrowthTransferAccepted, false);
});

test("EQ-21 matter-power child rejects derived-grid mismatches", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.model.derived.samples[0].matter_power = 0;

  const report = runMatterPowerChild(
    writeTempFixture(fixture, "derived-mismatch.json"),
  );

  assert.equal(report.summary.status, "blocked_matter_power_model_derived_mismatch");
  assert.equal(
    report.summary.nextBlocker,
    "matter_power_model_derived_mismatch_samples.k0p02_z0.matter_power",
  );
  assert.equal(report.summary.modelDerivedPass, false);
});
