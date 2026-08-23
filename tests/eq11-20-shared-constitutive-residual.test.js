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
  "scripts/equation-mapping/eq11-20-shared-constitutive-residual.mjs",
);
const sharedResidualPath =
  "scripts/equation-mapping/eq11-20-shared-constitutive-residual.v1.json";

function runShared(inputPath) {
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
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "eq11-20-shared-"));
  const inputPath = path.join(tempDir, name);
  fs.writeFileSync(inputPath, `${JSON.stringify(fixture)}\n`);
  return inputPath;
}

test("shared EQ-11/EQ-20 constitutive residual consumes accepted upstream records", () => {
  const report = runShared(sharedResidualPath);

  assert.equal(report.summary.status, "populated");
  assert.equal(report.summary.scoreDecision, "no_score_increase");
  assert.equal(report.summary.nextBlocker, null);
  assert.deepEqual(report.summary.missingRows, []);
  assert.equal(report.summary.sourceEvidenceAccepted, true);
  assert.equal(report.summary.sourceEvidenceFailureCount, 0);
  assert.equal(report.summary.sharedKeysAccepted, true);
  assert.equal(report.summary.hiddenRetuneNumericPass, true);
  assert.equal(report.summary.identityResidualPass, true);
  assert.equal(report.summary.couplingResidualPass, true);
  assert.equal(report.summary.pressureLambdaResidualPass, true);
  assert.equal(report.summary.hiddenRetunePass, true);
});

test("shared EQ-11/EQ-20 residual rejects priority-source theta_11_20 rows", () => {
  const fixture = JSON.parse(
    fs.readFileSync(path.join(repoRoot, sharedResidualPath), "utf8"),
  );
  fixture.packet.rows.theta_11_20_weak_gravity.sourcePath =
    "reference/priorities/mapping-equations/eq-11-20-gravity-dark-energy-packet.md";

  const report = runShared(writeTempFixture(fixture, "priority-source-control.json"));

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_11_20_weak_gravity");
  assert.equal(report.rows.theta_11_20_weak_gravity.reason, "coordination_source_path");
});

test("shared EQ-11/EQ-20 residual rejects split effective coupling", () => {
  const fixture = JSON.parse(
    fs.readFileSync(path.join(repoRoot, sharedResidualPath), "utf8"),
  );
  fixture.packet.sharedKeys.find((row) => row.key === "G_eff").projectionValues.pressure = 1.08;

  const report = runShared(writeTempFixture(fixture, "split-coupling-control.json"));

  assert.equal(report.summary.status, "blocked_hidden_retune");
  assert.equal(report.summary.nextBlocker, "hidden_retune_G_eff");
  assert.equal(report.summary.hiddenRetuneNumericPass, false);
});

test("shared EQ-11/EQ-20 residual rejects hidden retune residual", () => {
  const fixture = JSON.parse(
    fs.readFileSync(path.join(repoRoot, sharedResidualPath), "utf8"),
  );
  fixture.packet.residualComponents.noHiddenRetune.residual = 0.000001;

  const report = runShared(writeTempFixture(fixture, "hidden-retune-control.json"));

  assert.equal(report.summary.status, "blocked_hidden_retune");
  assert.equal(report.summary.nextBlocker, "hidden_retune");
  assert.equal(report.summary.hiddenRetunePass, false);
});
