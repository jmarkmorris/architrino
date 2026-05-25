import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_NORMAL_FORM_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.mjs";

const EXPECTED_STATUS =
  "sampled-speed-dependent-theta3minus-fold-normal-form-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.mjs"
  );
}

function near(actual, expected, tolerance = 5e-9) {
  assert.ok(
    Math.abs(Number(actual) - expected) <= tolerance,
    `${actual} not within ${tolerance} of ${expected}`
  );
}

test("theta3minus speed-dependent fold normal-form packet validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_NORMAL_FORM_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_normal_form"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("normal-form packet imposes no fixed speed band", () => {
  const packet = artifact();

  assert.equal(packet.normal_form_parameters.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(packet.normal_form_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(packet.normal_form_parameters.speed_band, undefined);
  assert.equal(packet.normal_form_parameters.speed_window, undefined);
  assert.equal(packet.normal_form_parameters.speed_min, undefined);
  assert.equal(packet.normal_form_parameters.speed_max, undefined);
});

test("speed-dependent theta3minus fold row moves with speed and keeps L negative", () => {
  const packet = artifact();
  const rows = packet.speed_dependent_fold_normal_form_rows;
  const summary = packet.speed_dependent_fold_normal_form_summary;

  assert.equal(rows.length, 5);
  assert.ok(Number(rows[0].theta_fold) > Number(rows.at(-1).theta_fold));
  near(rows[0].theta_fold, 0.997377676237);
  near(rows.at(-1).theta_fold, 0.997362865339);
  near(summary.analytic_square_limit_sample_hull[0], -0.192718445926);
  near(summary.analytic_square_limit_sample_hull[1], -0.192712184631);
  assert.equal(summary.status, "sampled-speed-dependent-fold-normal-form-margin-certified");
  assert.equal(summary.all_limits_negative, true);
  assert.equal(summary.all_fold_sides_left, true);
  assert.equal(summary.all_alpha_negative, true);
  assert.ok(Number(summary.minimum_abs_analytic_square_limit_margin) > 0.19);
  assert.ok(Number(summary.maximum_speed_endpoint_limit_drift_abs) < 0.00001);
});

test("moving fold-collar samples certify finite G and D signs on the sampled grid", () => {
  const packet = artifact();
  const summary = packet.moving_fold_collar_sample_summary;

  assert.equal(summary.status, "sampled-moving-fold-collar-GD-signs-certified");
  assert.equal(summary.moving_collar_speed_row_count, 5);
  assert.equal(summary.moving_collar_sample_count, 60);
  assert.equal(summary.all_G_samples_negative, true);
  assert.equal(summary.all_D_samples_negative, true);
  assert.equal(summary.all_term_root_signatures_preserved, true);
  assert.ok(Number(summary.minimum_abs_G_sample_margin) > 0.18);
  assert.ok(Number(summary.minimum_abs_D_sample_margin) > 0.19);
  for (const speedRow of packet.moving_fold_collar_sample_rows) {
    assert.equal(speedRow.status, "sampled-moving-fold-collar-GD-signs-certified");
    assert.ok(
      speedRow.sample_rows.every(
        (row) =>
          row.G_sign === "-" &&
          row.D_sign === "-" &&
          row.term_root_count_signature === "1,3,1,1"
      )
    );
  }
});

test("normal-form theorem target states D as the fixed-speed y-transport numerator", () => {
  const target = artifact().normal_form_theorem_target;

  assert.equal(
    target.G_definition,
    "G(y,nu)=2y f_cross(theta_3minus(nu)-y^2;nu)"
  );
  assert.equal(target.D_definition, "D(y,nu)=G(y,nu)-y*d_yG(y,nu)");
  assert.equal(
    target.derivative_identity,
    "f'_theta(theta_3minus(nu)-y^2;nu)=D(y,nu)/(4y^3)"
  );
  assert.equal(target.theorem_status, "directed-rounded-normal-form-remainder-open");
});

test("normal-form packet keeps interval collar closure and retention open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_sampled_speed_dependent_fold_normal_form_margin,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_sampled_speed_dependent_moving_collar_GD_signs,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_speed_dependent_fold_normal_form_remainder,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_theta_3minus_left_fold_collar_interval_radius,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_I1_complement_sign_interval_enclosures,
    false
  );
  assert.equal(packet.artifact_claim.certifies_I1_regular_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.certifies_interval_quadrature_enclosure, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(
    packet.result.first_successor_row,
    "theta_3minus.left-fold-collar-directed-rounded-normal-form-remainder-required"
  );
});

test("normal-form packet rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm({
        ySamples: [0.1, 0.05, 0.07, 0.001],
      }),
    /ySamples/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm({
        speedSamples: [3.021562, 3.021564, 3.021568],
      }),
    /speedSamples/
  );

  const packet = clone(artifact());
  packet.normal_form_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_directed_rounded_speed_dependent_fold_normal_form_remainder =
    true;
  packet.artifact_claim.certifies_theta_3minus_left_fold_collar_interval_radius =
    true;
  packet.artifact_claim.certifies_I1_complement_sign_interval_enclosures = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldNormalForm(
      packet
    );

  assert.ok(errors.includes("normal-form parameters must not contain speed-band fields"));
  assert.ok(
    errors.includes(
      "artifact claim must keep remainder, fold-collar interval radius, I1 closure, quadrature, and retention open"
    )
  );
});

test("normal-form CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "theta3minus-normal-form-"));
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_NORMAL_FORM_SCHEMA
  );
});
