import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { sharedObservationEvidenceStatusForPath } from "../scripts/equation-mapping/shared-observation-evidence.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkerPath = path.join(
  repoRoot,
  "scripts/equation-mapping/shared-observation-residual.mjs",
);
const acceptedPath =
  "scripts/equation-mapping/shared-observation-provider-backed-consumer-accepted.v1.json";
const evidencePath =
  "scripts/equation-mapping/shared-observation-provider-backed-consumer-evidence.v1.json";
const attemptPath =
  "scripts/equation-mapping/shared-observation-residual-attempt.v1.json";
const priorityControlPath =
  "scripts/equation-mapping/shared-observation-priority-source-negative-control.v1.json";

function runSharedObservation(inputPath, extraArgs = []) {
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
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "shared-observation-"));
  const inputPath = path.join(tempDir, name);
  fs.writeFileSync(inputPath, `${JSON.stringify(fixture)}\n`);
  return inputPath;
}

function setAllSourcePaths(fixture, sourcePath) {
  fixture.observationRecord.sourcePath = sourcePath;
  for (const row of Object.values(fixture.observationRecord.subrecords)) {
    row.sourcePath = sourcePath;
  }
  fixture.observationRecord.frwHandoff.sourcePath = sourcePath;
  fixture.observationRecord.thermalProvenanceLedger.sourcePath = sourcePath;
  fixture.observationRecord.noHiddenRetuneWitness.sourcePath = sourcePath;
  for (const projection of Object.values(fixture.projections)) {
    projection.sourcePath = sourcePath;
  }
  for (const key of fixture.sharedKeys) {
    key.sourcePath = sourcePath;
  }
}

test("shared-observation provider-backed evidence is accepted", () => {
  const status = sharedObservationEvidenceStatusForPath(evidencePath, { repoRoot });

  assert.equal(status.accepted, true);
  assert.equal(status.reason, "accepted");
  assert.deepEqual(status.missingOrRejectedFields, []);
  assert.equal(status.providerWindowId, "theta-sea-density-compression-provider-0001");
  assert.equal(status.thetaWId, "theta_W_static_weak_provider_backed_0001");
  assert.equal(status.thetaCosId, "theta_cos_FRW_handoff_0001");
});

test("accepted shared-observation consumer populates growth, CMB, and RAR rows", () => {
  const report = runSharedObservation(acceptedPath);

  assert.equal(report.summary.status, "populated");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
  assert.equal(report.summary.nextBlocker, null);
  assert.deepEqual(report.summary.missingProjectionFamilies, []);
  assert.deepEqual(report.summary.missingSharedKeys, []);
  assert.equal(report.summary.sourceEvidenceAccepted, true);
  assert.equal(report.summary.projectionFamiliesAccepted, true);
  assert.equal(report.summary.hiddenRetuneNumericPass, true);
  assert.equal(report.projections.families.CMB.reason, "accepted");
  assert.equal(report.projections.families.growth.reason, "accepted");
  assert.equal(report.projections.families.RAR.reason, "accepted");
});

test("shared-observation attempt stays blocked at missing theta_obs", () => {
  const report = runSharedObservation(attemptPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_obs");
  assert.equal(report.rows.theta_obs.reason, "row_not_accepted");
});

test("shared-observation priority-source control is rejected as non-evidence", () => {
  const report = runSharedObservation(priorityControlPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_obs");
  assert.equal(report.rows.theta_obs.reason, "coordination_source_path");
});

test("accepted-looking shared-observation rows must cite shared-observation evidence", () => {
  const fixture = JSON.parse(fs.readFileSync(path.join(repoRoot, acceptedPath), "utf8"));
  setAllSourcePaths(
    fixture,
    "scripts/spacetime/noether-sea-density-compression-provider-output-projection.v1.json",
  );

  const report = runSharedObservation(
    writeTempFixture(fixture, "generic-durable-source.json"),
  );

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_obs");
  assert.equal(
    report.rows.theta_obs.reason,
    "shared_observation_shared_observation_evidence_fields_missing",
  );
});
