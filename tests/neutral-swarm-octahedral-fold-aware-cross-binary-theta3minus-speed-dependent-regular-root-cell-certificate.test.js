import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_CELL_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootCellCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootCellCertificate,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-regular-root-cell-cover-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootCellCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate.mjs"
  );
}

test("theta3minus regular-root cell certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootCellCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_CELL_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_regular_root_cell_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("regular-root cell certificate imposes no fixed speed band", () => {
  const packet = artifact();

  assert.equal(packet.cell_cover_parameters.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(packet.cell_cover_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(packet.cell_cover_parameters.speed_band, undefined);
  assert.equal(packet.cell_cover_parameters.speed_window, undefined);
  assert.equal(packet.cell_cover_parameters.speed_min, undefined);
  assert.equal(packet.cell_cover_parameters.speed_max, undefined);
});

test("regular-root cell cover certifies sheet brackets and quotient bounds", () => {
  const packet = artifact();
  const summary = packet.regular_root_cell_summary;
  const firstCell = packet.regular_root_cell_rows[0];

  assert.equal(summary.speed_cell_count, 16);
  assert.equal(summary.y_cell_count, 64);
  assert.equal(summary.cell_count, 1024);
  assert.equal(summary.regular_sheet_cell_count, 4096);
  assert.equal(summary.endpoint_interval_count, 8192);
  assert.equal(summary.all_endpoint_brackets_certified, true);
  assert.equal(summary.all_F_delta_signs_certified, true);
  assert.ok(Number(summary.min_endpoint_F_clearance) > 0.00001);
  assert.ok(Number(summary.min_F_delta_clearance) > 0.55);
  assert.ok(Number(summary.max_abs_R_G_regular_over_y_interval_upper) < 0.09);
  assert.ok(Number(summary.max_abs_R_D_regular_over_y3_interval_upper) < 0.62);
  assert.ok(Number(summary.max_regular_root_budget_ratio) < 0.055);
  assert.equal(firstCell.regular_sheet_rows.length, 4);
});

test("regular-root cell certificate keeps full closure and retention open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_regular_root_sheet_quotient_cell_cover,
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

test("regular-root cell validator rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootCellCertificate({
        speedCellCount: 2,
      }),
    /speedCellCount/
  );

  const packet = clone(artifact());
  packet.cell_cover_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_directed_rounded_regular_root_remainder = true;
  packet.artifact_claim.certifies_directed_rounded_fold_pair_scaled_remainder = true;
  packet.artifact_claim.certifies_directed_rounded_speed_dependent_fold_normal_form_remainder =
    true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentRegularRootCellCertificate(
      packet
    );

  assert.ok(errors.includes("cell-cover parameters must not contain speed-band fields"));
  assert.ok(
    errors.includes(
      "artifact claim must keep full remainder, I1 closure, and retention open"
    )
  );
});

test("regular-root cell CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "theta3minus-reg-cell-"));
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_REGULAR_ROOT_CELL_CERTIFICATE_SCHEMA
  );
});
