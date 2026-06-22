import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_JET_WITNESS_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdJetWitness,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdJetWitness,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness.mjs";

const EXPECTED_STATUS =
  "sampled-theta3minus-fold-pair-first-y-GD-jet-cancellation-witness-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdJetWitness();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness.mjs"
  );
}

test("theta3minus fold-pair first-y G/D jet witness validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdJetWitness(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_JET_WITNESS_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_jet_witness"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("first-y G/D jet witness imposes no fixed speed band", () => {
  const packet = artifact();

  assert.equal(packet.witness_parameters.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(packet.witness_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(packet.witness_parameters.speed_band, undefined);
  assert.equal(packet.witness_parameters.speed_window, undefined);
  assert.equal(packet.witness_parameters.speed_min, undefined);
  assert.equal(packet.witness_parameters.speed_max, undefined);
});

test("first-y G/D jet witness certifies sampled cancellation mechanism", () => {
  const packet = artifact();
  const summary = packet.first_y_jet_summary;
  const firstRow = packet.first_y_jet_rows[0];

  assert.equal(summary.speed_sample_count, 17);
  assert.equal(summary.branch_sample_count, 34);
  assert.equal(summary.all_h0_inside_predecessor_tubes, true);
  assert.ok(Number(summary.max_abs_source_equation_coeff_y0_to_y4) < 1e-10);
  assert.ok(Number(summary.max_abs_P0_minus_L) < 1e-10);
  assert.ok(Number(summary.max_abs_P1) < 1e-10);
  assert.ok(Number(summary.max_abs_D0_minus_L) < 1e-10);
  assert.ok(Number(summary.max_abs_D1) < 1e-10);
  assert.ok(Number(summary.max_abs_Q_D_plus_Q_G_constant_residual) < 1e-10);
  assert.deepEqual(summary.Q_G_first_y_constant_sample_hull, [
    0.0859299624971,
    0.0859809242715,
  ]);
  assert.deepEqual(summary.Q_D_first_y_constant_sample_hull, [
    -0.0859809242715,
    -0.0859299624971,
  ]);
  assert.equal(firstRow.cancellation_status, "sampled-first-y-GD-jet-cancellation-certified");
  assert.equal(firstRow.branch_rows.every((row) => row.h0_inside_predecessor_tube), true);
  assert.equal(Number(firstRow.Q_D_plus_Q_G_constant_residual), 0);
});

test("first-y G/D jet witness keeps directed-rounded closure open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_sampled_first_y_GD_jet_cancellation,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure,
    false
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_fold_pair_G_quotient_full_cell_cover,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_fold_pair_D_quotient_cell_cover,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder,
    false
  );
  assert.equal(packet.artifact_claim.certifies_I1_regular_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
});

test("first-y G/D jet validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdJetWitness({
        speedCellCount: 2,
      }),
    /speedCellCount/
  );

  const packet = clone(artifact());
  packet.witness_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_jet_enclosure =
    true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_G_quotient_full_cell_cover =
    true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_D_quotient_cell_cover =
    true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder =
    true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdJetWitness(
      packet
    );

  assert.ok(errors.includes("first-y jet parameters must not contain speed-band fields"));
  assert.ok(
    errors.includes(
      "artifact claim must keep directed-rounded first-y, full quotient, remainder, I1, and retention open"
    )
  );
});

test("first-y G/D jet CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "theta3minus-first-y-jet-"));
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_JET_WITNESS_SCHEMA
  );
});
