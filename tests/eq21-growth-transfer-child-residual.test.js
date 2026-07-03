import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { growthTransferEvidenceStatusForPath } from "../scripts/equation-mapping/eq21-growth-transfer-evidence.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkerPath = path.join(
  repoRoot,
  "scripts/equation-mapping/eq21-growth-transfer-child-residual.mjs",
);
const acceptedPath =
  "scripts/equation-mapping/eq21-growth-transfer-child-accepted.v1.json";
const evidencePath =
  "scripts/equation-mapping/eq21-growth-transfer-child-evidence.v1.json";
const attemptPath =
  "scripts/equation-mapping/eq21-growth-transfer-child-attempt.v1.json";
const priorityControlPath =
  "scripts/equation-mapping/eq21-growth-transfer-child-priority-source-negative-control.v1.json";

function runGrowthChild(inputPath, extraArgs = []) {
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
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "eq21-growth-child-"));
  const inputPath = path.join(tempDir, name);
  fs.writeFileSync(inputPath, `${JSON.stringify(fixture)}\n`);
  return inputPath;
}

function setAllSourcePaths(fixture, sourcePath) {
  for (const row of Object.values(fixture.packet.rows)) {
    row.sourcePath = sourcePath;
  }
  for (const key of fixture.packet.sharedKeys) {
    key.sourcePath = sourcePath;
  }
  fixture.packet.model.sigma8Seed.sourcePath = sourcePath;
}

test("EQ-21 growth-transfer child evidence is accepted", () => {
  const status = growthTransferEvidenceStatusForPath(evidencePath, { repoRoot });

  assert.equal(status.accepted, true);
  assert.equal(status.reason, "accepted");
  assert.deepEqual(status.missingOrRejectedFields, []);
  assert.equal(status.thetaObsId, "theta_obs_provider_backed_no_retune_0001");
  assert.equal(status.growthTransferChildId, "eq21-growth-transfer-child-provider-backed-0001");
  assert.equal(status.model.derived.f_sigma8, 0.4165634684945517);
});

test("accepted EQ-21 growth-transfer child populates f_sigma8", () => {
  const report = runGrowthChild(acceptedPath, ["--require-populated"]);

  assert.equal(report.summary.status, "populated");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
  assert.equal(report.summary.nextBlocker, null);
  assert.deepEqual(report.summary.missingRows, []);
  assert.deepEqual(report.summary.missingSharedKeys, []);
  assert.equal(report.summary.parentSharedObservationAccepted, true);
  assert.equal(report.summary.sourceEvidenceAccepted, true);
  assert.equal(report.summary.hiddenRetuneNumericPass, true);
  assert.equal(report.summary.modelDerivedPass, true);
  assert.equal(report.summary.fSigma8ResidualPass, true);
  assert.equal(report.summary.noHiddenRetunePass, true);
  assert.equal(report.summary.fSigma8, 0.4165634684945517);
});

test("EQ-21 growth-transfer attempt stays blocked at missing child row", () => {
  const report = runGrowthChild(attemptPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_growth_transfer_child");
  assert.equal(report.rows.growth_transfer_child.reason, "row_not_accepted");
});

test("EQ-21 growth-transfer priority-source control is rejected as non-evidence", () => {
  const report = runGrowthChild(priorityControlPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_growth_transfer_child");
  assert.equal(
    report.rows.growth_transfer_child.reason,
    "growth_transfer_coordination_source_path",
  );
  assert.equal(report.sourceEvidence.failureCount, 15);
});

test("accepted-looking EQ-21 growth-transfer rows must cite growth-transfer evidence", () => {
  const fixture = JSON.parse(fs.readFileSync(path.join(repoRoot, acceptedPath), "utf8"));
  setAllSourcePaths(
    fixture,
    "scripts/equation-mapping/shared-observation-provider-backed-consumer-evidence.v1.json",
  );

  const report = runGrowthChild(writeTempFixture(fixture, "generic-durable-source.json"));

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_growth_transfer_child");
  assert.equal(
    report.rows.growth_transfer_child.reason,
    "growth_transfer_growth_transfer_evidence_fields_missing",
  );
});

test("EQ-21 growth-transfer child rejects hidden retune of inherited growth keys", () => {
  const fixture = JSON.parse(fs.readFileSync(path.join(repoRoot, acceptedPath), "utf8"));
  fixture.packet.sharedKeys.find((row) => row.key === "rho_A").value = 0.26;

  const report = runGrowthChild(writeTempFixture(fixture, "hidden-retune.json"));

  assert.equal(report.summary.status, "blocked_hidden_retune");
  assert.equal(report.summary.nextBlocker, "hidden_retune_rho_A");
  assert.equal(report.summary.hiddenRetuneNumericPass, false);
  assert.equal(report.sharedKeys.mismatches[0].key, "rho_A");
});
