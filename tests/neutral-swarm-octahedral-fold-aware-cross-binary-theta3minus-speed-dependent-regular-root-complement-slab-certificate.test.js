import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_COMPLEMENT_SLAB_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootComplementSlabCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootComplementSlabCertificate,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-complement-slab-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-regular-root-complement-slab-exclusion-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootComplementSlabCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-complement-slab-certificate.mjs"
  );
}

test("theta3minus regular-root complement-slab certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootComplementSlabCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_COMPLEMENT_SLAB_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_regular_root_complement_slab_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("regular-root complement-slab certificate imposes no fixed speed band", () => {
  const packet = artifact();

  assert.equal(packet.complement_slab_parameters.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(packet.complement_slab_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(packet.complement_slab_parameters.speed_band, undefined);
  assert.equal(packet.complement_slab_parameters.speed_window, undefined);
  assert.equal(packet.complement_slab_parameters.speed_min, undefined);
  assert.equal(packet.complement_slab_parameters.speed_max, undefined);
});

test("regular-root complement-slab certificate certifies the hybrid raw-F and fold-p cover", () => {
  const packet = artifact();
  const summary = packet.regular_root_complement_slab_summary;

  assert.equal(summary.speed_cell_count, 16);
  assert.equal(summary.y_cell_count, 64);
  assert.equal(summary.cell_count, 1024);
  assert.equal(summary.term_cell_count, 4096);
  assert.equal(summary.protected_fold_p_interval_count, 2048);
  assert.equal(summary.complement_slab_count, 12288);
  assert.equal(summary.attempted_raw_source_complement_slab_count, 9216);
  assert.equal(summary.scaled_fold_p_slab_count, 3072);
  assert.equal(summary.deferred_fold_neighborhood_slab_count, 0);
  assert.equal(summary.all_attempted_raw_source_complement_slabs_certified, true);
  assert.equal(summary.all_scaled_fold_p_slabs_certified, true);
  assert.equal(summary.all_complement_slabs_certified, true);
  assert.ok(Number(summary.min_complement_F_clearance) > 0.00002);
  assert.ok(Number(summary.min_scaled_fold_p_F_over_y2_clearance) > 0.0002);
  assert.ok(Number(summary.max_delta_subcell_width) <= 0.0021);
  assert.ok(Number(summary.max_fold_p_subcell_width) <= 0.011);
  assert.ok(Number(summary.max_fold_p_taylor_argument) < 1);
});

test("regular-root complement-slab certificate closes the regular-root side only", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_regular_root_nonfold_and_outer_complement_slab_exclusion,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_regular_root_fold_neighborhood_scaled_p_exclusion,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_regular_root_complement_slab_exclusion,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_regular_root_remainder,
    true
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

test("regular-root complement-slab validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootComplementSlabCertificate({
        deltaSubcellWidth: 0.1,
      }),
    /deltaSubcellWidth/
  );

  const packet = clone(artifact());
  packet.complement_slab_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_directed_rounded_regular_root_complement_slab_exclusion =
    false;
  packet.artifact_claim.certifies_directed_rounded_regular_root_remainder = false;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_directed_rounded_speed_dependent_fold_normal_form_remainder =
    true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootComplementSlabCertificate(
      packet
    );

  assert.ok(
    errors.includes("complement-slab parameters must not contain speed-band fields")
  );
  assert.ok(
    errors.includes(
      "artifact claim must close the regular-root complement and keep fold-pair/full closure, I1, and retention open"
    )
  );
});

test("regular-root complement-slab CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "theta3minus-reg-slab-"));
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_COMPLEMENT_SLAB_CERTIFICATE_SCHEMA
  );
});
