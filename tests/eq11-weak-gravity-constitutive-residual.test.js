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
  "scripts/equation-mapping/eq11-weak-gravity-constitutive-residual.mjs",
);
const attemptPath =
  "scripts/equation-mapping/eq11-weak-gravity-constitutive-attempt.v1.json";
const acceptedPath =
  "scripts/equation-mapping/eq11-weak-gravity-constitutive-theta-11-20-accepted.v1.json";
const coordinationSourceNegativeControlPath =
  "scripts/equation-mapping/eq11-weak-gravity-constitutive-coordination-source-negative-control.v1.json";
const sourceContractNegativeControlPath =
  "scripts/equation-mapping/eq11-weak-gravity-constitutive-theta-11-20-source-contract-negative-control.v1.json";

function runEq11(inputPath) {
  const args = [checkerPath, "--summary"];
  if (inputPath) {
    args.push("--input", inputPath);
  }
  const output = execFileSync(process.execPath, args, {
    cwd: repoRoot,
    encoding: "utf8",
  });
  return JSON.parse(output);
}

test("EQ-11 attempt stays blocked at missing accepted theta_11_20", () => {
  const report = runEq11(attemptPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_11_20");
  assert.equal(report.rowStatuses.theta_11_20.reason, "row_not_accepted");
  assert.equal(report.summary.poissonPass, true);
  assert.equal(report.summary.curvaturePass, true);
  assert.equal(report.summary.couplingContinuityPass, true);
  assert.equal(report.summary.negativeControlPassCount, 4);
});

test("accepted theta_11_20 weak-gravity input populates EQ-11 without score increase", () => {
  const report = runEq11(acceptedPath);

  assert.equal(report.summary.status, "populated");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
  assert.equal(report.summary.nextBlocker, null);
  assert.deepEqual(report.summary.missingRows, []);
  assert.deepEqual(report.summary.missingSharedKeys, []);
  assert.equal(report.summary.commonCarrierPass, true);
  assert.equal(report.summary.weakGravityNumericPass, true);
  assert.equal(report.summary.hiddenRetunePass, true);
  assert.equal(report.rowStatuses.theta_11_20.reason, "accepted");
});

test("EQ-11 coordination-source negative control is rejected as non-evidence", () => {
  const report = runEq11(coordinationSourceNegativeControlPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_11_20");
  assert.equal(report.rowStatuses.theta_11_20.reason, "accepted_without_evidence_source");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
});

test("EQ-11 source-contract negative control is rejected as non-evidence", () => {
  const report = runEq11(sourceContractNegativeControlPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_11_20");
  assert.equal(report.rowStatuses.theta_11_20.reason, "accepted_without_evidence_source");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
});

test("accepted-looking EQ-11 row must cite parseable theta_11_20 weak-gravity evidence", () => {
  const fixture = JSON.parse(fs.readFileSync(path.join(repoRoot, acceptedPath), "utf8"));
  fixture.packet.rows.theta_11_20.sourcePath =
    "scripts/equation-mapping/eq11-weak-gravity-constitutive-residual.mjs";

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "eq11-weak-gravity-"));
  const inputPath = path.join(tempDir, "generic-durable-source.json");
  fs.writeFileSync(inputPath, `${JSON.stringify(fixture)}\n`);

  const report = runEq11(inputPath);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_11_20");
  assert.equal(
    report.rowStatuses.theta_11_20.reason,
    "theta_11_20_weak_gravity_source_not_parseable_json",
  );
});
