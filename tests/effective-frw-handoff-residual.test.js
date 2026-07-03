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
  "scripts/equation-mapping/effective-frw-handoff-residual.mjs",
);
const acceptedHandoffPath =
  "scripts/equation-mapping/effective-frw-handoff-theta-cos-accepted.v1.json";
const attemptPath =
  "scripts/equation-mapping/effective-frw-handoff-attempt.v1.json";
const prioritySourceNegativeControlPath =
  "scripts/equation-mapping/effective-frw-handoff-priority-source-negative-control.v1.json";
const selfReferenceNegativeControlPath =
  "scripts/equation-mapping/effective-frw-handoff-self-reference-negative-control.v1.json";

function runEffectiveFrw(inputPath) {
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

test("accepted theta_cos handoff populates the effective-FRW residual", () => {
  const report = runEffectiveFrw(acceptedHandoffPath);

  assert.equal(report.summary.status, "populated");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
  assert.deepEqual(report.summary.missingRows, []);
  assert.deepEqual(report.summary.missingSharedKeys, []);
  assert.equal(report.summary.nextBlocker, null);
  assert.equal(report.summary.sourceEvidenceFailureCount, 0);
  assert.equal(report.rows.theta_cos.accepted, true);
  assert.equal(report.rows.theta_cos.handoffEvidence.accepted, true);
  assert.equal(
    report.rows.theta_cos.handoffEvidence.thetaCosId,
    "theta_cos_FRW_handoff_0001",
  );
  assert.equal(report.summary.frwHubblePass, true);
  assert.equal(report.summary.friedmannResidualPass, true);
  assert.equal(report.summary.continuityResidualPass, true);
  assert.equal(report.summary.fixedVoidPass, true);
  assert.equal(report.summary.hiddenRetunePass, true);
});

test("effective-FRW attempt fixture stays blocked at missing accepted theta_cos", () => {
  const report = runEffectiveFrw(attemptPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_cos");
  assert.equal(report.rows.theta_cos.reason, "row_not_accepted");
});

test("effective-FRW priority-source negative control is rejected as non-evidence", () => {
  const report = runEffectiveFrw(prioritySourceNegativeControlPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "accepted_without_evidence_source");
  assert.equal(report.summary.sourceEvidenceFailureCount, 20);
  assert.equal(report.rows.theta_cos.accepted, false);
  assert.equal(report.rows.theta_cos.reason, "accepted_without_evidence_source");
  assert.equal(report.rows.theta_cos.sourceReason, "coordination_source_path");
});

test("effective-FRW self-reference negative control is rejected as non-evidence", () => {
  const report = runEffectiveFrw(selfReferenceNegativeControlPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "accepted_without_evidence_source");
  assert.equal(report.rows.theta_cos.accepted, false);
  assert.equal(report.rows.theta_cos.reason, "accepted_without_evidence_source");
  assert.equal(report.rows.theta_cos.sourceReason, "self_referential_source");
});

test("accepted-looking effective-FRW row must cite parseable handoff evidence", () => {
  const fixture = JSON.parse(
    fs.readFileSync(path.join(repoRoot, acceptedHandoffPath), "utf8"),
  );
  fixture.handoff.rows.theta_cos.sourcePath =
    "scripts/equation-mapping/effective-frw-handoff-residual.mjs";

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "effective-frw-"));
  const inputPath = path.join(tempDir, "generic-durable-source.json");
  fs.writeFileSync(inputPath, `${JSON.stringify(fixture)}\n`);

  const report = runEffectiveFrw(inputPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_cos");
  assert.equal(report.rows.theta_cos.accepted, false);
  assert.equal(
    report.rows.theta_cos.reason,
    "theta_cos_handoff_source_not_parseable_json",
  );
});
