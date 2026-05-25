import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_LIMIT_INTERVAL_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate.mjs";

const EXPECTED_STATUS =
  "directed-rounded-theta3minus-fold-limit-interval-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate();
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate.mjs"
  );
}

test("theta3minus fold-limit interval packet validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_LIMIT_INTERVAL_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_limit_interval_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("fold-limit interval packet imposes no fixed speed band", () => {
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

test("fold endpoint bracket is sign certified and monotone", () => {
  const bracket = artifact().fold_endpoint_bracket_certificate;

  assert.equal(
    bracket.status,
    "directed-rounded-theta3minus-fold-endpoint-bracket-certified"
  );
  assert.equal(bracket.left_endpoint_sign, "-");
  assert.equal(bracket.right_endpoint_sign, "+");
  assert.equal(bracket.E_delta_sign, "+");
  assert.ok(bracket.left_endpoint_equation_interval[1] < 0);
  assert.ok(bracket.right_endpoint_equation_interval[0] > 0);
  assert.ok(bracket.E_delta_interval[0] > 0.314);
  assert.ok(Number(bracket.minimum_endpoint_clearance) > 1e-6);
});

test("fold constants certify negative L with interval margin", () => {
  const constants = artifact().fold_constant_interval_certificate;

  assert.equal(
    constants.status,
    "directed-rounded-theta3minus-fold-limit-sign-certified"
  );
  assert.equal(constants.interval_signs.F_theta_sign, "-");
  assert.equal(constants.interval_signs.F_delta_delta_sign, "-");
  assert.equal(constants.interval_signs.B_kernel_sign, "+");
  assert.equal(constants.interval_signs.alpha_sign, "-");
  assert.equal(constants.interval_signs.analytic_square_limit_sign, "-");
  assert.ok(constants.theta_fold_interval[0] > 0.9973);
  assert.ok(constants.theta_fold_interval[1] < 0.9975);
  assert.ok(constants.analytic_square_limit_interval[0] < -0.1927);
  assert.ok(constants.analytic_square_limit_interval[1] < -0.1926);
  assert.ok(Number(constants.minimum_abs_L_clearance) > 0.192);
});

test("fold-limit packet narrows but does not overclaim the remainder row", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_theta3minus_fold_endpoint_bracket,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_speed_dependent_fold_limit_L_negative,
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
  assert.equal(packet.artifact_claim.certifies_I1_regular_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(
    packet.result.first_successor_row,
    "theta_3minus.left-fold-collar-directed-rounded-normal-form-remainder-required"
  );
});

test("fold-limit packet rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate(
        {
          speedRatioInterval: [0.5, 1.5],
        }
      ),
    /speedRatioInterval/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate(
        {
          deltaBracket: [3.29639, 3.29632],
        }
      ),
    /deltaBracket/
  );

  const packet = clone(artifact());
  packet.interval_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_directed_rounded_speed_dependent_fold_normal_form_remainder =
    true;
  packet.artifact_claim.certifies_theta_3minus_left_fold_collar_interval_radius =
    true;
  packet.artifact_claim.certifies_I1_regular_critical_exhaustion = true;
  packet.artifact_claim.retained_branch = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldLimitIntervalCertificate(
      packet
    );

  assert.ok(errors.includes("interval parameters must not contain speed-band fields"));
  assert.ok(
    errors.includes(
      "artifact claim must certify only the fold-limit interval and keep closure rows open"
    )
  );
});

test("fold-limit interval CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "theta3minus-fold-limit-"));
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_LIMIT_INTERVAL_CERTIFICATE_SCHEMA
  );
});
