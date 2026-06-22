import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_PROFILE_SCAN_SCHEMA,
  buildOctahedralFoldAwareClockLengthProfileScan,
  validateOctahedralFoldAwareClockLengthProfileScan,
} from "../scripts/neutral-braid/octahedral-fold-aware-clock-length-profile-scan.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareClockLengthProfileScan({
      sampleCount: 64,
      rootSubdivisions: 5000,
    });
  }
  return cachedArtifact;
}

test("fold-aware clock length profile scan validates the source criterion", () => {
  const scan = artifact();

  assert.deepEqual(validateOctahedralFoldAwareClockLengthProfileScan(scan), []);
  assert.equal(scan.schema, OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_PROFILE_SCAN_SCHEMA);
  assert.equal(scan.packet_id, "octahedral_fold_aware_clock_length_profile_scan");
  assert.equal(scan.promotion_status, "priority-only");
  assert.equal(scan.source_criterion_check.valid, true);
  assert.equal(
    scan.source_criterion_check.theory_status,
    "fold-aware-clock-length-criterion-derived-clock-return-open"
  );
  assert.equal(scan.scan_parameters.speed_constraint, "none; no fixed speed window is imposed");
});

test("fold-aware clock length profile scan finds a sampled positive clock profile", () => {
  const scan = artifact();

  assert.ok(scan.sampled_forcing_summary.active_root_counts.includes(9));
  assert.ok(Math.min(...scan.sampled_forcing_summary.active_root_counts) >= 7);
  assert.ok(scan.sampled_forcing_summary.jacobian_abs_floor > 0.1);
  assert.ok(Math.abs(scan.sampled_forcing_summary.forcing_mean) < 1e-9);
  assert.ok(Math.abs(scan.sampled_primitive_summary.primitive_return_residual) < 1e-9);
  assert.ok(scan.sampled_primitive_summary.primitive_minimum < 0);
  assert.ok(scan.sampled_primitive_summary.primitive_maximum > 0);
  assert.equal(
    scan.sampled_clock_length_criterion.positivity_status,
    "positive-clock-length-speed-profile-certified-for-supplied-summary"
  );
  assert.ok(scan.sampled_clock_length_criterion.positivity_margin > 2);
  assert.equal(scan.result.theory_status, "sampled-fold-aware-clock-length-positive-profile");
});

test("fold-aware clock length profile scan preserves non-retention boundaries", () => {
  const scan = artifact();

  assert.equal(scan.artifact_claim.certifies_sampled_clock_length_positive_profile, true);
  assert.equal(scan.artifact_claim.certifies_interval_clock_length_return, false);
  assert.equal(scan.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(scan.artifact_claim.retained_branch, false);
  assert.equal(scan.result.retention, "not_retained");
  assert.equal(scan.result.retained_branch, false);
});

test("fold-aware clock length profile scan CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-fold-aware-clock-profile-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-fold-aware-clock-length-profile-scan.mjs", import.meta.url)
  );

  execFileSync(
    process.execPath,
    [scriptPath, "--samples", "64", "--subdivisions", "5000", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const scan = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralFoldAwareClockLengthProfileScan(scan), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.result.theory_status, "sampled-fold-aware-clock-length-positive-profile");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_PROFILE_SCAN_SCHEMA);
});
