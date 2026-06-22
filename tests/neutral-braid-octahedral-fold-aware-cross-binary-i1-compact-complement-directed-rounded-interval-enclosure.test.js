import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_COMPACT_COMPLEMENT_DIRECTED_ROUNDED_INTERVAL_ENCLOSURE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryI1CompactComplementDirectedRoundedIntervalEnclosure,
  validateOctahedralFoldAwareCrossBinaryI1CompactComplementDirectedRoundedIntervalEnclosure,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-compact-complement-directed-rounded-interval-enclosure.mjs";

const EXPECTED_STATUS =
  "source-atlas-aware-i1-compact-complement-directed-rounded-interval-enclosures-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryI1CompactComplementDirectedRoundedIntervalEnclosure();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-compact-complement-directed-rounded-interval-enclosure.mjs"
  );
}

test("I1 compact complement directed-rounded interval enclosure validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryI1CompactComplementDirectedRoundedIntervalEnclosure(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_COMPACT_COMPLEMENT_DIRECTED_ROUNDED_INTERVAL_ENCLOSURE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_i1_compact_complement_directed_rounded_interval_enclosure"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("compact complement interval packet imposes no fixed speed band", () => {
  const packet = artifact();

  assert.equal(packet.interval_parameters.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(packet.interval_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(packet.interval_parameters.speed_band, undefined);
  assert.equal(packet.interval_parameters.speed_window, undefined);
  assert.equal(packet.interval_parameters.speed_min, undefined);
  assert.equal(packet.interval_parameters.speed_max, undefined);
});

test("left complement has a directed-rounded positive forcing enclosure", () => {
  const leftSummary = artifact().compact_complement_directed_rounded_enclosures[0];

  assert.equal(leftSummary.complement_id, "I1.left-complement.forcing-positive");
  assert.equal(leftSummary.expected_forcing_sign, "+");
  assert.deepEqual(leftSummary.theta_interval, [0, 0.124678831905]);
  assert.equal(
    leftSummary.status,
    "directed-rounded-compact-complement-sign-enclosure-certified"
  );
  assert.equal(leftSummary.open_tile_count, 0);
  assert.ok(Number(leftSummary.minimum_directed_rounded_forcing_sign_clearance) > 0);
  assert.ok(
    leftSummary.certified_tiles.every(
      (tile) =>
        tile.directed_rounded_forcing_sign === "+" &&
        tile.directed_rounded_source_root_status ===
          "directed-rounded-source-root-interval-certificate-passed" &&
        tile.all_root_sheet_contractions_passed === true
    )
  );
});

test("right interval-safe compact core has a directed-rounded negative forcing enclosure", () => {
  const packet = artifact();
  const rightSummary =
    packet.compact_complement_directed_rounded_enclosures[1];

  assert.equal(
    rightSummary.complement_id,
    "I1.right-compact-complement.forcing-negative"
  );
  assert.equal(rightSummary.expected_forcing_sign, "-");
  assert.deepEqual(packet.interval_parameters.compact_right_complement_interval, [
    0.145456970556,
    0.984145655243,
  ]);
  assert.equal(
    rightSummary.status,
    "directed-rounded-compact-complement-sign-enclosure-certified"
  );
  assert.equal(rightSummary.open_tile_count, 0);
  assert.ok(Number(rightSummary.minimum_directed_rounded_forcing_sign_clearance) > 0);
  assert.ok(
    rightSummary.certified_tiles.every(
      (tile) =>
        tile.directed_rounded_forcing_sign === "-" &&
        tile.directed_rounded_forcing_interval[1] < 0 &&
        tile.directed_rounded_source_root_status ===
          "directed-rounded-source-root-interval-certificate-passed" &&
        tile.all_root_sheet_contractions_passed === true
    )
  );
});

test("compact interval packet keeps theta_3minus fold collar radius open", () => {
  const packet = artifact();

  assert.equal(packet.interval_parameters.fold_collar_attachment_y, 0.115);
  assert.equal(packet.interval_parameters.fold_collar_finite_y_min, 0.003);
  assert.deepEqual(packet.fold_collar_radius_residual.full_y_interval, [0, 0.115]);
  assert.deepEqual(
    packet.fold_collar_radius_residual.fixed_fold_finite_slab_probe_y_interval,
    [0.003, 0.115]
  );
  assert.equal(
    packet.fold_collar_radius_residual
      .certifies_explicit_interval_fold_collar_radius,
    false
  );
  assert.equal(
    packet.fold_collar_radius_residual.status,
    "speed-dependent-fold-normal-form-required"
  );
  assert.equal(
    packet.artifact_claim.certifies_theta_3minus_left_fold_collar_interval_radius,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_I1_complement_sign_interval_enclosures,
    false
  );
});

test("fixed theta_3minus collar records the speed-fold crossing obstruction", () => {
  const packet = artifact();
  const guard = packet.fold_collar_fixed_side_speed_guard;
  const finiteSlab = packet.fold_collar_finite_slab_directed_rounded_enclosure;

  assert.equal(
    guard.status,
    "fixed-fold-finite-collar-speed-side-guard-passed"
  );
  assert.ok(Number(guard.speed_fold_crossing_threshold_y) > 0.0027);
  assert.ok(Number(guard.speed_fold_crossing_threshold_y) < 0.0029);
  assert.ok(Number(guard.left_side_clearance_at_y_min) > 0);
  assert.equal(
    finiteSlab.status,
    "directed-rounded-fold-collar-finite-y-GD-sign-enclosure-open"
  );
  assert.equal(finiteSlab.open_tile_count, 4);
  assert.ok(
    finiteSlab.open_tiles.every(
      (tile) =>
        tile.sampled_root_count_preserved === true &&
        tile.sampled_transport_signs_preserved === true &&
        tile.directed_rounded_source_root_status ===
          "directed-rounded-source-root-interval-certificate-open"
    )
  );
  assert.equal(
    packet.artifact_claim
      .certifies_theta_3minus_left_fold_collar_finite_y_GD_interval_slab,
    false
  );
  assert.match(
    packet.fold_collar_radius_residual.near_zero_obstruction,
    /speed-dependent fold/
  );
});

test("compact interval packet keeps critical exhaustion, quadrature, and retention open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_I1_compact_complement_directed_rounded_interval_enclosures,
    true
  );
  assert.equal(packet.artifact_claim.certifies_I1_regular_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.certifies_interval_quadrature_enclosure, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(
    packet.result.first_successor_row,
    "theta_3minus.left-fold-collar-speed-dependent-normal-form-required"
  );
});

test("compact interval validator rejects speed-band and closure overclaims", () => {
  const packet = clone(artifact());
  packet.interval_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_theta_3minus_left_fold_collar_interval_radius =
    true;
  packet.artifact_claim.certifies_I1_complement_sign_interval_enclosures = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryI1CompactComplementDirectedRoundedIntervalEnclosure(
      packet
    );

  assert.ok(errors.includes("interval parameters must not contain speed-band fields"));
  assert.ok(
    errors.includes(
      "artifact claim must certify only compact complement intervals while keeping fold/full/retention claims open"
    )
  );
});

test("compact interval CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "i1-compact-interval-"));
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
