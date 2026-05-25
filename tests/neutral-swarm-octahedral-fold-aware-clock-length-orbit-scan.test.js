import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_ORBIT_SCAN_SCHEMA,
  buildOctahedralFoldAwareClockLengthOrbitScan,
  validateOctahedralFoldAwareClockLengthOrbitScan,
} from "../scripts/neutral-swarm/octahedral-fold-aware-clock-length-orbit-scan.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareClockLengthOrbitScan({
      sampleCount: 64,
      rootSubdivisions: 5000,
    });
  }
  return cachedArtifact;
}

test("fold-aware clock length orbit scan covers all six receivers", () => {
  const scan = artifact();

  assert.deepEqual(validateOctahedralFoldAwareClockLengthOrbitScan(scan), []);
  assert.equal(scan.schema, OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_ORBIT_SCAN_SCHEMA);
  assert.equal(scan.packet_id, "octahedral_fold_aware_clock_length_orbit_scan");
  assert.equal(scan.promotion_status, "priority-only");
  assert.equal(scan.source_profile_check.valid, true);
  assert.deepEqual(scan.scan_parameters.receiver_labels, ["1+", "1-", "2+", "2-", "3+", "3-"]);
  assert.equal(scan.orbit_summary.receiver_count, 6);
  assert.equal(scan.orbit_summary.all_receiver_labels_covered, true);
  assert.equal(scan.receiver_profile_rows.length, 6);
});

test("fold-aware clock length orbit scan finds a matched sampled positive orbit", () => {
  const scan = artifact();

  assert.equal(scan.orbit_summary.orbit_symmetry_status, "sampled-octahedral-receiver-orbit-matched");
  assert.deepEqual(scan.orbit_summary.active_root_counts, [7, 9]);
  assert.ok(scan.orbit_summary.forcing_mean_abs_max < 1e-9);
  assert.ok(scan.orbit_summary.primitive_minimum_spread < 1e-9);
  assert.ok(scan.orbit_summary.clock_initial_speed_spread < 1e-9);
  assert.ok(scan.orbit_summary.weakest_positivity_margin > 2.8);
  assert.ok(scan.orbit_summary.strongest_positivity_margin > 2.8);

  for (const row of scan.receiver_profile_rows) {
    assert.equal(row.positivity_status, "positive-clock-length-speed-profile-certified-for-supplied-summary");
    assert.ok(row.jacobian_abs_floor > 0.1);
    assert.ok(Math.abs(row.primitive_return_residual) < 1e-9);
    assert.equal(row.certifies_interval_clock_length_return, false);
    assert.equal(row.retained_branch, false);
  }
});

test("fold-aware clock length orbit scan preserves non-retention boundaries", () => {
  const scan = artifact();

  assert.equal(scan.artifact_claim.certifies_sampled_receiver_orbit_positive_profile, true);
  assert.equal(scan.artifact_claim.certifies_receiver_orbit_interval_clock_length_return, false);
  assert.equal(scan.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(scan.artifact_claim.retained_branch, false);
  assert.equal(scan.result.retention, "not_retained");
  assert.equal(scan.result.retained_branch, false);
});

test("fold-aware clock length orbit scan CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-swarm-fold-aware-clock-orbit-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-swarm/octahedral-fold-aware-clock-length-orbit-scan.mjs", import.meta.url)
  );

  execFileSync(
    process.execPath,
    [scriptPath, "--samples", "64", "--subdivisions", "5000", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const scan = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralFoldAwareClockLengthOrbitScan(scan), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(
    validation.result.theory_status,
    "sampled-fold-aware-clock-length-receiver-orbit-positive-profile"
  );

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_FOLD_AWARE_CLOCK_LENGTH_ORBIT_SCAN_SCHEMA);
});
