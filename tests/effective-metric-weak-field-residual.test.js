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
  "scripts/equation-mapping/effective-metric-weak-field-residual.mjs",
);
const acceptedPath =
  "scripts/equation-mapping/effective-metric-weak-field-theta-w-accepted.v1.json";
const attemptPath =
  "scripts/equation-mapping/effective-metric-weak-field-attempt.v1.json";
const coordinationControlPath =
  "scripts/equation-mapping/effective-metric-weak-field-coordination-source-negative-control.v1.json";

function runWeakField(inputPath) {
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

function writeTempFixture(fixture, name) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "theta-w-"));
  const inputPath = path.join(tempDir, name);
  fs.writeFileSync(inputPath, `${JSON.stringify(fixture)}\n`);
  return inputPath;
}

test("accepted theta_W weak-field input populates the effective-metric residual", () => {
  const report = runWeakField(acceptedPath);

  assert.equal(report.summary.status, "populated");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
  assert.equal(report.summary.nextBlocker, null);
  assert.deepEqual(report.summary.missingRows, []);
  assert.equal(report.summary.commonCarrierPass, true);
  assert.equal(report.summary.sharedKeysAccepted, true);
  assert.equal(report.summary.weakFieldNumericPass, true);
  assert.equal(report.summary.negativeControlPassCount, 4);
  assert.equal(report.rowStatuses.theta_W.reason, "accepted");
});

test("theta_W attempt stays blocked at missing accepted theta_W", () => {
  const report = runWeakField(attemptPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_W");
  assert.equal(report.rowStatuses.theta_W.reason, "row_not_accepted");
});

test("theta_W coordination-source negative control is rejected as non-evidence", () => {
  const report = runWeakField(coordinationControlPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_W");
  assert.equal(report.rowStatuses.theta_W.reason, "accepted_without_evidence_source");
});

test("accepted-looking theta_W rows must cite theta_W evidence", () => {
  const fixture = JSON.parse(fs.readFileSync(path.join(repoRoot, acceptedPath), "utf8"));
  for (const row of Object.values(fixture.packet.rows)) {
    row.sourcePath = "scripts/spacetime/noether-sea-density-compression-provider.v1.json";
  }

  const report = runWeakField(writeTempFixture(fixture, "generic-durable-source.json"));

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_W");
  assert.equal(
    report.rowStatuses.theta_W.reason,
    "theta_W_effective_metric_theta_w_evidence_fields_missing",
  );
});
