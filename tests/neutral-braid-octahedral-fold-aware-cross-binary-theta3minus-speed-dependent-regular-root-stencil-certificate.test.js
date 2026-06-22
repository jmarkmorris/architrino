import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_STENCIL_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootStencilCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootStencilCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-stencil-certificate.mjs";

const EXPECTED_STATUS =
  "sampled-theta3minus-regular-root-stencil-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootStencilCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-stencil-certificate.mjs"
  );
}

test("theta3minus regular-root stencil certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootStencilCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_STENCIL_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_regular_root_stencil_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("regular-root stencil imposes no fixed speed band", () => {
  const packet = artifact();

  assert.equal(
    packet.regular_root_stencil_parameters.speed_constraint,
    NO_SPEED_WINDOW
  );
  assert.deepEqual(packet.regular_root_stencil_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(packet.regular_root_stencil_parameters.speed_band, undefined);
  assert.equal(packet.regular_root_stencil_parameters.speed_window, undefined);
  assert.equal(packet.regular_root_stencil_parameters.speed_min, undefined);
  assert.equal(packet.regular_root_stencil_parameters.speed_max, undefined);
});

test("regular-root stencil tightens sample grid and preserves scaling", () => {
  const summary = artifact().strict_remainder_budget_summary;

  assert.equal(summary.strict_speed_row_count, 8);
  assert.equal(summary.strict_y_sample_count_per_speed, 24);
  assert.equal(summary.strict_total_sample_count, 192);
  assert.ok(Number(summary.max_combined_budget_ratio) < 0.06);
  assert.ok(Number(summary.min_certified_budget_slack) > 0.18);
  assert.ok(Number(summary.min_pair_to_regular_root_separation) > 1.7);
  assert.ok(Number(summary.max_abs_R_G_regular_over_y) < 0.1);
  assert.ok(Number(summary.max_abs_R_D_regular_over_y3) < 0.75);
  assert.equal(summary.reconstruction_stable, true);
  assert.equal(summary.all_term_root_signatures_preserved, true);
});

test("regular-root stencil emits interval backend targets", () => {
  const targets = artifact().regular_root_backend_targets;

  assert.equal(targets.target_type, "regular-root-directed-rounded-backend-targets");
  assert.ok(targets.required_interval_rows.length >= 5);
  assert.match(targets.regular_root_definition, /except the two roots nearest/);
  assert.equal(Number(targets.worst_R_G_regular_row.y), 0.115);
});

test("regular-root stencil keeps directed-rounded closure and retention open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_strict_sampled_regular_root_remainder_stencil,
    true
  );
  assert.equal(packet.artifact_claim.emits_regular_root_interval_backend_targets, true);
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

test("regular-root stencil validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootStencilCertificate({
        speedSamples: [3.02156, 3.021562, 3.021564, 3.021568],
      }),
    /speedSamples/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootStencilCertificate({
        ySamples: [0.1, 0.05, 0.07, 0.001],
      }),
    /ySamples/
  );

  const packet = clone(artifact());
  packet.regular_root_stencil_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_directed_rounded_regular_root_remainder = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder =
    true;
  packet.artifact_claim.certifies_directed_rounded_speed_dependent_fold_normal_form_remainder =
    true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootStencilCertificate(
      packet
    );

  assert.ok(errors.includes("regular-root stencil parameters must not contain speed-band fields"));
  assert.ok(
    errors.includes(
      "artifact claim must keep directed-rounded remainder, I1 closure, and retention open"
    )
  );
});

test("regular-root stencil CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "theta3minus-regular-"));
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_STENCIL_CERTIFICATE_SCHEMA
  );
});
