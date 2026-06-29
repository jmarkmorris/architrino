import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_SAMPLED_NODE_INTERVAL_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootSampledNodeIntervalCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootSampledNodeIntervalCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-sampled-node-theta3minus-regular-root-interval-certified";
const NO_SPEED_WINDOW =
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootSampledNodeIntervalCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate.mjs"
  );
}

test("theta3minus regular-root sampled-node interval certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootSampledNodeIntervalCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_SAMPLED_NODE_INTERVAL_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_regular_root_sampled_node_interval_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("regular-root sampled-node interval certificate imposes no fixed speed band", () => {
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

test("regular-root sampled-node interval rows certify root brackets and F_delta signs", () => {
  const summary = artifact().sampled_node_regular_root_interval_summary;

  assert.equal(summary.sample_node_count, 192);
  assert.equal(summary.regular_root_interval_count, 768);
  assert.equal(summary.endpoint_interval_count, 1536);
  assert.equal(summary.all_root_brackets_certified, true);
  assert.equal(summary.all_F_delta_signs_certified, true);
  assert.equal(summary.all_direct_regular_quotients_contained, true);
  assert.ok(Number(summary.min_endpoint_F_clearance) > 5e-9);
  assert.ok(Number(summary.min_F_delta_clearance) > 0.58);
  assert.ok(Number(summary.min_pair_to_regular_root_separation) > 1.7);
});

test("regular-root sampled-node interval rows enclose regular G and D quotient budgets", () => {
  const summary = artifact().sampled_node_regular_root_interval_summary;

  assert.ok(
    Number(summary.max_abs_R_G_regular_over_y_interval_upper) < 0.089
  );
  assert.ok(
    Number(summary.max_abs_R_D_regular_over_y3_interval_upper) < 0.602
  );
  assert.ok(Number(summary.implied_R_G_regular_budget_at_outer_radius) < 0.011);
  assert.ok(Number(summary.implied_R_D_regular_budget_at_outer_radius) < 0.001);
  assert.ok(Number(summary.max_regular_root_budget_ratio) < 0.053);
  assert.ok(
    Number(summary.max_predecessor_vs_direct_R_D_regular_over_y3_abs) < 0.0005
  );
});

test("regular-root sampled-node interval certificate keeps continuous closure and retention open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_sampled_node_regular_root_brackets,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_sampled_node_regular_root_GD_quotient_enclosures,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_regular_root_remainder,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder,
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

test("regular-root sampled-node interval validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootSampledNodeIntervalCertificate({
        rootRadius: 0,
      }),
    /rootRadius/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootSampledNodeIntervalCertificate({
        speedSamples: [3.02156, 3.021562, 3.021564, 3.021568],
      }),
    /speedSamples/
  );

  const packet = clone(artifact());
  packet.interval_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_directed_rounded_regular_root_remainder = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder =
    true;
  packet.artifact_claim.certifies_directed_rounded_speed_dependent_fold_normal_form_remainder =
    true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootSampledNodeIntervalCertificate(
      packet
    );

  assert.ok(errors.includes("interval parameters must not contain speed-band fields"));
  assert.ok(
    errors.includes(
      "artifact claim must keep continuous regular-root remainder, I1 closure, and retention open"
    )
  );
});

test("regular-root sampled-node interval CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "theta3minus-regular-node-"));
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_SAMPLED_NODE_INTERVAL_CERTIFICATE_SCHEMA
  );
});
