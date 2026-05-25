import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_POSITIVE_GD_QUOTIENT_SUBCELL_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYPositiveGdQuotientSubcellCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYPositiveGdQuotientSubcellCertificate,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-positive-gd-quotient-subcell-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-first-y-positive-GD-quotient-subcells-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYPositiveGdQuotientSubcellCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-positive-gd-quotient-subcell-certificate.mjs"
  );
}

test("theta3minus fold-pair first-y positive G/D quotient subcell certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYPositiveGdQuotientSubcellCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_POSITIVE_GD_QUOTIENT_SUBCELL_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_positive_gd_quotient_subcell_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("first-y positive G/D quotient subcell certificate imposes no fixed speed band", () => {
  const packet = artifact();
  const params = packet.first_y_positive_gd_quotient_subcell_parameters;

  assert.equal(params.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(params.speed_ratio_enclosure, [3.02156, 3.02157]);
  assert.equal(params.speed_cell_count, 128);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(params.speed_band, undefined);
  assert.equal(params.speed_window, undefined);
  assert.equal(params.speed_min, undefined);
  assert.equal(params.speed_max, undefined);
});

test("first-y positive G/D quotient subcells are directed-rounded enclosed", () => {
  const packet = artifact();
  const summary = packet.first_y_positive_gd_quotient_subcell_summary;

  assert.equal(summary.speed_cell_count, 128);
  assert.equal(summary.y_subcell_count, 16);
  assert.equal(summary.positive_first_y_subcell_count, 15);
  assert.equal(summary.positive_first_y_row_count, 1920);
  assert.equal(summary.zero_touching_first_y_row_count, 128);
  assert.equal(
    summary.all_positive_first_y_GD_quotient_subcells_certified,
    true
  );
  assert.equal(summary.all_rows_avoid_raw_y_inverse_division, true);
  assert.ok(Number(summary.min_denominator_positive_clearance) > 25);
  assert.ok(Number(summary.min_J_clearance) > 0.79);
  assert.ok(Number(summary.min_F_delta_clearance) > 0);
  assert.ok(Number(summary.max_abs_Q_G_pair_interval_upper) < 9000);
  assert.ok(Number(summary.max_abs_Q_D_pair_interval_upper) < 1.08e8);
  assert.deepEqual(summary.Q_G_pair_interval_hull, [
    -8735.04896621,
    8727.35756168,
  ]);
  assert.deepEqual(summary.Q_D_pair_interval_hull, [
    -107206381.722,
    13375096.7242,
  ]);
});

test("first-y positive G/D quotient subcell certificate keeps zero-touching tail open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_positive_GD_quotient_subcells,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_first_y_zero_touching_GD_tail,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder,
    false
  );
  assert.equal(packet.artifact_claim.certifies_I1_regular_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(
    packet.result.first_successor_row,
    "theta3minus.fold-pair-first-y-zero-touching-continuous-post-seed-GD-tail-directed-rounded-required"
  );
});

test("first-y positive G/D quotient subcell validator rejects overclaims", () => {
  const packet = clone(artifact());
  packet.first_y_positive_gd_quotient_subcell_parameters.speed_band =
    "forbidden";
  packet.artifact_claim.certifies_directed_rounded_first_y_zero_touching_GD_tail = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_finite_remainder_bound = true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYPositiveGdQuotientSubcellCertificate(
      packet
    );

  assert.ok(
    errors.includes(
      "first-y positive G/D quotient subcell parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must certify only positive first-y G/D quotient subcells and keep zero-touching tail, scaled remainder, I1, and retention open"
    )
  );
});

test("first-y positive G/D quotient subcell CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "theta3minus-first-y-positive-gd-")
  );
  const outPath = path.join(tmpDir, "artifact.json");

  execFileSync(process.execPath, [scriptPath(), "--out", outPath]);
  const validateOutput = JSON.parse(
    execFileSync(process.execPath, [scriptPath(), "--validate", outPath], {
      encoding: "utf8",
    })
  );

  assert.equal(validateOutput.valid, true);
  const packet = JSON.parse(fs.readFileSync(outPath, "utf8"));
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);

  const schemaOutput = JSON.parse(
    execFileSync(process.execPath, [scriptPath(), "--schema"], {
      encoding: "utf8",
    })
  );
  assert.equal(
    schemaOutput.artifact_schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_POSITIVE_GD_QUOTIENT_SUBCELL_CERTIFICATE_SCHEMA
  );
});
