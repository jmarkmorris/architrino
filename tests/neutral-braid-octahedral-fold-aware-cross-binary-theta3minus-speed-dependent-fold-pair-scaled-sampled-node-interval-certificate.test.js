import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_SAMPLED_NODE_INTERVAL_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledSampledNodeIntervalCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledSampledNodeIntervalCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.mjs";

const EXPECTED_STATUS =
  "receiver-normal-zero-bracket-restart-required";
const NO_SPEED_WINDOW =
  "none; receiver-normal zero-bracket restart required before this stencil can be active evidence";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledSampledNodeIntervalCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.mjs"
  );
}

test("theta3minus fold-pair sampled-node interval certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledSampledNodeIntervalCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_SAMPLED_NODE_INTERVAL_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_scaled_sampled_node_interval_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("sampled-node interval certificate imposes no fixed speed band", () => {
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

test("sampled-node interval rows certify z brackets and J signs", () => {
  const packet = artifact();
  const summary = packet.sampled_node_interval_summary;
  const firstRow = packet.sampled_node_interval_rows[0];

  assert.equal(summary.sample_count, 95);
  assert.equal(summary.status, EXPECTED_STATUS);
  assert.equal(summary.eom_evidence_status, "invalidated-by-receiver-normal-master-eom");
  assert.equal(summary.z_endpoint_count, 380);
  assert.equal(summary.all_endpoint_brackets_certified, true);
  assert.equal(summary.all_J_signs_certified, true);
  assert.ok(Number(summary.min_endpoint_K_clearance) > 1e-6);
  assert.ok(Number(summary.min_J_clearance) > 0.773);
  assert.deepEqual(
    firstRow.branch_interval_rows.map((row) => row.J_sign),
    ["+", "-"]
  );
  assert.equal(firstRow.all_endpoint_brackets_certified, true);
  assert.equal(firstRow.all_J_signs_certified, true);
});

test("sampled-node interval rows invalidate pair G and D quotient evidence", () => {
  const packet = artifact();
  const summary = packet.sampled_node_interval_summary;

  assert.equal(summary.eom_evidence_status, "invalidated-by-receiver-normal-master-eom");
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_sampled_node_fold_pair_GD_quotient_enclosures,
    false
  );
});

test("sampled-node interval certificate keeps continuous closure and retention open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_sampled_node_fold_pair_z_brackets,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_sampled_node_fold_pair_GD_quotient_enclosures,
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
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_speed_dependent_fold_normal_form_remainder,
    false
  );
  assert.equal(packet.artifact_claim.certifies_I1_regular_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
});

test("sampled-node interval validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledSampledNodeIntervalCertificate({
        zRadius: 0.02,
      }),
    /zRadius/
  );

  const packet = clone(artifact());
  packet.interval_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder =
    true;
  packet.artifact_claim.certifies_directed_rounded_regular_root_remainder = true;
  packet.artifact_claim.certifies_directed_rounded_speed_dependent_fold_normal_form_remainder =
    true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairScaledSampledNodeIntervalCertificate(
      packet
    );

  assert.ok(errors.includes("interval parameters must not contain speed-band fields"));
  assert.ok(
    errors.includes(
      "artifact claim must keep continuous fold-pair remainder, I1 closure, and retention open"
    )
  );
});

test("sampled-node interval CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "theta3minus-pair-node-"));
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_SCALED_SAMPLED_NODE_INTERVAL_CERTIFICATE_SCHEMA
  );
});
