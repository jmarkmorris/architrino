import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_STENCIL_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledStencilCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledStencilCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.mjs";

const EXPECTED_STATUS =
  "sampled-theta3minus-fold-pair-scaled-stencil-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledStencilCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.mjs"
  );
}

test("theta3minus fold-pair scaled stencil certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledStencilCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_STENCIL_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_scaled_stencil_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("fold-pair scaled stencil imposes no fixed speed band", () => {
  const packet = artifact();

  assert.equal(packet.scaled_stencil_parameters.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(packet.scaled_stencil_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(packet.scaled_stencil_parameters.speed_band, undefined);
  assert.equal(packet.scaled_stencil_parameters.speed_window, undefined);
  assert.equal(packet.scaled_stencil_parameters.speed_min, undefined);
  assert.equal(packet.scaled_stencil_parameters.speed_max, undefined);
});

test("scaled p,z,J rows certify the sampled fold-pair chart", () => {
  const packet = artifact();
  const summary = packet.scaled_fold_pair_summary;
  const firstRow = packet.scaled_fold_pair_rows[0];

  assert.equal(summary.sample_count, 95);
  assert.equal(summary.all_term_root_signatures_preserved, true);
  assert.equal(summary.all_J_signs_expected, true);
  assert.ok(Number(summary.max_abs_z) < 3.0);
  assert.ok(Number(summary.max_abs_z_minus_gamma) < 0.23);
  assert.ok(Number(summary.min_abs_J) > 0.773);
  assert.ok(Number(summary.min_pair_to_regular_root_separation) > 1.7);
  assert.equal(firstRow.fold_pair_term_label, "-s_{+,+}(u+Q)");
  assert.deepEqual(firstRow.fold_pair_root_indices, [0, 1]);
  assert.equal(firstRow.term_root_count_signature, "1,3,1,1");
  assert.deepEqual(
    firstRow.fold_pair_rows.map((row) => row.J_sign),
    ["+", "-"]
  );
});

test("scaled contribution formula reconstructs G_pair and quadratic quotients", () => {
  const summary = artifact().scaled_fold_pair_summary;

  assert.ok(Number(summary.max_scaled_G_pair_formula_abs_error) < 1e-9);
  assert.ok(Number(summary.max_abs_R_G_pair_over_y2) < 0.18);
  assert.ok(Number(summary.max_abs_R_D_pair_over_y2) < 0.71);
});

test("fold-pair scaled stencil keeps directed-rounded closure and retention open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_sampled_theta3minus_fold_pair_scaled_stencil,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_regular_root_remainder,
    false
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_speed_dependent_fold_normal_form_remainder,
    false
  );
  assert.equal(packet.artifact_claim.certifies_I1_regular_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
});

test("fold-pair scaled stencil validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledStencilCertificate({
        speedSamples: [3.021562, 3.021564, 3.021568],
      }),
    /speedSamples/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledStencilCertificate({
        ySamples: [0.1, 0.05, 0.07, 0.001],
      }),
    /ySamples/
  );

  const packet = clone(artifact());
  packet.scaled_stencil_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder =
    true;
  packet.artifact_claim.certifies_directed_rounded_regular_root_remainder = true;
  packet.artifact_claim.certifies_directed_rounded_speed_dependent_fold_normal_form_remainder =
    true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledStencilCertificate(
      packet
    );

  assert.ok(errors.includes("scaled stencil parameters must not contain speed-band fields"));
  assert.ok(
    errors.includes(
      "artifact claim must keep directed-rounded remainder, I1 closure, and retention open"
    )
  );
});

test("fold-pair scaled stencil CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "theta3minus-pair-"));
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_STENCIL_CERTIFICATE_SCHEMA
  );
});
