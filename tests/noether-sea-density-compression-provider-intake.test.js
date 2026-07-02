import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  buildProviderIntakeReport,
  validationErrors,
} from "../scripts/spacetime/noether-sea-density-compression-provider-intake.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(
  repoRoot,
  "scripts/spacetime/noether-sea-density-compression-provider-candidates.v1.json",
);
const intakePath = path.join(
  repoRoot,
  "scripts/spacetime/noether-sea-density-compression-provider-intake.mjs",
);
const surfaceSlicePath = path.join(
  repoRoot,
  "scripts/spacetime/noether-sea-density-compression-surface-slice.mjs",
);

function runJson(commandArgs) {
  const output = execFileSync(process.execPath, commandArgs, {
    cwd: repoRoot,
    encoding: "utf8",
  });
  return JSON.parse(output);
}

test("theta_sea_rho_NS provider intake reports accepted non-fixture provider", () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const report = buildProviderIntakeReport(manifest, { sourceRef: manifestPath });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.verdict, "accepted_theta_sea_rho_NS_provider_found");
  assert.equal(report.firstFailure, null);
  assert.equal(report.summary.candidateCount, 8);
  assert.equal(report.summary.acceptedNonFixtureSourceCount, 1);
  assert.equal(report.summary.acceptedProviderCount, 1);
  assert.equal(report.authorization.theta_sea_rho_NS_provider_ready, true);
  assert.equal(report.authorization.downstream_consumer_authorization, true);
  assert.equal(
    report.candidateResults[0].id,
    "theta_sea_rho_ns_density_compression_provider",
  );
  assert.equal(report.candidateResults[0].providerReady, true);
  assert.equal(
    report.candidateResults[0].sourceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    report.summary.missingOrRejectedFieldUnion.includes("control_or_attempt_source_path"),
    true,
  );
  assert.equal(
    report.summary.missingOrRejectedFieldUnion.includes("coordination_source_path"),
    true,
  );
});

test("theta_sea_rho_NS provider intake require-accepted succeeds", () => {
  const report = runJson([intakePath, "--summary", "--require-accepted"]);

  assert.equal(report.verdict, "accepted_theta_sea_rho_NS_provider_found");
  assert.equal(report.firstFailure, null);
  assert.equal(report.summary.acceptedProviderCount, 1);
  assert.equal(report.authorization.theta_sea_rho_NS_provider_ready, true);
});

test("provider-backed density-compression surface slice is populated", () => {
  const report = runJson([
    surfaceSlicePath,
    "--input",
    "scripts/spacetime/noether-sea-density-compression-provider-surface-slice.v1.json",
    "--summary",
    "--require-populated",
  ]);

  assert.equal(report.summary.status, "populated");
  assert.equal(report.summary.nextBlocker, null);
  assert.deepEqual(report.summary.missingThetaRows, []);
  assert.deepEqual(report.summary.missingRequiredRows, []);
  assert.equal(
    report.consumerReadiness.EQ24_density_compression.readiness,
    "ready_for_consumer_review",
  );
  assert.equal(
    report.consumerReadiness.EQ20_pressure_lambda.projectionBlocker,
    "delta_P_eff",
  );
  assert.equal(
    report.consumerReadiness.EQ20_pressure_lambda.projectionStatus,
    "blocked_declared_missing_output",
  );
  assert.equal(
    report.consumerReadiness.EQ32_low_acceleration.projectionBlocker,
    "delta_a_star",
  );
});

test("density-compression runner rejects generic durable JSON as theta_sea_rho_NS evidence", () => {
  const input = JSON.parse(
    fs.readFileSync(
      path.join(
        repoRoot,
        "scripts/spacetime/noether-sea-density-compression-coordination-source-negative-control.v1.json",
      ),
      "utf8",
    ),
  );
  input.claimLevel =
    "accepted-looking rho_NS generic durable source negative control; score-neutral and not retained evidence";
  input.window.thetaSeaRows.rho_NS.sourcePath =
    "scripts/spacetime/noether-sea-density-compression-provider-candidates.v1.json";

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "rho-ns-provider-"));
  const inputPath = path.join(tempDir, "generic-durable-source.json");
  fs.writeFileSync(inputPath, `${JSON.stringify(input)}\n`);

  const report = runJson([surfaceSlicePath, "--input", inputPath, "--summary"]);

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_theta_sea_rho_NS");
  assert.equal(
    report.summary.nextBlockerDetails.status,
    "accepted_without_evidence_source",
  );
  assert.equal(report.summary.nextBlockerDetails.sourceReferenceExists, true);
  assert.equal(report.summary.nextBlockerDetails.sourceEvidenceReferenceExists, false);
});
