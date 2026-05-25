import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_H_GRAPH_G_QUOTIENT_CELL_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairHGraphGQuotientCellCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairHGraphGQuotientCellCertificate,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-pair-h-graph-positive-y-GD-quotient-cell-cover-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairHGraphGQuotientCellCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate.mjs"
  );
}

test("theta3minus fold-pair h-graph G/D quotient certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairHGraphGQuotientCellCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_H_GRAPH_G_QUOTIENT_CELL_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_h_graph_g_quotient_cell_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("h-graph G/D quotient certificate imposes no fixed speed band", () => {
  const packet = artifact();

  assert.equal(packet.certificate_parameters.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(packet.certificate_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(packet.certificate_parameters.speed_band, undefined);
  assert.equal(packet.certificate_parameters.speed_window, undefined);
  assert.equal(packet.certificate_parameters.speed_min, undefined);
  assert.equal(packet.certificate_parameters.speed_max, undefined);
});

test("h-graph G/D quotient certifies all positive-y cells and defers zero cells", () => {
  const packet = artifact();
  const summary = packet.G_quotient_summary;
  const firstPositiveRow = packet.positive_y_G_quotient_rows[0];
  const firstZeroRow = packet.first_y_cell_deferred_rows[0];

  assert.equal(summary.speed_cell_count, 16);
  assert.equal(summary.y_cell_count, 64);
  assert.equal(summary.positive_y_cell_count, 1008);
  assert.equal(summary.first_y_cell_count, 16);
  assert.equal(summary.positive_y_branch_G_count, 2016);
  assert.equal(summary.positive_y_branch_D_count, 2016);
  assert.equal(summary.all_positive_y_GD_quotients_certified, true);
  assert.equal(summary.h_contraction_branch_count, 2048);
  assert.equal(summary.all_positive_y_G_quotients_certified, true);
  assert.equal(summary.all_positive_y_D_quotients_certified, true);
  assert.equal(summary.all_h_contractions_certified, true);
  assert.equal(summary.no_raw_y_inverse_division_on_zero_touching_cells, true);
  assert.ok(Number(summary.min_denominator_positive_clearance) > 25);
  assert.ok(Number(summary.min_J_clearance) > 0.76);
  assert.ok(Number(summary.min_F_delta_clearance) > 0.001);
  assert.ok(Number(summary.max_abs_Q_G_pair_interval_upper) < 600);
  assert.ok(Number(summary.max_abs_Q_D_pair_interval_upper) < 500000);
  assert.equal(firstPositiveRow.first_y_cell_zero_safe, true);
  assert.equal(firstPositiveRow.raw_y_inverse_division_used, false);
  assert.equal(
    firstPositiveRow.quotient_status,
    "positive-y-GD-quotients-enclosed"
  );
  assert.deepEqual(
    firstPositiveRow.branch_G_rows.map((row) => row.J_sign),
    ["+", "-"]
  );
  assert.deepEqual(
    firstPositiveRow.branch_D_rows.map((row) => row.F_delta_sign),
    ["+", "-"]
  );
  assert.equal(firstZeroRow.first_y_cell_zero_safe, false);
  assert.equal(firstZeroRow.raw_y_inverse_division_used, false);
  assert.equal(
    firstZeroRow.quotient_status,
    "requires-Taylor-cancelled-first-y-cell-jet-certificate"
  );
});

test("h-graph G/D quotient certificate keeps full quotient and remainder open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_fold_pair_h_graph_positive_y_G_quotient_cell_cover,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_fold_pair_G_quotient_full_cell_cover,
    false
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_fold_pair_h_graph_positive_y_D_quotient_cell_cover,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_fold_pair_D_quotient_cell_cover,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_regular_root_remainder,
    false
  );
  assert.equal(packet.artifact_claim.certifies_I1_regular_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
});

test("h-graph G/D quotient validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairHGraphGQuotientCellCertificate({
        speedCellCount: 2,
      }),
    /speedCellCount/
  );

  const packet = clone(artifact());
  packet.certificate_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_directed_rounded_fold_pair_G_quotient_full_cell_cover =
    true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_D_quotient_cell_cover =
    true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder =
    true;
  packet.artifact_claim.certifies_directed_rounded_regular_root_remainder = true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairHGraphGQuotientCellCertificate(
      packet
    );

  assert.ok(errors.includes("G quotient parameters must not contain speed-band fields"));
  assert.ok(
    errors.includes(
      "artifact claim must keep full G, D, remainder, I1 closure, and retention open"
    )
  );
});

test("h-graph G/D quotient CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "theta3minus-g-quotient-"));
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_H_GRAPH_G_QUOTIENT_CELL_CERTIFICATE_SCHEMA
  );
});
