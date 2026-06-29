import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_COMPLEMENT_SIGN_EXCLUSION_SCAN_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryI1ComplementSignExclusionScan,
  validateOctahedralFoldAwareCrossBinaryI1ComplementSignExclusionScan,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-complement-sign-exclusion-scan.mjs";

const EXPECTED_STATUS =
  "sampled-source-atlas-aware-i1-complement-sign-exclusion-scan-certified";
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryI1ComplementSignExclusionScan();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-complement-sign-exclusion-scan.mjs"
  );
}

test("I1 complement sign exclusion scan validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryI1ComplementSignExclusionScan(packet),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_COMPLEMENT_SIGN_EXCLUSION_SCAN_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_i1_complement_sign_exclusion_scan"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("I1 complement scan uses only the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required", () => {
  const packet = artifact();

  assert.equal(packet.scan_parameters.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(packet.scan_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(packet.scan_parameters.speed_band, undefined);
  assert.equal(packet.scan_parameters.speed_window, undefined);
  assert.equal(packet.scan_parameters.speed_min, undefined);
  assert.equal(packet.scan_parameters.speed_max, undefined);
});

test("left compact complement is sampled positive with preserved source-root atlas", () => {
  const leftSummary = artifact().compact_complement_scan_summaries[0];

  assert.equal(leftSummary.complement_id, "I1.left-complement.forcing-positive");
  assert.equal(leftSummary.expected_forcing_sign, "+");
  assert.equal(leftSummary.status, "sampled-complement-sign-exclusion-certified");
  assert.deepEqual(leftSummary.source_root_counts, [6]);
  assert.deepEqual(leftSummary.term_root_count_signatures, ["1,3,1,1"]);
  assert.ok(Number(leftSummary.raw_forcing_minimum) > 0);
  assert.ok(Number(leftSummary.machine_padded_sign_margin) > 0);
  assert.ok(Number(leftSummary.minimum_sampled_abs_F_delta) > 0);
  assert.ok(Number(leftSummary.minimum_sampled_multiroot_term_delta_separation) > 0);
  assert.ok(
    leftSummary.sample_rows.every(
      (row) =>
        row.status === "sampled-complement-sign-row-certified" &&
        row.expected_sign_preserved === true &&
        row.source_root_count_preserved === true
    )
  );
});

test("right compact complement is sampled negative before the theta_3- fold collar", () => {
  const rightSummary = artifact().compact_complement_scan_summaries[1];

  assert.equal(
    rightSummary.complement_id,
    "I1.right-compact-complement.forcing-negative"
  );
  assert.equal(rightSummary.expected_forcing_sign, "-");
  assert.equal(rightSummary.status, "sampled-complement-sign-exclusion-certified");
  assert.deepEqual(rightSummary.source_root_counts, [6]);
  assert.deepEqual(rightSummary.term_root_count_signatures, ["1,3,1,1"]);
  assert.ok(Number(rightSummary.raw_forcing_maximum) < 0);
  assert.ok(Number(rightSummary.machine_padded_sign_margin) > 0);
  assert.ok(Number(rightSummary.minimum_sampled_abs_F_delta) > 0);
  assert.ok(Number(rightSummary.minimum_sampled_multiroot_term_delta_separation) > 0);
  assert.deepEqual(artifact().scan_parameters.compact_right_complement_interval, [
    0.145456970556,
    0.997361655243,
  ]);
});

test("theta_3- singular endpoint is covered only by imported fold-collar transport", () => {
  const packet = artifact();
  const foldCheck = packet.fold_collar_transport_check;

  assert.equal(foldCheck.valid, true);
  assert.equal(
    foldCheck.row.certificate_id,
    "fold.3-.left-fold-collar-sign-transport"
  );
  assert.equal(foldCheck.row.side, "left");
  assert.equal(foldCheck.row.theta_substitution, "theta=theta_f-y^2");
  assert.equal(foldCheck.row.square_limit_sign, "-");
  assert.equal(foldCheck.row.forcing_sign_for_small_y, "-");
  assert.equal(
    foldCheck.status,
    "fold-collar-negative-sign-transport-imported"
  );
  assert.equal(
    packet.complement_sign_exclusion_summary
      .theta_3minus_left_collar_negative_transport_imported,
    true
  );
});

test("I1 complement scan keeps interval, quadrature, and retention claims open", () => {
  const packet = artifact();

  assert.equal(
    packet.interval_profile_boundary
      .certifies_sampled_I1_complement_sign_exclusion_scan,
    true
  );
  assert.equal(
    packet.interval_profile_boundary
      .certifies_I1_complement_sign_interval_enclosures,
    false
  );
  assert.equal(
    packet.interval_profile_boundary.certifies_I1_regular_critical_exhaustion,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_interval_critical_exhaustion,
    false
  );
  assert.equal(packet.artifact_claim.certifies_interval_quadrature_enclosure, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(packet.result.retained_branch, false);
  assert.equal(
    packet.result.first_successor_row,
    "I1.complement-sign-exclusion-directed-rounded-interval-enclosures-required"
  );
});

test("I1 complement scan validator rejects speed-band and closure overclaims", () => {
  const packet = clone(artifact());
  packet.scan_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.certifies_interval_critical_exhaustion = true;
  packet.artifact_claim.certifies_interval_quadrature_enclosure = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryI1ComplementSignExclusionScan(packet);

  assert.ok(errors.includes("scan parameters must not contain speed-band fields"));
  assert.ok(
    errors.includes(
      "artifact claim must certify only sampled/conditional complement signs and keep interval/retention claims open"
    )
  );
});

test("I1 complement scan CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "i1-complement-scan-"));
  const outPath = path.join(tmpDir, "artifact.json");

  execFileSync(process.execPath, [scriptPath(), "--out", outPath]);
  const validateOutput = execFileSync(process.execPath, [
    scriptPath(),
    "--validate",
    outPath,
  ]).toString();

  assert.equal(validateOutput.trim(), "ok");
  const packet = JSON.parse(fs.readFileSync(outPath, "utf8"));
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});
