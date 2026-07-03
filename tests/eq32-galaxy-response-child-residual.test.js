import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { galaxyResponseEvidenceStatusForPath } from "../scripts/equation-mapping/eq32-galaxy-response-evidence.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkerPath = path.join(
  repoRoot,
  "scripts/equation-mapping/eq32-galaxy-response-child-residual.mjs",
);
const acceptedPath =
  "scripts/equation-mapping/eq32-galaxy-response-child-accepted.v1.json";
const evidencePath =
  "scripts/equation-mapping/eq32-galaxy-response-child-evidence.v1.json";
const attemptPath =
  "scripts/equation-mapping/eq32-galaxy-response-child-attempt.v1.json";
const priorityControlPath =
  "scripts/equation-mapping/eq32-galaxy-response-child-priority-source-negative-control.v1.json";

function runGalaxyResponseChild(inputPath, extraArgs = []) {
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
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "eq32-galaxy-child-"));
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
  fixture.packet.model.galaxyResponse.sourcePath = sourcePath;
}

test("EQ-32 galaxy-response evidence is accepted", () => {
  const status = galaxyResponseEvidenceStatusForPath(evidencePath, { repoRoot });

  assert.equal(status.accepted, true);
  assert.equal(status.reason, "accepted");
  assert.deepEqual(status.missingOrRejectedFields, []);
  assert.equal(status.thetaObsId, "theta_obs_provider_backed_no_retune_0001");
  assert.equal(
    status.galaxyResponseChildId,
    "eq32-galaxy-response-child-provider-backed-0001",
  );
  assert.equal(status.deltaAStar, 0.0012);
  assert.equal(status.model.derived.sample_count, 3);
  assert.ok(status.model.derived.btfr_low_acceleration_residual <= 0.001);
  assert.ok(status.model.derived.high_acceleration_recovery_residual <= 0.002);
});

test("accepted EQ-32 galaxy-response child populates RAR and BTFR readouts", () => {
  const report = runGalaxyResponseChild(acceptedPath, ["--require-populated"]);

  assert.equal(report.summary.status, "populated");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
  assert.equal(report.summary.nextBlocker, null);
  assert.deepEqual(report.summary.missingRows, []);
  assert.deepEqual(report.summary.missingSharedKeys, []);
  assert.equal(report.summary.parentSharedObservationAccepted, true);
  assert.equal(report.summary.parentOutputProjectionAccepted, true);
  assert.equal(report.summary.deltaAStarAccepted, true);
  assert.equal(report.summary.sourceEvidenceAccepted, true);
  assert.equal(report.summary.hiddenRetuneNumericPass, true);
  assert.equal(report.summary.modelDerivedPass, true);
  assert.equal(report.summary.rarGridResidualPass, true);
  assert.equal(report.summary.btfrLowAccelerationPass, true);
  assert.equal(report.summary.highAccelerationRecoveryPass, true);
  assert.equal(report.summary.lensingDynamicsSplitPass, true);
  assert.equal(report.summary.noHiddenRetunePass, true);
  assert.equal(report.summary.sampleCount, 3);
  assert.equal(report.summary.rarGridNormalizedResidual, 0);
});

test("EQ-32 galaxy-response attempt stays blocked at missing child row", () => {
  const report = runGalaxyResponseChild(attemptPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_galaxy_response_child");
  assert.equal(report.rows.galaxy_response_child.reason, "row_not_accepted");
});

test("EQ-32 galaxy-response priority-source control is rejected as non-evidence", () => {
  const report = runGalaxyResponseChild(priorityControlPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_galaxy_response_child");
  assert.equal(
    report.rows.galaxy_response_child.reason,
    "coordination_source_path",
  );
  assert.ok(report.sourceEvidence.failureCount > 0);
});

test("accepted-looking EQ-32 galaxy rows must cite galaxy-response evidence", () => {
  const fixture = loadAcceptedFixture();
  setAllSourcePaths(
    fixture,
    "scripts/equation-mapping/shared-observation-provider-backed-consumer-evidence.v1.json",
  );

  const report = runGalaxyResponseChild(
    writeTempFixture(fixture, "wrong-source-family.json"),
  );

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_galaxy_response_child");
  assert.equal(
    report.rows.galaxy_response_child.reason,
    "galaxy_response_evidence_fields_missing",
  );
});

test("EQ-32 galaxy-response child rejects hidden retune of inherited shared keys", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.sharedKeys.find((row) => row.key === "rho_A").value = 0.26;

  const report = runGalaxyResponseChild(
    writeTempFixture(fixture, "hidden-retune.json"),
  );

  assert.equal(report.summary.status, "blocked_hidden_retune");
  assert.equal(report.summary.nextBlocker, "hidden_retune_rho_A");
  assert.equal(report.summary.hiddenRetuneNumericPass, false);
  assert.equal(report.sharedKeys.mismatches[0].key, "rho_A");
});

test("EQ-32 galaxy-response child requires the accepted shared-observation parent", () => {
  const fixture = loadAcceptedFixture();
  fixture.sharedObservation.path =
    "scripts/equation-mapping/shared-observation-residual-attempt.v1.json";

  const report = runGalaxyResponseChild(
    writeTempFixture(fixture, "missing-shared-observation-parent.json"),
  );

  assert.equal(report.summary.status, "blocked_parent_shared_observation");
  assert.match(report.summary.nextBlocker, /^parent_shared_observation_/);
  assert.equal(report.summary.parentSharedObservationAccepted, false);
});

test("EQ-32 galaxy-response child requires accepted delta_a_star output projection", () => {
  const fixture = loadAcceptedFixture();
  fixture.outputProjection.path =
    "scripts/spacetime/noether-sea-density-compression-eq32-delta-a-star-source-attempt.v1.json";

  const report = runGalaxyResponseChild(
    writeTempFixture(fixture, "missing-output-projection-parent.json"),
  );

  assert.equal(report.summary.status, "blocked_parent_output_projection");
  assert.match(report.summary.nextBlocker, /^parent_output_projection_/);
  assert.equal(report.summary.parentOutputProjectionAccepted, false);
});

test("EQ-32 galaxy-response child requires low and high acceleration samples", () => {
  const fixture = loadAcceptedFixture();
  fixture.packet.model.samples = fixture.packet.model.samples.filter(
    (sample) => sample.regime !== "high_acceleration",
  );

  const report = runGalaxyResponseChild(
    writeTempFixture(fixture, "missing-high-sample.json"),
  );

  assert.equal(report.summary.status, "blocked_model");
  assert.equal(report.summary.nextBlocker, "model.samples.low_transition_high_grid");
  assert.equal(report.summary.modelComputed, false);
});
