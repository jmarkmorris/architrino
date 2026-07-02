import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { outputProjectionEvidenceStatusForPath } from "../scripts/spacetime/noether-sea-density-compression-output-projection-evidence.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const surfaceSlicePath = path.join(
  repoRoot,
  "scripts/spacetime/noether-sea-density-compression-surface-slice.mjs",
);
const projectedSlicePath =
  "scripts/spacetime/noether-sea-density-compression-provider-surface-slice-output-projection.v1.json";
const outputProjectionPath =
  "scripts/spacetime/noether-sea-density-compression-provider-output-projection.v1.json";

function runSurfaceSlice(inputPath) {
  const output = execFileSync(
    process.execPath,
    [surfaceSlicePath, "--input", inputPath, "--summary"],
    {
      cwd: repoRoot,
      encoding: "utf8",
    },
  );
  return JSON.parse(output);
}

function writeTempFixture(fixture, name) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "rho-ns-output-"));
  const inputPath = path.join(tempDir, name);
  fs.writeFileSync(inputPath, `${JSON.stringify(fixture)}\n`);
  return inputPath;
}

test("provider-backed output projection evidence is accepted", () => {
  const status = outputProjectionEvidenceStatusForPath(outputProjectionPath, { repoRoot });

  assert.equal(status.accepted, true);
  assert.equal(status.reason, "accepted");
  assert.deepEqual(status.missingOrRejectedFields, []);
  assert.equal(status.commonCarrierId, "theta-sea-density-compression-provider-0001");
  assert.equal(status.thetaWId, "theta_W_static_weak_provider_backed_0001");
  assert.deepEqual(status.outputRows, [
    "delta_N",
    "delta_gamma_ij",
    "delta_G_eff",
    "delta_a_star",
  ]);
});

test("provider-backed surface slice projects weak-gravity outputs and delta_a_star", () => {
  const report = runSurfaceSlice(projectedSlicePath);

  assert.equal(report.summary.status, "populated");
  assert.equal(report.summary.nextBlocker, null);
  assert.equal(report.summary.outputProjectionEvidenceStatus, "accepted");
  assert.deepEqual(report.summary.projectedDownstreamOutputs, [
    "delta_N",
    "delta_gamma_ij",
    "delta_G_eff",
    "delta_a_star",
  ]);
  assert.equal(report.consumerReadiness.EQ11_weak_gravity.readiness, "ready_for_consumer_review");
  assert.equal(report.consumerReadiness.EQ11_weak_gravity.projectionBlocker, null);
  assert.equal(report.consumerReadiness.EQ32_low_acceleration.readiness, "ready_for_consumer_review");
  assert.equal(report.consumerReadiness.EQ32_low_acceleration.projectionBlocker, null);
  assert.equal(report.surfaceVector.delta_N, -0.000001);
  assert.equal(report.surfaceVector.delta_a_star, 0.0012);
});

test("projected downstream outputs require accepted output-projection evidence", () => {
  const fixture = JSON.parse(
    fs.readFileSync(path.join(repoRoot, projectedSlicePath), "utf8"),
  );
  fixture.outputProjection.path =
    "scripts/spacetime/noether-sea-density-compression-provider-candidates.v1.json";

  const report = runSurfaceSlice(writeTempFixture(fixture, "generic-durable-source.json"));

  assert.equal(report.summary.status, "blocked_missing_rows");
  assert.equal(report.summary.nextBlocker, "missing_accepted_output_projection_evidence");
  assert.equal(report.summary.outputProjectionEvidenceStatus, "missing");
  assert.equal(
    report.summary.nextBlockerDetails.missingAcceptedInputs[0],
    "outputProjection.output_projection_fields_missing",
  );
});
