import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_ZERO_BRACKET_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareZeroBracketCertificate,
  validateOctahedralFoldAwareZeroBracketCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-zero-bracket-certificate.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareZeroBracketCertificate();
  }
  return cachedArtifact;
}

function nearlyEqual(actual, expected, tolerance = 1e-12) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${actual} not within ${tolerance} of ${expected}`
  );
}

test("fold-aware zero bracket certificate validates source and does not impose a speed window", () => {
  const certificate = artifact();

  assert.deepEqual(validateOctahedralFoldAwareZeroBracketCertificate(certificate), []);
  assert.equal(certificate.schema, OCTAHEDRAL_FOLD_AWARE_ZERO_BRACKET_CERTIFICATE_SCHEMA);
  assert.equal(certificate.packet_id, "octahedral_fold_aware_zero_bracket_certificate");
  assert.equal(certificate.promotion_status, "priority-only");
  assert.equal(
    certificate.scan_parameters.speed_constraint,
    "none; the bracket is a certified positive speed-ratio zero enclosure"
  );
  assert.equal(certificate.source_artifact_check.valid, true);
  assert.equal(
    certificate.source_artifact_check.cross_binary_status,
    "symmetry-cancelled-fold-aware-cross-binary-period-integral"
  );
  assert.equal(certificate.artifact_claim.assumes_fixed_speed_window, false);
});

test("fold-aware zero bracket certificate proves the three-root sign bracket", () => {
  const certificate = artifact();
  const rootCount = certificate.root_count_certificate;
  const endpoint = certificate.endpoint_sign_certificate;

  assert.equal(rootCount.root_count_status, "exactly-three-partner-roots-through-bracket");
  nearlyEqual(rootCount.secondary_fold_x, 2.798386045784);
  nearlyEqual(rootCount.secondary_fold_speed_ratio, 2.971693870714);
  assert.ok(rootCount.lower_speed_ratio_margin_above_fold > 0.049);
  assert.ok(rootCount.upper_speed_ratio_margin_below_pi > 0.12);
  assert.equal(endpoint.status, "endpoint-sign-change-certified");
  assert.equal(endpoint.sign_change, "negative-to-positive");
  assert.equal(endpoint.endpoints[0].root_count, 3);
  assert.equal(endpoint.endpoints[1].root_count, 3);
  assert.equal(endpoint.endpoints[0].sign, "negative");
  assert.equal(endpoint.endpoints[1].sign, "positive");
  nearlyEqual(endpoint.endpoints[0].period_integral, -0.000034142221);
  nearlyEqual(endpoint.endpoints[1].period_integral, 0.000037877962);
  assert.ok(endpoint.endpoint_jacobian_abs_floor > 0.5);
});

test("fold-aware zero bracket certificate narrows the zero without claiming branch retention", () => {
  const certificate = artifact();
  const zero = certificate.zero_existence_certificate;

  assert.equal(zero.status, "sign-certified-fold-aware-multiroot-period-integral-zero-bracket");
  assert.deepEqual(zero.speed_ratio_enclosure, [3.02156, 3.02157]);
  nearlyEqual(zero.speed_ratio_estimate, 3.021564740248);
  assert.equal(zero.row.root_count, 3);
  assert.equal(zero.row.sign, "zero");
  assert.ok(zero.residual_abs < 1e-12);
  nearlyEqual(zero.row.period_integral_speed_derivative, 7.202077954503);
  nearlyEqual(zero.row.rows[0].phase_delay, 2.344688042275);
  nearlyEqual(zero.row.rows[1].phase_delay, 5.240881784882);
  nearlyEqual(zero.row.rows[2].phase_delay, 5.968461395446);
  assert.equal(
    certificate.transversality_certificate.status,
    "simple-zero-transversality-certified"
  );
  nearlyEqual(
    certificate.transversality_certificate.period_integral_speed_derivative,
    7.202077954503
  );
  assert.equal(certificate.transversality_certificate.derivative_sign, "positive");
  assert.equal(
    certificate.clock_scale_gauge_lemma.status,
    "projective-zero-ray-certified-clock-normalization-open"
  );
  nearlyEqual(certificate.clock_scale_gauge_lemma.speed_ratio_estimate, 3.021564740248);
  assert.equal(certificate.clock_scale_gauge_lemma.certifies_projective_zero_ray, true);
  assert.equal(certificate.clock_scale_gauge_lemma.certifies_absolute_clock_period, false);
  assert.equal(certificate.artifact_claim.certifies_fold_aware_multiroot_zero_bracket, true);
  assert.equal(certificate.artifact_claim.certifies_simple_zero_transversality, true);
  assert.equal(certificate.artifact_claim.certifies_projective_zero_ray, true);
  assert.equal(certificate.artifact_claim.retained_branch, false);
  assert.equal(certificate.artifact_claim.certifies_speed_clock_length, false);
  assert.equal(certificate.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(certificate.artifact_claim.certifies_action_noether_event_rows, false);
  assert.equal(certificate.artifact_claim.certifies_observer_export, false);
  assert.equal(certificate.result.retention, "not_retained");
  assert.equal(certificate.result.retained_branch, false);
});

test("fold-aware zero bracket certificate CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-fold-aware-zero-certificate-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-fold-aware-zero-bracket-certificate.mjs", import.meta.url)
  );

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });

  const certificate = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralFoldAwareZeroBracketCertificate(certificate), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(
    validation.result.theory_status,
    "sign-certified-fold-aware-multiroot-period-integral-zero-bracket"
  );

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_FOLD_AWARE_ZERO_BRACKET_CERTIFICATE_SCHEMA);
});
